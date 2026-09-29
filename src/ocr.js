/**
 * OCR extraction module
 * Extracts nutritional information from OCR text or AI API response.
 */

/**
 * Extracts nutrition data from OCR text.
 * @param {string} ocrResponse - OCR text response (or imageData if apiConfig provided)
 * @param {object} [apiConfig] - Optional API configuration { url, key, model }
 * @returns {object} Nutrition data with keys: energy, fat, saturatedFat, carbs, sugars, protein, sodium
 */
export function extractNutrition(ocrResponse, apiConfig) {
  // If apiConfig is provided and has a key, call the AI API
  if (apiConfig && apiConfig.key && apiConfig.url) {
    return callAIOcr(ocrResponse, apiConfig);
  }

  // Otherwise, parse the OCR text directly
  return parseOcrText(ocrResponse);
}

/**
 * Calls the AI OCR endpoint to extract nutrition data.
 * @param {string} imageData - Base64 encoded image data
 * @param {object} apiConfig - API configuration { url, key, model }
 * @returns {Promise<object>} Nutrition data
 */
async function callAIOcr(imageData, apiConfig) {
  const response = await fetch(apiConfig.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiConfig.key}`
    },
    body: JSON.stringify({
      model: apiConfig.model || 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Extract nutritional information from this food label. Return only a JSON object with keys: energy (kcal/100g), fat (g/100g), saturatedFat (g/100g), carbs (g/100g), sugars (g/100g), protein (g/100g), sodium (g/100g). Use 0 for missing values.'
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
    throw new Error(`API request failed: ${response.status}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content || '';
  return parseOcrText(text);
}

/**
 * Parses OCR text to extract nutritional values.
 * @param {string} text - OCR text to parse
 * @returns {object} Nutrition data
 */
function parseOcrText(text) {
  const result = {
    energy: 0,
    fat: 0,
    saturatedFat: 0,
    carbs: 0,
    sugars: 0,
    protein: 0,
    sodium: 0
  };

  const lines = text.split('\n');
  
  for (const line of lines) {
    // Energy
    const energyMatch = line.match(/energy[:\s]+(\d+(?:\.\d+)?)\s*kcal/i);
    if (energyMatch) {
      result.energy = parseFloat(energyMatch[1]);
      continue;
    }

    // Saturated fat - must be checked before regular fat
    const satFatMatch = line.match(/saturated\s*(?:fat)?[:\s]+(\d+(?:\.\d+)?)\s*g/i);
    if (satFatMatch) {
      result.saturatedFat = parseFloat(satFatMatch[1]);
      continue;
    }

    // Fat
    const fatMatch = line.match(/\bfat[:\s]+(\d+(?:\.\d+)?)\s*g/i);
    if (fatMatch) {
      result.fat = parseFloat(fatMatch[1]);
      continue;
    }

    // Carbohydrates/carbs
    const carbsMatch = line.match(/(?:carbohydrate|carbs)[:\s]+(\d+(?:\.\d+)?)\s*g/i);
    if (carbsMatch) {
      result.carbs = parseFloat(carbsMatch[1]);
      continue;
    }

    // Sugars
    const sugarsMatch = line.match(/(?:sugar|sugars)[:\s]+(\d+(?:\.\d+)?)\s*g/i);
    if (sugarsMatch) {
      result.sugars = parseFloat(sugarsMatch[1]);
      continue;
    }

    // Protein
    const proteinMatch = line.match(/protein[:\s]+(\d+(?:\.\d+)?)\s*g/i);
    if (proteinMatch) {
      result.protein = parseFloat(proteinMatch[1]);
      continue;
    }

    // Sodium
    const sodiumMatch = line.match(/sodium[:\s]+(\d+(?:\.\d+)?)\s*g/i);
    if (sodiumMatch) {
      result.sodium = parseFloat(sodiumMatch[1]);
      continue;
    }
  }

  return result;
}