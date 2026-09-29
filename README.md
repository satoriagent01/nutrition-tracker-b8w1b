# Nutrition Tracker

A web application for tracking nutrition by scanning food labels with OCR.

## Features

- **OCR Scanning**: Upload photos of nutrition labels to automatically extract nutritional data
- **Product Management**: Manually add products with nutritional information
- **Meal Planning**: Create meals by combining multiple products with custom serving sizes
- **Nutrition Summary**: View aggregated nutritional data for any meal
- **Data Export/Import**: Backup and restore your data as JSON

## How to Run

1. Open `public/index.html` in a web browser
2. Configure your AI endpoint in the "AI Configuration" section:
   - **API URL**: The base URL of your OpenAI-compatible API (e.g., `https://api.openai.com/v1`)
   - **API Key**: Your API key (stored in localStorage)
   - **Model**: The model to use for OCR (default: `gpt-4o-mini`)
3. Save the configuration and start scanning!

## AI Configuration

The app uses an OpenAI-compatible API endpoint for OCR. Configure it via the UI:

- **API URL**: Must be a valid URL pointing to an OpenAI-compatible endpoint
- **API Key**: Your API key (saved to localStorage after confirmation)
- **Model**: The vision model to use (e.g., `gpt-4o-mini`, `gpt-4o`)

> **Security Warning**: The API key is stored in localStorage. This is convenient but not secure for production use. In a production environment, the API key should be stored server-side.

## How to Test

Run the tests with:

```bash
npm test
```

## Architecture

- **src/ocr.js**: OCR extraction module that calls the AI API or returns zero-filled data as fallback
- **src/nutrition.js**: Nutrition calculation (scaling per-100g values) and aggregation
- **src/storage.js**: localStorage-based persistence with abstraction for testing
- **src/ui.js**: UI rendering functions (used by tests)
- **public/index.html**: Main application with all UI logic

## Not Yet Done

- Real-time meal planning with live nutrition updates
- Daily/weekly nutrition goals and tracking
- Barcode scanning support
- Cloud sync for data backup
- Mobile app version