import { Button } from "@/components/ui/button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { gameActions } from "@/store/actions/gameActions";
import { ArrowRight, Code2 } from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const navigate = useNavigate();

  const handleStart = () => {
    gameActions.startGame();
    navigate({
      to: '/match/round/$roundid',
      params: { roundid: '1' }
    });
  };

  return (
    <div className="min-h-screen bg-[#fdf2f8] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans text-slate-900">

      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-[20%] right-[20%] w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 max-w-2xl w-full bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-3xl p-12 text-center transform transition-transform hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] duration-300">

        <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-400 border-4 border-black rounded-full mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Code2 className="w-10 h-10 text-white" strokeWidth={3} />
        </div>

        <h1 className="text-6xl md:text-7xl font-black mb-4 tracking-tighter text-slate-900 cursor-pointer">
          Spot the <span className="text-emerald-500 underline decoration-4 decoration-black underline-offset-4">Syntax</span>
        </h1>

        <p className="text-xl font-medium text-slate-600 mb-10 max-w-lg mx-auto leading-relaxed">
          The ultimate code challenge! <br />
          Can you guess the programming language from a single snippet?
        </p>

        <Button onClick={handleStart} className="text-xl py-6 px-12 w-full md:w-auto h-auto border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 transition-all bg-slate-900 text-white hover:bg-slate-800 cursor-pointer">
          Start Guessing <ArrowRight className="w-6 h-6 ml-2" strokeWidth={3} />
        </Button>

        <div className="mt-8 flex justify-center gap-4 text-sm font-bold text-slate-400 uppercase tracking-widest">
          <span>★ 5 Rounds</span>
          <span>•</span>
          <span>∞ Fun</span>
        </div>
      </div>
    </div>
  );
}