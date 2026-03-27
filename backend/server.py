from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import logging
from pathlib import Path

# Import routes
from routes import detect, history, survey

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="Truth AI - Deepfake Detection API",
    description="AI-powered deepfake detection for images and videos",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoints (no auth required)
@app.get("/")
async def root():
    return {
        "message": "Truth AI - Deepfake Detection API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
async def health():
    return {"status": "healthy"}

# Include API routes with /api prefix
app.include_router(detect.router, prefix="/api", tags=["Detection"])
app.include_router(history.router, prefix="/api", tags=["History"])
app.include_router(survey.router, prefix="/api", tags=["Survey"])

@app.on_event("startup")
async def startup_event():
    logger.info("Starting Truth AI API...")
    logger.info("Initializing AI model (this may take a moment on first run)...")
    # Initialize model on startup
    from model.detector import get_detector
    try:
        get_detector()
        logger.info("AI model loaded successfully!")
    except Exception as e:
        logger.error(f"Failed to load AI model: {str(e)}")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Shutting down Truth AI API...")
