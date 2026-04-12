from ultralytics import YOLO

# Load your trained model
model = YOLO("weights/best.pt")

# Access the names dictionary stored inside the model metadata
print("\n--- INTERNAL MODEL DICTIONARY ---")
print(model.names)
print("----------------------------------\n")