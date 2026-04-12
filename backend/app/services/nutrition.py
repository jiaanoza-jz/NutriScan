import os
import json
from dotenv import load_dotenv
from google import genai
from google.genai import types

# Initialize environment variables
load_dotenv()

class NutritionService:
    def __init__(self):
        """
        Connects to Gemini 2.0 Flash. 
        Ensure GEMINI_API_KEY is set in your .env file.
        """
        self.client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
        self.model_id = "gemini-2.5-flash"

    def get_smart_recipe(self, available_ingredients: list, user_goal: str):
        """
        Performs Gap Analysis: Compares available ingredients vs. a target recipe 
        based on a specific health goal (e.g., sugar-free, high-protein).
        """
        
        # The 'System Instruction' style prompt for 2026 AI logic
        prompt = f"""
        ROLES: Expert Clinical Nutritionist & Professional Chef.
        STRICT CONSTRAINTS: 100% Sugar-Free, focus on Weight Reduction (Calorie Deficit).
        
        INPUT DATA:
        - Detected Ingredients: {', '.join(available_ingredients)}
        - User's Request: "{user_goal}"
        
        TASK:
        1. Suggest ONE specific dish that matches the user's request using the available ingredients.
        2. Identify essential ingredients for that dish that are NOT in the detected list (Missing Ingredients).
        3. Provide a clear recipe and nutritional breakdown.
        
        RESPONSE FORMAT:
        Return ONLY a JSON object. No markdown, no conversational filler.
        
        SCHEMA:
        {{
            "recommended_dish": "string",
            "goal_alignment": "Explanation of how this helps weight loss/sugar-free goals",
            "available_ingredients_used": ["list"],
            "missing_ingredients_needed": ["list of items to buy"],
            "recipe_instructions": ["step 1", "step 2"],
            "nutrition_facts": {{
                "calories": "total kcal",
                "protein": "grams",
                "carbs": "grams (net carbs)",
                "fats": "grams"
            }},
            "chef_tip": "A small tip for better flavor without adding sugar or fat"
        }}
        """

        try:
            # Call Gemini with forced JSON output
            response = self.client.models.generate_content(
                model=self.model_id,
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json"
                )
            )
            
            # Cleanly parse the AI response
            return json.loads(response.text)

        except Exception as e:
            return {
                "error": "Intelligence Layer Error",
                "message": str(e),
                "detected_items": available_ingredients
            }

# --- Quick Local Testing Block ---
if __name__ == "__main__":
    # Test this file by running: python -m app.services.nutrition
    service = NutritionService()
    # Simulating what YOLO found
    test_items = ["Tomato", "Spinach", "Paneer"] 
    # Simulating what the user typed
    test_goal = "I want a high protein lunch for weight loss"
    
    result = service.get_smart_recipe(test_items, test_goal)
    print(json.dumps(result, indent=4))