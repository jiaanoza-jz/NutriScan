import io
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.services.vision import VisionService
from app.services.nutrition import NutritionService

# 1. Initialize the FastAPI app
app = FastAPI(title="NutriScan AI Backend", version="2.0")

# 2. Enable CORS (Crucial for connecting to your React/Streamlit frontend later)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with your frontend URL
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Load our AI Services
# Make sure your 'best.pt' is in the backend/weights/ folder!
vision = VisionService(model_path="weights/best.pt")
nutrition = NutritionService()

@app.get("/")
async def health_check():
    return {
        "status": "online",
        "model_loaded": "YOLOv8-NutriScan-v1",
        "api_ready": True
    }

@app.post("/scan")
async def scan_and_analyze(
    file: UploadFile = File(...), 
    user_goal: str = Form(...) 
):
    try:
        # 1. Read the image as raw BINARY (don't decode!)
        image_bytes = await file.read()
        
        # 2. Pass those BYTES to Vision
        # Make sure VisionService is expecting bytes, not a string
        detected_ingredients = vision.detect_ingredients(image_bytes)
        
        # 3. Pass the LIST (strings) to Nutrition
        # Ensure 'user_goal' is a string
        if not isinstance(user_goal, str):
             user_goal = str(user_goal)

        nutrition_plan = nutrition.get_smart_recipe(detected_ingredients, user_goal)
        
        return {"success": True, "data": nutrition_plan}

    except Exception as e:
        # This will print the error to your terminal so you can see the line number
        import traceback
        traceback.print_exc() 
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)