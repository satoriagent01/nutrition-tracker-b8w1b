# Nutrition Tracker - Product Specification

## Product Overview

A free, ad-free nutrition tracker web application that allows users to:
1. Take or upload photos of product nutrition labels
2. Use AI-powered OCR to extract nutritional information from the photos
3. Create custom meal plans by specifying grams of each product/food item
4. Track nutritional intake (calories, sodium, saturated fats, etc.) based on meal plans
5. Focus on custom tracking without being tied to a specific diet goal

## User Stories

- As a user, I want to take a photo of a nutrition label so I can quickly add products to my tracker
- As a user, I want the app to extract nutritional information from the photo automatically
- As a user, I want to specify the serving size in grams for each product
- As a user, I want to create meal plans with multiple products
- As a user, I want to see total nutritional values for my meals
- As a user, I want to track specific nutrients like calories, sodium, and saturated fats

## Functional Requirements

### 1. Photo Upload
- Users can take photos using device camera or upload existing images
- Supported formats: JPEG, PNG
- Images should be processed for OCR extraction

### 2. OCR Extraction
- AI-powered OCR extracts nutritional information from photos
- Extracts: energy (calories/kJ), fats, saturated fats, carbohydrates, sugars, proteins, sodium
- Handles multiple languages (Dutch, German, French, Italian, English, Spanish)
- Returns structured nutritional data

### 3. Meal Planning
- Users can create meal plans with multiple products
- Specify grams of each product per meal
- Calculate total nutritional values based on serving size

### 4. Nutritional Tracking
- Track calories, sodium, saturated fats, and other nutrients
- Custom tracking without predefined diet goals
- Display nutritional breakdown per meal and overall

## Non-Functional Requirements

- Free and ad-free application
- Responsive web design (mobile-first)
- No build step required
- Runs on Node 24 with ES modules
- Static web page in public/
- All data stored locally (localStorage)

## Data Model

### Product
```javascript
{
  id: string,
  name: string,
  servingSize: {
    amount: number,
    unit: string // 'g' or 'ml'
  },
  nutritionPer100: {
    energyKj: number,
    energyKcal: number,
    fat: number,
    saturatedFat: number,
    carbohydrates: number,
    sugars: number,
    protein: number,
    sodium: number
  }
}
```

### Meal
```javascript
{
  id: string,
  name: string,
  date: string,
  items: [{
    productId: string,
    grams: number
  }]
}
```

### Nutrition Summary
```javascript
{
  energyKcal: number,
  fat: number,
  saturatedFat: number,
  carbohydrates: number,
  sugars: number,
  protein: number,
  sodium: number
}
```

## Acceptance Criteria

### AC-1: Photo Upload
- Users can upload images from their device
- Users can take photos using device camera
- Supported formats: JPEG, PNG

### AC-2: OCR Extraction
- App extracts nutritional information from uploaded photos
- Handles images with nutrition tables in multiple languages
- Returns structured data with all nutritional values

### AC-3: Product Management
- Users can add products extracted from photos
- Users can edit product information (name, serving size)
- Products are stored locally

### AC-4: Meal Planning
- Users can create meal plans
- Users can add products to meals with specified grams
- Users can view meal contents

### AC-5: Nutritional Tracking
- App calculates total nutritional values for meals
- Users can view nutritional breakdown per meal
- Users can view overall nutritional tracking

### AC-6: User Interface
- Responsive design works on mobile and desktop
- Clean, intuitive interface
- No ads or premium features

## Module Structure

### src/ocr.js
- `extractNutrition(imageData: string): Promise<NutritionData>`
  - Takes base64 image data
  - Calls OpenAI-compatible OCR endpoint
  - Returns structured nutritional data
  - Example: Extracts from chocolate bar photo → {energyKcal: 549, fat: 33, carbohydrates: 55, sugars: 45, protein: 6.8, sodium: 0.18}

### src/nutrition.js
- `calculateNutrition(product: Product, grams: number): NutritionSummary`
  - Takes product and grams
  - Returns calculated nutrition for specified amount
  - Example: Product with 549 kcal per 100g, 50g → 274.5 kcal

- `sumNutrition(items: Array<{product, grams}>): NutritionSummary`
  - Takes array of meal items
  - Returns total nutrition
  - Example: Sum of multiple products in a meal

### src/storage.js
- `saveProduct(product: Product): void`
  - Saves product to localStorage
- `getProducts(): Product[]`
  - Returns all saved products
- `saveMeal(meal: Meal): void`
  - Saves meal to localStorage
- `getMeals(): Meal[]`
  - Returns all saved meals

### src/ui.js
- `renderProductForm(): HTMLElement`
  - Returns product form HTML
- `renderMealPlanner(): HTMLElement`
  - Returns meal planner HTML
- `renderNutritionSummary(): HTMLElement`
  - Returns nutrition summary HTML

## API Configuration

Users configure the AI endpoint in the UI:
- Endpoint URL (OpenAI-compatible)
- API Key
- Model name

Tests never call the actual API - they use mock data.