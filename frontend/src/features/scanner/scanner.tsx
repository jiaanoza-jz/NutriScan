import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GoalSelector } from './goalSelector';
import { ImageUploader } from './imageUploader';
import { Sparkles, Loader2 } from 'lucide-react';
import { scanImage } from '../../services/api';

interface ScannerProps {
  onScanComplete: (data: any) => void;
}

export const Scanner: React.FC<ScannerProps> = ({ onScanComplete }) => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [goal, setGoal] = useState('Balanced'); // Default to Balanced
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const handleScan = async () => {
    if (!image) return;
    setIsScanning(true);
    
    try {
      const result = await scanImage(image, goal);
      onScanComplete(result);
    } catch (error) {
      console.error('Scan failed:', error);
      alert('Something went wrong with AI analysis. Please try again.');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto px-4 py-12 md:py-20 space-y-12"
    >
      {/* Header Section */}
      <header className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
          NutriScan <span className="text-nutri-green">v3</span>
        </h1>
        <p className="text-gray-500 font-medium text-lg">
          AI-Powered Nutritional Intelligence
        </p>
      </header>

      {/* Input Section */}
      <div className="space-y-10">
        <ImageUploader image={image} preview={preview} onImageSelect={setImage} />
        <GoalSelector selected={goal} onSelect={setGoal} />
      </div>

      {/* Action Button */}
      <button
        disabled={!image || isScanning}
        onClick={handleScan}
        className={`w-full py-5 rounded-2xl font-bold text-lg text-white flex items-center justify-center gap-3 transition-all duration-300 shadow-xl
          ${!image || isScanning 
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
            : 'bg-nutri-green hover:bg-nutri-dark active:scale-[0.98] shadow-nutri-green/20'}`}
      >
        {isScanning ? (
          <>
            <Loader2 size={22} className="animate-spin" />
            <span>Analyzing with YOLO...</span>
          </>
        ) : (
          <>
            <Sparkles size={22} />
            <span>Start AI Analysis</span>
          </>
        )}
      </button>
    </motion.div>
  );
};