import React, { useState, useCallback } from 'react';
import { AppState } from './types';
import { DrawForm } from './components/DrawForm';
import { ShufflingDisplay } from './components/ShufflingDisplay';
import { WinnersList } from './components/WinnersList';

const App: React.FC = () => {
  const [rawNames, setRawNames] = useState<string>('');
  const [winnerCount, setWinnerCount] = useState<number>(1);
  const [prizeName, setPrizeName] = useState<string>('');
  const [resultPrize, setResultPrize] = useState<string>('');
  const [winners, setWinners] = useState<string[]>([]);
  const [appState, setAppState] = useState<AppState>(AppState.INPUT);
  const [animationCandidates, setAnimationCandidates] = useState<string[]>([]);

  const handleStartDraw = useCallback(() => {
    const validNames = rawNames.split('\n').map(n => n.trim()).filter(n => n.length > 0);
    if (validNames.length === 0 || winnerCount > validNames.length) return;

    setAnimationCandidates(validNames);
    setResultPrize(prizeName);
    setAppState(AppState.SHUFFLING);

    const shuffled = [...validNames];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const selectedWinners = shuffled.slice(0, winnerCount);

    setTimeout(() => {
      setWinners(selectedWinners);
      setAppState(AppState.RESULT);
      setRawNames('');
      setWinnerCount(1);
      setPrizeName('');
    }, 3500); 
  }, [rawNames, winnerCount, prizeName]);

  const handleReset = () => {
    setWinners([]);
    setResultPrize('');
    setAppState(AppState.INPUT);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-primary selection:text-black">
      
      {/* iOS Style Nav - Simplified */}
      <header className="px-6 py-4 flex justify-end items-center bg-transparent backdrop-blur-sm sticky top-0 z-50">
        <div className="text-[10px] font-bold text-brand-muted uppercase tracking-[0.3em] bg-white/5 px-4 py-2 rounded-full border border-white/5">
          V2.0 Liquid Glass
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow flex flex-col items-center justify-center p-6 sm:p-12 relative">
        
        {appState === AppState.INPUT && (
          <div className="w-full flex flex-col items-center">
             <div className="text-center mb-10 max-w-lg">
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 font-arabic leading-tight">
                  ديما لعب، ديما تحدّي، ديما جوائز
                </h2>
                <p className="text-brand-muted font-medium text-sm sm:text-base leading-relaxed opacity-80">
                  Join the most transparent draw system in the region. Instant results, zero lag, high-fidelity experience.
                </p>
             </div>
             <DrawForm 
                names={rawNames}
                winnerCount={winnerCount}
                prizeName={prizeName}
                onNamesChange={setRawNames}
                onCountChange={setWinnerCount}
                onPrizeChange={setPrizeName}
                onStart={handleStartDraw}
             />
          </div>
        )}

        {appState === AppState.SHUFFLING && (
          <ShufflingDisplay candidates={animationCandidates} />
        )}

        {appState === AppState.RESULT && (
          <WinnersList 
            winners={winners} 
            prizeName={resultPrize}
            onReset={handleReset} 
          />
        )}

      </main>

      {/* Footer */}
      <footer className="p-8 text-center">
        <p className="text-[11px] font-bold text-brand-muted/40 uppercase tracking-[0.4em]">
          Powered by TreeBet Core &bull; Local RNG
        </p>
      </footer>
    </div>
  );
};

export default App;