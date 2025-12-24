import React, { useMemo } from 'react';
import { Loader2 } from 'lucide-react';

interface ShufflingDisplayProps {
  candidates: string[];
}

export const ShufflingDisplay: React.FC<ShufflingDisplayProps> = ({ candidates }) => {
  const displayList = useMemo(() => {
    const items = [...candidates];
    while (items.length < 40) {
      items.push(...candidates);
    }
    return items.sort(() => Math.random() - 0.5).slice(0, 40);
  }, [candidates]);

  return (
    <div className="w-full max-w-xl flex flex-col items-center justify-center animate-reveal">
      <div className="glass-ios w-full rounded-[48px] p-12 flex flex-col items-center gap-10 shadow-2xl">
        
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-2">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">Randomizing Results</h3>
          <p className="text-brand-muted text-sm font-medium uppercase tracking-[0.2em]">Locally Computed</p>
        </div>

        {/* Elegant Scroll View */}
        <div className="relative w-full h-32 bg-white/5 rounded-[32px] overflow-hidden border border-white/10">
          {/* Edge Fades */}
          <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#1c1c1e] to-transparent z-10"></div>
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#1c1c1e] to-transparent z-10"></div>
          
          <div className="absolute top-1/2 left-0 w-full h-[0.5px] bg-brand-primary/40 z-20"></div>

          <div className="flex flex-col items-center gap-2 py-8 animate-[scrollVertical_1.2s_linear_infinite]">
            {displayList.map((name, idx) => (
              <div 
                key={idx} 
                className="text-2xl font-bold text-white/40 whitespace-nowrap blur-[1px]"
              >
                {name}
              </div>
            ))}
            {displayList.map((name, idx) => (
              <div 
                key={`dup-${idx}`} 
                className="text-2xl font-bold text-white/40 whitespace-nowrap blur-[1px]"
              >
                {name}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse"></span>
          <span className="text-[11px] font-bold text-brand-muted uppercase tracking-wider">
            Processing {candidates.length} Entities
          </span>
        </div>
      </div>
    </div>
  );
};