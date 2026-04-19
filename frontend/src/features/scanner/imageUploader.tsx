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
        <div className="relative rounded-[2rem] overflow-hidden aspect-square shadow-2xl border-[6px] border-white group">
          <img
            src={preview}
            alt="Scan Preview"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
          <button
            onClick={() => onImageSelect(null)}
            className="absolute top-4 right-4 p-3 bg-white/90 text-gray-900 rounded-full hover:bg-white transition-all shadow-xl backdrop-blur-md active:scale-90"
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="relative border-2 border-dashed border-gray-200 rounded-[2rem] aspect-square flex flex-col items-center justify-center gap-6 bg-white hover:bg-nutri-light/30 hover:border-nutri-green transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md"
        >
          <div className="p-4 bg-nutri-light rounded-2xl">
            <div className="p-2 bg-white rounded-xl shadow-sm border border-nutri-green/20 text-nutri-green">
              <ImageIcon size={20} />
            </div>
          </div>

          <div className="text-center space-y-1 px-4">
            <p className="font-bold text-xl text-gray-800">Scan Ingredient</p>
            <p className="text-sm text-gray-400 font-medium">
              Tap to upload photo
            </p>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
          />
        </div>
      )}
    </div>
  );
};