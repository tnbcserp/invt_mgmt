from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from app.services.google_sheets import sheets_service

router = APIRouter()

@router.get("/dashboard")
async def get_dashboard_data():
    """Get dashboard KPIs and overview data"""
    try:
        kpis = sheets_service.get_dashboard_kpis()
        return kpis
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching dashboard data: {str(e)}")

@router.get("/current-stock")
async def get_current_stock():
    """Get current stock levels for all products"""
    try:
        current_stock = sheets_service.calculate_current_stock()
        return current_stock
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching current stock: {str(e)}")

@router.get("/alerts")
async def get_stock_alerts():
    """Get stock alerts for low and critical stock items"""
    try:
        kpis = sheets_service.get_dashboard_kpis()
        alerts = {
            'low_stock_items': kpis.get('low_stock_items', []),
            'critical_stock_items': kpis.get('critical_stock_items', []),
            'total_alerts': len(kpis.get('low_stock_items', [])) + len(kpis.get('critical_stock_items', []))
        }
        return alerts
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching stock alerts: {str(e)}")

@router.get("/trends")
async def get_stock_trends():
    """Get stock movement trends"""
    try:
        stock_in_data = sheets_service.get_stock_in()
        stock_out_data = sheets_service.get_stock_out()

        # Calculate trends for last 7 days
        from datetime import datetime, timedelta
        seven_days_ago = datetime.now() - timedelta(days=7)

        recent_in = sum(
            record.get('Quantity In', 0) for record in stock_in_data
            if sheets_service._parse_date(record.get('Date', '')) >= seven_days_ago
        )

        recent_out = sum(
            record.get('Quantity Out', 0) for record in stock_out_data
            if sheets_service._parse_date(record.get('Date', '')) >= seven_days_ago
        )

        return {
            'weekly_in': recent_in,
            'weekly_out': recent_out,
            'net_movement': recent_in - recent_out
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching stock trends: {str(e)}")
