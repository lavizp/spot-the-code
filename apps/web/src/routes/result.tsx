import { Button } from '@/components/ui/button'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowRight, Trophy, RefreshCcw, CheckCircle, XCircle } from 'lucide-react'
import { useGameStore } from "@/store"
import { gameActions } from "@/store/actions/gameActions"
import { useEffect } from 'react'

export const Route = createFileRoute('/result')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();
  const { 
    roundScore, 
    score, 
    isGameOver, 
    currentRound, 
    totalRounds, 
    isPlaying,
    selectedLanguage,
    correctLanguage
  } = useGameStore();

  const isLastRound = currentRound >= totalRounds;
  const isCorrect = selectedLanguage === correctLanguage;

  const handleNext = () => {
     if (isLastRound) {
        useGameStore.getState().endGame();
        navigate({ to: '/' });
     } else {
        gameActions.nextRound();
        navigate({ 
            to: '/match/round/$roundid',
            params: { roundid: (currentRound + 1).toString() }
        });
     }
  }

  useEffect(() => {
    if (!isPlaying) {
        navigate({ to: '/' });
    }
  }, [isPlaying, navigate]);

  return (
    <div className={`h-screen w-full relative flex flex-col font-sans overflow-hidden items-center justify-center transition-colors duration-500 ${isCorrect ? 'bg-emerald-50' : 'bg-red-50'}`}>
      
      {/* Result Visual */}
      <div className="flex flex-col items-center z-10 animate-in zoom-in duration-500 p-4 text-center">
           {isCorrect ? (
               <div className="flex flex-col items-center">
                   <CheckCircle className="w-24 h-24 md:w-32 md:h-32 text-emerald-500 mb-6 drop-shadow-[4px_4px_0px_rgba(0,0,0,0.2)]" />
                   <h1 className="text-5xl md:text-7xl font-black text-emerald-600 uppercase tracking-tighter mb-4 drop-shadow-sm">Correct!</h1>
                   <div className="bg-white border-4 border-emerald-600 px-6 py-3 rounded-xl shadow-[4px_4px_0px_0px_rgba(16,185,129,1)]">
                        <p className="text-xl md:text-2xl font-bold text-slate-800">
                            It was <span className="text-emerald-600">{correctLanguage}</span>
                        </p>
                   </div>
               </div>
           ) : (
               <div className="flex flex-col items-center">
                   <XCircle className="w-24 h-24 md:w-32 md:h-32 text-red-500 mb-6 drop-shadow-[4px_4px_0px_rgba(0,0,0,0.2)]" />
                   <h1 className="text-5xl md:text-7xl font-black text-red-600 uppercase tracking-tighter mb-4 drop-shadow-sm">Wrong!</h1>
                   <div className="bg-white border-4 border-red-600 px-6 py-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(239,68,68,1)] flex flex-col gap-2">
                       <p className="text-lg md:text-xl font-bold text-slate-500">
                           You guessed <span className="text-red-500 line-through decoration-2">{selectedLanguage}</span>
                       </p>
                       <p className="text-xl md:text-2xl font-black text-slate-800">
                           It was <span className="text-emerald-600 underline decoration-4 decoration-emerald-400 underline-offset-4">{correctLanguage}</span>
                       </p>
                   </div>
               </div>
           )}
      </div>

      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
          <div className={`absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse ${isCorrect ? 'bg-emerald-300' : 'bg-red-300'}`}></div>
          <div className={`absolute bottom-[-10%] right-[-10%] w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse ${isCorrect ? 'bg-green-300' : 'bg-orange-300'}`} style={{animationDelay: '1s'}}></div>
      </div>

      {/* Bottom Score Dashboard */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-6 flex justify-center w-full">
          <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-3xl p-4 md:p-6 w-full max-w-4xl flex flex-col md:flex-row items-center gap-6 animate-in slide-in-from-bottom-20 duration-500">
              
              {/* Stats Section */}
              <div className="flex-1 w-full">
                  <div className="flex items-end justify-between px-2">
                      <div className="flex flex-col items-center md:items-start">
                           <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Round Score</div>
                           <div className={`text-3xl md:text-4xl font-black leading-none flex items-center gap-1 ${roundScore > 0 ? 'text-emerald-500' : 'text-slate-300'}`}>
                              {roundScore > 0 ? '+' : ''}{roundScore}
                           </div>
                      </div>
                      
                      <div className="flex flex-col items-center md:items-end">
                           <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Score</div>
                           <div className="text-3xl md:text-4xl font-black text-slate-900 leading-none flex items-center gap-2">
                              {score} <Trophy className="w-6 h-6 text-yellow-500" fill="currentColor" />
                           </div>
                      </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden mt-3 border border-slate-200">
                      <div 
                        className={`h-full transition-all duration-1000 ${isCorrect ? 'bg-emerald-400' : 'bg-red-400'}`}
                        style={{ width: '100%' }} 
                      />
                  </div>
              </div>

              {/* Vertical Divider (Desktop) */}
              <div className="hidden md:block w-0.5 h-16 bg-slate-200 mx-2"></div>

              {/* Action Button */}
              <div className="shrink-0 w-full md:w-auto">
                   <Button 
                        onClick={handleNext} 
                        className="w-full md:w-auto text-lg px-8 py-6 h-auto whitespace-nowrap border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all bg-yellow-400 hover:bg-yellow-500 text-black font-black"
                   >
                      {isLastRound ? (
                        <span className="flex items-center">FINISH GAME <RefreshCcw className="w-6 h-6 ml-2" strokeWidth={3} /></span>
                      ) : (
                        <span className="flex items-center">NEXT ROUND <ArrowRight className="w-6 h-6 ml-2" strokeWidth={3} /></span>
                      )}
                   </Button>
              </div>
          </div>
      </div>
    </div>
  )
}