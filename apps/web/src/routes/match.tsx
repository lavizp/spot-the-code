import { Button } from "@/components/ui/button";
import { Expand, Loader } from "lucide-react";
import { useState } from "react";
export function Match() {
  const [isMapMain, setIsMapMain] = useState(true);
  const toggleView = () => setIsMapMain(!isMapMain);

  return (
    <div className="h-screen w-full relative bg-slate-100 overflow-hidden flex flex-col">
      
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 p-4 pointer-events-none flex justify-between">
         <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-4 py-2 rounded-xl font-black text-xl flex items-center gap-2 pointer-events-auto">
            <span className="text-emerald-500">Round</span> 2
         </div>
      </div>

      {/* Content Container */}
      <div className="flex-1 relative w-full h-full">
          
          {/* MAIN LAYER */}
          <div className="absolute inset-0 z-0">
             {isMapMain ? (
                /* Map is Main */
                <div className="w-full h-full relative">
                    {/* Guess Button Overlay on Map */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
                       <Button 
                          onClick={()=>{}} 
                          // disabled={!gameState.userGuess}
                          className={`transform transition-all duration-300 ${true ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                       >
                          Make Guess!
                       </Button>
                    </div>
                </div>
             ) : (
                /* Image is Main */
                <div className="w-full h-full bg-black flex items-center justify-center">
                  {false ? (
                      <div className="flex flex-col items-center">
                          <Loader className="w-12 h-12 text-white animate-spin mb-4" />
                          <div className="text-white font-bold text-lg animate-pulse">PAINTING THE WORLD...</div>
                      </div>
                  ) : (
                      <div className="text-red-400 font-bold">Error loading visual.</div>
                  )}
                </div>
             )}
          </div>

          {/* MINI LAYER (Swappable) */}
          <div 
            onClick={toggleView}
            className="absolute bottom-6 right-6 z-20 w-48 h-32 md:w-64 md:h-40 bg-white border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden cursor-pointer hover:scale-105 transition-transform group"
          >
             {/* Hover Overlay */}
             <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 z-30 flex items-center justify-center transition-opacity">
                <Expand className="text-white w-8 h-8 drop-shadow-md" />
             </div>

             {isMapMain ? (
                /* Mini Image */
                <div className="w-full h-full bg-slate-200">
                  {/*{gameState.generatedImage && <img src={gameState.generatedImage} className="w-full h-full object-cover" alt="Mini" />}*/}
                </div>
             ) : (
                /* Mini Map */
                <div className="w-full h-full pointer-events-none"> {/* Pointer events none so click passes to container toggle */}
                   {/*<WorldMap 
                      interactive={false} // Static in mini view
                      selectedLocation={gameState.userGuess}
                      className="bg-blue-200"
                   />*/}
                </div>
             )}
          </div>

          {/* Hint Text */}
          <div className="absolute bottom-8 right-64 md:right-80 mr-4 z-20 bg-white px-3 py-1 rounded-lg border-2 border-black font-bold text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hidden md:block animate-bounce">
             {isMapMain ? "Click to see image" : "Click to enlarge map"}
          </div>

      </div>
    </div>
  )
}