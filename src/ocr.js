/**
 * OCR module for extracting nutritional data from food images.
 * Parses OCR text to extract energy, fat, saturated fat, carbs, sugars, protein, and sodium.
 */

function parseValue(text, regex) {
  const match = text.match(regex);
  if (match) {
    return parseFloat(match[1].replace(',', '.'));
  }
  return 0;
}

/**
 * Extracts nutritional information from OCR text or AI response.
 * @param {string} imageData - The image data (base64 or raw text).
 * @param {Object} [apiConfig] - Optional API configuration with url, key, and model.
 * @returns {Object|Promise<Object>} Nutritional data with keys: energy, fat, saturatedFat, carbs, sugars, protein, sodium.
 */
export function extractNutrition(imageData, apiConfig) {
  // If apiConfig is provided with url and key, call the AI endpoint (async)
  if (apiConfig && apiConfig.url && apiConfig.key) {
    return callAiEndpoint(imageData, apiConfig);
  }

  // No API config: try to parse imageData as text if it's not base64
  if (typeof imageData === 'string' && !imageData.startsWith('data:')) {
    return parseNutritionText(imageData);
  }

  // Otherwise return zero-filled data
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
 * Calls the AI OCR endpoint.
 * @param {string} imageData - The image data (base64).
 * @param {Object} apiConfig - API configuration.
 * @returns {Promise<Object>} Nutritional data.
 */
async function callAiEndpoint(imageData, apiConfig) {
  try {
    const response = await fetch(apiConfig.url + '/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiConfig.key
      },
      body: JSON.stringify({
        model: apiConfig.model || 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Extract nutritional information from this food label. Return only a JSON object with keys: energy (kcal/100g), fat (g/100g), saturatedFat (g/100g), carbs (g/100g), sugars (g/100g), protein (g/100g), sodium (mg/100g). If salt is given instead of sodium, convert it: sodium_mg = salt_g × 400.'
              },
              {
                type: 'image_url',
                image_url: { url: imageData }
              }
            ]
          }
        ],
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error('API request failed: ' + response.status);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';
    return parseNutritionText(content);
  } catch (err) {
    // If AI call fails and imageData looks like text, fall through to local parsing
    if (typeof imageData === 'string' && !imageData.startsWith('data:')) {
      return parseNutritionText(imageData);
    }
    throw err;
  }
}

/**
 * Parses nutritional text from OCR or AI response.
 * @param {string} text - The OCR/AI text response.
 * @returns {Object} Nutritional data.
 */
function parseNutritionText(text) {
  if (!text || text.trim() === '') {
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

  // Try to extract JSON from the response
  let jsonText = text;
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (jsonMatch) {
    jsonText = jsonMatch[1];
  }

  try {
    const parsed = JSON.parse(jsonText);
    if (parsed.energy !== undefined) {
      return {
        energy: parsed.energy || 0,
        fat: parsed.fat || 0,
        saturatedFat: parsed.saturatedFat || 0,
        carbs: parsed.carbs || 0,
        sugars: parsed.sugars || 0,
        protein: parsed.protein || 0,
        sodium: parsed.sodium || 0
      };
    }
  } catch (e) {
    // Fall through to regex parsing
  }

  // Regex-based parsing as fallback
  const energy = parseValue(text, /(?:energy|kcal|calories?)\s*[:\s]*\s*([0-9,.]+)/i);
  const fat = parseValue(text, /(?:fat|fett|vet|lipidi|gras)\s*[:\s]*\s*([0-9,.]+)/i);
  const saturatedFat = parseValue(text, /(?:saturated\s*(?:fat|fett|vet|lipidi|gras))\s*[:\s]*\s*([0-9,.]+)/i);
  const carbs = parseValue(text, /(?:carbohydrate|carbohydrates|kohlhydrat|kohlhydrater|kolhydrat|kolhydrater|carboidrato|carboidrati|glucide|koolhydraten)\s*[:\s]*\s*([0-9,.]+)/i);
  const sugars = parseValue(text, /(?:sugar|sugars|zucker|socker|suiker|zucchero|zuccheri|sucre|suikers)\s*[:\s]*\s*([0-9,.]+)/i);
  const protein = parseValue(text, /(?:protein|eiweiss|eiwit|proteine)\s*[:\s]*\s*([0-9,.]+)/i);

  // Parse sodium first (exact field name)
  let sodium = parseValue(text, /(?:sodium)\s*[:\s]*\s*([0-9,.]+)/i);

  // If no sodium found, try salt and convert: sodium_mg = salt_g × 400
  if (sodium === 0) {
    const salt = parseValue(text, /(?:salt|salz|zout|sel|sale)\s*[:\s]*\s*([0-9,.]+)/i);
    if (salt > 0) {
      sodium = salt * 400;
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