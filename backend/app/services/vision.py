import os
import io
import yaml
from PIL import Image
from ultralytics import YOLO

class VisionService:
    def __init__(self, model_path=None, yaml_path=None):
        # 1. Dynamically find the backend directory
        # (Goes up from app/services/vision.py to the backend root)
        self.base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

        # 2. Assign paths (Use provided path OR auto-locate in backend folder)
        self.model_path = os.path.abspath(model_path) if model_path else os.path.join(self.base_dir, "weights", "best.pt")
        self.yaml_path = os.path.abspath(yaml_path) if yaml_path else os.path.join(self.base_dir, "data.yaml")

        self.model = None
        self.class_names = {}

        self._load_model()
        self._load_class_names()

    def _load_model(self):
        if not os.path.exists(self.model_path):
            print(f"❌ CRITICAL: Weights missing at {self.model_path}")
            return
        self.model = YOLO(self.model_path)
        print(f"🚀 YOLO Engine started: {os.path.basename(self.model_path)}")

    def _load_class_names(self):
        if os.path.exists(self.yaml_path):
            try:
                with open(self.yaml_path, 'r') as f:
                    data = yaml.safe_load(f)
                    raw_names = data.get('names', [])
                    
                    # Mapping logic for list or dict
                    if isinstance(raw_names, dict):
                        self.class_names = {int(k): v for k, v in raw_names.items()}
                    else:
                        self.class_names = {i: name for i, name in enumerate(raw_names)}
                    
                    print(f"✅ Vocabulary Synced: {len(self.class_names)} classes.")
            except Exception as e:
                print(f"⚠️ YAML Load Failed: {e}")
        else:
            print(f"❌ WARNING: data.yaml not found at {self.yaml_path}")

    def detect_ingredients(self, image_bytes):
        if self.model is None:
            return []

        img = Image.open(io.BytesIO(image_bytes))
        results = self.model.predict(source=img, conf=0.45, verbose=False)
        
        found_ingredients = []
        for r in results:
            for c in r.boxes.cls:
                class_id = int(c)
                name = self.class_names.get(class_id, str(class_id))
                if name not in found_ingredients:
                    found_ingredients.append(name)
                    
        return found_ingredients