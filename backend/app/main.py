import uvicorn
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from services.vision import VisionService
from services.nutrition import NutritionService

app = FastAPI(title="NutriScan AI", version="3.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


vision = VisionService(model_path="weights/best.pt", yaml_path="data.yaml")
nutrition = NutritionService()

@app.get("/")
async def health_check():
    return {"status": "online", "system": "NutriScan Hybrid AI"}

@app.post("/scan")
async def scan_and_analyze(
    file: UploadFile = File(...), 
    user_goal: str = Form("Provide a balanced healthy recipe")
):
    try:
        image_bytes = await file.read()
        
        # 1. Local YOLO Detection
        detected_labels = vision.detect_ingredients(image_bytes)
        
        # 2. Hybrid AI Audit (The Ingredient First -> Recipe Later Logic)
        final_analysis = nutrition.analyze_and_verify(
            yolo_ingredients=detected_labels,
            master_vocab=list(vision.class_names.values()),
            image_bytes=image_bytes,
            user_goal=user_goal
        )
        
        return {
            "success": True,
            "yolo_detection": detected_labels,
            "verification_data": final_analysis
        }

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)