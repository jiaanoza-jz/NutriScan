import React, { useRef } from 'react';
import { X, ImageIcon } from 'lucide-react';

interface Props {
  image: File | null;
  preview: string | null;
  onImageSelect: (file: File | null) => void;
}

export const ImageUploader: React.FC<Props> = ({ preview, onImageSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onImageSelect(file);
  };

  return (
    <div className="w-full">
      {preview ? (
        /* Image Preview State */
        <div className="relative rounded-[2rem] overflow-hidden aspect-square shadow-2xl border-[6px] border-white group">
          <img 
            src={preview} 
            alt="Scan Preview" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          />
          
          {/* Overlay gradient for the delete button visibility */}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
          
          <button 
            onClick={() => onImageSelect(null)}
            className="absolute top-4 right-4 p-3 bg-white/90 text-gray-900 rounded-full hover:bg-white transition-all shadow-xl backdrop-blur-md active:scale-90"
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        /* Empty Upload State */
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="relative border-2 border-dashed border-gray-200 rounded-[2rem] aspect-square flex flex-col items-center justify-center gap-6 bg-white hover:bg-nutri-light/30 hover:border-nutri-green transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md"
        >
          <div className="border-1 border-black">
            <div className="p-2 bg-white rounded-xl shadow-sm border-red border-1 text-gray-400">
              <ImageIcon size={20} />
            </div>
          </div>
          
          <div className="text-center space-y-1 px-4">
            <p className="font-bold text-xl text-gray-800">Scan Ingredient</p>
            <p className="text-sm text-gray-400 font-medium">
              Tap upload photo
            </p>
          </div>

          {/* This input MUST stay hidden */}
          <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} // Inline style to ensure it stays hidden regardless of Tailwind loading
            accept="image/*" 
            capture="environment" 
            onChange={handleFileChange} 
          />
        </div>
      )}
    </div>
  );
};