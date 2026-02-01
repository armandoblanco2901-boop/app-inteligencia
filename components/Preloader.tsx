import React from 'react';

const Preloader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0f0a08] text-[#d4a373]">
      <div className="relative w-32 h-32 mb-8">
        {/* Central visual - Static Cup */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
             <span className="text-5xl drop-shadow-[0_0_15px_rgba(212,163,115,0.5)]">☕</span>
        </div>
        
        {/* Spinning Gold Ring */}
        <div className="absolute inset-0 rounded-full border border-[#d4a373]/20 border-t-[#d4a373] animate-spin duration-[1500ms] ease-in-out"></div>
        
        {/* Counter-Spinning Inner Ring */}
        <div className="absolute inset-4 rounded-full border border-[#d4a373]/10 border-b-[#d4a373] animate-spin duration-[2000ms] direction-reverse linear"></div>

        {/* Floating Beans */}
        <div className="absolute inset-[-20px] animate-spin-slow">
             <span className="absolute top-0 left-1/2 -translate-x-1/2 text-xl opacity-60">🫘</span>
             <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xl opacity-60">🫘</span>
             <span className="absolute left-0 top-1/2 -translate-y-1/2 text-xl opacity-60">🫘</span>
             <span className="absolute right-0 top-1/2 -translate-y-1/2 text-xl opacity-60">🫘</span>
        </div>
      </div>
      
      <div className="text-center space-y-2">
          <h2 className="text-4xl font-serif text-white tracking-widest animate-pulse">VENEKAZ</h2>
          <p className="font-script text-2xl text-[#d4a373]">Excelencia en cada grano</p>
      </div>
    </div>
  );
};

export default Preloader;