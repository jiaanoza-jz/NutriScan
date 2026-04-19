export interface Ingredient {
  name: string;
  calories: number;
  verified_by: 'YOLO' | 'AI';
}

export interface MacroData {
  protein: number;
  carbs: number;
  fats: number;
}

export interface Recipe {
  dish_name: string;
  instructions: string[];
  goal_analysis: string;
}

export interface ScanResponse {
  success: boolean;
  yolo_detection: string[];
  verification_data: {
    ingredients_list: Ingredient[];
    total_calories: number;
    recipe_ready: Recipe;
    macros?: MacroData; // We'll handle this for the chart
  };
}