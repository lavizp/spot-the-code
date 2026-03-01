import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { socketService } from "@/lib/socket";
import { useGameStore } from "@/store";
import { toast } from "sonner";
import { CODE_SNIPPETS } from "@/data/codes";

const LANGUAGES = Object.keys(CODE_SNIPPETS);

export function SocketGameHandler() {
  const navigate = useNavigate();
  const { setStartGame, setNextRound, setGameOver } = useGameStore();

  useEffect(() => {
    const socket = socketService.connect();

    socket.on("round_start", (data: { round: number; roundData: { snippet: string; correctAnswer: string }; expiresIn: number }) => {
      console.log("Round starting:", data.round);
      const roundEndTime = Date.now() + data.expiresIn;
      
      // If it's the first round, initialize the game state
      if (data.round === 1) {
        // Get the latest gameId from store state to avoid using a stale captured value
        const currentGameId = useGameStore.getState().gameId;
        
        setStartGame(
          data.roundData.snippet,
          data.roundData.correctAnswer,
          LANGUAGES,
          currentGameId || undefined,
          data.round,
          roundEndTime
        );
      } else {
        // For subsequent rounds, update the round data
        setNextRound(
          data.roundData.snippet,
          data.roundData.correctAnswer,
          LANGUAGES,
          data.round,
          roundEndTime
        );
      }

      navigate({ 
        to: "/match/round/$roundid", 
        params: { roundid: data.round.toString() } 
      });
    });

    socket.on("game_over", (data: { finalScores: any[] }) => {
      console.log("Game Over:", data.finalScores);
      setGameOver(data.finalScores);
      toast.info("Game Over! Check out the final scores.");
      navigate({ to: "/result" });
    });

    socket.on("action_broadcasted", (data: { player: string; action: any }) => {
        // Optional: show a small toast when someone else answers
        if (data.player !== socket.id && data.action.type === 'choose_answer') {
            // Find player name from local state if possible or just show generic
            toast.info("Another player has submitted their guess!");
        }
    });

    socket.on("error", (data: { message: string }) => {
      toast.error(data.message);
    });

    return () => {
      socket.off("round_start");
      socket.off("game_over");
      socket.off("action_broadcasted");
      socket.off("error");
    };
  }, [navigate, setStartGame, setNextRound, setGameOver]);

  return null;
}