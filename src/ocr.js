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
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || '';

  // Extract JSON from the response
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }

  // If no JSON found, return zero-filled data
  return createZeroFilledNutrition();
}

/**
 * Parses OCR text to extract nutritional values.
 * @param {string} text - OCR text
 * @returns {object} Nutrition data
 */
function parseOcrText(text) {
  const result = createZeroFilledNutrition();

  // Parse energy (kcal)
  const energyMatch = text.match(/(?:Energie|Energy|Energie|Energie|Energie)\s*[:\s]*\s*(\d[\d.,]*)\s*(?:kcal|kJ|Calories)/i);
  if (energyMatch) {
    result.energy = parseFloat(energyMatch[1].replace(',', '.')) || 0;
  }

  // Parse fat
  const fatMatch = text.match(/(?:Fett|Fat|Vet|Lipid|Lipidi)\s*[:\s]*\s*(\d[\d.,]*)\s*(?:g|gram)/i);
  if (fatMatch) {
    result.fat = parseFloat(fatMatch[1].replace(',', '.')) || 0;
  }

  // Parse saturated fat
  const satFatMatch = text.match(/(?:Sättigende\s+Fettsäuren|Saturated\s+Fat|Saturated\s+Fett|Saturated\s+Fett|Saturated\s+Fett|Satureerde\s+vetzuren|Acides\s+gras\s+saturés)\s*[:\s]*\s*(\d[\d.,]*)\s*(?:g|gram)/i);
  if (satFatMatch) {
    result.saturatedFat = parseFloat(satFatMatch[1].replace(',', '.')) || 0;
  }

  // Parse carbs
  const carbsMatch = text.match(/(?:Kohlenhydrate|Carbohydrate|Koolhydraten|Glucides|Carboidrati)\s*[:\s]*\s*(\d[\d.,]*)\s*(?:g|gram)/i);
  if (carbsMatch) {
    result.carbs = parseFloat(carbsMatch[1].replace(',', '.')) || 0;
  }

  // Parse sugars
  const sugarsMatch = text.match(/(?:davon\s+Zucker|of\s+which\s+sugars|waarvan\s+suikers|dont\s+sucre|di\s+zuccheri|Sugar|Sugars)\s*[:\s]*\s*(\d[\d.,]*)\s*(?:g|gram)?/i);
  if (sugarsMatch) {
    result.sugars = parseFloat(sugarsMatch[1].replace(',', '.')) || 0;
  }

  // Parse protein
  const proteinMatch = text.match(/(?:Eiweiß|Eiweiss|Protein|Proteins|Eiwit|Protéine|Proteine)\s*[:\s]*\s*(\d[\d.,]*)\s*(?:g|gram)/i);
  if (proteinMatch) {
    result.protein = parseFloat(proteinMatch[1].replace(',', '.')) || 0;
  }

  // Parse sodium
  const sodiumMatch = text.match(/(?:Sodium|Salz|Sel|Zout|Sale)\s*[:\s]*\s*(\d[\d.,]*)\s*(?:g|gram)?/i);
  if (sodiumMatch) {
    result.sodium = parseFloat(sodiumMatch[1].replace(',', '.')) || 0;
  }

  return result;
}

/**
 * Creates a zero-filled nutrition object.
 * @returns {object} Zero-filled nutrition data
 */
function createZeroFilledNutrition() {
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