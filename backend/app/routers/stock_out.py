from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from app.services.google_sheets import sheets_service

router = APIRouter()

@router.get("/stock-out", response_model=List[Dict[str, Any]])
async def get_stock_out():
    """Get all stock out records"""
    try:
        stock_out_data = sheets_service.get_stock_out()
        return stock_out_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching stock out data: {str(e)}")

@router.get("/stock-out/recent")
async def get_recent_stock_out(limit: int = 10):
    """Get recent stock out records"""
    try:
        stock_out_data = sheets_service.get_stock_out()
        # Sort by date (assuming first column is date)
        sorted_data = sorted(stock_out_data, key=lambda x: x.get('Date', ''), reverse=True)
        return sorted_data[:limit]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching recent stock out data: {str(e)}")
