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
  const content = data.choices?.[0]?.message?.content || '';

  try {
    // Try to extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        energy: parseFloat(parsed.energy) || 0,
        fat: parseFloat(parsed.fat) || 0,
        saturatedFat: parseFloat(parsed.saturatedFat) || 0,
        carbs: parseFloat(parsed.carbs) || 0,
        sugars: parseFloat(parsed.sugars) || 0,
        protein: parseFloat(parsed.protein) || 0,
        sodium: parseFloat(parsed.sodium) || 0
      };
    }
  } catch (e) {
    // Fall through to zero-filled data
  }

  // Return zero-filled data if parsing fails
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

/**
 * Parses OCR text to extract nutrition values.
 * @param {string} text - OCR text
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

  // Parse each line for nutrition values
  const lines = text.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();

    // Energy / Calories
    const energyMatch = trimmed.match(/(?:energy|calories)\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*kcal/i);
    if (energyMatch) {
      result.energy = parseFloat(energyMatch[1]);
      continue;
    }

    // Fat
    const fatMatch = trimmed.match(/(?:fat|lipids?)\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*g/i);
    if (fatMatch) {
      result.fat = parseFloat(fatMatch[1]);
      continue;
    }

    // Saturated Fat
    const satFatMatch = trimmed.match(/(?:saturated\s*fat|saturated\s?fett)\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*g/i);
    if (satFatMatch) {
      result.saturatedFat = parseFloat(satFatMatch[1]);
      continue;
    }

    // Carbohydrates
    const carbsMatch = trimmed.match(/(?:carbohydrate|carbohydrates|kohlehydrat|koolhydraat)\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*g/i);
    if (carbsMatch) {
      result.carbs = parseFloat(carbsMatch[1]);
      continue;
    }

    // Sugars - must come before sugar to match "Sugars" first
    const sugarsMatch = trimmed.match(/(?:sugars?|suiker|zucker|sucre)\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*g/i);
    if (sugarsMatch) {
      result.sugars = parseFloat(sugarsMatch[1]);
      continue;
    }

    // Protein
    const proteinMatch = trimmed.match(/(?:protein|eiweiss|eiwit|proteine)\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*g/i);
    if (proteinMatch) {
      result.protein = parseFloat(proteinMatch[1]);
      continue;
    }

    // Sodium / Salt
    const sodiumMatch = trimmed.match(/(?:sodium|salz|sel|zout|sale)\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*(?:g|mg)/i);
    if (sodiumMatch) {
      const value = parseFloat(sodiumMatch[1]);
      // If it's in mg, convert to g
      if (trimmed.toLowerCase().includes('mg')) {
        result.sodium = value / 1000;
      } else {
        result.sodium = value;
      }
      continue;
    }
  }

  return result;
}