import { createFileRoute, useParams, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Users, Copy, Play, ArrowLeft, Loader2, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { socketService } from "@/lib/socket";
import { useGameStore } from "@/store";
import { CODE_SNIPPETS } from "@/data/codes";

const LANGUAGES = Object.keys(CODE_SNIPPETS);

export const Route = createFileRoute("/multiplayer/$roomId")({
  component: MultiplayerRoom,
});

function MultiplayerRoom() {
  const { roomId } = useParams({ from: "/multiplayer/$roomId" });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [players, setPlayers] = useState<{ id: string; name: string; isHost?: boolean }[]>([]);

  useEffect(() => {
    const socket = socketService.connect();
    const savedName = localStorage.getItem("playerName");
    const playerName = savedName || `Player_${Math.floor(Math.random() * 1000)}`;

    socket.emit("join_game", { gameId: roomId, playerName });

    socket.on("room_state", (data: { players: any[] }) => {
      // Map players to include isHost logic if not provided by backend
      // Assuming the first player in the list is the host
      const mappedPlayers = data.players.map((p, index) => ({
        ...p,
        isHost: index === 0
      }));
      setPlayers(mappedPlayers);
      setIsLoading(false);
    });

    socket.on("player_joined", (data: { playerId: string; playerName: string }) => {
      setPlayers((prev) => {
        if (prev.find((p) => p.id === data.playerId)) return prev;
        return [...prev, { id: data.playerId, name: data.playerName, isHost: prev.length === 0 }];
      });
      toast.info(`${data.playerName} joined the room`);
    });

    return () => {
      socket.off("room_state");
      socket.off("player_joined");
    };
  }, [roomId, navigate]);

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomId);
    toast.success("Room code copied to clipboard!");
  };

  const handleStartGame = () => {
    socketService.emit("start_game", roomId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fdf2f8] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-500 mx-auto mb-4" />
          <p className="text-xl font-bold text-slate-600">Loading Room...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdf2f8] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans text-slate-900">
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" style={{ animationDelay: '1.5s' }}></div>

      <div className="relative z-10 max-w-2xl w-full bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-3xl p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b-2 border-slate-100">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate({ to: '/multiplayer' })}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-black tracking-tight">Game Room</h1>
              <div className="flex items-center text-slate-500 font-bold text-sm">
                <Users className="w-4 h-4 mr-1" />
                {players.length} / 8 Players
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className="text-xs font-black uppercase text-slate-400 tracking-widest">Room Code</span>
            <div className="flex items-center gap-2">
              <code className="bg-slate-100 px-4 py-2 border-2 border-black rounded-lg font-black text-xl">
                {roomId}
              </code>
              <Button 
                onClick={copyRoomCode}
                variant="outline"
                className="h-11 w-11 p-0 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-none transition-all"
              >
                <Copy className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {players.map((player) => (
            <div 
              key={player.id}
              className="flex items-center justify-between p-4 border-2 border-black rounded-xl bg-slate-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full border-2 border-black flex items-center justify-center font-bold ${player.isHost ? 'bg-yellow-400' : 'bg-white'}`}>
                  {player.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold flex items-center gap-1">
                    {player.name}
                    {player.id === socketService.socket?.id && " (You)"}
                    {player.isHost && <ShieldCheck className="w-4 h-4 text-indigo-500" />}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Waiting Slots */}
          {Array.from({ length: Math.max(0, 4 - players.length) }).map((_, i) => (
            <div key={`empty-${i}`} className="flex items-center p-4 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50/50">
              <div className="w-10 h-10 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-300">
                ?
              </div>
              <div className="ml-3 text-sm font-bold text-slate-300 uppercase tracking-widest">
                Waiting for player...
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {players.find(p => p.id === socketService.socket?.id)?.isHost ? (
            <Button 
              onClick={handleStartGame}
              className="flex-1 h-16 text-xl font-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 transition-all bg-emerald-400 text-slate-900 hover:bg-emerald-300"
              disabled={players.length < 2}
            >
              <Play className="w-6 h-6 mr-2" fill="currentColor" />
              START GAME
            </Button>
          ) : (
            <div className="flex-1 h-16 flex items-center justify-center border-4 border-dashed border-slate-200 rounded-xl bg-slate-50 text-slate-400 font-bold uppercase tracking-widest">
              Waiting for host to start...
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
          The host will start the match once everyone has joined
        </p>
      </div>
    </div>
  );
}