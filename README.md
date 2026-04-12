# 🥗 NutriScan v3: AI-Powered Nutritional Intelligence

**NutriScan** is a high-precision, multi-stage AI platform designed to bridge the gap between computer vision and dietary health. It utilizes a custom-trained **YOLO26n** model to identify 115+ food ingredients and integrates with **Google Gemini 2.0 Flash** to provide real-time, recipe generation and nutritional gap analysis.

---
## 🚀 Key Features

* **Precision Computer Vision:** Custom-trained YOLO26n model optimized on a "Mega-Merge" dataset of **17,647 images**, achieving a **94.1% mAP**.
* **Dual-Stage Intelligence:** Seamlessly connects real-time object detection with LLM-based semantic reasoning for expert-level culinary advice.
* **Health-First Adaptive Logic:** A modular intelligence layer that filters recipes based on **dynamic user constraints** (e.g., Diabetic-friendly, Keto, High-Protein, or Vegan).
* **Contextual Robustness:** Specifically tuned to handle the shadows, low lighting, and cluttered environments of home kitchens.
* **Smart Gap Analysis:** Performs a real-time comparison between available pantry items and target nutritional goals to suggest the most efficient meal.

---

## 🥗 Personalized Health Logic

NutriScan is built on a **Constraint-Aware AI Architecture**. Instead of providing generic recipes, the system processes ingredients through a specific health filter:

1. **Dietary Guardrails:** The backend cross-references detected items against a user's health profile 
2. **Calorie-Precision Intelligence:** Every generated meal plan is optimized for the user's specific caloric target, whether for maintenance, deficit, or surplus.
3. **Macro-Balancing:** Gemini 2.0 Flash automatically adjusts the portion suggestions for detected items to hit specific Protein/Carb/Fat ratios.

---


## 🎯 Project Inspiration & Case Study

While NutriScan is a general-purpose health tool, its development was inspired by a successful real-world "healthy eating" journey. This case study proved the system's ability to maintain strict adherence to dietary goals by turning the smartphone camera into a digital nutritionist, ensuring every meal remains honest, tracked, and aligned with long-term fitness targets.


📊 Model Performance
Dataset Size: 17,647 Images (Augmented for Mosaic, Mixup, and HSV).

Accuracy: 94.1% mAP@50 (Mean Average Precision).

Efficiency: ~125ms inference time per frame on standard hardware.

Robustness: High confidence scores (>0.90) for primary staple ingredients.


