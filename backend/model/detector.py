from transformers import ViTImageProcessor, ViTForImageClassification
import torch
from PIL import Image
import logging
import numpy as np

logger = logging.getLogger(__name__)

class DeepfakeDetector:
    def __init__(self):
        """Initialize the HuggingFace ViT deepfake detection model"""
        self.model_name = "Wvolf/ViT_Deepfake_Detection"
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        logger.info(f"Using device: {self.device}")
        
        try:
            # Load the processor and model
            logger.info(f"Loading model: {self.model_name}")
            self.processor = ViTImageProcessor.from_pretrained(self.model_name)
            self.model = ViTForImageClassification.from_pretrained(self.model_name)
            self.model.to(self.device)
            self.model.eval()
            logger.info("Model loaded successfully!")
        except Exception as e:
            logger.error(f"Error loading model: {str(e)}")
            raise
    
    def predict_image(self, image):
        """
        Predict if an image is real or fake
        Args:
            image: PIL Image or path to image
        Returns:
            dict with 'fake_prob', 'real_prob', 'verdict', 'confidence'
        """
        try:
            # Load image if path is provided
            if isinstance(image, str):
                image = Image.open(image).convert('RGB')
            elif not isinstance(image, Image.Image):
                raise ValueError("Image must be PIL Image or file path")
            
            # Preprocess image
            inputs = self.processor(images=image, return_tensors="pt")
            inputs = {k: v.to(self.device) for k, v in inputs.items()}
            
            # Get prediction
            with torch.no_grad():
                outputs = self.model(**inputs)
                logits = outputs.logits
                
                # Apply softmax to get probabilities
                probs = torch.nn.functional.softmax(logits, dim=-1)
                probs = probs.cpu().numpy()[0]
            
            # Model outputs: [real_prob, fake_prob]
            real_prob = float(probs[0])
            fake_prob = float(probs[1])
            
            # Determine verdict
            verdict = "FAKE" if fake_prob > real_prob else "REAL"
            confidence = max(real_prob, fake_prob) * 100
            
            result = {
                'fake_prob': fake_prob,
                'real_prob': real_prob,
                'verdict': verdict,
                'confidence': round(confidence, 2)
            }
            
            logger.info(f"Prediction: {verdict} with {confidence:.2f}% confidence")
            return result
            
        except Exception as e:
            logger.error(f"Error during prediction: {str(e)}")
            raise
    
    def predict_video(self, frames, ensemble_method='weighted'):
        """
        Predict if a video is real or fake based on multiple frames
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
            
            # Analyze each frame
            for i, frame in enumerate(frames):
                result = self.predict_image(frame)
                frame_results.append({
                    'frame_number': i + 1,
                    'verdict': result['verdict'],
                    'confidence': result['confidence'],
                    'fake_prob': result['fake_prob']
                })
                fake_probs.append(result['fake_prob'])
            
            # Ensemble decision
            if ensemble_method == 'weighted':
                # 70% mean + 30% max (as per spec)
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
                'frame_breakdown': frame_results
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
        detector = DeepfakeDetector()
    return detector
