/**
 * OCR nutrition extraction module.
 * Parses OCR text from nutrition labels and extracts nutritional values.
 */

/**
 * Extracts nutritional data from an OCR response string.
 * Parses multi-language nutrition labels (German, Dutch, French, English, etc.)
 * and returns structured nutritional data per 100g.
 *
 * @param {string} ocrResponse - The OCR text response from the AI API
 * @returns {Object} Object with keys: energy, fat, saturatedFat, carbs, sugars, protein, sodium
 */
export function extractNutrition(ocrResponse) {
  if (!ocrResponse || typeof ocrResponse !== 'string') {
    return createZeroNutrition();
  }

  const text = ocrResponse.toLowerCase();

  // Extract energy (kcal)
  const energy = extractValue(text, [
    /(?:energy|energie|calories?|kcal|energi)[^:]*?:\s*(\d+(?:[.,]\d+)?)/i,
    /(?:\d+(?:[.,]\d+)?)\s*(?:kcal|calories?|kj)\s*(?:energy|energie)?/i
  ]);

  // Extract fat
  const fat = extractValue(text, [
    /(?:fat|fett|vet|lipids?)[^:]*?:\s*(\d+(?:[.,]\d+)?)/i,
    /(?:\d+(?:[.,]\d+)?)\s*(?:g|gram)[^:]*?(?:fat|fett|vet)/i
  ]);

  // Extract saturated fat
  const saturatedFat = extractValue(text, [
    /(?:saturated\s*(?:fat|fett|vet)|(?:satur|sat)[^:]*?(?:fat|fett|vet))[^:]*?:\s*(\d+(?:[.,]\d+)?)/i,
    /(?:\d+(?:[.,]\d+)?)\s*(?:g|gram)[^:]*?(?:satur|sat)[^:]*?(?:fat|fett|vet)/i
  ]);

  // Extract carbs
  const carbs = extractValue(text, [
    /(?:carbohydrate|carbohydrates|kohlenhydrate|koolhydraten|glucides|carb)[^:]*?:\s*(\d+(?:[.,]\d+)?)/i,
    /(?:\d+(?:[.,]\d+)?)\s*(?:g|gram)[^:]*?(?:carbo|kohlen|koolhy|gluc)/i
  ]);

  // Extract sugars
  const sugars = extractValue(text, [
    /(?:sugar|sugars|zucker|suiker|sucre)[^:]*?:\s*(\d+(?:[.,]\d+)?)/i,
    /(?:\d+(?:[.,]\d+)?)\s*(?:g|gram)[^:]*?(?:zucker|suiker|sucre|sugar)/i
  ]);

  // Extract protein
  const protein = extractValue(text, [
    /(?:protein|eiweiss|eiwit|proteine)[^:]*?:\s*(\d+(?:[.,]\d+)?)/i,
    /(?:\d+(?:[.,]\d+)?)\s*(?:g|gram)[^:]*?(?:protein|eiwe|eiwit)/i
  ]);

  // Extract sodium (or salt)
  const sodium = extractValue(text, [
    /(?:sodium|salz|sel|zout|sale)[^:]*?:\s*(\d+(?:[.,]\d+)?)/i,
    /(?:\d+(?:[.,]\d+)?)\s*(?:g|gram)[^:]*?(?:salz|sel|zout|sale|sodium)/i
  ]);

  return {
    energy: energy || 0,
    fat: fat || 0,
    saturatedFat: saturatedFat || 0,
    carbs: carbs || 0,
    sugars: sugars || 0,
    protein: protein || 0,
    sodium: sodium || 0
  };
}

/**
 * Extracts a numeric value from text using multiple regex patterns.
 *
 * @param {string} text - The text to search in
 * @param {Array<string>} patterns - Array of regex patterns to try
 * @returns {number|null} The extracted number or null
 */
function extractValue(text, patterns) {
  for (const pattern of patterns) {
    const regex = new RegExp(pattern, 'i');
    const match = text.match(regex);
    if (match && match[1]) {
      return parseFloat(match[1].replace(',', '.'));
    }
  }
  return null;
}

/**
 * Creates a zero-filled nutritional data object.
 * Used as fallback when OCR fails or returns no data.
 *
 * @returns {Object} Zero-filled nutritional data
 */
function createZeroNutrition() {
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