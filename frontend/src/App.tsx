import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scanner } from './features/scanner/scanner';
import { Dashboard } from './features/analysis/dashboard'; // The new Dashboard
import type { ScanResponse } from './types';
import { ArrowLeft, ChefHat } from 'lucide-react';

function App() {
  const [scanData, setScanData] = useState<ScanResponse | null>(null);
  const [view, setView] = useState<'scan' | 'results'>('scan');

  const handleScanComplete = (data: ScanResponse) => {
    setScanData(data);
    setView('results');
  };

  const resetScanner = () => {
    setScanData(null);
    setView('scan');
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Designer Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={resetScanner}>
            <div className="w-8 h-8 bg-nutri-green rounded-lg flex items-center justify-center text-white">
              <ChefHat size={20} height="fill" />
            </div>
            <span className="font-bold text-xl tracking-tight">NutriScan <span className="text-nutri-green">v3</span></span>
          </div>
          
          <AnimatePresence>
            {view === 'results' && (
              <motion.button 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onClick={resetScanner}
                className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-nutri-green transition-colors bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm"
              >
                <ArrowLeft size={16} />
                New Scan
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto py-8 px-6">
        <AnimatePresence mode="wait">
          {view === 'scan' ? (
            <motion.div
              key="scanner-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Scanner onScanComplete={handleScanComplete} />
            </motion.div>
          ) : (
            <motion.div
              key="results-view"
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5, type: "spring", damping: 25, stiffness: 120 }}
            >
              {/* The Dashboard takes the lead here */}
              {scanData && <Dashboard data={scanData} />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Clean, minimalist footer */}
      <footer className="py-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-100 text-gray-400 text-xs font-medium shadow-sm">
          <span className="w-2 h-2 bg-nutri-green rounded-full animate-pulse" />
          System Online • YOLO26n + Gemini 2.5 Flash
        </div>
        <p className="mt-4 text-[10px] text-gray-300 uppercase tracking-[0.2em]">
          © 2026 NutriScan Intelligent Systems
        </p>
      </footer>
    </div>
  );
}

export default App;