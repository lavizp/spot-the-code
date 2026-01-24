import { Button } from '@/components/ui/button'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowRight, MapIcon, Trophy, RefreshCcw } from 'lucide-react'
import { useGameStore } from "@/store"
import { gameActions } from "@/store/actions/gameActions"
import { useEffect } from 'react'

export const Route = createFileRoute('/result')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();
  const { 
    roundDistance, 
    roundScore, 
    score, 
    isGameOver, 
    currentRound, 
    totalRounds, 
    isPlaying
  } = useGameStore();

  const handleNext = () => {
     if (isGameOver || currentRound >= totalRounds) {
        gameActions.nextRound(); // This will set isGameOver = true if we are at last round
        if (currentRound >= totalRounds) {
            gameActions.resetGame();
            navigate({ to: '/' });
        } else {
            gameActions.nextRound(); // Setup next round
            navigate({ to: '/match' });
        }
     } else {
        gameActions.nextRound();
        navigate({ to: '/match' });
     }
  }

  useEffect(() => {
    if (!isPlaying && !isGameOver && roundDistance === null) {
        navigate({ to: '/' });
    }
  }, [isPlaying, isGameOver, roundDistance, navigate]);

  const isLastRound = currentRound === totalRounds;

  return (
    <div className="h-screen w-full relative bg-slate-100 flex flex-col font-sans overflow-hidden">
      
      {/* Full Interactive Map (Static Background for Result) */}
      <div className="absolute inset-0 z-0 bg-slate-200">
           {/* Placeholder for map showing result line */}
           <div className="w-full h-full flex items-center justify-center text-slate-400">
              <span className="font-bold">Map Result Visual</span>
           </div>
      </div>

      {/* Top Banner: Correct Location */}
      <div className="absolute top-8 left-0 right-0 z-20 flex justify-center pointer-events-none">
          <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-6 py-2 rounded-full transform animate-in slide-in-from-top-10 hover:scale-105 transition-transform">
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                  <MapIcon className="w-5 h-5 text-emerald-500" />
                  Round {currentRound} Result
              </h2>
          </div>
      </div>

      {/* Bottom Score Dashboard */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 flex justify-center pointer-events-none">
          <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-3xl p-6 w-full max-w-4xl pointer-events-auto flex flex-col md:flex-row items-center gap-6 animate-in slide-in-from-bottom-20 duration-500">
              
              {/* Stats Section */}
              <div className="flex-1 w-full text-center md:text-left">
                  <div className="flex items-end justify-between md:justify-start md:gap-12 mb-3">
                      <div className="flex flex-col items-start">
                           <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Distance</div>
                           <div className="text-3xl font-black text-slate-900 leading-none">{roundDistance?.toFixed(0) ?? 0} <span className="text-lg text-slate-500 font-bold">km</span></div>
                      </div>
                      <div className="flex flex-col items-start">
                           <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Score</div>
                           <div className="text-3xl font-black text-emerald-500 leading-none flex items-center gap-1">
                              +{roundScore} <Trophy className="w-5 h-5 text-yellow-500" fill="currentColor" />
                           </div>
                      </div>
                      <div className="flex flex-col items-start ml-auto md:ml-0">
                           <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total</div>
                           <div className="text-3xl font-black text-slate-900 leading-none">
                              {score}
                           </div>
                      </div>
                  </div>
                  
                  {/* Retro Progress Bar based on score (max 5000) */}
                  <div className="w-full h-8 bg-slate-100 rounded-lg border-2 border-black overflow-hidden relative">
                       <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#e2e8f0_10px,#e2e8f0_20px)] opacity-50"></div>
                       <div 
                         className="h-full bg-yellow-400 border-r-2 border-black transition-all duration-1000 ease-out relative" 
                         style={{ width: `${Math.min(100, (roundScore / 5000) * 100)}%` }}
                       >
                          <div className="absolute inset-0 bg-[rgba(255,255,255,0.2)]"></div>
                       </div>
                  </div>
              </div>

              {/* Vertical Divider (Desktop) */}
              <div className="hidden md:block w-0.5 h-20 bg-slate-200"></div>

              {/* Action Button */}
              <div className="shrink-0 w-full md:w-auto">
                   <Button onClick={handleNext} className="w-full md:w-auto text-lg px-8 py-4 whitespace-nowrap">
                      {isLastRound ? (
                        <>Finish Game <RefreshCcw className="w-6 h-6 ml-1" /></>
                      ) : (
                        <>Next Round <ArrowRight className="w-6 h-6 ml-1" strokeWidth={3} /></>
                      )}
                   </Button>
              </div>
          </div>
      </div>
    </div>
  )
}
