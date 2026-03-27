from fastapi import APIRouter, HTTPException, Depends, Request
from middleware.auth_middleware import get_current_user
from config.firebase_config import db
from pydantic import BaseModel
from datetime import datetime
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

class SurveyResponse(BaseModel):
    q1_awareness: str  # How aware are you of deepfakes?
    q2_concern: str    # How concerned are you?
    q3_encountered: str  # Have you encountered deepfakes?
    q4_app_rating: int  # Rate the app (1-5)
    q5_feedback: str    # Additional feedback

@router.post("/survey")
async def submit_survey(survey: SurveyResponse, request: Request):
    """Submit user survey response"""
    try:
        # Get current user
        user = await get_current_user(request)
        user_id = user['user_id']
        email = user['email']
        
        # Check if user already submitted survey
        existing_survey = db.collection('surveys').where('userId', '==', user_id).limit(1).get()
        if len(list(existing_survey)) > 0:
            raise HTTPException(
                status_code=400,
                detail="You have already submitted the survey"
            )
        
        # Save survey to Firestore
        survey_data = {
            'userId': user_id,
            'email': email,
            'q1_awareness': survey.q1_awareness,
            'q2_concern': survey.q2_concern,
            'q3_encountered': survey.q3_encountered,
            'q4_app_rating': survey.q4_app_rating,
            'q5_feedback': survey.q5_feedback,
            'timestamp': datetime.utcnow()
        }
        
        doc_ref = db.collection('surveys').document()
        doc_ref.set(survey_data)
        
        logger.info(f"Survey submitted by user {user_id}")
        
        return {
            'success': True,
            'message': 'Thank you for your feedback!',
            'surveyId': doc_ref.id
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error submitting survey: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error submitting survey: {str(e)}"
        )

@router.get("/survey/check")
async def check_survey_status(request: Request):
    """Check if user has already submitted survey"""
    try:
        # Get current user
        user = await get_current_user(request)
        user_id = user['user_id']
        
        # Check if survey exists
        existing_survey = db.collection('surveys').where('userId', '==', user_id).limit(1).get()
        has_submitted = len(list(existing_survey)) > 0
        
        return {
            'success': True,
            'hasSubmitted': has_submitted
        }
    
    except Exception as e:
        logger.error(f"Error checking survey status: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error checking survey status: {str(e)}"
        )
