/**
 * OCR module for extracting nutritional information from food images.
 * Uses an OpenAI-compatible API to analyze food labels and extract
 * nutritional data.
 */

/**
 * Extracts nutritional information from OCR text using multi-language regex.
 * Supports English, German, Dutch, French, and Italian labels.
 *
 * @param {string} ocrResponse - The OCR text response from the API
 * @param {Object} apiConfig - Configuration for the OCR API (optional)
 * @param {string} apiConfig.url - The API endpoint URL
 * @param {string} apiConfig.key - The API key
 * @param {string} apiConfig.model - The model to use
 * @returns {Object} Nutritional data with keys: energy, fat, saturatedFat, carbs, sugars, protein, sodium
 */
export function extractNutrition(ocrResponse, apiConfig) {
  if (!ocrResponse || typeof ocrResponse !== 'string') {
    return {
      energy: 0,
      fat: 0,
      saturatedFat: 0,
      carbs: 0,
      sugars: 0,
      protein: 0,
      sodium: 0
    };
  }

  const text = ocrResponse;

  // Extract energy (kcal or kJ)
  const energyMatch = text.match(/(?:energy|calories|kcal|kj|energi|energie|calorie|calorie|energia)\s*[:\-]?\s*(\d[\d,.]*)\s*(kcal|kj|kJ|Kcal|Kj|Kcal|KJ|kCal|kCal)/i);
  let energy = 0;
  if (energyMatch) {
    energy = parseFloat(energyMatch[1].replace(',', '.'));
    // If it's kJ, convert to kcal (divide by 4.184)
    if (energyMatch[2].toLowerCase().includes('kj')) {
      energy = Math.round(energy / 4.184 * 100) / 100;
    }
  }

  // Extract fat
  const fatMatch = text.match(/(?:fat|fett|vet|lipidi|lipides|gras)\s*[:\-]?\s*(\d[\d,.]*)\s*(g|gram|gramme|grammi)/i);
  let fat = 0;
  if (fatMatch) {
    fat = parseFloat(fatMatch[1].replace(',', '.'));
  }

  // Extract saturated fat (must be before regular fat to avoid collision)
  const satFatMatch = text.match(/(?:saturated\s*(?:fat|fett|vet|lipidi|lipides)|saturated\s+fat|saturated\s+fett|saturated\s+vet|saturated\s+lipidi|saturated\s+lipides|total\s+fett|total\s+vet|total\s+lipidi|total\s+lipides|total\s+gras|total\s+fat)\s*[:\-]?\s*(\d[\d,.]*)\s*(g|gram|gramme|grammi)/i);
  let saturatedFat = 0;
  if (satFatMatch) {
    saturatedFat = parseFloat(satFatMatch[1].replace(',', '.'));
  }

  // Extract carbs
  const carbsMatch = text.match(/(?:carbohydrate|carbohydrates|carbohidrato|carbohidrati|glucide|glucides|kohlenhydrat|kohlenhydrate|koolhydraat|koolhydraten)\s*[:\-]?\s*(\d[\d,.]*)\s*(g|gram|gramme|grammi)/i);
  let carbs = 0;
  if (carbsMatch) {
    carbs = parseFloat(carbsMatch[1].replace(',', '.'));
  }

  // Extract sugars
  const sugarsMatch = text.match(/(?:sugars|sugar|zucker|sucre|zucchero|zoete|suiker|zucker|azucar)\s*[:\-]?\s*(\d[\d,.]*)\s*(g|gram|gramme|grammi)/i);
  let sugars = 0;
  if (sugarsMatch) {
    sugars = parseFloat(sugarsMatch[1].replace(',', '.'));
  }

  // Extract protein
  const proteinMatch = text.match(/(?:protein|eiweiss|eiwit|proteine|proteina|proteine)\s*[:\-]?\s*(\d[\d,.]*)\s*(g|gram|gramme|grammi)/i);
  let protein = 0;
  if (proteinMatch) {
    protein = parseFloat(proteinMatch[1].replace(',', '.'));
  }

  // Extract salt/sodium - supports multiple languages
  // salt (g) → sodium (mg) conversion: salt × 2.5 × 1000
  const saltMatch = text.match(/(?:salt|sodium|salz|zout|sel|sale)\s*[:\-]?\s*(\d[\d,.]*)\s*(g|gram|gramme|grammi|mg)/i);
  let sodium = 0;
  if (saltMatch) {
    const value = parseFloat(saltMatch[1].replace(',', '.'));
    const unit = saltMatch[2].toLowerCase();
    if (unit === 'mg') {
      // Already in mg, convert to sodium: mg salt × 2.5 = mg sodium
      sodium = Math.round(value * 2.5 * 100) / 100;
    } else {
      // In grams, convert to sodium in mg: g salt × 2.5 × 1000 = mg sodium
      sodium = Math.round(value * 2.5 * 1000 * 100) / 100;
    }
  }

  return {
    energy,
    fat,
    saturatedFat,
    carbs,
    sugars,
    protein,
    sodium
  };
}

/**
 * Calls an OpenAI-compatible API to extract nutrition from an image.
 *
 * @param {string} imageData - Base64 encoded image data
 * @param {Object} apiConfig - Configuration for the OCR API
 * @param {string} apiConfig.url - The API endpoint URL
 * @param {string} apiConfig.key - The API key
 * @param {string} apiConfig.model - The model to use
 * @returns {Promise<Object>} Nutritional data
 */
export async function extractNutritionFromImage(imageData, apiConfig) {
  if (!apiConfig || !apiConfig.url || !apiConfig.key) {
    throw new Error('API configuration required. Please set up your API endpoint, key, and model.');
  }

  const response = await fetch(apiConfig.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiConfig.key}`
    },
    body: JSON.stringify({
      model: apiConfig.model || 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Extract nutritional information from this food label. Return the values for energy (kcal), fat, saturated fat, carbohydrates, sugars, protein, and salt/sodium. Use the format: energy: X kcal, fat: X g, saturated fat: X g, carbs: X g, sugars: X g, protein: X g, salt: X g.'
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${imageData}`
              }
            }
          ]
        }
      ],
      max_tokens: 500
    })
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const ocrText = data.choices?.[0]?.message?.content || '';

  return extractNutrition(ocrText, apiConfig);
}