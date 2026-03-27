from transformers import ViTImageProcessor, ViTForImageClassification, pipeline
import torch
from PIL import Image
import logging
import numpy as np

logger = logging.getLogger(__name__)

class DualModelDetector:
    def __init__(self):
        """Initialize both deepfake and AI-generated image detection models"""
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        logger.info(f"Using device: {self.device}")
        
        try:
            # Model 1: Deepfake detection (face-swap, facial manipulation)
            logger.info("Loading Deepfake Detection Model (Wvolf/ViT_Deepfake_Detection)...")
            self.deepfake_processor = ViTImageProcessor.from_pretrained("Wvolf/ViT_Deepfake_Detection")
            self.deepfake_model = ViTForImageClassification.from_pretrained("Wvolf/ViT_Deepfake_Detection")
            self.deepfake_model.to(self.device)
            self.deepfake_model.eval()
            logger.info("✅ Deepfake Detection Model loaded!")
            
            # Model 2: AI-generated image detection (Gemini, DALL-E, Midjourney, Stable Diffusion)
            logger.info("Loading AI-Generated Image Detection Model (umm-maybe/AI-image-detector)...")
            self.ai_gen_classifier = pipeline(
                "image-classification",
                model="umm-maybe/AI-image-detector",
                device=0 if self.device == "cuda" else -1
            )
            logger.info("✅ AI-Generated Image Detection Model loaded!")
            
            logger.info("🎉 Both models loaded successfully!")
        except Exception as e:
            logger.error(f"Error loading models: {str(e)}")
            raise
    
    def predict_image(self, image):
        """
        Predict if an image is real or fake using BOTH models
        Args:
            image: PIL Image or path to image
        Returns:
            dict with combined predictions from both models
        """
        try:
            # Load image if path is provided
            if isinstance(image, str):
                image = Image.open(image).convert('RGB')
            elif not isinstance(image, Image.Image):
                raise ValueError("Image must be PIL Image or file path")
            
            # === Model 1: Deepfake Detection ===
            logger.info("Running Deepfake Detection Model...")
            inputs = self.deepfake_processor(images=image, return_tensors="pt")
            inputs = {k: v.to(self.device) for k, v in inputs.items()}
            
            with torch.no_grad():
                outputs = self.deepfake_model(**inputs)
                logits = outputs.logits
                probs = torch.nn.functional.softmax(logits, dim=-1)
                probs = probs.cpu().numpy()[0]
            
            deepfake_real_prob = float(probs[0])
            deepfake_fake_prob = float(probs[1])
            
            # === Model 2: AI-Generated Image Detection ===
            logger.info("Running AI-Generated Image Detection Model...")
            ai_gen_results = self.ai_gen_classifier(image, top_k=2)
            
            # Parse AI-generated classifier results
            # Results format: [{'label': 'artificial', 'score': 0.XX}, {'label': 'real', 'score': 0.XX}]
            ai_generated_prob = 0.0
            ai_real_prob = 0.0
            
            for result in ai_gen_results:
                label = result['label'].lower()
                score = result['score']
                if 'artificial' in label or 'fake' in label or 'ai' in label or 'generated' in label:
                    ai_generated_prob = score
                elif 'real' in label or 'human' in label or 'authentic' in label:
                    ai_real_prob = score
            
            # If labels don't match expected format, use first result as AI-generated score
            if ai_generated_prob == 0.0 and ai_real_prob == 0.0:
                ai_generated_prob = ai_gen_results[0]['score']
                ai_real_prob = 1 - ai_generated_prob
            
            # === Ensemble Decision ===
            # Strategy: If EITHER model detects fake/AI-generated with high confidence, flag it
            # Weighted combination: 40% deepfake model + 60% AI-gen model (for images)
            
            combined_fake_prob = (0.4 * deepfake_fake_prob) + (0.6 * ai_generated_prob)
            combined_real_prob = 1 - combined_fake_prob
            
            # Determine final verdict
            verdict = "FAKE" if combined_fake_prob > combined_real_prob else "REAL"
            confidence = max(combined_real_prob, combined_fake_prob) * 100
            
            # Detailed breakdown
            result = {
                'fake_prob': round(combined_fake_prob, 4),
                'real_prob': round(combined_real_prob, 4),
                'verdict': verdict,
                'confidence': round(confidence, 2),
                'model_details': {
                    'deepfake_detection': {
                        'real_prob': round(deepfake_real_prob, 4),
                        'fake_prob': round(deepfake_fake_prob, 4),
                        'verdict': 'FAKE' if deepfake_fake_prob > deepfake_real_prob else 'REAL'
                    },
                    'ai_generated_detection': {
                        'real_prob': round(ai_real_prob, 4),
                        'ai_generated_prob': round(ai_generated_prob, 4),
                        'verdict': 'AI-GENERATED' if ai_generated_prob > ai_real_prob else 'REAL'
                    }
                },
                'detection_method': 'Dual-Model Ensemble (Deepfake + AI-Generated)'
            }
            
            logger.info(f"Deepfake Model: {result['model_details']['deepfake_detection']['verdict']}")
            logger.info(f"AI-Gen Model: {result['model_details']['ai_generated_detection']['verdict']}")
            logger.info(f"Final Prediction: {verdict} with {confidence:.2f}% confidence")
            
            return result
            
        except Exception as e:
            logger.error(f"Error during prediction: {str(e)}")
            raise
    
    def predict_video(self, frames, ensemble_method='weighted'):
        """
        Predict if a video is real or fake based on multiple frames
        Uses deepfake model (more suitable for videos)
        Args:
            frames: List of PIL Images
            ensemble_method: 'weighted', 'mean', or 'max'
        Returns:
            dict with overall verdict and per-frame analysis
        """
        try:
            if not frames:
                raise ValueError("No frames provided")
            
            frame_results = []
            fake_probs = []
            
            # Analyze each frame with BOTH models
            for i, frame in enumerate(frames):
                result = self.predict_image(frame)
                frame_results.append({
                    'frame_number': i + 1,
                    'verdict': result['verdict'],
                    'confidence': result['confidence'],
                    'fake_prob': result['fake_prob'],
                    'deepfake_verdict': result['model_details']['deepfake_detection']['verdict'],
                    'ai_gen_verdict': result['model_details']['ai_generated_detection']['verdict']
                })
                fake_probs.append(result['fake_prob'])
            
            # Ensemble decision
            if ensemble_method == 'weighted':
                mean_fake = np.mean(fake_probs)
                max_fake = np.max(fake_probs)
                final_fake_prob = 0.7 * mean_fake + 0.3 * max_fake
            elif ensemble_method == 'mean':
                final_fake_prob = np.mean(fake_probs)
            elif ensemble_method == 'max':
                final_fake_prob = np.max(fake_probs)
            else:
                final_fake_prob = np.mean(fake_probs)
            
            final_real_prob = 1 - final_fake_prob
            verdict = "FAKE" if final_fake_prob > final_real_prob else "REAL"
            confidence = max(final_fake_prob, final_real_prob) * 100
            
            result = {
                'verdict': verdict,
                'confidence': round(confidence, 2),
                'fake_prob': round(final_fake_prob, 4),
                'real_prob': round(final_real_prob, 4),
                'frames_analyzed': len(frames),
                'frame_breakdown': frame_results,
                'detection_method': 'Dual-Model Ensemble (Video Analysis)'
            }
            
            logger.info(f"Video prediction: {verdict} with {confidence:.2f}% confidence ({len(frames)} frames)")
            return result
            
        except Exception as e:
            logger.error(f"Error during video prediction: {str(e)}")
            raise

# Global detector instance
detector = None

def get_detector():
    """Get or create detector instance (singleton pattern)"""
    global detector
    if detector is None:
        detector = DualModelDetector()
    return detector
