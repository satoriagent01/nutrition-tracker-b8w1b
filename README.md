# Nutrition Tracker

A free, ad-free nutrition tracker web application that lets you scan product nutrition labels with your camera, extract nutritional information using AI-powered OCR, and create custom meal plans to track your intake.

## Features

- **📷 Photo Scan**: Take or upload photos of nutrition labels from product packaging
- **🤖 AI-Powered OCR**: Automatically extracts nutritional data (calories, fats, carbs, sugars, protein, sodium) from images
- **📦 Product Management**: Save and manage your food products with their nutritional profiles
- **🍽️ Meal Planning**: Create custom meal plans by specifying grams of each product
- **📊 Nutrition Tracking**: View total nutritional intake across your meals
- **🌍 Multi-language**: Handles nutrition labels in Dutch, German, French, Italian, English, and Spanish
- **💾 Local Storage**: All data stored locally in your browser — no accounts or cloud needed

## How to Run

No build step required. Simply serve the `public/` directory with any static file server:

```bash
# Using Python
python3 -m http.server 8080 -d public

# Using Node.js (with npx)
npx serve public

# Using PHP
php -S localhost:8080 -t public
```

Then open `http://localhost:8080` in your browser.

## How to Configure the AI Endpoint

The app uses an OpenAI-compatible API for OCR extraction. Configure it in the app's **⚙️ Config** tab:

1. **Endpoint URL**: The base URL of your OpenAI-compatible API (e.g., `https://api.openai.com/v1`)
2. **API Key**: Your API key for authentication
3. **Model**: The model to use (e.g., `gpt-4o`, `gpt-4-turbo`)

The app sends the photo as a base64-encoded image to the `/chat/completions` endpoint with a prompt asking for structured nutritional data.

### Example Configuration

```
Endpoint: https://api.openai.com/v1
API Key: sk-...
Model: gpt-4o
```

If no configuration is provided, the app uses mock data for demonstration purposes.

## How to Test

```bash
npm test
```

The test suite covers:

- **OCR extraction**: Parsing nutritional values from OCR text responses
- **Nutrition calculation**: Scaling per-100g values to custom gram amounts
- **Nutrition summation**: Aggregating nutritional data across multiple meal items
- **Product storage**: Saving and retrieving products from localStorage
- **Meal storage**: Saving and retrieving meals from localStorage

## What's Not Done Yet

- **Barcode scanning**: No support for scanning barcodes to look up products from databases
- **Nutrient database**: No built-in database of common products — all products must be scanned manually
- **Dietary goals**: No predefined diet plans (weight loss, heart health, etc.) — this is intentional per the spec
- **Cloud sync**: All data is stored locally; no account or sync functionality
- **Offline support**: No service worker for offline use
- **Multiple languages for UI**: The interface is in English only (though OCR handles multilingual labels)
- **Data validation**: No server-side validation (client-side only)

## Tech Stack

- **Node 24** with ES modules
- **No build step** — plain JavaScript
- **No dependencies** — uses only native browser APIs and Node.js modules
- **localStorage** for data persistence
- **OpenAI-compatible API** for OCR (configurable)

## License

MIT