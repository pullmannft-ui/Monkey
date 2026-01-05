
import React from 'react';

interface AboutWindowProps {
  onClose: () => void;
}

export const AboutWindow: React.FC<AboutWindowProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[3000] p-4 bg-black/60 backdrop-blur-sm">
      <div className="win95-window w-full max-w-2xl max-h-[85vh] flex flex-col shadow-[20px_20px_0px_#000] border-4 border-black animate-slide-up">
        {/* Title Bar */}
        <div className="win95-title-bar !bg-[#000080] flex justify-between items-center px-2">
          <div className="flex items-center gap-2">
            <img src="https://em-content.zobj.net/source/apple/391/information_2139-fe0f.png" className="w-4 h-4" alt="info" />
            <span className="text-[10px] uppercase font-bold tracking-tight">ABOUT_MONKY_PROTOCOL.DOC</span>
          </div>
          <button onClick={onClose} className="win95-btn !p-0 w-6 h-6 !bg-[#c0c0c0] font-bold">X</button>
        </div>

        {/* Content Area */}
        <div className="win95-content !bg-white overflow-y-auto p-4 sm:p-6 custom-scrollbar">
          <div className="flex flex-col gap-6">
            
            {/* Header Section */}
            <div className="border-b-4 border-double border-black pb-4 text-center">
              <h1 className="text-3xl font-black italic tracking-tighter text-black uppercase">THE MONKY MANIFESTO</h1>
              <p className="text-[10px] font-mono font-bold text-gray-500 mt-1 uppercase tracking-widest">// DECODING_THE_JUNGLE_ECONOMY</p>
            </div>

            {/* Section 1: Identity */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-6 bg-[#ff00ff]"></div>
                <h2 className="text-lg font-black uppercase italic">PHASE 01: IDENTITY</h2>
              </div>
              <div className="win95-inset-panel !bg-gray-100 p-3">
                <p className="text-sm font-bold leading-tight">
                  <span className="text-[#ff00ff]">Monky Maker</span> is a <span className="underline">1,999 supply generative PFP collection</span> inspired by internet culture and digital tribes. 
                  Designed with a <span className="bg-yellow-300 px-1">Clean Neochibi Monkey style</span> for degens who appreciate minimalist yet character-driven aesthetics.
                </p>
              </div>
            </div>

            {/* Visual Flow Diagram */}
            <div className="flex flex-col items-center py-4 gap-2">
              <div className="flex flex-col items-center justify-center w-full max-w-sm gap-4">
                <div className="w-full bg-black text-[#39ff14] p-3 text-center border-2 border-black font-black uppercase text-xs shadow-[4px_4px_0px_#ff00ff]">
                  Monky Maker (Identity)
                </div>
                <div className="animate-bounce">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3">
                    <path d="M12 5v14M19 12l-7 7-7-7" />
                  </svg>
                </div>
                <div className="w-full bg-[#39ff14] text-black p-3 text-center border-2 border-black font-black uppercase text-xs shadow-[4px_4px_0px_#000]">
                  monky.fun (Launchpad & Distribution)
                </div>
              </div>
            </div>

            {/* Section 2: Economy */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-6 bg-[#39ff14]"></div>
                <h2 className="text-lg font-black uppercase italic">PHASE 02: THE UTILITY</h2>
              </div>
              <div className="win95-inset-panel !bg-black text-[#39ff14] p-4 font-mono text-xs space-y-3">
                <p>After the mint, we're building <span className="text-white underline font-black">monky.fun</span>, the ultimate ecosystem hub.</p>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <span className="text-white">●</span>
                    <span><span className="text-white font-bold">Meme Token Launchpad:</span> A dedicated platform for the next generation of meme tokens.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-white">●</span>
                    <span><span className="text-white font-bold">Priority Allocation:</span> Monky holders get early access and priority slots for every launch.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-white">●</span>
                    <span><span className="text-white font-bold">Digital Tribes:</span> Your Monky identity grants you access to exclusive distribution channels.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Footer Summary */}
            <div className="bg-[#ffffcc] border-2 border-black p-4 rotate-[-1deg] shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
              <p className="text-[11px] font-black uppercase italic text-center">
                "Monky Maker is not just a profile picture. It's your identity in the future of decentralized meme economies."
              </p>
            </div>

            <button 
              onClick={onClose}
              className="win95-btn w-full !bg-[#c0c0c0] font-black uppercase py-3 border-2 border-black shadow-[4px_4px_0px_#000] active:shadow-none hover:bg-gray-100"
            >
              UNDERSTOOD. RETURN TO TERMINAL.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
