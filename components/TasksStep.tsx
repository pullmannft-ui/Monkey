
import React, { useState } from 'react';
import { UserData } from '../types';

interface TasksStepProps {
  data: UserData;
  setData: React.Dispatch<React.SetStateAction<UserData>>;
  onNext: () => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

export const TasksStep: React.FC<TasksStepProps> = ({ data, setData, isSubmitting }) => {
  const [activeTask, setActiveTask] = useState<number | null>(null);

  const setTask = (key: keyof UserData['tasks'], value: any) => {
    setData(prev => ({
      ...prev,
      tasks: { ...prev.tasks, [key]: value }
    }));
  };

  const handleAction = (taskNum: number, url: string, taskKey: keyof UserData['tasks']) => {
    setActiveTask(taskNum);
    window.open(url, '_blank');
    setTimeout(() => { 
      setTask(taskKey, true); 
      setActiveTask(null); 
    }, 1500);
  };

  return (
    <div className="w-full h-full flex flex-col p-4 bg-[#c0c0c0] gap-3 overflow-y-auto relative">
      {isSubmitting && (
        <div className="absolute inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 border-4 border-[#39ff14] border-t-transparent rounded-full animate-spin mb-4 shadow-[0_0_20px_#39ff14]"></div>
          <h2 className="text-[#39ff14] font-black text-lg animate-pulse tracking-widest uppercase" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px' }}>BROADCASTING_TO_JUNGLE_NET</h2>
          <p className="text-white/40 font-mono text-[9px] mt-2 uppercase tracking-tighter">Syncing with global peers... Establishing Satellite Link... WAGMI_V2.5</p>
        </div>
      )}

      <div className="bg-[#ff00ff] border-2 border-black h-8 flex items-center overflow-hidden flex-shrink-0 shadow-[4px_4px_0px_#000]">
        <div className="flex gap-12 animate-[marquee_20s_linear_infinite] whitespace-nowrap">
          <span className="meme-font text-white text-md tracking-widest italic">RAID_THE_TIMELINE</span>
          <span className="meme-font text-white text-md tracking-widest italic">RAID_THE_TIMELINE</span>
          <span className="meme-font text-white text-md tracking-widest italic">RAID_THE_TIMELINE</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center px-1 mb-1">
            <span className="text-[10px] font-black text-[#000080] uppercase tracking-tighter italic">Mission_Queue [02/02]:</span>
            <div className="flex gap-2">
                <div className={`w-2 h-2 rounded-full ${data.tasks.followed ? 'bg-green-600 shadow-[0_0_8px_#22c55e]' : 'bg-red-600 animate-pulse'}`}></div>
                <div className={`w-2 h-2 rounded-full ${data.tasks.liked ? 'bg-green-600 shadow-[0_0_8px_#22c55e]' : 'bg-red-600'}`}></div>
            </div>
        </div>

        <div className="space-y-3">
          <div className={`win95-inset-panel !p-3 border-2 border-black transition-all ${data.tasks.followed ? 'opacity-70 grayscale bg-gray-100' : 'bg-white shadow-[4px_4px_0px_#000]'}`}>
             <div className="flex justify-between items-center mb-1">
                <span className="text-[9px] font-black text-black uppercase">FOLLOW_MONKY_PROTO</span>
             </div>
             <button 
                onClick={() => handleAction(1, 'https://x.com/monkymakerETH', 'followed')}
                className={`win95-btn w-full !py-2 !text-md !font-black uppercase border-2 border-black transition-all gap-2 ${data.tasks.followed ? '!bg-green-100' : '!bg-[#39ff14] active:scale-95'}`}
             >
                {activeTask === 1 && <div className="loading-spinner"></div>}
                {activeTask === 1 ? 'CONNECTING...' : data.tasks.followed ? 'FOLLOWED_OK' : 'RUN: FOLLOW'}
             </button>
          </div>

          <div className={`win95-inset-panel !p-3 border-2 border-black transition-all ${data.tasks.liked ? 'opacity-70 grayscale bg-gray-100' : 'bg-white shadow-[4px_4px_0px_#000]'}`}>
             <div className="flex justify-between items-center mb-1">
                <span className="text-[9px] font-black text-black uppercase">PINNED_RAID_TARGET</span>
             </div>
             <button 
                onClick={() => handleAction(2, 'https://x.com/monkymakerETH/status/1885621404111303036', 'liked')}
                className={`win95-btn w-full !py-2 !text-md !font-black uppercase border-2 border-black transition-all gap-2 ${data.tasks.liked ? '!bg-green-100' : '!bg-[#39ff14] active:scale-95'}`}
             >
                {activeTask === 2 && <div className="loading-spinner"></div>}
                {activeTask === 2 ? 'RAIDING...' : data.tasks.liked ? 'RAID_CONFIRMED' : 'RUN: RAID'}
             </button>
          </div>
        </div>

        <div className="win95-inset-panel !bg-[#111] !text-[#39ff14] border-2 border-black p-4 space-y-4 shadow-[8px_8px_0px_rgba(0,0,0,0.8)] mt-1">
            <h3 className="text-[10px] font-black italic tracking-widest uppercase mb-1 flex items-center gap-2">
                <span className="animate-pulse">_</span>PROOF_OF_WORK_LOGS
            </h3>
            
            <div className="space-y-4">
                <div className="space-y-1">
                    <label className="text-[8px] font-bold text-white/50 uppercase block ml-1 tracking-tight">QUOTE_EVIDENCE_URL (X/Twitter):</label>
                    <input 
                        type="text" 
                        className="win95-input w-full !bg-black !text-[#39ff14] !border-[#39ff14] !text-[11px] sm:!text-[12px] !p-3 !font-mono placeholder:text-[#39ff14]/30 focus:!border-[#ff00ff] transition-colors" 
                        placeholder="https://x.com/your_quote..."
                        value={data.tasks.quotedLink}
                        onChange={(e) => setTask('quotedLink', e.target.value)}
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-[8px] font-bold text-white/50 uppercase block ml-1 tracking-tight">TAGS_EVIDENCE_URL (X/Twitter):</label>
                    <input 
                        type="text" 
                        className="win95-input w-full !bg-black !text-[#39ff14] !border-[#39ff14] !text-[11px] sm:!text-[12px] !p-3 !font-mono placeholder:text-[#39ff14]/30 focus:!border-[#ff00ff] transition-colors" 
                        placeholder="https://x.com/your_tags..."
                        value={data.tasks.taggedLink}
                        onChange={(e) => setTask('taggedLink', e.target.value)}
                    />
                </div>
            </div>
        </div>
      </div>

      <div className="mt-auto text-center pb-2">
         <span className="text-[8px] font-bold text-black/40 uppercase tracking-tighter">Commit logs via status bar terminal below...</span>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(50%); }
          100% { transform: translateX(-150%); }
        }
      `}</style>
    </div>
  );
};
