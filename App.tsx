
import React, { useState, useMemo } from 'react';
import { Step, UserData } from './types';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { Stickers } from './components/Stickers';
import { WelcomeStep } from './components/WelcomeStep';
import { DeetsStep } from './components/DeetsStep';
import { WalletStep } from './components/WalletStep';
import { TasksStep } from './components/TasksStep';
import { SuccessStep } from './components/SuccessStep';
import { DatabaseWindow } from './components/DatabaseWindow';
import { AboutWindow } from './components/AboutWindow';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.WELCOME);
  const [isDbOpen, setIsDbOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const [userData, setUserData] = useState<UserData>({
    xUsername: '',
    ethAddress: '',
    inviter: '',
    noInviter: false,
    tasks: {
      followed: false,
      liked: false,
      quotedLink: '',
      taggedLink: '',
    }
  });

  const ritualProgress = useMemo(() => {
    switch (currentStep) {
      case Step.WELCOME: return 5;
      case Step.DEETS: return 25;
      case Step.WALLET: return 45;
      case Step.TASKS: return 75;
      case Step.SUCCESS: return 100;
      default: return 0;
    }
  }, [currentStep]);

  const canProceed = useMemo(() => {
    switch (currentStep) {
      case Step.WELCOME: return true;
      case Step.DEETS: 
        return userData.xUsername.startsWith('@') && userData.xUsername.length > 3 && 
               (userData.noInviter || (userData.inviter.startsWith('@') && userData.inviter.length > 3));
      case Step.WALLET:
        return /^0x[a-fA-F0-9]{40}$/.test(userData.ethAddress.trim());
      case Step.TASKS:
        const hasX = (link: string) => {
          const normalized = link.trim().toLowerCase();
          return normalized.includes('x.com/') || normalized.includes('twitter.com/');
        };
        return userData.tasks.followed && userData.tasks.liked && hasX(userData.tasks.quotedLink) && hasX(userData.tasks.taggedLink);
      default: return false;
    }
  }, [currentStep, userData]);

  const buttonLabel = useMemo(() => {
    switch (currentStep) {
      case Step.WELCOME: return "INITIATE";
      case Step.DEETS: return "VERIFY";
      case Step.WALLET: return "SYNC";
      case Step.TASKS: return "COMMIT";
      default: return "";
    }
  }, [currentStep]);

  const nextStep = async () => {
    if (!canProceed || isProcessing) return;
    
    if (currentStep === Step.TASKS) {
      setIsProcessing(true);
      setSubmitError(null);
      const payload = {
        id: Date.now(),
        xUsername: userData.xUsername,
        ethAddress: userData.ethAddress.trim(),
        inviter: userData.noInviter ? 'SOLO_PLAYER' : userData.inviter,
        followed: userData.tasks.followed,
        liked: userData.tasks.liked,
        quotedLink: userData.tasks.quotedLink,
        taggedLink: userData.tasks.taggedLink,
        timestamp: new Date().toLocaleString()
      };

      try {
        await addDoc(collection(db, 'submissions'), {
          ...payload,
          createdAt: serverTimestamp(),
          userAgent: navigator.userAgent,
        });
        await new Promise(r => setTimeout(r, 2000));
        setIsProcessing(false);
        setCurrentStep(Step.SUCCESS);
      } catch (err) {
        console.error('Failed to submit to Firestore', err);
        setIsProcessing(false);
        setSubmitError('Gagal menyimpan data ke database. Kemungkinan Firestore Rules menolak (permissions).');
        alert('Gagal menyimpan data ke database. Kemungkinan Firestore Rules menolak (permissions).');
      }
    } else {
      setIsProcessing(true);
      await new Promise(r => setTimeout(r, 800));
      setIsProcessing(false);
      
      if (currentStep === Step.WELCOME) setCurrentStep(Step.DEETS);
      else if (currentStep === Step.DEETS) setCurrentStep(Step.WALLET);
      else if (currentStep === Step.WALLET) setCurrentStep(Step.TASKS);
    }
  };

  const prevStep = () => {
    if (isProcessing) return;
    if (currentStep === Step.DEETS) setCurrentStep(Step.WELCOME);
    else if (currentStep === Step.WALLET) setCurrentStep(Step.DEETS);
    else if (currentStep === Step.TASKS) setCurrentStep(Step.WALLET);
  };

  const getTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#1a0633] select-none" onClick={() => setIsStartMenuOpen(false)}>
      {/* Dynamic Background Elements */}
      <Stickers />
      
      {/* Social Shortcut */}
      <a 
        href="https://x.com/monkymakerETH" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed top-6 right-6 z-[1000] bg-black border-2 border-white p-2 rounded-full shadow-[4px_4px_0px_#ff00ff] hover:scale-110 active:scale-95 transition-all group"
      >
        <svg className="w-5 h-5 fill-white group-hover:fill-[#39ff14] transition-colors" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
        </svg>
      </a>

      {isDbOpen && <DatabaseWindow onClose={() => setIsDbOpen(false)} />}
      {isAboutOpen && <AboutWindow onClose={() => setIsAboutOpen(false)} />}

      {/* CENTRAL WORKSPACE AREA */}
      <div className="w-full h-full max-w-[min(95vw,680px)] max-h-[min(90vh,850px)] flex flex-col p-2 sm:p-6 z-10 animate-fade-in relative">
        
        {/* Main Application Window */}
        <div className="win95-window shadow-[30px_30px_0px_rgba(0,0,0,0.5)] flex flex-col flex-grow overflow-hidden border-[4px] border-black">
          {/* Title Bar */}
          <div className="win95-title-bar !h-8 px-2 flex-shrink-0">
            <div className="flex items-center gap-2">
              <img src="https://em-content.zobj.net/source/apple/391/monkey-face_1f435.png" className="w-5 h-5" alt="monky" />
              <span className="truncate font-bold uppercase text-[10px] sm:text-xs tracking-tight">MONKY_OS_RITUAL_v99.0_STABLE</span>
            </div>
            <div className="flex gap-1">
              <button 
                onClick={(e) => { e.stopPropagation(); setIsAboutOpen(true); }}
                className="win95-btn !p-0 w-6 h-6 text-[12px] !bg-[#c0c0c0] hover:!bg-blue-600 hover:text-white"
              >?</button>
              <button className="win95-btn !p-0 w-6 h-6 text-[12px] !bg-[#c0c0c0] hover:!bg-red-500 hover:text-white">X</button>
            </div>
          </div>

          <div className="win95-content crt flex flex-col overflow-hidden bg-[#c0c0c0]">
            <div className="flex-grow flex flex-col overflow-hidden relative z-10">
              {currentStep === Step.WELCOME && <WelcomeStep onNext={nextStep} onOpenAbout={() => setIsAboutOpen(true)} />}
              {currentStep === Step.DEETS && <DeetsStep data={userData} setData={setUserData} onNext={nextStep} onBack={prevStep} />}
              {currentStep === Step.WALLET && <WalletStep data={userData} setData={setUserData} onNext={nextStep} onBack={prevStep} />}
              {currentStep === Step.TASKS && <TasksStep data={userData} setData={setUserData} onNext={nextStep} onBack={prevStep} isSubmitting={isProcessing} />}
              {currentStep === Step.SUCCESS && <SuccessStep username={userData.xUsername} />}
            </div>

            {/* PERSISTENT STATUS BAR CONTROLS */}
            {currentStep !== Step.SUCCESS && (
              <div className="bg-[#111] p-3 sm:p-4 border-t-2 border-black flex flex-col gap-3 flex-shrink-0 z-50">
                <div className="flex items-stretch gap-3">
                  {currentStep !== Step.WELCOME && (
                    <button 
                      onClick={prevStep}
                      disabled={isProcessing}
                      className="win95-btn !bg-[#c0c0c0] !px-4 font-black text-[10px] shadow-[4px_4px_0px_#000] active:shadow-none disabled:opacity-30 border-2 border-white border-r-black border-b-black uppercase"
                    >
                      BACK
                    </button>
                  )}
                  
                  <button 
                    onClick={nextStep}
                    disabled={!canProceed || isProcessing}
                    className={`relative flex-grow h-14 sm:h-16 border-4 transition-all duration-200 group
                      ${canProceed 
                        ? 'border-[#39ff14] bg-[#39ff14] shadow-[0_0_20px_rgba(57,255,20,0.4)] active:scale-95' 
                        : 'border-gray-700 bg-gray-800 opacity-60 cursor-not-allowed'}
                    `}
                  >
                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_20px)]"></div>
                    
                    <div className="relative h-full flex items-center justify-center gap-2">
                      {isProcessing ? (
                        <div className="loading-spinner !border-black !border-t-transparent !w-7 !h-7"></div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <span
  className={`font-mono font-black uppercase leading-none 
    text-[11px] sm:text-xs 
    tracking-[0.35em] 
    ${canProceed ? 'text-black' : 'text-gray-500'}
  `}
>
  {buttonLabel}
</span>

                          {canProceed && <span className="text-[7px] sm:text-[8px] font-black text-black/60 animate-pulse mt-1">EXECUTE_SYSTEM_COMMAND</span>}
                        </div>
                      )}
                    </div>
                  </button>
                </div>

                <div className="flex-grow flex flex-col gap-1.5">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[8px] font-black uppercase text-[#39ff14] tracking-widest italic animate-pulse">PROTOCOL_SYNC:</span>
                    <span className="text-[9px] font-bold text-white tracking-widest">{ritualProgress}%</span>
                  </div>
                  <div className="h-4 sm:h-5 bg-[#222] border-2 border-[#39ff14]/30 relative overflow-hidden shadow-inner">
                    <div 
                      className="h-full bg-gradient-to-r from-[#39ff14] to-[#00aa00] transition-all duration-700 shadow-[0_0_15px_#39ff14]" 
                      style={{ width: `${ritualProgress}%` }}
                    >
                       <div className="absolute inset-y-0 w-24 bg-white/25 -skew-x-12 animate-[glider_2s_infinite]"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Start Menu */}
      {isStartMenuOpen && (
        <div className="fixed bottom-10 left-4 w-60 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-r-2 border-b-2 border-black z-[1000] p-1 flex shadow-[4px_4px_15px_rgba(0,0,0,0.6)] animate-slide-up">
           <div className="w-8 bg-[#808080] flex items-center justify-center overflow-hidden">
              <span className="rotate-[-90deg] text-white font-bold text-[16px] whitespace-nowrap uppercase tracking-[0.2em]">JUNGLE_OS</span>
           </div>
           <div className="flex-grow py-1">
              <button 
                onClick={(e) => { e.stopPropagation(); setIsAboutOpen(true); setIsStartMenuOpen(false); }}
                className="w-full text-left px-4 py-3 hover:bg-[#000080] hover:text-white text-[12px] font-bold flex items-center gap-3 active:bg-blue-900 transition-colors"
              >
                <img src="https://em-content.zobj.net/source/apple/391/information_2139-fe0f.png" className="w-5 h-5" alt="about" />
                ABOUT_MONKY.DOC
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsDbOpen(true); setIsStartMenuOpen(false); }}
                className="w-full text-left px-4 py-3 hover:bg-[#000080] hover:text-white text-[12px] font-bold flex items-center gap-3 active:bg-blue-900 transition-colors"
              >
                <img src="https://em-content.zobj.net/source/apple/391/globe-showing-americas_1f30e.png" className="w-5 h-5" alt="db" />
                JUNGLE_NET.SYS
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsDbOpen(true); setIsStartMenuOpen(false); }}
                className="w-full text-left px-4 py-3 hover:bg-[#000080] hover:text-white text-[12px] font-bold flex items-center gap-3 active:bg-blue-900 transition-colors"
              >
                <img src="https://em-content.zobj.net/source/apple/391/floppy-disk_1f4be.png" className="w-5 h-5" alt="export" />
                EXPORT_LEDGER.BAT
              </button>
              <div className="border-t border-gray-400 my-1 mx-2"></div>
              <button className="w-full text-left px-4 py-3 hover:bg-[#000080] hover:text-white text-[12px] font-bold flex items-center gap-3 opacity-40 cursor-not-allowed">
                <img src="https://em-content.zobj.net/source/apple/391/gear_2699-fe0f.png" className="w-5 h-5" alt="settings" />
                SETTINGS
              </button>
           </div>
        </div>
      )}

      {/* Taskbar */}
      <div className="taskbar shadow-[0_-4px_10px_rgba(0,0,0,0.3)]">
          <button 
            onClick={(e) => { e.stopPropagation(); setIsStartMenuOpen(!isStartMenuOpen); }}
            className={`win95-btn !px-4 !py-0 h-8 flex items-center gap-2 font-black text-[13px] ${isStartMenuOpen ? 'border-t-black border-l-black border-r-white border-b-white bg-[#dfdfdf]' : 'bg-[#c0c0c0]'}`}
          >
            <img src="https://em-content.zobj.net/source/apple/391/monkey-face_1f435.png" className="w-5 h-5" alt="start" />
            Start
          </button>
          <div className="ml-2 flex gap-1 h-full py-1">
             <div className="px-4 border-t-black border-l-black border-r-white border-b-white bg-[#dfdfdf] flex items-center gap-2 text-[11px] font-black h-full shadow-inner">
                <img src="https://em-content.zobj.net/source/apple/391/banana_1f34c.png" className="w-4 h-4" alt="app" />
                <span className="hidden xs:inline">Farming.exe</span>
             </div>
          </div>
          <div className="ml-auto px-4 border-t-gray-500 border-l-gray-500 border-r-white border-b-white bg-[#c0c0c0] flex items-center gap-2 text-[11px] h-8 shadow-inner font-mono">
             <img src="https://em-content.zobj.net/source/apple/391/speaker-high-volume_1f50a.png" className="w-3 h-3 opacity-60" alt="volume" />
             <span className="font-bold opacity-80">{getTime()}</span>
          </div>
      </div>

      <style>{`
        @keyframes glider {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(450%); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.2s ease-out forwards; }
        
        @supports (padding: env(safe-area-inset-bottom)) {
          .taskbar {
            padding-bottom: calc(env(safe-area-inset-bottom) / 2);
            height: calc(34px + env(safe-area-inset-bottom) / 2);
          }
        }
      `}</style>
    </div>
  );
};

export default App;
