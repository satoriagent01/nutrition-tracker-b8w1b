/**
 * Nutrition calculation module.
 * Provides functions to scale nutritional values and aggregate data.
 */

/**
 * Scales per-100g nutritional values to the specified gram amount.
 *
 * @param {Object} product - Product with per-100g nutritional values
 * @param {number} grams - Amount in grams to scale to
 * @returns {Object} Scaled nutritional values
 */
export function calculateNutrition(product, grams) {
  const factor = grams / 100;
  return {
    energy: Math.round(product.energy * factor * 100) / 100,
    fat: Math.round(product.fat * factor * 100) / 100,
    saturatedFat: Math.round(product.saturatedFat * factor * 100) / 100,
    carbs: Math.round(product.carbs * factor * 100) / 100,
    sugars: Math.round(product.sugars * factor * 100) / 100,
    protein: Math.round(product.protein * factor * 100) / 100,
    sodium: Math.round(product.sodium * factor * 100) / 100
  };
}

/**
 * Aggregates nutritional data across an array of food items.
 *
 * @param {Array} items - Array of food items with nutritional data
 * @returns {Object} Aggregated nutritional values
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

  // Round all values to 2 decimal places
  for (const key of Object.keys(result)) {
    result[key] = Math.round(result[key] * 100) / 100;
  }

  return result;
}