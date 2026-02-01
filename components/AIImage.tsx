import React, { useState, useEffect } from 'react';
import { generateImage } from '../services/geminiService';
import { Image as ImageIcon, RefreshCcw, AlertCircle } from 'lucide-react';

interface AIImageProps {
  prompt: string;
  aspectRatio: '16:9' | '3:4' | '4:3' | '1:1';
  className?: string;
  alt: string;
}

const AIImage: React.FC<AIImageProps> = ({ prompt, aspectRatio, className = "", alt }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchImage = async () => {
    setLoading(true);
    setError(false);
    const generated = await generateImage(prompt, aspectRatio);
    if (generated) {
      setImageUrl(generated);
    } else {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImage();
  }, [prompt]);

  if (loading) {
    return (
      <div className={`relative overflow-hidden bg-[#1c1917] flex items-center justify-center ${className}`}>
        {/* Shimmer Effect */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-[#d4a373]/10 to-transparent z-10"></div>
        <div className="text-[#d4a373]/30 flex flex-col items-center gap-2 animate-pulse">
            <ImageIcon className="w-8 h-8" />
            <span className="text-xs uppercase tracking-widest">Generando IA...</span>
        </div>
      </div>
    );
  }

  if (error || !imageUrl) {
    return (
      <div className={`bg-[#1c1917] flex flex-col items-center justify-center text-stone-500 border border-red-900/30 ${className}`}>
        <AlertCircle className="w-8 h-8 mb-2 opacity-50" />
        <p className="text-xs text-center px-4">Error generando imagen</p>
        <button 
          onClick={fetchImage}
          className="mt-2 text-[#d4a373] text-xs flex items-center gap-1 hover:underline"
        >
          <RefreshCcw className="w-3 h-3" /> Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className={`relative group overflow-hidden ${className}`}>
        <img 
            src={imageUrl} 
            alt={alt} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        {/* AI Badge */}
        <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-white/70 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
            AI Generated
        </div>
    </div>
  );
};

export default AIImage;