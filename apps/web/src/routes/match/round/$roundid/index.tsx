import { Button } from '@/components/ui/button';
import { useGameStore } from '@/store';
import { gameActions } from '@/store/actions/gameActions';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Expand } from 'lucide-react';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/match/round/$roundid/')({
  component: Match,
})

export function Match() {
  const [isMapMain, setIsMapMain] = useState(true);
  const toggleView = () => setIsMapMain(!isMapMain);
  
  const navigate = useNavigate();
  const { 
    currentRound, 
    imageUrl, 
    selected, 
    select, 
    isPlaying 
  } = useGameStore();

  const handleGuess = () => {
    if (selected) {
      gameActions.submitGuess(selected);
      navigate({ to: '/result' });
    }
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
     const mockLat = 48.8566 + (Math.random() - 0.5) * 10;
     const mockLng = 2.3522 + (Math.random() - 0.5) * 10;
     select([mockLat, mockLng]);
  };

  useEffect(() => {
     if (!isPlaying) {
         navigate({ to: '/' });
     }
  }, [isPlaying, navigate]);


  return (
     <div className="h-screen w-full relative bg-slate-100 overflow-hidden flex flex-col">
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 z-30 p-4 pointer-events-none flex justify-between">
           <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-4 py-2 rounded-xl font-black text-xl flex items-center gap-2 pointer-events-auto">
              <span className="text-emerald-500">Round</span> {currentRound}
           </div>
        </div>
        {/* Content Container */}
        <div className="flex-1 relative w-full h-full">
            
            {/* MAIN LAYER */}
            <div className="absolute inset-0 z-0">
               {isMapMain ? (
                  /* Map is Main */
                  (<div className="w-full h-full relative bg-blue-100 cursor-crosshair" onClick={handleMapClick}>
                     <div className="absolute inset-0 flex items-center justify-center text-slate-400 pointer-events-none">
                         <span className="bg-white/50 p-2 rounded">Map Placeholder - Click anywhere to pin location</span>
                     </div>
                     {selected && (
                         <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-red-500 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                     )}
                     {/* Guess Button Overlay on Map */}
                     <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20" onClick={(e) => e.stopPropagation()}>
                        <Button 
                           onClick={handleGuess} 
                           disabled={!selected}
                           className={`transform transition-all duration-300 ${selected ? `translate-y-0 opacity-100` : `translate-y-20 opacity-0`}`}
                        >
                           Make Guess!
                        </Button>
                     </div>
                  </div>)
               ) : (
                  /* Image is Main */
                  (<div className="w-full h-full bg-black flex items-center justify-center">
                     {imageUrl ? (
                         <img src={imageUrl} className="w-full h-full object-cover" alt="Location" />
                     ) : (
                         <div className="text-red-400 font-bold">Error loading visual.</div>
                     )}
                  </div>)
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
                  (<div className="w-full h-full bg-slate-200">
                     {imageUrl && <img src={imageUrl} className="w-full h-full object-cover" alt="Mini" />}
                  </div>)
               ) : (
                  /* Mini Map */
                  (<div className="w-full h-full pointer-events-none bg-blue-100 flex items-center justify-center">
                     <span className="text-xs text-slate-500">Map</span>
                  </div>)
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
