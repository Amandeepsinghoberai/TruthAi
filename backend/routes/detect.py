from fastapi import APIRouter, UploadFile, File, HTTPException, Depends, Request
from middleware.auth_middleware import get_current_user
from model.detector import get_detector
from utils.video_utils import extract_frames_from_video, save_uploaded_file, cleanup_temp_file
from config.firebase_config import db
from datetime import datetime
import logging
import os
from PIL import Image
import io

logger = logging.getLogger(__name__)
router = APIRouter()

# Allowed file types
ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/avi', 'video/mov', 'video/mkv']
MAX_FILE_SIZE = 100 * 1024 * 1024  # 100MB

@router.post("/detect")
async def detect_deepfake(
    request: Request,
    file: UploadFile = File(...)
):
    """Upload and analyze image or video for deepfake detection"""
    temp_file_path = None
    
    try:
        # Get current user from token
        user = await get_current_user(request)
        user_id = user['user_id']
        
        # Validate file type
        content_type = file.content_type
        is_image = content_type in ALLOWED_IMAGE_TYPES
        is_video = content_type in ALLOWED_VIDEO_TYPES
        
        if not is_image and not is_video:
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported file type: {content_type}. Allowed: images (JPEG, PNG, WEBP) or videos (MP4, AVI, MOV, MKV)"
            )
        
        # Read file content
        file_content = await file.read()
        file_size = len(file_content)
        
        # Validate file size
        if file_size > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=400,
                detail=f"File too large. Maximum size: {MAX_FILE_SIZE / (1024*1024)}MB"
            )
        
        logger.info(f"Processing {content_type} file ({file_size} bytes) for user {user_id}")
        
        # Get detector
        detector = get_detector()
        
        # Process based on file type
        if is_image:
            # Process image
            image = Image.open(io.BytesIO(file_content)).convert('RGB')
            result = detector.predict_image(image)
            file_type = 'image'
        else:
            # Process video
            # Save to temp file first
            suffix = os.path.splitext(file.filename)[1]
            temp_file_path = save_uploaded_file(file_content, suffix)
            
            # Extract frames
            frames = extract_frames_from_video(temp_file_path, num_frames=20)
            
            # Analyze video
            result = detector.predict_video(frames, ensemble_method='weighted')
            file_type = 'video'
        
        # Save to Firestore
        scan_data = {
            'userId': user_id,
            'fileName': file.filename,
            'fileType': file_type,
            'verdict': result['verdict'],
            'confidence': result['confidence'],
            'fakeProbability': result['fake_prob'],
            'realProbability': result['real_prob'],
            'timestamp': datetime.utcnow(),
            'framesAnalyzed': result.get('frames_analyzed', 1),
            'frameBreakdown': result.get('frame_breakdown', [])
        }
        
        doc_ref = db.collection('scans').document()
        doc_ref.set(scan_data)
        
        logger.info(f"Scan saved with ID: {doc_ref.id}")
        
        # Return result
        return {
            'success': True,
            'scanId': doc_ref.id,
            'verdict': result['verdict'],
            'confidence': result['confidence'],
            'fileType': file_type,
            'fileName': file.filename,
            'details': result
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing file: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error processing file: {str(e)}"
        )
    finally:
        # Cleanup temp file
        if temp_file_path:
            cleanup_temp_file(temp_file_path)
