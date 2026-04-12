import os
import io
import yaml  # Import the YAML parser
from PIL import Image
from ultralytics import YOLO

class VisionService:
    def __init__(self, model_path="weights/best.pt", yaml_path="data.yaml"):
        self.model_path = model_path
        self.yaml_path = yaml_path
        self.model = None
        self.class_names = {} # This will store our reference
        
        self._load_model()
        self._load_class_names()

    def _load_model(self):
        if not os.path.exists(self.model_path):
            print(f"❌ ERROR: Model file not found at {self.model_path}")
            return
        self.model = YOLO(self.model_path)
        print("✅ YOLO Model initialized.")

    def _load_class_names(self):
        # 1. Load the names directly from the YAML file
        try:
            with open(self.yaml_path, 'r') as f:
                data = yaml.safe_load(f)
                self.class_names = data.get('names', [])
                print(f"✅ Loaded {len(self.class_names)} classes from {self.yaml_path}")
        except Exception as e:
            print(f"⚠️ WARNING: Could not load YAML, falling back to model internal names. Error: {e}")
            # Fallback: YOLO models store names internally too
            if self.model:
                self.class_names = self.model.names

    def detect_ingredients(self, image_bytes):
        if self.model is None:
            raise RuntimeError("Vision model not initialized.")

        img = Image.open(io.BytesIO(image_bytes))
        # Keep the confidence high (0.60) to maintain your 87kg goal accuracy
        results = self.model.predict(source=img, conf=0.60)
        
        found_ingredients = []
        for r in results:
            for c in r.boxes.cls:
                class_id = int(c)
                # 2. Use the YAML reference to get the name
                name = self.class_names[class_id]
                
                if name not in found_ingredients:
                    found_ingredients.append(name)
                    
        return found_ingredients