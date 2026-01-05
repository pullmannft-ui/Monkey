
import React from 'react';

interface WelcomeStepProps {
  onNext: () => void;
  onOpenAbout: () => void;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext, onOpenAbout }) => {
  return (
    <div className="w-full h-full flex flex-col items-center bg-[#0a0a0a] relative overflow-y-auto overflow-x-hidden scroll-smooth custom-scrollbar">
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-[radial-gradient(#39ff14_1px,transparent_1px)] bg-[length:20px_20px] opacity-10 pointer-events-none"></div>
      <div className="fixed inset-0 bg-[linear-gradient(rgba(57,255,20,0.05)_1px,transparent_1px)] bg-[length:100%_20px] pointer-events-none"></div>

      {/* Padding container to allow scrolling space */}
      <div className="w-full flex flex-col items-center p-4 min-h-full">
        
        {/* Header */}
        <div className="relative z-20 text-center w-full mb-4 mt-2">
          <div className="inline-block bg-black border-2 border-[#39ff14] px-4 py-1 rotate-[-1deg] shadow-[4px_4px_0px_#000]">
            <h1 className="meme-font text-2xl sm:text-4xl text-[#39ff14] !-webkit-text-stroke-0 italic tracking-tighter">
              JUNGLE PROTOCOL
            </h1>
          </div>
          <div className="text-[8px] font-black text-[#ff00ff] uppercase tracking-[0.4em] mt-1 animate-pulse">
            // CONNECTION_STABLE_v9.9
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow flex flex-col items-center justify-center gap-3 w-full relative z-10 overflow-visible mb-6">
          
          {/* CENTERPIECE GIF */}
          <div className="relative group transition-all duration-300">
            <div className="absolute -inset-4 bg-[#ff00ff] blur-2xl opacity-20 animate-pulse"></div>
            <div className="relative w-40 h-40 xs:w-48 xs:h-48 sm:w-60 sm:h-60 border-[6px] border-white shadow-[10px_10px_0px_#000] overflow-hidden bg-black flex items-center justify-center rotate-[2deg]">
              <div className="absolute inset-0 border-[10px] border-[#ff00ff] pointer-events-none z-10 opacity-80"></div>
              <img 
                src="https://i.imgur.com/pWWhFMw.gif" 
                className="w-full h-full object-cover scale-110" 
                alt="The Ritual GIF" 
              />
              <div className="absolute top-2 left-2 bg-yellow-400 text-black font-black text-[8px] px-1.5 py-0.5 border border-black z-20 rotate-[-15deg] shadow-sm">
                LIVE_FEED
              </div>
            </div>
          </div>

          {/* Catchphrase */}
          <div className="relative text-center mt-2">
            <h2 className="meme-font text-4xl sm:text-6xl text-white italic !-webkit-text-stroke-[2px] !-webkit-text-stroke-black drop-shadow-[4px_4px_0px_#000]">
              RAID HARD
            </h2>
          </div>

          {/* Quick Links Box */}
          <div className="flex flex-col gap-2 w-full max-w-[260px] mt-2">
            <div className="win95-inset-panel !bg-[#ffffcc] border-2 border-black p-3 shadow-[4px_4px_0px_rgba(0,0,0,0.5)] text-center transform rotate-[-1deg]">
              <p className="text-black text-[10px] font-black uppercase italic leading-tight">
                "PROVE YOUR SPIRIT ON THE TIMELINE. COLLECT REWARDS. BECOME ETERNAL."
              </p>
            </div>
            
            <button 
              onClick={onOpenAbout}
              className="win95-btn !bg-black !text-[#39ff14] border-2 border-white !text-[9px] font-black italic shadow-[4px_4px_0px_#000] active:shadow-none hover:!bg-[#111]"
            >
              [ WHAT_IS_MONKY? ]
            </button>
          </div>
        </div>

        {/* INDICATOR FOR ACTION BELOW */}
        <div className="relative z-30 w-full pb-2 flex flex-col items-center gap-2 mt-auto">
          <div className="flex flex-col items-center gap-1">
              <div className="text-[9px] font-black text-[#39ff14] animate-bounce">↓↓ USE THE TERMINAL BELOW ↓↓</div>
              <div className="text-[7px] font-bold text-white/40 uppercase tracking-widest">Initialization button is located in the status bar</div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #000;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #39ff14;
          border: 2px solid #000;
        }
      `}</style>
    </div>
  );
};
