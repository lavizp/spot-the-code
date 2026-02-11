import { Button } from '@/components/ui/button';
import { useGameStore } from '@/store';
import { gameActions } from '@/store/actions/gameActions';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';

export const Route = createFileRoute('/match/round/$roundid/')({
  component: Match,
});

export function Match() {
  const navigate = useNavigate();
  const {
    currentRound,
    currentCodeSnippet,
    correctLanguage,
    selectedLanguage,
    languageOptions,
    select,
    isPlaying,
  } = useGameStore();

  const handleGuess = () => {
    if (selectedLanguage) {
      gameActions.submitGuess(selectedLanguage);
      navigate({ to: '/result' });
    }
  };

  useEffect(() => {
    if (!isPlaying) {
      navigate({ to: '/' });
    }
  }, [isPlaying, navigate]);

  if (!currentCodeSnippet) return null;

  return (
    <div className="h-screen w-full relative bg-slate-100 overflow-hidden flex flex-col font-sans">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 p-4 pointer-events-none flex justify-between">
        <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-4 py-2 rounded-xl font-black text-xl flex items-center gap-2 pointer-events-auto">
          <span className="text-emerald-500">Round</span> {currentRound}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row h-full pt-20 pb-4 px-4 gap-4 overflow-hidden">
        
        {/* Code View (Main) */}
        <div className="flex-1 relative bg-[#1e1e1e] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl overflow-hidden flex flex-col min-h-0">
            <div className="bg-[#2d2d2d] px-4 py-2 flex gap-2 border-b border-black shrink-0">
                <div className="w-3 h-3 rounded-full bg-red-500"/>
                <div className="w-3 h-3 rounded-full bg-yellow-500"/>
                <div className="w-3 h-3 rounded-full bg-green-500"/>
                <span className="ml-2 text-xs text-gray-400 font-mono">snippet.code</span>
            </div>
            <div className="flex-1 overflow-auto custom-scrollbar">
                <SyntaxHighlighter
                    language={correctLanguage || 'text'}
                    style={vscDarkPlus}
                    customStyle={{ margin: 0, padding: '1.5rem', minHeight: '100%', fontSize: '1rem', lineHeight: '1.5' }}
                    showLineNumbers={true}
                    wrapLines={true}
                >
                    {currentCodeSnippet}
                </SyntaxHighlighter>
            </div>
        </div>

        {/* Options Panel */}
        <div className="h-auto md:h-full md:w-80 flex-shrink-0 flex flex-col gap-4 min-h-0">
             <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-4 flex-1 flex flex-col gap-3 min-h-0">
                <h2 className="text-xl font-black text-center mb-2 uppercase tracking-wide shrink-0">Select Language</h2>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-2 overflow-y-auto pr-2 custom-scrollbar">
                    {languageOptions.map((lang) => (
                        <button
                            key={lang}
                            onClick={() => select(lang)}
                            className={`
                                py-3 px-4 rounded-xl border-2 font-bold text-sm transition-all transform duration-100 outline-none focus:ring-2 ring-emerald-400 ring-offset-2
                                ${selectedLanguage === lang 
                                    ? 'bg-emerald-400 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-1 translate-y-1' 
                                    : 'bg-white border-slate-300 hover:border-black hover:bg-slate-50 text-slate-600'
                                }
                            `}
                        >
                            {lang.charAt(0).toUpperCase() + lang.slice(1)}
                        </button>
                    ))}
                </div>
             </div>

             <Button 
                onClick={handleGuess} 
                disabled={!selectedLanguage}
                className={`
                    w-full py-6 text-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                    transition-all duration-300 shrink-0
                    ${selectedLanguage 
                        ? 'bg-yellow-400 hover:bg-yellow-500 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none border-slate-400'
                    }
                `}
            >
                GUESS
            </Button>
        </div>

      </div>
    </div>
  );
}