import json
from typing import List, Dict, Any, Optional
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import pandas as pd
from datetime import datetime, timedelta

from app.core.config import settings

class GoogleSheetsService:
    def __init__(self):
        self.creds = service_account.Credentials.from_service_account_info(
            settings.google_creds_dict,
            scopes=['https://www.googleapis.com/auth/spreadsheets.readonly']
        )
        self.service = build('sheets', 'v4', credentials=self.creds)
        self.spreadsheet_id = settings.SPREADSHEET_ID

    def get_sheet_data(self, sheet_name: str, range_name: str = None) -> List[List[Any]]:
        """Fetch data from a specific sheet"""
        try:
            if range_name:
                range_str = f"{sheet_name}!{range_name}"
            else:
                range_str = sheet_name

            result = self.service.spreadsheets().values().get(
                spreadsheetId=self.spreadsheet_id,
                range=range_str
            ).execute()

            return result.get('values', [])
        except HttpError as error:
            print(f"Error fetching data from {sheet_name}: {error}")
            return []

    def get_raw_materials(self) -> List[Dict[str, Any]]:
        """Fetch raw materials master data"""
        data = self.get_sheet_data(settings.RAW_MATERIAL_SHEET)
        if not data or len(data) < 2:
            return []

        headers = data[0]
        materials = []

        for row in data[1:]:
            if len(row) >= len(headers):
                material = dict(zip(headers, row))
                # Convert numeric fields
                try:
                    material['Avg. Cost per Unit'] = float(material.get('Avg. Cost per Unit', '0').replace('₹', ''))
                    material['Cost per Unit'] = float(material.get('Cost per Unit', '0').replace('₹', ''))
                    material['Reorder Level'] = float(material.get('Reorder Level', '0'))
                except (ValueError, AttributeError):
                    material['Avg. Cost per Unit'] = 0
                    material['Cost per Unit'] = 0
                    material['Reorder Level'] = 0

                materials.append(material)

        return materials

    def get_stock_in(self) -> List[Dict[str, Any]]:
        """Fetch stock in data"""
        data = self.get_sheet_data(settings.STOCK_IN_SHEET)
        if not data or len(data) < 2:
            return []

        headers = data[0]
        stock_in_records = []

        for row in data[1:]:
            if len(row) >= len(headers):
                record = dict(zip(headers, row))
                # Convert numeric fields
                try:
                    record['Quantity In'] = float(record.get('Quantity In', '0'))
                    record['Cost per Unit'] = float(record.get('Cost per Unit', '0').replace('₹', ''))
                except (ValueError, AttributeError):
                    record['Quantity In'] = 0
                    record['Cost per Unit'] = 0

                stock_in_records.append(record)

        return stock_in_records

    def get_stock_out(self) -> List[Dict[str, Any]]:
        """Fetch stock out data"""
        data = self.get_sheet_data(settings.STOCK_OUT_SHEET)
        if not data or len(data) < 2:
            return []

        headers = data[0]
        stock_out_records = []

        for row in data[1:]:
            if len(row) >= len(headers):
                record = dict(zip(headers, row))
                # Convert numeric fields
                try:
                    record['Quantity Out'] = float(record.get('Quantity Out', '0'))
                    record['Current Stock'] = float(record.get('Current Stock', '0'))
                except (ValueError, AttributeError):
                    record['Quantity Out'] = 0
                    record['Current Stock'] = 0

                stock_out_records.append(record)

        return stock_out_records

    def calculate_current_stock(self) -> List[Dict[str, Any]]:
        """Calculate current stock levels based on stock in and out"""
        stock_in_data = self.get_stock_in()
        stock_out_data = self.get_stock_out()
        raw_materials = self.get_raw_materials()

        # Create a dictionary to track stock levels
        stock_levels = {}

        # Initialize with raw materials
        for material in raw_materials:
            rm_id = material.get('RM ID', '')
            stock_levels[rm_id] = {
                'RM ID': rm_id,
                'Product Name': material.get('Product Name', ''),
                'Unit': material.get('Unit', ''),
                'Avg. Cost per Unit': material.get('Avg. Cost per Unit', 0),
                'Reorder Level': material.get('Reorder Level', 0),
                'Total In': 0,
                'Total Out': 0,
                'Current Stock': 0,
                'Stock Value': 0
            }

        # Calculate total stock in
        for record in stock_in_data:
            product_id = record.get('Product ID', '')
            if product_id in stock_levels:
                stock_levels[product_id]['Total In'] += record.get('Quantity In', 0)

        # Calculate total stock out
        for record in stock_out_data:
            product_id = record.get('Product ID', '')
            if product_id in stock_levels:
                stock_levels[product_id]['Total Out'] += record.get('Quantity Out', 0)

        # Calculate current stock and value
        for product_id, stock in stock_levels.items():
            stock['Current Stock'] = stock['Total In'] - stock['Total Out']
            stock['Stock Value'] = stock['Current Stock'] * stock['Avg. Cost per Unit']

        return list(stock_levels.values())

    def get_dashboard_kpis(self) -> Dict[str, Any]:
        """Calculate dashboard KPIs"""
        current_stock = self.calculate_current_stock()

        total_products = len(current_stock)
        total_stock_value = sum(item.get('Stock Value', 0) for item in current_stock)
        low_stock_items = [item for item in current_stock if item.get('Current Stock', 0) <= item.get('Reorder Level', 0)]
        critical_stock_items = [item for item in current_stock if item.get('Current Stock', 0) <= item.get('Reorder Level', 0) * 0.5]

        # Calculate monthly trends
        stock_in_data = self.get_stock_in()
        stock_out_data = self.get_stock_out()

        # Get last 30 days data
        thirty_days_ago = datetime.now() - timedelta(days=30)

        monthly_in = sum(
            record.get('Quantity In', 0) for record in stock_in_data
            if self._parse_date(record.get('Date', '')) >= thirty_days_ago
        )

        monthly_out = sum(
            record.get('Quantity Out', 0) for record in stock_out_data
            if self._parse_date(record.get('Date', '')) >= thirty_days_ago
        )

        return {
            'total_products': total_products,
            'total_stock_value': total_stock_value,
            'low_stock_count': len(low_stock_items),
            'critical_stock_count': len(critical_stock_items),
            'monthly_in': monthly_in,
            'monthly_out': monthly_out,
            'low_stock_items': low_stock_items,
            'critical_stock_items': critical_stock_items
        }

    def _parse_date(self, date_str: str) -> datetime:
        """Parse date string to datetime object"""
        try:
            # Handle different date formats
            for fmt in ['%d %b %y', '%d %B %Y', '%Y-%m-%d', '%d/%m/%Y']:
                try:
                    return datetime.strptime(date_str, fmt)
                except ValueError:
                    continue
            return datetime.now()
        except:
            return datetime.now()

# Create global instance
sheets_service = GoogleSheetsService()
