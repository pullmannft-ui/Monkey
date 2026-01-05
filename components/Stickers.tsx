
import React, { useMemo } from 'react';

export const Stickers: React.FC = () => {
  const bananas = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 5 + Math.random() * 10,
      delay: Math.random() * -15,
      size: 10 + Math.random() * 30,
      opacity: 0.2 + Math.random() * 0.4,
      rotation: Math.random() * 360
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Desktop Background Icons (Visible on larger screens) */}
      <div className="absolute top-20 left-6 flex flex-col items-center gap-1 opacity-40 hidden md:flex">
        <div className="w-12 h-12 bg-[#dfdfdf] border-2 border-white border-r-black border-b-black p-2 shadow-sm">
          <img src="https://em-content.zobj.net/source/apple/391/monkey-face_1f435.png" alt="monky" />
        </div>
        <span className="text-[10px] text-white font-bold bg-black/60 px-2 rounded-sm">Jungle.exe</span>
      </div>

      <div className="absolute top-40 left-6 flex flex-col items-center gap-1 opacity-40 hidden md:flex">
        <div className="w-12 h-12 bg-[#dfdfdf] border-2 border-white border-r-black border-b-black p-2 shadow-sm">
          <img src="https://em-content.zobj.net/source/apple/391/banana_1f34c.png" alt="banana" />
        </div>
        <span className="text-[10px] text-white font-bold bg-black/40 px-2 rounded-sm">Vault</span>
      </div>

      {/* Improved Dynamic Banana Rain */}
      {bananas.map((b) => (
        <img
          key={b.id}
          src="https://em-content.zobj.net/source/apple/391/banana_1f34c.png"
          className="falling-banana"
          style={{ 
            left: `${b.left}%`, 
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            width: `${b.size}px`,
            opacity: b.opacity,
            transform: `rotate(${b.rotation}deg)`
          }}
          alt="falling banana"
        />
      ))}

      <div className="absolute bottom-14 left-6 font-mono text-[9px] opacity-30 text-white hidden md:block uppercase tracking-[0.2em]">
        SYSTEM_ID: BANANA_RAID_OS // AUTH: GRANTED
      </div>
    </div>
  );
};
