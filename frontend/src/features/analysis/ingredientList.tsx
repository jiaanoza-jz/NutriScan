import React from 'react';
// import { CheckCircle2, AlertCircle } from 'lucide-react';
import type { Ingredient } from '../../types/index';

interface Props {
  ingredients: Ingredient[];
}

export const IngredientList: React.FC<Props> = ({ ingredients }) => {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100">
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Detected Ingredients</h3>
      <div className="space-y-3">
        {ingredients.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-surface border border-gray-50">
            <div className="flex items-center gap-3">
              {/* {item.verified_by === 'YOLO' ? (
                <CheckCircle2 size={18} className="text-nutri-green" />
              ) : (
                <AlertCircle size={18} className="text-amber-500" />
              )} */}
              <span className="font-semibold text-gray-700 capitalize">{item.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-gray-400">{item.calories} kcal</span>
              {/* <span className={`text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-tighter ${
                item.verified_by === 'YOLO' ? 'bg-nutri-light text-nutri-green' : 'bg-amber-100 text-amber-700'
              }`}>
                {item.verified_by}
              </span> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};