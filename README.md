# 🥗 NutriScan v3: AI-Powered Nutritional Intelligence

**NutriScan** is a high-precision, multi-stage AI platform designed to bridge the gap between computer vision and dietary health. It utilizes a custom-trained **YOLO26n** model to identify 115+ food ingredients and integrates with **Google Gemini 2.0 Flash** to provide real-time, sugar-free recipe generation and nutritional gap analysis.

---

## 🚀 Key Features

* **Precision Computer Vision:** Custom-trained YOLO26n model optimized on a "Mega-Merge" dataset of **17,647 images**, achieving a **94.1% mAP**.
* **Dual-Stage Intelligence:** Seamlessly connects real-time object detection with LLM-based semantic reasoning for expert-level culinary advice.
* **Health-First Logic:** Hardcoded constraints for **100% Sugar-Free** meal planning and calorie-deficit calculations.
* **Contextual Robustness:** Specifically tuned to handle the shadows, low lighting, and cluttered environments of home kitchens.
* **Smart Gap Analysis:** Identifies what you have and exactly what you are missing for a target healthy dish.

---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Deep Learning** | YOLO26-Nano (Ultralytics), PyTorch |
| **Generative AI** | Google Gemini 2.0 Flash API |
| **Backend** | FastAPI, Python 3.12, Uvicorn |
| **Data Management** | Roboflow, YAML, PIL |
| **Frontend** | React.js, Vite, Tailwind CSS |
| **Development** | VS Code, Google Colab (Tesla T4 GPU) |

---

## 📂 Project Architecture

NUTRISCAN/
├── backend/
│   ├── app/
│   │   ├── services/
│   │   │   ├── vision.py       # YOLOv8/26 Inference Logic
│   │   │   └── nutrition.py    # Gemini LLM Integration
│   │   └── main.py             # FastAPI REST Endpoints
│   ├── weights/
│   │   └── best.pt             # Trained Weights (94.1% mAP)
│   ├── data.yaml               # Ingredient Manifest (115 Classes)
│   └── .env                    # API Secrets
└── frontend/                   # React/Vite Dashboard


📊 Model Performance
Dataset Size: 17,647 Images (Augmented for Mosaic, Mixup, and HSV).

Accuracy: 94.1% mAP@50 (Mean Average Precision).

Efficiency: ~125ms inference time per frame on standard hardware.

Robustness: High confidence scores (>0.90) for primary staple ingredients.


