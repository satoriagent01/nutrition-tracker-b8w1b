/**
 * OCR module for extracting nutritional information from food labels.
 * Parses multi-language nutrition labels using regex.
 */

/**
 * Extracts nutritional information from OCR text.
 * Supports English, German, Dutch, French, and Italian labels.
 *
 * @param {string} ocrResponse - The OCR text response
 * @param {Object} apiConfig - Optional API configuration (unused in mock)
 * @returns {Object} Nutritional data: energy, fat, saturatedFat, carbs, sugars, protein, sodium
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

  const getVal = (regex) => {
    const m = text.match(regex);
    return m ? parseFloat(m[1].replace(',', '.')) : 0;
  };

  const energy = getVal(/(?:energy|calories|kcal|kj|energi|energie|calorie|energia)\s*[:\-]?\s*(\d[\d,.]*)\s*(kcal|kj|kJ)/i);
  const fat = getVal(/(?:fat|fett|vet|lipidi|lipides|gras)\s*[:\-]?\s*(\d[\d,.]*)\s*g/i);
  const saturatedFat = getVal(/(?:saturated\s*(?:fat|fett|vet|lipidi|lipides)|saturated\s+fat)\s*[:\-]?\s*(\d[\d,.]*)\s*g/i);
  const carbs = getVal(/(?:carbohydrate|carbs|kohlenhydrate|koolhydraten|glucides|carboidrati)\s*[:\-]?\s*(\d[\d,.]*)\s*g/i);
  const sugars = getVal(/(?:sugar|sugars|zucker|suiker|sucres|zuccheri)\s*[:\-]?\s*(\d[\d,.]*)\s*g/i);
  const protein = getVal(/(?:protein|eiweiss|proteine)\s*[:\-]?\s*(\d[\d,.]*)\s*g/i);
  const sodium = getVal(/(?:sodium|salt|salz|zout|sel|sale)\s*[:\-]?\s*(\d[\d,.]*)\s*g/i);

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