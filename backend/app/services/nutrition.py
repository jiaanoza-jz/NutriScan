import os
import json
import io
import time
import PIL.Image
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

class NutritionService: 
    def __init__(self):
        self.client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
        self.model_id = "gemini-2.5-flash" 

    def analyze_and_verify(self, yolo_ingredients: list, master_vocab: list, image_bytes: bytes, user_goal: str):
        """
        The Master Audit:
        1. Uses master_vocab (data.yaml) to verify YOLO detections.
        2. Calculates calories per item for the first 'Pop-up'.
        3. Prepares the recipe for the second step.
        """
        img = PIL.Image.open(io.BytesIO(image_bytes))

        prompt = f"""
        ROLES: Senior Nutritional Auditor & Professional Chef.
        
        REFERENCE VOCABULARY (Standardized names from data.yaml):
        {', '.join(master_vocab)}

        CONTEXT:
        - YOLO detected: {', '.join(yolo_ingredients)}
        - User's health/culinary goal: "{user_goal}"
        
        TASK 1: VISUAL AUDIT
        - Use the 'Reference Vocabulary' to check the image. 
        - If YOLO missed an ingredient that IS in the vocabulary, add it.
        - If you see something NOT in the vocabulary (like cooking oil, butter, or sugar), flag it as a "Hidden Item".
        
        TASK 2: DATA BREAKDOWN (For the UI Pop-up)
        - List every verified ingredient with its estimated calories.
        
        TASK 3: THE RECIPE
        - Suggest a dish that aligns with the goal: "{user_goal}".
        
        STRICT JSON OUTPUT:
        {{
            "ingredients_list": [
                {{ "name": "string", "calories": 0, "verified_by": "YOLO/AI" }}
            ],
            "total_calories": 0,
            "recipe_ready": {{
                "dish_name": "string",
                "instructions": ["step 1", "step 2"],
                "goal_analysis": "How this dish helps with the user's specific goal",
                "user_goal": "user goal from input"
            }}
        }}
        """
        max_retries = 3
        base_delay = 2

        for attempt in range(max_retries):
            try:
                response = self.client.models.generate_content(
                    model=self.model_id,
                    contents=[prompt, img],
                    config=types.GenerateContentConfig(response_mime_type="application/json")
                )
                return json.loads(response.text)
            except Exception as e:
                if attempt < max_retries - 1:
                    wait_time = base_delay * (2 ** attempt)
                    print(f"Attempt {attempt + 1} failed. Retrying in {wait_time}s...")
                    time.sleep(wait_time)
                else: 
                    return {"error": str(e)}