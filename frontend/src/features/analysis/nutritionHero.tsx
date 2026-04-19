import React from 'react';
import { Flame, Target } from 'lucide-react';

interface Props {
  calories: number;
  goal: string;
  goalAnalysis: string;
}

export const NutritionHero: React.FC<Props> = ({ calories, goal, goalAnalysis }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-1 bg-nutri-green text-white p-6 rounded-3xl flex flex-col justify-between shadow-lg shadow-nutri-green/20">
        <div className="flex justify-between items-start">
          <div className="p-2 bg-white/20 rounded-lg"><Flame size={24} /></div>
          <span className="text-xs font-bold uppercase tracking-widest opacity-80">Total Energy</span>
        </div>
        <div className="mt-8">
          <h2 className="text-5xl font-black">{calories}</h2>
          <p className="text-sm font-medium opacity-90">kcal / serving</p>
        </div>
      </div>

      <div className="md:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-nutri-light text-nutri-green rounded-lg"><Target size={20} /></div>
          <span className="font-bold text-gray-800">Goal: {goal}</span>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed">
          {goalAnalysis}
        </p>
      </div>
    </div>
  );
};