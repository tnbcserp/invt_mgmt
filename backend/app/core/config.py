from pydantic_settings import BaseSettings
from typing import List
import json
import os

class Settings(BaseSettings):
    # Google Sheets API Configuration
    GOOGLE_SHEETS_CREDS: str
    SPREADSHEET_ID: str
    RAW_MATERIAL_SHEET: str = "Raw Material Master"
    STOCK_IN_SHEET: str = "Stock In"
    STOCK_OUT_SHEET: str = "Stock Out"

    # API Configuration
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000
    DEBUG: bool = True

    # CORS Configuration
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000"]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        # Handle Render's $PORT environment variable
        if os.getenv('PORT'):
            self.API_PORT = int(os.getenv('PORT'))

    @property
    def google_creds_dict(self):
        """Convert Google Sheets credentials string to dictionary"""
        try:
            return json.loads(self.GOOGLE_SHEETS_CREDS)
        except json.JSONDecodeError:
            raise ValueError("Invalid GOOGLE_SHEETS_CREDS format")

    class Config:
        env_file = ".env"
        case_sensitive = True

# Create settings instance
settings = Settings()
