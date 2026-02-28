import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { socketService } from "@/lib/socket";
import { useGameStore } from "@/store";
import { toast } from "sonner";
import { CODE_SNIPPETS } from "@/data/codes";

const LANGUAGES = Object.keys(CODE_SNIPPETS);

export function SocketGameHandler() {
  const navigate = useNavigate();
  const { setStartGame, setNextRound, setGameOver, gameId, currentRound } = useGameStore();

  useEffect(() => {
    const socket = socketService.connect();

    socket.on("round_start", (data: { round: number; roundData: { snippet: string; correctAnswer: string }; expiresIn: number }) => {
      console.log("Round starting:", data.round);
      
      // If it's the first round, initialize the game state
      if (data.round === 1) {
        setStartGame(
          data.roundData.snippet,
          data.roundData.correctAnswer,
          LANGUAGES,
          gameId || undefined,
          data.round
        );
      } else {
        // For subsequent rounds, update the round data
        setNextRound(
          data.roundData.snippet,
          data.roundData.correctAnswer,
          LANGUAGES,
          data.round
        );
      }

      navigate({ 
        to: "/match/round/$roundid", 
        params: { roundid: data.round.toString() } 
      });
    });

    socket.on("game_over", (data: { finalScores: any[] }) => {
      console.log("Game Over:", data.finalScores);
      setGameOver();
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
  }, [navigate, setStartGame, setNextRound, setGameOver, gameId]);

  return null;
}