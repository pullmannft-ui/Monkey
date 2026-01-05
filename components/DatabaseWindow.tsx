
import React, { useState, useEffect, useMemo } from 'react';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

interface DatabaseWindowProps {
  onClose: () => void;
}

export const DatabaseWindow: React.FC<DatabaseWindowProps> = ({ onClose }) => {
  const [logs, setLogs] = useState<any[]>([]);
  const [isSyncing, setIsSyncing] = useState(true);
  const [ping, setPing] = useState(24);
  const [loadError, setLoadError] = useState<string | null>(null);
  
  const userAnonNode = useMemo(() => `ANON-NODE-${Math.floor(1000 + Math.random() * 9000)}`, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      (async () => {
        try {
          setLoadError(null);
          const q = query(collection(db, 'submissions'), orderBy('createdAt', 'desc'), limit(100));
          const snap = await getDocs(q);
          const remoteData = snap.docs.map((doc) => {
            const data = doc.data() as any;
            return {
              ...data,
              _docId: doc.id,
              type: 'LOCAL',
              node: userAnonNode,
            };
          });

          setLogs(remoteData.sort((a, b) => (b.id > a.id ? 1 : -1)));
        } catch (err) {
          console.error('Failed to load Firestore submissions', err);
          setLoadError('Gagal memuat data Firestore. Kemungkinan Rules menolak read (permissions).');
          setLogs([]);
        } finally {
          setIsSyncing(false);
        }
      })();
    }, 1200);

    const pingInterval = setInterval(() => {
      setPing(Math.floor(Math.random() * 15) + 15);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(pingInterval);
    };
  }, [userAnonNode]);

  // Function to download data as CSV for the admin
  const downloadCSV = () => {
    (async () => {
      try {
        const q = query(collection(db, 'submissions'), orderBy('createdAt', 'desc'), limit(2000));
        const snap = await getDocs(q);
        const rowsData = snap.docs.map((doc) => ({ _docId: doc.id, ...(doc.data() as any) }));

        if (rowsData.length === 0) {
          alert('NO REAL SUBMISSION DATA AVAILABLE FOR EXPORT YET.');
          return;
        }

        const headers = [
          'DOC_ID',
          'ID',
          'Timestamp',
          'X_Username',
          'ETH_Address',
          'Inviter',
          'Followed',
          'Liked',
          'Quote_Link',
          'Tag_Link'
        ];

        const escape = (v: any) => {
          const s = v === undefined || v === null ? '' : String(v);
          return `"${s.replaceAll('"', '""')}"`;
        };

        const rows = rowsData.map((d: any) => [
          d._docId,
          d.id,
          d.timestamp,
          d.xUsername,
          d.ethAddress,
          d.inviter,
          d.followed,
          d.liked,
          d.quotedLink,
          d.taggedLink,
        ]);

        const csvContent = [
          headers.join(','),
          ...rows.map((r: any[]) => r.map(escape).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `MONKY_CAMPAIGN_EXPORT_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        console.error('Failed to export Firestore submissions', err);
        alert('EXPORT FAILED. Kemungkinan Firestore Rules menolak read (permissions).');
      }
    })();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[2000] p-2 sm:p-4 bg-black/80 backdrop-blur-md">
      <div className="win95-window w-full max-w-5xl h-[85vh] sm:h-[80vh] flex flex-col shadow-[20px_20px_0px_#000] border-4 border-black">
        <div className="win95-title-bar !bg-black !text-[#39ff14] border-b-2 border-[#39ff14]">
          <div className="flex items-center gap-2">
            <img src="https://em-content.zobj.net/source/apple/391/globe-showing-americas_1f30e.png" className="w-4 h-4 animate-spin-slow" alt="net" />
            <span className="truncate text-[10px] sm:text-xs uppercase font-black" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '8px' }}>
              JUNGLE_NET.SYS_v4.2 - ENCRYPTED_LEDGER
            </span>
          </div>
          <button onClick={onClose} className="win95-btn !p-0 w-6 h-6 !bg-red-600 !text-white !border-white font-bold">X</button>
        </div>

        <div className="win95-content !bg-[#050505] flex flex-col p-2 sm:p-4 gap-3 overflow-hidden relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
             <div className="bg-black border border-[#39ff14]/30 p-2 flex flex-col">
                <span className="text-[7px] text-[#39ff14]/60 font-black uppercase">ENCRYPTED_NODE_ID</span>
                <span className="text-[10px] text-white font-bold truncate">{userAnonNode}</span>
             </div>
             <div className="bg-black border border-[#39ff14]/30 p-2 flex flex-col">
                <span className="text-[7px] text-[#39ff14]/60 font-black uppercase">NET_LATENCY</span>
                <span className="text-[10px] text-[#39ff14] font-mono font-bold">{ping}ms <span className="text-[8px] text-green-500 animate-pulse">●</span></span>
             </div>
             <div className="bg-black border border-[#39ff14]/30 p-2 flex flex-col">
                <span className="text-[7px] text-[#39ff14]/60 font-black uppercase">TOTAL_PEERS</span>
                <span className="text-[10px] text-white font-bold">4,192_ANONS</span>
             </div>
             
             {/* EXPORT BUTTON FOR ADMIN */}
             <button 
               onClick={downloadCSV}
               className="win95-btn !bg-[#39ff14] !text-black !text-[9px] !font-black uppercase border-2 border-black shadow-[4px_4px_0px_#1a7a0a] hover:translate-y-[-2px] active:translate-y-[2px] transition-all"
             >
                DOWNLOAD_REPORT.CSV
             </button>
          </div>

          <div className="flex-grow bg-[#0a0a0a] border-2 border-[#39ff14]/20 overflow-auto relative custom-scrollbar">
            {isSyncing && (
              <div className="absolute inset-0 z-50 bg-black/90 flex flex-col items-center justify-center text-[#39ff14]">
                 <div className="w-10 h-10 border-4 border-[#39ff14] border-t-transparent rounded-full animate-spin mb-4"></div>
                 <span className="text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">Establishing VPN Tunnel...</span>
              </div>
            )}

            {!isSyncing && loadError && (
              <div className="absolute inset-0 z-40 bg-black/80 flex flex-col items-center justify-center p-6 text-center">
                <div className="text-[#ff00ff] font-black text-[10px] uppercase tracking-widest">FIRESTORE_READ_DENIED</div>
                <div className="text-white/60 font-mono text-[10px] mt-2">{loadError}</div>
              </div>
            )}
            
            <div className="min-w-[800px]">
              <table className="w-full text-[11px] font-mono border-collapse">
                <thead className="sticky top-0 bg-[#111] border-b-2 border-[#39ff14]/40 z-10 text-[#39ff14] uppercase">
                  <tr>
                    <th className="p-3 text-left border-r border-[#39ff14]/10 w-20">AUTH</th>
                    <th className="p-3 text-left border-r border-[#39ff14]/10">TIMESTAMP</th>
                    <th className="p-3 text-left border-r border-[#39ff14]/10">IDENTITY (X)</th>
                    <th className="p-3 text-left border-r border-[#39ff14]/10">0x_WALLET</th>
                    <th className="p-3 text-left border-r border-[#39ff14]/10">NODE_SIGNATURE</th>
                    <th className="p-3 text-left">REFERRER</th>
                  </tr>
                </thead>
                <tbody className="text-white/70">
                  {logs.map((log, i) => (
                    <tr key={i} className={`hover:bg-[#39ff14]/5 transition-colors border-b border-[#39ff14]/5 group ${log.type === 'LOCAL' ? 'bg-[#39ff14]/10' : ''}`}>
                      <td className="p-3 border-r border-[#39ff14]/5">
                        <span className={`px-2 py-0.5 rounded-sm text-[8px] font-black ${log.type === 'LOCAL' ? 'bg-[#ff00ff] text-white' : 'bg-gray-800 text-gray-500'}`}>
                          {log.type === 'LOCAL' ? 'YOU' : 'PEER'}
                        </span>
                      </td>
                      <td className="p-3 text-white/30 whitespace-nowrap">{log.timestamp}</td>
                      <td className="p-3 font-black text-[#39ff14] group-hover:underline cursor-pointer" onClick={() => window.open(`https://x.com/${log.xUsername.replace('@','')}`, '_blank')}>{log.xUsername}</td>
                      <td className="p-3 truncate max-w-[120px] font-mono opacity-80">{log.ethAddress}</td>
                      <td className="p-3 text-[9px] text-[#39ff14]/60 font-bold uppercase tracking-widest">{log.node || 'ANON-NODE-XXXX'}</td>
                      <td className="p-3 italic text-white/40">{log.inviter}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-between items-center text-[8px] font-bold text-[#39ff14]/40 uppercase tracking-widest">
             <div className="flex gap-4">
                <span>// NODE_SIGN: {userAnonNode}</span>
                <span>// ENCRYPTION: SHA-256</span>
             </div>
             <div className="animate-pulse">STREAMS_ENCRYPTED_AND_ANON...</div>
          </div>
        </div>
      </div>
      <style>{`
        .animate-spin-slow { animation: spin 4s linear infinite; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #000; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #39ff14; }
      `}</style>
    </div>
  );
};
