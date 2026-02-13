import { useGameStore } from "@/store";
import { gameActions } from "@/store/actions/gameActions";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";


export default function SelectPannel() {
  const { languageOptions, select, selectedLanguage } = useGameStore()
  const navigate = useNavigate()
  const [value, setValue]= useState("")
  const handleGuess = () => {
    if (selectedLanguage) {
      gameActions.submitGuess(selectedLanguage);
      navigate({ to: '/result' });
    }
  };
  return (
    <div className="h-auto md:h-full md:w-80 shrink-0 flex flex-col gap-4 min-h-0">
         <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-4 flex-1 flex flex-col gap-3 min-h-0">
            <h2 className="text-xl font-black text-center mb-2 uppercase tracking-wide shrink-0 text-black">
              Select Language</h2>
            <Input placeholder="asda" className="border-2 border-black px-2 py-2 rounded-sm text-black" value={value} onChange={e=>setValue(e.target.value)}/>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2 overflow-y-auto pr-2 custom-scrollbar">
          {languageOptions
            .filter((lang)=>lang.includes(value))
            .map((lang) => (
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
                transition-all duration-300 shrink-0 cursor-pointer
                ${selectedLanguage 
                    ? 'bg-yellow-400 hover:bg-yellow-500 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none border-slate-400'
                }
            `}
        >
            GUESS
        </Button>
    </div>
 ) 
}