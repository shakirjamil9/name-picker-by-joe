import React from 'react';
import { Users, Sparkles, Gift, ChevronUp, ChevronDown, Dices } from 'lucide-react';

interface DrawFormProps {
  names: string;
  winnerCount: number;
  prizeName: string;
  onNamesChange: (val: string) => void;
  onCountChange: (val: number) => void;
  onPrizeChange: (val: string) => void;
  onStart: () => void;
}

export const DrawForm: React.FC<DrawFormProps> = ({
  names,
  winnerCount,
  prizeName,
  onNamesChange,
  onCountChange,
  onPrizeChange,
  onStart
}) => {
  const nameList = names.split('\n').filter(n => n.trim().length > 0);
  const isValid = nameList.length > 0 && winnerCount > 0 && winnerCount <= nameList.length;

  return (
    <div className="w-full max-w-2xl animate-reveal">
      <div className="glass-ios rounded-[40px] p-8 md:p-10 space-y-8 relative overflow-hidden">
        
        {/* Subtle Light Reflection */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/5 blur-3xl rounded-full"></div>

        {/* TreeBet Branding - Top Center */}
        <div className="flex flex-col items-center justify-center space-y-3 pb-2">
          <div className="bg-white/10 p-3 rounded-2xl border border-white/10 shadow-lg">
            <Dices className="w-8 h-8 text-brand-primary" />
          </div>
          <span className="text-2xl font-black tracking-tighter">
            TREE<span className="text-brand-primary">BET</span>
          </span>
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-brand-primary/40 to-transparent"></div>
        </div>

        {/* Prize Section */}
        <div className="space-y-3">
          <label className="text-[13px] font-semibold text-brand-muted uppercase tracking-[0.1em] ml-2">
            Prize Details
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-brand-muted group-focus-within:text-brand-primary transition-colors">
              <Gift size={18} />
            </div>
            <input 
              type="text"
              value={prizeName}
              onChange={(e) => onPrizeChange(e.target.value)}
              placeholder="What are they winning?"
              className="w-full input-platters text-white py-5 pl-14 pr-6 rounded-[22px] outline-none text-lg placeholder-white/20"
            />
          </div>
        </div>

        {/* Participants Section */}
        <div className="space-y-3">
          <div className="flex justify-between items-center ml-2">
            <label className="text-[13px] font-semibold text-brand-muted uppercase tracking-[0.1em]">
              Participants
            </label>
            <span className="text-[11px] font-medium px-2 py-0.5 bg-brand-primary/10 text-brand-primary rounded-full">
              {nameList.length} Total
            </span>
          </div>
          <div className="relative">
            <textarea
              className="w-full h-44 input-platters text-brand-text p-6 rounded-[28px] resize-none outline-none placeholder-white/20 text-base leading-relaxed"
              placeholder="Paste list here...&#10;One name per line"
              value={names}
              onChange={(e) => onNamesChange(e.target.value)}
            />
          </div>
        </div>

        {/* Settings Row */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-[1] input-platters rounded-[22px] p-4 flex flex-col justify-center">
            <label className="text-[11px] font-bold text-brand-muted uppercase tracking-wider mb-1 ml-1">
              Winners
            </label>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold ml-1">{winnerCount}</span>
              <div className="flex gap-1">
                <button 
                  onClick={() => onCountChange(Math.max(1, winnerCount - 1))}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 active:scale-90 transition-all"
                >
                  <ChevronDown size={16} />
                </button>
                <button 
                  onClick={() => onCountChange(winnerCount + 1)}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 active:scale-90 transition-all"
                >
                  <ChevronUp size={16} />
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={onStart}
            disabled={!isValid}
            className={`
              flex-[2] relative group/btn rounded-[24px] py-6 font-bold text-lg tracking-tight transition-all duration-500
              ${isValid 
                ? 'bg-brand-primary text-black shadow-[0_0_40px_-10px_rgba(0,220,130,0.4)] hover:shadow-[0_0_50px_-5px_rgba(0,220,130,0.6)] hover:scale-[1.02] active:scale-95' 
                : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'}
            `}
          >
            <div className="flex items-center justify-center gap-3">
              {isValid ? <Sparkles className="w-5 h-5 animate-pulse" /> : <Users className="w-5 h-5" />}
              <span>{isValid ? 'Start Local Draw' : 'Ready Participants'}</span>
            </div>
            
            {/* Shimmer Effect */}
            {isValid && (
              <div className="absolute inset-0 overflow-hidden rounded-[24px] pointer-events-none">
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:animate-shimmer-fast"></div>
              </div>
            )}
          </button>
        </div>

        {!isValid && nameList.length > 0 && winnerCount > nameList.length && (
          <p className="text-brand-primary text-[13px] font-medium text-center animate-pulse">
            Winner count exceeds participants list.
          </p>
        )}
      </div>
    </div>
  );
};