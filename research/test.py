import cv2
from ultralytics import YOLO
import os

MODEL_PATH = os.path.join("weights", "best.pt") 
IMAGE_PATH = "test_ingredient.jpg" 

def run_local_inference():
    
    if not os.path.exists(MODEL_PATH):
        print(f"❌ Error: Could not find weights at {MODEL_PATH}")
        return

    model = YOLO(MODEL_PATH)
    print("✅ NutriScan v2 Weights Loaded Locally.")

    results = model.predict(source=IMAGE_PATH, conf=0.25, save=False, show=True)

    # 3. Print Results to Terminal
    print(f"\n--- Vision Report for {IMAGE_PATH} ---")
    for r in results:
        names = r.names
        for box in r.boxes:
            label = names[int(box.cls[0])]
            confidence = float(box.conf[0])
            print(f"📍 Detected: {label} | Confidence: {confidence:.2f}")

    print("\n[Press any key on the image window to close]")
    cv2.waitKey(0)
    cv2.destroyAllWindows()

if __name__ == "__main__":
    
    if os.path.exists(IMAGE_PATH):
        run_local_inference()
    else:
        print(f"❌ Missing Image: Please put '{IMAGE_PATH}' in your backend folder.")