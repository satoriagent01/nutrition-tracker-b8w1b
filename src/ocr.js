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
 * Extracts nutritional information from OCR text.
 * @param {string} ocrResponse - The OCR text response from the AI API.
 * @returns {Object} Nutritional data with keys: energy, fat, saturatedFat, carbs, sugars, protein, sodium.
 */
export function extractNutrition(ocrResponse) {
  const text = typeof ocrResponse === 'string' ? ocrResponse : JSON.stringify(ocrResponse);

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

  const energy = parseValue(text, /(?:energy|kcal|calories?)\s*[:\s]*\s*([0-9,.]+)/i);
  const fat = parseValue(text, /(?:fat|fett|vet|lipidi|gras)\s*[:\s]*\s*([0-9,.]+)/i);
  const saturatedFat = parseValue(text, /(?:saturated\s*(?:fat|fett|vet|lipidi|gras))\s*[:\s]*\s*([0-9,.]+)/i);
  const carbs = parseValue(text, /(?:carbohydrate|carbohydrates|kohlhydrat|kohlhydrater|kolhydrat|kolhydrater|carboidrato|carboidrati|glucide|koolhydraten)\s*[:\s]*\s*([0-9,.]+)/i);
  const sugars = parseValue(text, /(?:sugar|sugars|zucker|socker|suiker|zucchero|zuccheri|sucre|suikers)\s*[:\s]*\s*([0-9,.]+)/i);
  const protein = parseValue(text, /(?:protein|eiweiss|eiwit|proteine)\s*[:\s]*\s*([0-9,.]+)/i);
  const sodium = parseValue(text, /(?:sodium|salt|salz|zout|sel|sale)\s*[:\s]*\s*([0-9,.]+)/i);

  return { energy, fat, saturatedFat, carbs, sugars, protein, sodium };
}