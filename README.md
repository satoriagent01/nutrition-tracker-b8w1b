# Nutrition Tracker

A web-based nutrition tracking application that uses AI-powered OCR to scan food labels and track nutritional intake.

## Features

- **AI-Powered Label Scanning**: Upload photos of nutrition labels and let AI extract nutritional data automatically
- **Product Management**: Manually add products with their nutritional information
- **Meal Planning**: Build meals by combining products with custom serving sizes
- **Nutrition Summary**: View aggregated nutritional data for your meals
- **Data Persistence**: All data is saved to localStorage
- **Data Export/Import**: Backup and restore your data as JSON files
- **Multi-language OCR**: Supports English, German, Dutch, French, and Italian nutrition labels

## How to Run

1. Clone the repository
2. Open `public/index.html` in a web browser
3. Configure your AI OCR endpoint (see below)
4. Start scanning food labels and tracking nutrition!

## AI OCR Configuration

The app uses an OpenAI-compatible API for OCR. To configure:

1. Open the app in your browser
2. Fill in the API configuration section at the top:
   - **API Key**: Your OpenAI-compatible API key
   - **API URL**: The base URL of your API endpoint (e.g., `https://api.openai.com/v1`)
   - **Model**: The model to use (e.g., `gpt-4o-mini`)
3. Click "Save Configuration"

The OCR module sends the image as base64 to the `/chat/completions` endpoint with a prompt asking for nutritional data in JSON format.

### Supported Languages

The OCR regex supports nutrition labels in:
- English (sodium, salt)
- German (Salz)
- Dutch (zout)
- French (sel)
- Italian (sale)

## How to Use

### Scanning a Label

1. Click the photo upload area or drag an image
2. Click "Scan with AI"
3. Wait for the AI to process the image
4. Review the detected nutrition data
5. Click "Add to Products" to save the product

### Adding Products Manually

1. Fill in the product name and nutritional values
2. Click "Add Product"

### Creating a Meal

1. Enter a meal name
2. Select a product from the dropdown
3. Enter the amount in grams
4. Click "Add to Meal"
5. Repeat for additional items
6. Click "Save Meal"

### Viewing Nutrition Summary

The nutrition summary panel shows the total nutritional values for all items currently in your meal, including:
- Energy (kcal)
- Fat (g)
- Saturated Fat (g)
- Carbs (g)
- Sugars (g)
- Protein (g)
- Sodium (mg)

### Managing Data

- **Export Data**: Download all your data as a JSON file
- **Import Data**: Restore data from a JSON file
- **Clear All Data**: Remove all stored data (with confirmation)

## Testing

Run the tests with:

```bash
npm test
```

## Technical Details

- **Node.js**: 24+ (ES modules)
- **No build step**: Runs directly in the browser and Node.js
- **No dependencies**: Pure JavaScript with standard APIs
- **Storage**: Uses localStorage for persistence
- **AI Integration**: Uses fetch() to call OpenAI-compatible endpoints

## What's Not Done Yet

- No actual AI API integration (uses mock data when no API is configured)
- No server-side component (runs entirely client-side)
- No user authentication
- No cloud sync
- No barcode scanning
- No recipe management
- No meal history tracking
- No nutritional goal setting
- No mobile app

## License

MIT