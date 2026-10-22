import json
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM

class NutritionService: 
    def __init__(self):
        self.model_id = "google/gemma-1.1-2b-it" 
        
        print("🚀 Loading Gen AI Model into Colab GPU (4-bit Quantization)...")
        self.tokenizer = AutoTokenizer.from_pretrained(self.model_id)
        
        # load_in_4bit compresses the model to fit easily on the free T4 GPU
        self.model = AutoModelForCausalLM.from_pretrained(
            self.model_id,
            device_map="auto",
            load_in_4bit=True 
        )

    def analyze_and_verify(self, yolo_ingredients: list, master_vocab: list, image_bytes: bytes, user_goal: str):
        """
        The Local Master Audit:
        1. Uses YOLO detections to generate a recipe offline.
        2. Bypasses image_bytes (text-only inference).
        3. Enforces strict JSON output via prompt engineering.
        """
        
        # We explicitly instruct the model to return raw JSON and ignore markdown formatting
        prompt = f"""
        ROLES: Senior Nutritional Auditor & Professional Chef.
        
        CONTEXT:
        - YOLO detected these ingredients: {', '.join(yolo_ingredients)}
        - User's health/culinary goal: "{user_goal}"
        
        TASK 1: DATA BREAKDOWN 
        - List every detected ingredient with its estimated calories.
        
        TASK 2: THE RECIPE
        - Suggest a dish that aligns with the goal: "{user_goal}".
        
        STRICT RULES:
        - Return ONLY a raw, valid JSON object. 
        - Do NOT include markdown tags like ```json.
        - Do NOT include any conversational text before or after the JSON.

        REQUIRED JSON OUTPUT FORMAT:
        {{
            "ingredients_list": [
                {{ "name": "string", "calories": 0, "verified_by": "YOLO/Local-AI" }}
            ],
            "total_calories": 0,
            "recipe_ready": {{
                "dish_name": "string",
                "instructions": ["step 1", "step 2"],
                "goal_analysis": "How this dish helps with the user's specific goal",
                "user_goal": "{user_goal}"
            }}
        }}
        """

        # Format the prompt using Gemma's specific chat template
        messages = [{"role": "user", "content": prompt}]
        input_ids = self.tokenizer.apply_chat_template(
            messages, 
            add_generation_prompt=True, 
            return_tensors="pt"
        ).to("cuda")

        max_retries = 3

        for attempt in range(max_retries):
            try:
                # Generate text locally on the GPU
                with torch.no_grad():
                    outputs = self.model.generate(
                        input_ids,
                        max_new_tokens=500,
                        temperature=0.2 # Kept low to prevent JSON formatting hallucinations
                    )
                
                # Decode the output, slicing off the prompt tokens
                response_text = self.tokenizer.decode(
                    outputs[0][input_ids.shape[-1]:], 
                    skip_special_tokens=True
                ).strip()
                
                # Clean up any accidental markdown the model might still try to add
                if response_text.startswith("```json"):
                    response_text = response_text[7:]
                if response_text.endswith("```"):
                    response_text = response_text[:-3]
                    
                return json.loads(response_text.strip())

            except json.JSONDecodeError as e:
                if attempt < max_retries - 1:
                    print(f"⚠️ JSON Parse Error on attempt {attempt + 1}. Retrying...")
                else: 
                    return {
                        "error": "Failed to generate valid JSON after 3 attempts.",
                        "raw_output": response_text
                    }
