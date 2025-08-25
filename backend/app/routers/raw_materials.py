from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from app.services.google_sheets import sheets_service

router = APIRouter()

@router.get("/raw-materials", response_model=List[Dict[str, Any]])
async def get_raw_materials():
    """Get all raw materials from master sheet"""
    try:
        materials = sheets_service.get_raw_materials()
        return materials
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching raw materials: {str(e)}")

@router.get("/raw-materials/{rm_id}")
async def get_raw_material_by_id(rm_id: str):
    """Get specific raw material by RM ID"""
    try:
        materials = sheets_service.get_raw_materials()
        for material in materials:
            if material.get('RM ID') == rm_id:
                return material
        raise HTTPException(status_code=404, detail="Raw material not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching raw material: {str(e)}")
