import firebase_admin
from firebase_admin import credentials, auth, firestore
import os
from pathlib import Path

# Get the path to serviceAccountKey.json
CURRENT_DIR = Path(__file__).parent
SERVICE_ACCOUNT_PATH = CURRENT_DIR / 'serviceAccountKey.json'

# Initialize Firebase Admin SDK
if not firebase_admin._apps:
    cred = credentials.Certificate(str(SERVICE_ACCOUNT_PATH))
    firebase_admin.initialize_app(cred)

# Get Firestore client
db = firestore.client()

def verify_firebase_token(token: str):
    """Verify Firebase ID token and return decoded token"""
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        raise Exception(f"Invalid token: {str(e)}")
