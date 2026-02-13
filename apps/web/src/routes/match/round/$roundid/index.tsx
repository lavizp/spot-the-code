import SelectPannel from '@/components/match/selectPannel';
import { useGameStore } from '@/store';
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
    isPlaying,
  } = useGameStore();

  useEffect(() => {
    if (!isPlaying) {
      navigate({ to: '/' });
    }
  }, [isPlaying, navigate]);

  if (!currentCodeSnippet) return null;

  return (
    <div className="h-screen w-full relative bg-slate-100 overflow-hidden flex flex-col font-sans">
      <div className="absolute top-0 left-0 right-0 z-30 p-4 pointer-events-none flex justify-between">
        <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-4 py-2 rounded-xl font-black text-xl flex items-center gap-2 pointer-events-auto text-black">
          <span className="text-emerald-500">Round</span> {currentRound}
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row h-full pt-20 pb-4 px-4 gap-4 overflow-hidden">
        
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
        <SelectPannel/>
      </div>
    </div>
  );
}