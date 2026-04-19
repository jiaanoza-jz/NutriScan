import React from 'react';

const GOALS = [
  { id: 'balanced', label: 'Balanced', icon: '🥗' },
  { id: 'high_protein', label: 'High Protein', icon: '💪' },
  { id: 'keto', label: 'Keto Friendly', icon: '🥑' },
  { id: 'low_carb', label: 'Low Carb', icon: '🥩' },
  { id: 'vegan', label: 'Strict Vegan', icon: '🌿' },
];

interface Props {
  selected: string;
  onSelect: (goal: string) => void;
}

export const GoalSelector: React.FC<Props> = ({ selected, onSelect }) => {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
        Your Nutritional Goal
      </label>
      <div className="flex flex-wrap gap-2">
        {GOALS.map((goal) => (
          <button
            key={goal.id}
            onClick={() => onSelect(goal.label)}
            className={`px-4 py-2 rounded-full border-2 transition-all duration-200 flex items-center gap-2
              ${selected === goal.label 
                ? 'border-nutri-green bg-nutri-light text-nutri-dark font-medium shadow-sm' 
                : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200'}`}
          >
            <span>{goal.icon}</span>
            {goal.label}
          </button>
        ))}
      </div>
    </div>
  );
};