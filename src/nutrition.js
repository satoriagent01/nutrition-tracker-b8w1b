/**
 * Nutrition calculation module.
 * Provides functions to scale nutritional values and aggregate multiple items.
 */

/**
 * Calculates nutritional values for a given amount of a product.
 * @param {Object} product - Product with per-100g nutritional values.
 * @param {number} grams - Amount in grams.
 * @returns {Object} Nutritional values scaled to the given gram amount.
 */
export function calculateNutrition(product, grams) {
  const factor = grams / 100;
  const per100g = product.per100g || {};
  return {
    energy: round((per100g.energy || 0) * factor, 2),
    fat: round((per100g.fat || 0) * factor, 2),
    saturatedFat: round((per100g.saturatedFat || 0) * factor, 2),
    carbs: round((per100g.carbs || 0) * factor, 2),
    sugars: round((per100g.sugars || 0) * factor, 2),
    protein: round((per100g.protein || 0) * factor, 2),
    sodium: round((per100g.sodium || 0) * factor, 3)
  };
}

/**
 * Aggregates nutritional data across an array of food items.
 * @param {Array} items - Array of food items with nutritional data.
 * @returns {Object} Summed nutritional values.
 */
export function sumNutrition(items) {
  const result = {
    energy: 0,
    fat: 0,
    saturatedFat: 0,
    carbs: 0,
    sugars: 0,
    protein: 0,
    sodium: 0
  };

  for (const item of items) {
    if (item.nutrition) {
      result.energy += item.nutrition.energy || 0;
      result.fat += item.nutrition.fat || 0;
      result.saturatedFat += item.nutrition.saturatedFat || 0;
      result.carbs += item.nutrition.carbs || 0;
      result.sugars += item.nutrition.sugars || 0;
      result.protein += item.nutrition.protein || 0;
      result.sodium += item.nutrition.sodium || 0;
    }
  }

  // Round sodium to 3 decimal places, others to 2
  result.energy = round(result.energy, 2);
  result.fat = round(result.fat, 2);
  result.saturatedFat = round(result.saturatedFat, 2);
  result.carbs = round(result.carbs, 2);
  result.sugars = round(result.sugars, 2);
  result.protein = round(result.protein, 2);
  result.sodium = round(result.sodium, 3);

  return result;
}

/**
 * Rounds a number to specified decimal places.
 * @param {number} num - Number to round.
 * @param {number} decimals - Decimal places.
 * @returns {number} Rounded number.
 */
function round(num, decimals) {
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
}