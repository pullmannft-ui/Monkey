
import React from 'react';
import { UserData } from '../types';

interface DeetsStepProps {
  data: UserData;
  setData: React.Dispatch<React.SetStateAction<UserData>>;
  onNext: () => void;
  onBack: () => void;
}

export const DeetsStep: React.FC<DeetsStepProps> = ({ data, setData }) => {
  const isUsernameValid = data.xUsername.startsWith('@') && data.xUsername.length > 3;

  return (
    <div className="w-full h-full flex flex-col p-4 bg-[#c0c0c0] gap-4 overflow-y-auto">
      {/* Module Title */}
      <div className="bg-black border-2 border-[#ff00ff] p-3 shadow-[6px_6px_0px_#000] flex-shrink-0">
        <h2 className="text-[#ff00ff] font-black text-sm sm:text-lg italic tracking-widest uppercase flex justify-between items-center">
          <span>[ID_MOD] BIO_SCAN_01</span>
          <span className="text-[10px] animate-pulse text-[#39ff14]">ACTIVE_SCAN</span>
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        <div className="win95-inset-panel !bg-white border-2 border-black p-4 flex flex-col gap-4 shadow-[6px_6px_0px_rgba(0,0,0,0.15)] relative overflow-hidden">
          <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-[#dfdfdf] border-2 border-black flex-shrink-0 flex items-center justify-center relative shadow-inner">
                <img 
                  src="https://i.imgur.com/QQ4o5wp.jpeg" 
                  className="w-full h-full object-cover grayscale-[30%] contrast-[110%]" 
                  alt="monky avatar" 
                />
                <div className="absolute inset-0 border-[4px] border-white/20 pointer-events-none"></div>
                <div className="absolute top-1 right-1">
                    <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_5px_rgba(220,38,38,0.8)]"></div>
                </div>
            </div>

            <div className="flex-grow space-y-4 w-full">
              <div className="space-y-1">
                <label className="text-[11px] font-black uppercase text-[#000080] block ml-1 tracking-tight">X_COORDINATES:</label>
                <div className="relative">
                  <input 
                    type="text"
                    className="win95-input w-full !text-lg !bg-white border-2 border-black p-3 focus:!bg-white"
                    value={data.xUsername}
                    onChange={(e) => {
                      const val = e.target.value;
                      setData({ ...data, xUsername: val.startsWith('@') || val === '' ? val : '@' + val });
                    }}
                    placeholder="@your_handle"
                  />
                </div>
                <div className="flex justify-between items-center px-1">
                  <span className="text-[9px] font-bold text-gray-500 uppercase italic">INPUT SOCIAL ID</span>
                  {isUsernameValid && <span className="text-[10px] font-black text-green-700 uppercase">VERIFIED ✓</span>}
                </div>
              </div>
            </div>
          </div>

          <div className={`space-y-1 transition-opacity ${data.noInviter ? 'opacity-40' : 'opacity-100'}`}>
            <label className="text-[11px] font-black uppercase text-[#000080] block ml-1 tracking-tight">REFERRER_ID:</label>
            <div className="relative">
                <input 
                  type="text"
                  disabled={data.noInviter}
                  className={`win95-input w-full !text-lg border-2 border-black p-3 ${data.noInviter ? 'bg-gray-200 cursor-not-allowed text-gray-500' : 'bg-white'}`}
                  value={data.inviter}
                  onChange={(e) => {
                    const val = e.target.value;
                    setData({ ...data, inviter: val.startsWith('@') || val === '' ? val : '@' + val });
                  }}
                  placeholder={data.noInviter ? "SOLO_PROTOCOL" : "@referer_id"}
                />
            </div>
          </div>
        </div>

        <div 
          className={`win95-inset-panel !p-4 border-2 border-black flex items-center gap-4 cursor-pointer select-none transition-all hover:bg-white shadow-[4px_4px_0px_rgba(0,0,0,0.1)] ${data.noInviter ? '!bg-black !text-[#39ff14]' : '!bg-[#eee]'}`}
          onClick={() => setData({ ...data, noInviter: !data.noInviter, inviter: !data.noInviter ? '' : data.inviter })}
        >
          <div className={`w-6 h-6 border-2 border-black flex items-center justify-center flex-shrink-0 ${data.noInviter ? 'bg-[#39ff14]' : 'bg-white'}`}>
             {data.noInviter && <div className="w-3 h-3 bg-black"></div>}
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-black uppercase leading-none">ACTIVATE SOLO PROTOCOL</span>
            <span className="text-[9px] font-bold opacity-60 uppercase italic mt-1">ENABLE IF YOU HAVE NO INVITER</span>
          </div>
        </div>
      </div>
      
      {/* Decorative text for status bar hint */}
      <div className="mt-auto text-center pb-2">
         <span className="text-[8px] font-bold text-black/40 uppercase">Awaiting biometric confirmation below...</span>
      </div>
    </div>
  );
};
