import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Users, Plus, Hash, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { socketService } from "@/lib/socket";
import { toast } from "sonner";

export const Route = createFileRoute("/multiplayer/")({
  component: MultiplayerHome,
});

function MultiplayerHome() {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const socket = socketService.connect();

    socket.on("game_created", (data: { gameId: string; success: boolean; message?: string }) => {
      setIsCreating(false);
      if (data.success) {
        navigate({ to: '/multiplayer/$roomId', params: { roomId: data.gameId } });
      } else {
        toast.error(data.message || "Failed to create room");
      }
    });

    return () => {
      socket.off("game_created");
    };
  }, [navigate]);

  const handleCreateRoom = () => {
    if (!playerName.trim()) {
      toast.error("Please enter your name first");
      return;
    }
    localStorage.setItem("playerName", playerName);
    setIsCreating(true);
    socketService.emit("create_game");
  };

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) {
      toast.error("Please enter your name first");
      return;
    }
    if (roomCode.trim()) {
      localStorage.setItem("playerName", playerName);
      navigate({ to: '/multiplayer/$roomId', params: { roomId: roomCode } });
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf2f8] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans text-slate-900">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 max-w-md w-full bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-3xl p-8 transform transition-all duration-300">
        <button 
          onClick={() => navigate({ to: '/' })}
          className="mb-6 flex items-center text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-indigo-500 border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight">Multiplayer</h1>
            <p className="text-slate-500 font-medium">Challenge your friends</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Name Section */}
          <div className="space-y-4">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">Your Identity</h2>
            <Input 
              placeholder="ENTER YOUR NAME" 
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="h-16 text-lg font-bold border-2 border-black rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-indigo-500 transition-colors uppercase placeholder:normal-case"
            />
          </div>

          {/* Create Section */}
          <div className="space-y-4">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">Host a Game</h2>
            <Button 
              onClick={handleCreateRoom}
              disabled={isCreating}
              className="w-full h-16 text-lg font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 transition-all bg-emerald-400 text-slate-900 hover:bg-emerald-300 disabled:opacity-50"
            >
              <Plus className="w-6 h-6 mr-2" strokeWidth={3} />
              {isCreating ? "Creating..." : "Create New Room"}
            </Button>
          </div>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t-2 border-slate-100"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 font-black text-slate-400">Or Join One</span>
            </div>
          </div>

          {/* Join Section */}
          <form onSubmit={handleJoinRoom} className="space-y-4">
            <div className="relative">
              <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input 
                placeholder="ENTER ROOM CODE" 
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                className="h-16 pl-12 text-lg font-bold border-2 border-black rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-indigo-500 transition-colors uppercase placeholder:normal-case"
              />
            </div>
            <Button 
              type="submit"
              disabled={!roomCode.trim()}
              className="w-full h-16 text-lg font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 transition-all bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Join Room
            </Button>
          </form>
        </div>

        <div className="mt-8 pt-6 border-t-2 border-slate-50 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Invite up to 8 players
          </p>
        </div>
      </div>
    </div>
  );
}