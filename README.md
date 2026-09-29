# Nutrition Tracker

A web-based nutrition tracking application that allows you to:

- **Scan nutrition labels** using OCR (AI-powered image recognition)
- **Manually add products** with nutritional information
- **Track meals** by adding products with specific gram amounts
- **View nutrition summaries** aggregated across all meals
- **Export/Import data** for backup and transfer

## Features

- OCR-based nutrition label scanning (AI-powered)
- Manual product entry with full nutritional data
- Meal planning with gram-based portion scaling
- Aggregated nutrition summaries
- Data export/import functionality
- Responsive design

## How to Run

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd nutrition-tracker-b8w1b
   ```

2. Open `public/index.html` in a web browser. You can serve it locally:
   ```bash
   # Using Python
   python -m http.server 8000 -d public

   # Using Node.js with http-server
   npx http-server public
   ```

3. Open `http://localhost:8000` in your browser.

## AI Configuration

The app uses an OpenAI-compatible API for OCR-based nutrition label scanning.

### Setting up the AI endpoint:

1. Open the app in your browser
2. Scroll to the "AI Configuration" section
3. Enter your API endpoint URL (e.g., `https://api.openai.com/v1/chat/completions`)
4. Enter your API key
5. Enter the model name (default: `gpt-4`)
6. Click "Save Configuration"

**⚠️ Security Warning:** Your API key will be stored in the browser's localStorage. This is convenient but not secure — anyone with access to your browser on this device can view your API key. For production use, consider implementing a backend proxy that stores the key server-side.

### OCR Prompt

The OCR module sends the image data to the configured AI endpoint with a prompt asking it to extract nutritional information in a structured format. The response is parsed to extract:

- Energy (kcal)
- Fat (g)
- Saturated Fat (g)
- Carbohydrates (g)
- Sugars (g)
- Protein (g)
- Sodium (mg)

## How to Test

Run the test suite with:

```bash
npm test
```

The tests cover:

- OCR extraction (with mock data)
- Nutrition calculation and scaling
- Nutrition aggregation across multiple items
- Storage persistence (save, retrieve, delete)
- UI rendering functions

## Data Storage

All data is stored in the browser's localStorage:

- `nutrition_products` — Array of saved products
- `nutrition_meals` — Array of saved meals
- `nutrition_api_url` — AI endpoint URL
- `nutrition_api_key` — AI API key
- `nutrition_api_model` — AI model name

## Import/Export Data

Use the "Export Data" button to download all your data as a JSON file. Use the "Import Data" button to restore data from a previously exported JSON file.

## Not Done Yet

- **Real OCR integration**: The current implementation uses a mock/simulated OCR response. A real implementation would require a working AI API key and endpoint.
- **User authentication**: No login system — data is stored locally per browser.
- **Cloud sync**: No cloud backup or sync functionality.
- **Mobile app**: This is a web app only; no native mobile support.
- **Nutritional guidelines**: No daily recommended intake tracking or alerts.
- **Barcode scanning**: No barcode scanning support.
- **Recipe management**: No recipe creation or management features.
- **Multi-language OCR**: OCR accuracy depends on the AI model's ability to read nutrition labels in various languages.

## License

MIT