import os
from app.services.nutrition import NutritionService

# Test the nutrition service
nutrition = NutritionService()

# Dummy data
yolo_ingredients = ["apple", "banana"]
master_vocab = ["apple", "banana", "orange"]
image_bytes = b"dummy image bytes"  # This will fail, but let's see the error
user_goal = "healthy eating"

result = nutrition.analyze_and_verify(yolo_ingredients, master_vocab, image_bytes, user_goal)
print(result)