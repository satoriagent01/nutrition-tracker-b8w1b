# Nutrition Tracker

A web-based nutrition tracking application that allows users to scan food labels, manage products, plan meals, and track nutritional intake.

## Features

- **OCR Label Scanning**: Upload food label images to automatically extract nutritional information using an AI vision model
- **Product Management**: Manually add products with their per-100g nutritional values
- **Meal Planning**: Add products to meals with custom gram amounts
- **Nutrition Summary**: View aggregated nutritional totals across all meals
- **Data Persistence**: All data is stored in localStorage
- **Import/Export**: Backup and restore your data as JSON

## How to Run

1. Clone the repository
2. Open `public/index.html` in a web browser
3. (Optional) Configure an AI endpoint for OCR scanning

No build step or server required — just open the HTML file directly.

## AI Configuration

To use the OCR label scanning feature, configure an OpenAI-compatible API endpoint:

1. **API URL**: The base URL of your OpenAI-compatible endpoint (e.g., `https://api.openai.com/v1`)
2. **API Key**: Your API key for authentication
3. **Model**: The model to use for vision tasks (e.g., `gpt-4o`)

The configuration is saved in your browser's localStorage. You'll be asked to confirm before saving.

### Supported Languages

The OCR module can extract nutritional data from labels in:
- English (sodium/salt)
- German (Salz)
- Dutch (zout)
- French (sel)
- Italian (sale)

## How to Test

Run the test suite with Node.js:

```bash
npm test
```

The tests cover:
- OCR extraction with multi-language support
- Salt-to-sodium conversion (salt × 400 = sodium in mg)
- Nutrition calculation and aggregation
- Storage persistence (products, meals, API config)
- UI rendering functions

## Sodium Conversion

European food labels typically show salt content in grams. This app converts salt to sodium for tracking:

```
sodium (mg) = salt (g) × 400
```

This is based on the standard conversion where salt (NaCl) contains approximately 39.3% sodium by weight.

## What's Not Done Yet

- No actual AI API integration (mock mode only when no API config is provided)
- No server-side component (purely client-side)
- No user authentication
- No cloud sync
- No mobile app
- No barcode scanning
- No recipe management
- No calorie goal tracking
- No meal history or trends