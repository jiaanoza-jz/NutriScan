import React from 'react';
import type { ScanResponse } from '../../types/index';
import { NutritionHero } from './nutritionHero';
import { IngredientList } from './ingredientList';
// import { RecipeCard } from '../recipe/RecipeCard';

interface Props {
  data: ScanResponse;
}

export const Dashboard: React.FC<Props> = ({ data }) => {
  const { verification_data } = data;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <NutritionHero 
        calories={verification_data.total_calories}
        goal={verification_data.recipe_ready.user_goal}
        goalAnalysis={verification_data.recipe_ready.goal_analysis}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <IngredientList ingredients={verification_data.ingredients_list} />
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-100">
        <h3 className="text-xl font-bold mb-4 text-gray-800">
          Chef's Suggestion: {verification_data.recipe_ready.dish_name}
        </h3>
        <ul className="space-y-4">
          {verification_data.recipe_ready.instructions.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex-none w-6 h-6 rounded-full bg-nutri-light text-nutri-green flex items-center justify-center text-xs font-bold">
                {i + 1}
              </span>
              <p className="text-gray-600 text-sm leading-relaxed">{step}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};