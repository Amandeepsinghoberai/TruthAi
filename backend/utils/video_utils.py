import cv2
import numpy as np
from PIL import Image
import tempfile
import os
import logging

logger = logging.getLogger(__name__)

def extract_frames_from_video(video_path: str, num_frames: int = 20):
    """Extract evenly spaced frames from video"""
    try:
        cap = cv2.VideoCapture(video_path)
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        
        if total_frames == 0:
            raise ValueError("Video has no frames")
        
        # Calculate frame indices to extract
        frame_indices = np.linspace(0, total_frames - 1, num_frames, dtype=int)
        
        frames = []
        for idx in frame_indices:
            cap.set(cv2.CAP_PROP_POS_FRAMES, idx)
            ret, frame = cap.read()
            
            if ret:
                # Convert BGR to RGB
                frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                # Convert to PIL Image
                pil_image = Image.fromarray(frame_rgb)
                frames.append(pil_image)
        
        cap.release()
        
        if not frames:
            raise ValueError("Could not extract any frames from video")
        
        logger.info(f"Extracted {len(frames)} frames from video")
        return frames
    
    except Exception as e:
        logger.error(f"Error extracting frames: {str(e)}")
        raise

def save_uploaded_file(file_content: bytes, suffix: str) -> str:
    """Save uploaded file to temporary location"""
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp_file:
        tmp_file.write(file_content)
        return tmp_file.name

def cleanup_temp_file(file_path: str):
    """Delete temporary file"""
    try:
        if os.path.exists(file_path):
            os.remove(file_path)
    except Exception as e:
        logger.warning(f"Could not delete temp file {file_path}: {str(e)}")
