from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from app.services.google_sheets import sheets_service

router = APIRouter()

@router.get("/stock-in", response_model=List[Dict[str, Any]])
async def get_stock_in():
    """Get all stock in records"""
    try:
        stock_in_data = sheets_service.get_stock_in()
        return stock_in_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching stock in data: {str(e)}")

@router.get("/stock-in/recent")
async def get_recent_stock_in(limit: int = 10):
    """Get recent stock in records"""
    try:
        stock_in_data = sheets_service.get_stock_in()
        # Sort by date (assuming first column is date)
        sorted_data = sorted(stock_in_data, key=lambda x: x.get('Date', ''), reverse=True)
        return sorted_data[:limit]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching recent stock in data: {str(e)}")
