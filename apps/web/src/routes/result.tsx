import { Button } from '@/components/ui/button'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowRight, Trophy, RefreshCcw, CheckCircle, XCircle, Medal } from 'lucide-react'
import { useGameStore } from "@/store"
import { gameActions } from "@/store/actions/gameActions"
import { useEffect } from 'react'
import { socketService } from '@/lib/socket'

export const Route = createFileRoute('/result')({
  component: ResultComponent,
})

function ResultComponent() {
  const navigate = useNavigate();
  const { 
    roundScore, 
    score, 
    isGameOver, 
    currentRound, 
    totalRounds, 
    isPlaying,
    selectedLanguage,
    correctLanguage,
    gameId,
    finalScores
  } = useGameStore();

  const isLastRound = currentRound >= totalRounds;
  const isCorrect = selectedLanguage === correctLanguage;

  const handleFinish = () => {
    useGameStore.getState().endGame();
    navigate({ to: '/' });
  }

  const handleNext = () => {
    if (gameId) return; // Prevent manual next in multiplayer
    
    if (isLastRound) {
       handleFinish();
    } else {
       gameActions.nextRound();
       navigate({ 
           to: '/match/round/$roundid',
           params: { roundid: (currentRound + 1).toString() }
       });
    }
  }

  useEffect(() => {
    if (!isPlaying && !isGameOver) {
        navigate({ to: '/' });
    }
  }, [isPlaying, isGameOver, navigate]);

  // LEADERBOARD VIEW (Multiplayer Game Over)
  if (isGameOver && gameId) {
    const sortedScores = [...(finalScores || [])].sort((a, b) => b.points - a.points);
    
    return (
      <div className="h-screen w-full relative flex flex-col font-sans overflow-hidden items-center justify-center bg-indigo-50 p-4">
        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full bg-indigo-400 mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 rounded-full bg-purple-400 mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative z-10 w-full max-w-2xl bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-3xl p-8 animate-in zoom-in duration-300">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Trophy className="w-12 h-12 text-yellow-500 animate-bounce" fill="currentColor" />
            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-slate-900">Final Standings</h1>
          </div>

          <div className="space-y-3 mb-8 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
            {sortedScores.length > 0 ? (
              sortedScores.map((player, index) => (
                <div 
                  key={player.id} 
                  className={`flex items-center justify-between p-4 border-2 border-black rounded-2xl transition-all ${
                    player.id === socketService.socket?.id 
                      ? 'bg-yellow-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-1' 
                      : 'bg-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full border-2 border-black flex items-center justify-center font-black ${
                      index === 0 ? 'bg-yellow-300' : index === 1 ? 'bg-slate-300' : index === 2 ? 'bg-orange-300' : 'bg-slate-100'
                    }`}>
                      {index === 0 ? <Medal className="w-5 h-5 text-slate-900" /> : <span className="text-slate-900">{index + 1}</span>}
                    </div>
                    <div>
                      <div className="font-black text-lg uppercase flex items-center gap-2 text-slate-900">
                        {player.name}
                        {player.id === socketService.socket?.id && <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-full">YOU</span>}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-2xl text-slate-900">{player.points}</div>
                    <div className="text-[10px] font-bold uppercase text-slate-600">Points</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-500 font-bold uppercase tracking-widest">
                No scores recorded
              </div>
            )}
          </div>

          <Button 
            onClick={handleFinish}
            className="w-full text-xl px-8 py-8 h-auto border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all bg-emerald-400 hover:bg-emerald-500 text-black font-black"
          >
            RETURN TO LOBBY <RefreshCcw className="w-6 h-6 ml-2" strokeWidth={3} />
          </Button>
        </div>
      </div>
    );
  }

  // ROUND RESULT VIEW (Correct/Wrong)
  return (
    <div className={`h-screen w-full relative flex flex-col font-sans overflow-hidden items-center justify-center transition-colors duration-500 ${isCorrect ? 'bg-emerald-50' : 'bg-red-50'}`}>
      
      {/* Result Visual */}
      <div className="flex flex-col items-center z-10 animate-in zoom-in duration-500 p-4 text-center">
           {isCorrect ? (
               <div className="flex flex-col items-center">
                   <CheckCircle className="w-24 h-24 md:w-32 md:h-32 text-emerald-600 mb-6 drop-shadow-[4px_4px_0px_rgba(0,0,0,0.1)]" />
                   <h1 className="text-6xl md:text-8xl font-black text-emerald-600 uppercase tracking-tighter mb-6">Correct!</h1>
                   <div className="bg-white border-4 border-emerald-600 px-8 py-4 rounded-2xl shadow-[6px_6px_0px_0px_rgba(5,150,105,1)]">
                        <p className="text-2xl md:text-3xl font-bold text-slate-900">
                            It was <span className="text-emerald-600 underline decoration-emerald-200 underline-offset-8">{correctLanguage}</span>
                        </p>
                   </div>
               </div>
           ) : (
               <div className="flex flex-col items-center">
                   <XCircle className="w-24 h-24 md:w-32 md:h-32 text-red-600 mb-6 drop-shadow-[4px_4px_0px_rgba(0,0,0,0.1)]" />
                   <h1 className="text-6xl md:text-8xl font-black text-red-600 uppercase tracking-tighter mb-6">Wrong!</h1>
                   <div className="bg-white border-4 border-red-600 px-8 py-6 rounded-2xl shadow-[6px_6px_0px_0px_rgba(220,38,38,1)] flex flex-col gap-3">
                       <p className="text-xl md:text-2xl font-bold text-slate-500">
                           You guessed <span className="text-red-600 line-through decoration-red-400 decoration-2">{selectedLanguage || 'Nothing'}</span>
                       </p>
                       <p className="text-2xl md:text-4xl font-black text-slate-900">
                           It was <span className="text-emerald-600 underline decoration-4 decoration-emerald-300 underline-offset-4">{correctLanguage}</span>
                       </p>
                   </div>
               </div>
           )}
      </div>

      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden">
          <div className={`absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse ${isCorrect ? 'bg-emerald-300' : 'bg-red-300'}`}></div>
          <div className={`absolute bottom-[-10%] right-[-10%] w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse ${isCorrect ? 'bg-green-300' : 'bg-orange-300'}`} style={{animationDelay: '1s'}}></div>
      </div>

      {/* Bottom Score Dashboard */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-8 flex justify-center w-full">
          <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-3xl p-6 md:p-8 w-full max-w-4xl flex flex-col md:flex-row items-center gap-8 animate-in slide-in-from-bottom-20 duration-500">
              
              <div className="flex-1 w-full">
                  <div className="flex items-end justify-between px-2 mb-2">
                      <div className="flex flex-col items-start">
                           <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Round Score</div>
                           <div className={`text-4xl font-black leading-none ${roundScore > 0 ? 'text-emerald-600' : 'text-slate-400'}`}>
                              {roundScore > 0 ? `+${roundScore}` : '0'}
                           </div>
                      </div>
                      
                      <div className="flex flex-col items-end">
                           <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Total Score</div>
                           <div className="text-4xl font-black text-slate-900 leading-none flex items-center gap-2">
                              {score} <Trophy className="w-8 h-8 text-yellow-500" fill="currentColor" />
                           </div>
                      </div>
                  </div>
                  
                  <div className="w-full h-5 bg-slate-100 rounded-full overflow-hidden border-2 border-black">
                      <div 
                        className={`h-full transition-all duration-1000 ${isCorrect ? 'bg-emerald-500' : 'bg-red-500'}`}
                        style={{ width: `${(currentRound / totalRounds) * 100}%` }} 
                      />
                  </div>
              </div>

              <div className="shrink-0 w-full md:w-auto">
                   {gameId ? (
                     <div className="bg-slate-900 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] rounded-2xl px-10 py-5 text-white font-black uppercase tracking-widest text-sm flex items-center gap-3">
                       <RefreshCcw className="w-5 h-5 animate-spin text-emerald-400" />
                       <span className="text-white">Waiting for {isLastRound ? 'Final Scores' : 'Next Round'}...</span>
                     </div>
                   ) : (
                     <Button 
                          onClick={handleNext} 
                          className="w-full md:w-auto text-xl px-10 py-6 h-auto whitespace-nowrap border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-black"
                     >
                        {isLastRound ? (
                          <span className="flex items-center uppercase">Finish Game <RefreshCcw className="w-6 h-6 ml-2" strokeWidth={3} /></span>
                        ) : (
                          <span className="flex items-center uppercase">Next Round <ArrowRight className="w-6 h-6 ml-2" strokeWidth={3} /></span>
                        )}
                     </Button>
                   )}
              </div>
          </div>
      </div>
    </div>
  )
}