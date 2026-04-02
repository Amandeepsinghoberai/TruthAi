from fastapi import APIRouter, HTTPException, Depends, Request
from middleware.auth_middleware import get_current_user
from config.firebase_config import db
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

@router.get("/history")
async def get_scan_history(request: Request):
    """Get all scan history for the current user"""
    try:
        # Get current user
        user = await get_current_user(request)
        user_id = user['user_id']
        
        # Query Firestore for user's scans
        scans_ref = db.collection('scans')
        query = scans_ref.where('userId', '==', user_id)
        
        scans = []
        for doc in query.stream():
            scan_data = doc.to_dict()
            scan_data['scanId'] = doc.id
            # Store original timestamp for sorting
            original_timestamp = scan_data.get('timestamp')
            # Convert timestamp to ISO string
            if 'timestamp' in scan_data:
                scan_data['timestamp'] = scan_data['timestamp'].isoformat()
            # Keep timestamp for sorting
            scan_data['_timestamp_sort'] = original_timestamp
            scans.append(scan_data)
        
        # Sort by timestamp in Python (descending - newest first)
        scans.sort(key=lambda x: x.get('_timestamp_sort') or '', reverse=True)
        
        # Remove the sorting helper field
        for scan in scans:
            scan.pop('_timestamp_sort', None)
        
        logger.info(f"Retrieved {len(scans)} scans for user {user_id}")
        
        return {
            'success': True,
            'count': len(scans),
            'scans': scans
        }
    
    except Exception as e:
        logger.error(f"Error fetching history: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching history: {str(e)}"
        )

@router.delete("/history/{scan_id}")
async def delete_scan(scan_id: str, request: Request):
    """Delete a specific scan from history"""
    try:
        # Get current user
        user = await get_current_user(request)
        user_id = user['user_id']
        
        # Get the scan
        scan_ref = db.collection('scans').document(scan_id)
        scan_doc = scan_ref.get()
        
        if not scan_doc.exists:
            raise HTTPException(status_code=404, detail="Scan not found")
        
        scan_data = scan_doc.to_dict()
        
        # Verify ownership
        if scan_data.get('userId') != user_id:
            raise HTTPException(status_code=403, detail="Not authorized to delete this scan")
        
        # Delete the scan
        scan_ref.delete()
        
        logger.info(f"Deleted scan {scan_id} for user {user_id}")
        
        return {
            'success': True,
            'message': 'Scan deleted successfully'
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting scan: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error deleting scan: {str(e)}"
        )

@router.delete("/history")
async def clear_history(request: Request):
    """Clear all scan history for the current user"""
    try:
        # Get current user
        user = await get_current_user(request)
        user_id = user['user_id']
        
        # Query all user's scans
        scans_ref = db.collection('scans')
        query = scans_ref.where('userId', '==', user_id)
        
        # Delete all scans
        deleted_count = 0
        for doc in query.stream():
            doc.reference.delete()
            deleted_count += 1
        
        logger.info(f"Deleted {deleted_count} scans for user {user_id}")
        
        return {
            'success': True,
            'message': f'Cleared {deleted_count} scans from history'
        }
    
    except Exception as e:
        logger.error(f"Error clearing history: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error clearing history: {str(e)}"
        )
