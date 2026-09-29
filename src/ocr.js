/**
 * OCR module for extracting nutritional data from food images.
 * Parses OCR text to extract energy, fat, saturated fat, carbs, sugars, protein, and sodium.
 * Converts salt (g) to sodium (mg) using the standard conversion: sodium_mg = salt_g × 400.
 */

/**
 * Extracts nutritional information from OCR text.
 * @param {string} ocrResponse - The OCR text response from the AI API.
 * @param {Object} apiConfig - Optional API configuration (url, key, model).
 * @returns {Object} Nutritional data with keys: energy, fat, saturatedFat, carbs, sugars, protein, sodium.
 */
export function extractNutrition(ocrResponse, apiConfig) {
  const text = typeof ocrResponse === 'string' ? ocrResponse : JSON.stringify(ocrResponse);

  // If no OCR text, return zero-filled data
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

  // Parse values from OCR text
  const energy = parseValue(text, /(?:energy|kcal|calories?)\s*[:\s]*\s*([0-9,.]+)/i);
  const fat = parseValue(text, /(?:fat|fett|vet|lipidi|gras)\s*[:\s]*\s*([0-9,.]+)/i);
  const saturatedFat = parseValue(text, /(?:saturated\s*fat|saturated\s*fett|saturated\s*vet|saturated\s*lipidi|saturated\s*gras|saturated\s*fett|saturiertes\s*fett|saturerade\s*fetter|saturerade\s*fettsyror|saturerade\s*fettsyror|saturerade\s*fettsyror|saturerade\s*fettsyror)\s*[:\s]*\s*([0-9,.]+)/i);
  const carbs = parseValue(text, /(?:carbohydrate|carbohydrates|kohlhydrat|kohlhydrater|kolhydrat|kolhydrater|carboidrato|carboidrati|glucide|koolhydraten)\s*[:\s]*\s*([0-9,.]+)/i);
  const sugars = parseValue(text, /(?:sugar|sugars|zucker|socker|suiker|zucchero|zuccheri|sucre|suikers)\s*[:\s]*\s*([0-9,.]+)/i);
  const protein = parseValue(text, /(?:protein|eiweiss|eiwit|proteine|proteine|proteine|proteine)\s*[:\s]*\s*([0-9,.]+)/i);
  const salt = parseValue(text, /(?:salt|sodium|salz|zout|sel|sale)\s*[:\s]*\s*([0-9,.]+)/i);

  // Convert salt (g) to sodium (mg): sodium_mg = salt_g × 400
  const sodium = salt !== null ? salt * 400 : 0;

  return {
    energy: energy || 0,
    fat: fat || 0,
    saturatedFat: saturatedFat || 0,
    carbs: carbs || 0,
    sugars: sugars || 0,
    protein: protein || 0,
    sodium: sodium
  };
}

/**
 * Parses a numeric value from text using a regex pattern.
 * @param {string} text - The text to search in.
 * @param {RegExp} pattern - The regex pattern to match.
 * @returns {number|null} The parsed number or null if not found.
 */
function parseValue(text, pattern) {
  const match = text.match(pattern);
  if (match && match[1]) {
    return parseFloat(match[1].replace(',', '.'));
  }
  return null;
}