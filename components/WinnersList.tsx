import React, { useEffect } from 'react';
import { Trophy, RefreshCcw, Star, Download, Gift } from 'lucide-react';

declare global {
  interface Window {
    confetti: any;
  }
}

interface WinnersListProps {
  winners: string[];
  prizeName?: string;
  onReset: () => void;
}

export const WinnersList: React.FC<WinnersListProps> = ({ winners, prizeName, onReset }) => {
  
  useEffect(() => {
    if (window.confetti) {
      const duration = 2 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };
      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        const particleCount = 40 * (timeLeft / duration);
        window.confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 }, colors: ['#00DC82', '#ffffff'] }));
        window.confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 }, colors: ['#00DC82', '#ffffff'] }));
      }, 250);

      return () => clearInterval(interval);
    }
  }, []);

  const handleDownload = () => {
    const BOM = "\uFEFF";
    const header = "Winner Name";
    const rows = winners.map(name => {
      const escaped = name.replace(/"/g, '""');
      return (escaped.includes(',') || escaped.includes('\n') || escaped.includes('"')) ? `"${escaped}"` : escaped;
    });
    const csvContent = BOM + [header, ...rows].join("\r\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `treebet-winners.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-2xl animate-reveal flex flex-col items-center">
      
      {/* Dynamic Header */}
      <div className="text-center mb-12 relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-brand-primary/20 blur-[60px] rounded-full animate-pulse-slow"></div>
        <div className="inline-flex items-center justify-center w-24 h-24 bg-brand-primary text-black rounded-[28px] shadow-[0_20px_40px_rgba(0,220,130,0.3)] mb-8 transform hover:scale-105 transition-transform">
          <Trophy className="w-12 h-12" />
        </div>
        
        {prizeName && (
           <div className="flex items-center justify-center gap-2 mb-4 animate-reveal" style={{ animationDelay: '100ms' }}>
             <Gift className="w-5 h-5 text-brand-primary" />
             <h3 className="text-2xl font-bold text-white">
               {prizeName}
             </h3>
           </div>
        )}

        <h2 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">Draw Complete</h2>
        <p className="text-brand-muted font-arabic text-lg">حظ أوفر للبقية، مبروك للفائزين</p>
      </div>

      {/* Slabs Grid */}
      <div className="w-full space-y-4 mb-12">
        {winners.map((winner, index) => (
          <div 
            key={index}
            className="group relative glass-ios rounded-[28px] p-6 flex items-center justify-between transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-brand-primary font-black text-sm">
                {index + 1}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-brand-muted uppercase tracking-[0.2em] font-bold">Confirmed Winner</span>
                <span className="text-2xl font-bold text-white tracking-tight">
                  {winner}
                </span>
              </div>
            </div>
            <Star className="w-6 h-6 text-brand-primary animate-pulse opacity-60" />
          </div>
        ))}
      </div>

      {/* Action Platters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <button
          onClick={handleDownload}
          className="flex items-center justify-center gap-2 px-8 py-5 glass-ios rounded-[22px] text-white font-bold hover:bg-white/10 transition-all active:scale-95"
        >
          <Download size={18} />
          <span>Export Records</span>
        </button>

        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 px-8 py-5 bg-white text-black rounded-[22px] font-bold hover:bg-zinc-200 transition-all active:scale-95 shadow-xl shadow-white/5"
        >
          <RefreshCcw size={18} />
          <span>New Session</span>
        </button>
      </div>
    </div>
  );
};