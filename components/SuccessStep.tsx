
import React, { useState, useEffect, useRef } from 'react';

interface SuccessStepProps {
  username: string;
}

declare const confetti: any;

const MEME_TITLES = [
  'DIAMOND_HANDS', 'ULTIMATE_APE', 'BANANA_KING', 'JUNGLE_LEGEND', 
  'WAGMI_PROPHET', 'DEGEN_SUPREME', 'HODL_GOD', 'ALPHA_MONKY',
  'MOON_MISSIONARY', 'MEME_LORD', 'SHITPOST_CHAMP', 'LASER_EYES',
  'PUMP_MASTER', 'EXIT_LIQUIDITY', 'GENESIS_APE', 'RUG_SURVIVOR'
];

const RARITIES = ['COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'LEGENDARY', 'GLITCH', 'DIVINE', 'ASCENDED'];
const RARITY_COLORS = [
  'bg-gray-500', 'bg-blue-600', 'bg-purple-700', 'bg-pink-600', 
  'bg-yellow-500 text-black', 'bg-cyan-400 text-black animate-pulse', 
  'bg-white text-black font-black shadow-[0_0_10px_#fff]', 
  'bg-black text-[#39ff14] border-2 border-[#39ff14] animate-bounce'
];

const MONKY_ASSETS = [
  "https://imgur.com/nGry9se.jpg",
  "https://imgur.com/OoStzMr.jpg",
  "https://imgur.com/2kIKjMk.jpg",
  "https://imgur.com/DL39sdz.jpg",
  "https://imgur.com/dgpKeeF.jpg",
  "https://imgur.com/HAkJxXB.jpg",
  "https://imgur.com/GWpjkle.jpg",
  "https://imgur.com/KIejwb8.jpg",
  "https://imgur.com/octcIDs.jpg",
  "https://imgur.com/W4W0V9l.jpg",
  "https://imgur.com/qBvoREL.jpg",
  "https://imgur.com/45t06tL.jpg",
  "https://imgur.com/qhfRRkY.jpg",
  "https://imgur.com/9Tvop56.jpg",
  "https://imgur.com/BRRHm9m.jpg",
  "https://imgur.com/TX6Oz7a.jpg",
  "https://imgur.com/XCzuN7k.jpg",
  "https://imgur.com/OLCOvQV.jpg",
  "https://imgur.com/bAWkB1I.jpg",
  "https://imgur.com/IwXUlMt.jpg",
  "https://imgur.com/ETB6zwr.jpg",
  "https://imgur.com/qvfj6DL.jpg",
  "https://imgur.com/SOjtxLr.jpg",
  "https://imgur.com/C9UxiWK.jpg",
  "https://imgur.com/Tv4dbR4.jpg",
  "https://imgur.com/p9cvPTa.jpg",
  "https://imgur.com/43Jmm94.jpg",
  "https://imgur.com/ENfBktY.jpg",
  "https://imgur.com/gMNy3Lc.jpg",
  "https://imgur.com/O0GKFRE.jpg",
  "https://imgur.com/eW6wDUT.jpg",
  "https://imgur.com/fTMtYYB.jpg",
  "https://imgur.com/TTB4dU4.jpg",
  "https://imgur.com/nvAwX3H.jpg",
  "https://imgur.com/Eehpv4g.jpg",
  "https://imgur.com/JFu9uYt.jpg"
];

const FALLBACK_IMAGE = "https://imgur.com/nGry9se.jpg";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  type: 'pixel' | 'banana';
}

export const SuccessStep: React.FC<SuccessStepProps> = ({ username }) => {
  const [powerLevel, setPowerLevel] = useState(777);
  const [currentMemeTitle, setCurrentMemeTitle] = useState('INITIATING...');
  const [isSpinning, setIsSpinning] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [rarity, setRarity] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [flashIntensity, setFlashIntensity] = useState(0);
  const [shake, setShake] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [hypeMultiplier, setHypeMultiplier] = useState(1.0);
  const [revealedImg, setRevealedImg] = useState(MONKY_ASSETS[0]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    rollGacha();
  }, []);

  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        vy: p.vy + 0.15,
        size: p.size * 0.97
      })).filter(p => p.size > 0.5 && p.y < window.innerHeight));
    }, 16);
    return () => clearInterval(interval);
  }, [particles]);

  const rollGacha = () => {
    setIsSpinning(true);
    let iterations = 0;
    const interval = setInterval(() => {
      setCurrentMemeTitle(MEME_TITLES[Math.floor(Math.random() * MEME_TITLES.length)]);
      iterations++;
      if (iterations > 20) {
        clearInterval(interval);
        setIsSpinning(false);
        const finalRarity = Math.floor(Math.random() * RARITIES.length);
        setRarity(finalRarity);
        setHypeMultiplier(1 + finalRarity * 0.5);
        setRevealedImg(MONKY_ASSETS[Math.floor(Math.random() * MONKY_ASSETS.length)] || FALLBACK_IMAGE);
        triggerSuccessConfetti();
      }
    }, 60);
  };

  const spawnLoot = (e: React.MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    const newParticles: Particle[] = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      x,
      y,
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 1) * 12,
      size: Math.random() * 8 + 4,
      color: Math.random() > 0.7 ? '#ffff00' : '#39ff14',
      type: Math.random() > 0.8 ? 'banana' : 'pixel'
    }));
    setParticles(prev => [...prev, ...newParticles].slice(-60));
  };

  const handleHyperFarm = (e: React.MouseEvent) => {
    const gain = Math.floor((Math.random() * 88 + 25) * hypeMultiplier);
    setPowerLevel(prev => prev + gain);
    setClickCount(prev => prev + 1);
    
    setFlashIntensity(1);
    setShake(true);
    spawnLoot(e);

    setTimeout(() => {
      setFlashIntensity(0);
      setShake(false);
    }, 100);
    
    if (clickCount % 15 === 0 && clickCount > 0) rollGacha();
  };

  const triggerSuccessConfetti = () => {
    if (typeof confetti !== 'undefined') {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#39ff14', '#ff00ff', '#ffff00', '#ffffff', '#00ffff']
      });
    }
  };

  const shareMessage = encodeURIComponent(
    `[RANK: ${currentMemeTitle}] [RARITY: ${RARITIES[rarity]}] [POWER: ${powerLevel}] 
The Ritual is complete. Monky DNA sequenced. 🐒✨
Join the raid: @monkymakerETH 
#MonkyMaker #JungleOS #NFT`
  );

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full flex flex-col bg-[#050505] overflow-hidden relative transition-all duration-75 ${shake ? 'animate-shake' : ''}`}
      style={{ filter: flashIntensity > 0 ? `brightness(${1 + flashIntensity}) contrast(1.2)` : 'none' }}
    >
      {/* PARTICLE LAYER */}
      {particles.map(p => (
        <div 
          key={p.id}
          className="fixed pointer-events-none z-[60] flex items-center justify-center"
          style={{ 
            left: p.x, 
            top: p.y, 
            width: p.size, 
            height: p.size,
          }}
        >
          {p.type === 'banana' ? (
             <img src="https://em-content.zobj.net/source/apple/391/banana_1f34c.png" className="w-full h-full drop-shadow-lg" alt="loot" />
          ) : (
             <div className="w-full h-full rounded-sm" style={{ backgroundColor: p.color, boxShadow: `0 0 10px ${p.color}` }} />
          )}
        </div>
      ))}

      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(57,255,20,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(57,255,20,0.05)_1px,transparent_1px)] bg-[length:20px_20px] pointer-events-none"></div>

      {/* TOP HUD: VITAL TELEMETRY */}
      <div className="flex bg-black border-b-2 border-[#39ff14] px-3 py-2 z-20 items-center justify-between shadow-[0_0_20px_rgba(57,255,20,0.2)]">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[8px] text-[#39ff14] font-black uppercase tracking-widest leading-none mb-1" style={{ fontFamily: "'Press Start 2P', cursive" }}>OSCILLATION</span>
            <div className="flex gap-0.5 items-end h-4">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-1 bg-[#39ff14]" style={{ height: `${Math.random() * 100}%`, opacity: 0.3 + Math.random() * 0.7 }}></div>
                ))}
            </div>
          </div>
          <div className="flex flex-col border-l-2 border-[#39ff14]/40 pl-3">
            <span className="text-[8px] text-[#39ff14]/60 font-black uppercase tracking-widest leading-none mb-1">OPERATOR_ID</span>
            <span className="text-xs text-white font-mono leading-none tracking-widest font-bold">{username.toUpperCase()}</span>
          </div>
        </div>
        <div className="text-right">
            <span className="text-[9px] text-[#ff00ff] font-black uppercase leading-none block mb-1">HYPE_X_{hypeMultiplier.toFixed(1)}</span>
            <span className="text-2xl font-black text-white leading-none drop-shadow-[0_0_10px_#ff00ff]" style={{ fontFamily: "'Press Start 2P', cursive" }}>{powerLevel}</span>
        </div>
      </div>

      <div className="flex-grow flex flex-col p-2 gap-2 overflow-hidden">
        
        {/* CENTER MODULE: CARD DISPLAY */}
        <div className="flex flex-col sm:flex-row gap-2 h-auto flex-shrink-0">
           <div className="flex-grow bg-[#111] border-2 border-[#ff00ff] p-4 flex flex-col items-center justify-center relative overflow-hidden shadow-[inset_0_0_40px_rgba(255,0,255,0.2),8px_8px_0px_#000]">
              <div className="absolute top-2 left-2 px-2 py-1 bg-black/80 border border-[#ff00ff] text-[8px] text-[#ff00ff] font-bold z-20">RITUAL_OUTCOME_0x1</div>
              
              <div className="relative mb-2 group">
                 <div className="absolute -inset-4 bg-[#ff00ff] blur-2xl opacity-10 group-hover:opacity-30 transition-opacity"></div>
                 <div className={`relative w-32 h-32 sm:w-40 sm:h-40 border-4 border-white shadow-[10px_10px_0px_#000] rotate-[-2deg] overflow-hidden bg-black ${isSpinning ? 'animate-pulse scale-95' : 'animate-bounce-slow'}`}>
                    <img 
                      src={revealedImg} 
                      onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
                      className="w-full h-full object-cover grayscale-[10%] contrast-[110%]" 
                      alt="NFT Preview" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-2">
                       <div className={`text-[9px] font-black uppercase text-center px-2 py-0.5 ${RARITY_COLORS[rarity]}`}>
                          {RARITIES[rarity]}
                       </div>
                    </div>
                 </div>
              </div>

              <div className="text-center z-10 space-y-1">
                 <h2 className="text-xl sm:text-3xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-[0_4px_0px_#ff00ff]">
                   {currentMemeTitle}
                 </h2>
                 <p className="text-[10px] text-[#39ff14] font-mono tracking-widest opacity-80 uppercase">DNA_SEQUENCE_VERIFIED</p>
              </div>
           </div>

           <div className="w-full sm:w-56 bg-black border-2 border-[#39ff14] p-3 flex flex-col justify-between shadow-[8px_8px_0px_#000]">
              <span className="text-[10px] font-black text-[#39ff14] uppercase border-b border-[#39ff14]/30 pb-1 mb-2">SYSTEM_STATS</span>
              <div className="space-y-3">
                  <div className="flex justify-between items-center">
                      <span className="text-[8px] text-white/60 font-bold uppercase">TOTAL_TAPS</span>
                      <span className="text-xs text-white font-mono">{clickCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                      <span className="text-[8px] text-white/60 font-bold uppercase">BANANAS_FED</span>
                      <span className="text-xs text-yellow-400 font-mono">{(clickCount * 1.5).toFixed(0)}</span>
                  </div>
              </div>
              <div className="mt-4">
                  <div className="h-3 bg-[#222] border border-[#39ff14]/40 overflow-hidden relative">
                      <div className="h-full bg-[#39ff14] transition-all duration-300" style={{ width: `${(clickCount % 15) / 15 * 100}%` }}></div>
                      <div className="absolute inset-0 flex items-center justify-center text-[7px] font-black text-white uppercase mix-blend-difference">NEXT_ROLL_PROGRESS</div>
                  </div>
              </div>
           </div>
        </div>

        {/* INTERACTION HUB */}
        <div className="grid grid-cols-2 gap-2 h-20 sm:h-24 flex-shrink-0">
            <button 
              onClick={handleHyperFarm}
              className="win95-btn !p-0 !bg-[#39ff14] border-2 border-black relative overflow-hidden group shadow-[6px_6px_0px_#000] active:translate-y-1 active:shadow-none transition-all"
            >
               <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
               <div className="flex flex-col items-center justify-center h-full gap-1 p-2">
                   <span className="font-black text-xl sm:text-3xl text-black leading-none tracking-tighter" style={{ fontFamily: "'Press Start 2P', cursive" }}>FARM</span>
                   <span className="text-[8px] sm:text-[10px] font-black uppercase text-black/60 leading-none">CLICK_TO_TRANSCEND</span>
               </div>
            </button>
            <button 
              onClick={() => window.open(`https://x.com/intent/tweet?text=${shareMessage}`, '_blank')}
              className="win95-btn !p-0 !bg-[#ff00ff] border-2 border-black relative overflow-hidden group shadow-[6px_6px_0px_#000] active:translate-y-1 active:shadow-none transition-all"
            >
               <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <div className="flex flex-col items-center justify-center h-full gap-1 p-2">
                   <span className="font-black text-xl sm:text-3xl text-white leading-none tracking-tighter" style={{ fontFamily: "'Press Start 2P', cursive" }}>POST</span>
                   <span className="text-[8px] sm:text-[10px] font-black uppercase text-white/60 leading-none">COMMIT_TO_TIMELINE</span>
               </div>
            </button>
        </div>

        {/* TERMINAL FEED */}
        <div className="flex-grow flex flex-col bg-[#080808] border-2 border-[#39ff14]/30 overflow-hidden shadow-[inset_0_0_15px_rgba(57,255,20,0.1)]">
           <div className="flex bg-[#111] border-b border-[#39ff14]/30 h-8 items-center px-3 justify-between">
              <div className="flex gap-2 h-full py-1">
                  <button onClick={() => setActiveTab(0)} className={`px-4 text-[9px] font-black uppercase flex items-center transition-all ${activeTab === 0 ? 'bg-[#39ff14] text-black shadow-[4px_0_0_#000]' : 'text-[#39ff14]/60 hover:text-[#39ff14] hover:bg-white/5'}`}>CONSOLE</button>
                  <button onClick={() => setActiveTab(1)} className={`px-4 text-[9px] font-black uppercase flex items-center transition-all ${activeTab === 1 ? 'bg-[#39ff14] text-black shadow-[4px_0_0_#000]' : 'text-[#39ff14]/60 hover:text-[#39ff14] hover:bg-white/5'}`}>RAID_PEERS</button>
              </div>
              <div className="text-[8px] font-mono text-[#39ff14] flex items-center gap-2 font-bold">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_#dc2626]"></span>
                  LIVE_SOCKET_UP
              </div>
           </div>

           <div className="flex-grow overflow-hidden flex bg-black/40 relative">
              {activeTab === 0 ? (
                <div className="flex-grow p-3 font-mono text-[10px] sm:text-[12px] text-[#39ff14] leading-relaxed overflow-y-auto custom-terminal-scroll">
                   <div className="opacity-30 border-b border-[#39ff14]/10 pb-2 mb-2 uppercase tracking-tighter">Initializing Degen Terminal v4.0.2...</div>
                   <div className="flex gap-4">
                      <span className="text-white/40">USER:</span>
                      <span className="font-bold">{username}</span>
                   </div>
                   <div className="flex gap-4">
                      <span className="text-white/40">LEVEL:</span>
                      <span className="text-yellow-400 font-bold">{RARITIES[rarity]}</span>
                   </div>
                  <div className="mt-4 space-y-1">
                  <div className="text-[#ff00ff]">&gt; ANALYZING_JUNGLE_NETWORK...</div>
                  <div className="text-[#39ff14]/80">&gt; [OK] PROTOCOL_SYNC_COMPLETE</div>
                  <div className="animate-pulse">&gt; WAITING_FOR_FINAL_PROPAGATION...</div>
                  </div>
                </div>
              ) : (
                <div className="flex-grow grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 p-2 gap-2 overflow-y-auto content-start custom-terminal-scroll">
                   {[...Array(48)].map((_, i) => {
                     const imgUrl = MONKY_ASSETS[i % MONKY_ASSETS.length] || FALLBACK_IMAGE;
                     return (
                       <div key={i} className="aspect-square bg-[#111] border border-[#39ff14]/20 relative group overflow-hidden hover:border-[#ff00ff] transition-all cursor-crosshair">
                          <img 
                            src={imgUrl} 
                            onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
                            className="w-full h-full object-cover opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110 transition-all"
                            alt="Peer"
                          />
                          <div className="absolute top-0 right-0 bg-black/60 text-[6px] text-[#39ff14] px-1 font-mono">0x{Math.floor(Math.random()*999)}</div>
                       </div>
                     );
                   })}
                </div>
              )}
           </div>
        </div>

        <div className="h-6 bg-black border border-[#39ff14]/20 overflow-hidden flex items-center z-20">
            <div className="flex gap-16 animate-[marquee_40s_linear_infinite] text-[9px] font-mono text-[#39ff14] whitespace-nowrap uppercase font-bold italic">
                <span>// NEW_INITIATE_DETECTED: @0x{Math.floor(Math.random()*999).toString(16)}...</span> <span>POWER_SURGE_DETECTED //</span> <span>RANK_REVEALED: {currentMemeTitle}</span>
            </div>
        </div>

      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0%); }
          to { transform: translateX(-50%); }
        }
        @keyframes shake {
          0%, 100% { transform: translate(0, 0); }
          20% { transform: translate(3px, -3px); }
          40% { transform: translate(-3px, 3px); }
          60% { transform: translate(3px, 3px); }
          80% { transform: translate(-3px, -3px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }
        .animate-shake { animation: shake 0.1s linear infinite; }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
        .custom-terminal-scroll::-webkit-scrollbar { width: 4px; }
        .custom-terminal-scroll::-webkit-scrollbar-thumb { background: #39ff14; }
      `}</style>
    </div>
  );
};
