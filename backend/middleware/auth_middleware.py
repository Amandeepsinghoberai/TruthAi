from fastapi import Request, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from config.firebase_config import verify_firebase_token
import logging

logger = logging.getLogger(__name__)
security = HTTPBearer()

async def get_current_user(request: Request):
    """Extract and verify Firebase token from Authorization header"""
    auth_header = request.headers.get('Authorization')
    
    if not auth_header:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No authorization header found"
        )
    
    try:
        # Extract token from "Bearer <token>"
        scheme, token = auth_header.split()
        if scheme.lower() != 'bearer':
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Invalid authentication scheme"
            )
        
        # Verify token with Firebase
        decoded_token = verify_firebase_token(token)
        user_id = decoded_token['uid']
        email = decoded_token.get('email', '')
        
        return {
            'user_id': user_id,
            'email': email,
            'token': decoded_token
        }
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid authorization header format"
        )
    except Exception as e:
        logger.error(f"Token verification failed: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Token verification failed: {str(e)}"
        )
