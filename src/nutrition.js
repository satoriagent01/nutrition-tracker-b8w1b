/**
 * Nutrition calculation and aggregation module.
 */

/**
 * Scales per-100g nutritional values to the specified gram amount.
 * @param {object} product - Product with per100g nutritional data
 * @param {number} grams - Amount in grams
 * @returns {object} Scaled nutritional data
 */
export function calculateNutrition(product, grams) {
  if (grams < 0) {
    throw new Error('Grams cannot be negative');
  }

  const factor = grams / 100;

  return {
    energy: Math.round(product.per100g.energy * factor * 1000) / 1000,
    fat: Math.round(product.per100g.fat * factor * 1000) / 1000,
    saturatedFat: Math.round(product.per100g.saturatedFat * factor * 1000) / 1000,
    carbs: Math.round(product.per100g.carbs * factor * 1000) / 1000,
    sugars: Math.round(product.per100g.sugars * factor * 1000) / 1000,
    protein: Math.round(product.per100g.protein * factor * 1000) / 1000,
    sodium: Math.round(product.per100g.sodium * factor * 1000) / 1000
  };
}

/**
 * Aggregates nutritional data across an array of food items.
 * @param {Array<object>} items - Array of food items with nutrition data
 * @returns {object} Aggregated nutritional data
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

  // Round to 3 decimal places
  result.energy = Math.round(result.energy * 1000) / 1000;
  result.fat = Math.round(result.fat * 1000) / 1000;
  result.saturatedFat = Math.round(result.saturatedFat * 1000) / 1000;
  result.carbs = Math.round(result.carbs * 1000) / 1000;
  result.sugars = Math.round(result.sugars * 1000) / 1000;
  result.protein = Math.round(result.protein * 1000) / 1000;
  result.sodium = Math.round(result.sodium * 1000) / 1000;

  return result;
}