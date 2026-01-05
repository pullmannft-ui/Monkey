
import React from 'react';
import { UserData } from '../types';

interface WalletStepProps {
  data: UserData;
  setData: React.Dispatch<React.SetStateAction<UserData>>;
  onNext: () => void;
  onBack: () => void;
}

export const WalletStep: React.FC<WalletStepProps> = ({ data, setData }) => {
  const isValidEth = /^0x[a-fA-F0-9]{40}$/.test(data.ethAddress);

  return (
    <div className="w-full h-full flex flex-col p-4 bg-[#c0c0c0] gap-4 overflow-y-auto relative">
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(transparent_0%,rgba(57,255,20,0.5)_50%,transparent_100%)] bg-[length:100%_4px] animate-[scan_2s_linear_infinite]"></div>

      <div className="bg-black border-2 border-[#39ff14] p-3 shadow-[6px_6px_0px_#000] flex-shrink-0">
        <h2 className="text-[#39ff14] font-black text-sm sm:text-lg italic tracking-widest uppercase flex justify-between items-center">
          <span>[ID_MOD] WL_REG_PROTOCOL</span>
          <span className="text-[10px] animate-pulse">SYSTEM_READY</span>
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        <div className="win95-inset-panel !bg-[#111] border-2 border-black p-4 flex flex-col gap-4 relative overflow-hidden shadow-[8px_8px_0px_rgba(0,0,0,0.8)]">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white border-2 border-black flex-shrink-0 flex items-center justify-center">
                  <img src="https://em-content.zobj.net/source/apple/391/monkey-face_1f435.png" className="w-6 h-6" alt="vault" />
              </div>
              <div className="flex-grow">
                  <span className="text-[8px] font-black text-[#39ff14] uppercase block tracking-tighter">WHITELIST_CANDIDATE_LINK</span>
                  <p className="text-[11px] font-bold text-white uppercase italic">ENTER ADDRESS FOR WL ELIGIBILITY</p>
              </div>
           </div>

           <div className="space-y-1 mt-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[9px] font-black uppercase text-[#39ff14] tracking-tight italic">ETH_ADDRESS_0x:</label>
                {isValidEth && <span className="text-[8px] font-black text-[#ff00ff] uppercase animate-pulse">CHECKSUM_PASS</span>}
              </div>
              <div className="relative">
                <input 
                  type="text"
                  spellCheck={false}
                  className="win95-input w-full !text-[11px] sm:!text-[14px] !bg-black !text-[#39ff14] !border-[#39ff14] p-3 font-mono placeholder:text-[#39ff14]/20 uppercase focus:!border-white transition-all"
                  value={data.ethAddress}
                  onChange={(e) => setData({ ...data, ethAddress: e.target.value })}
                  placeholder="0x0000000000000000000000000000000000000000"
                />
              </div>
           </div>

           <div className="bg-black/50 border border-[#39ff14]/20 p-2 text-[8px] font-mono text-[#39ff14]/60 uppercase leading-none space-y-1">
              <div>&gt; ANALYZING WALLET HISTORY...</div>
              <div>&gt; ADDRESS WILL BE USED FOR WL SELECTION</div>
              <div>&gt; THIS IS NOT AN AIRDROP REGISTRATION</div>
           </div>
        </div>

        <div className="win95-inset-panel !p-3 !bg-yellow-100 border-2 border-black flex gap-3 shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
            <div className="text-xl">⚠️</div>
            <div className="flex flex-col justify-center">
                <span className="text-[10px] font-black uppercase leading-none text-black">CANDIDACY_WARNING:</span>
                <span className="text-[9px] font-bold uppercase opacity-80 leading-tight mt-1">IF ADDRESS IS INVALID, YOU WILL BE DISQUALIFIED FROM SELECTION.</span>
            </div>
        </div>
      </div>

      <div className="mt-auto text-center pb-2">
         <span className="text-[8px] font-bold text-black/40 uppercase">Sync protocol available in status bar...</span>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
};
