from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
from dotenv import load_dotenv

from app.routers import raw_materials, stock_in, stock_out, dashboard
from app.core.config import settings

# Load environment variables
load_dotenv()

# Create FastAPI app
app = FastAPI(
    title="Raw Material Inventory API",
    description="API for managing raw material inventory using Google Sheets",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(raw_materials.router, prefix="/api/v1", tags=["Raw Materials"])
app.include_router(stock_in.router, prefix="/api/v1", tags=["Stock In"])
app.include_router(stock_out.router, prefix="/api/v1", tags=["Stock Out"])
app.include_router(dashboard.router, prefix="/api/v1", tags=["Dashboard"])

@app.get("/")
async def root():
    return JSONResponse(
        content={
            "message": "Raw Material Inventory API",
            "version": "1.0.0",
            "docs": "/docs",
            "status": "running"
        }
    )

@app.get("/health")
async def health_check():
    return JSONResponse(
        content={
            "status": "healthy",
            "service": "inventory-api"
        }
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.API_HOST,
        port=settings.API_PORT,
        reload=settings.DEBUG
    )
