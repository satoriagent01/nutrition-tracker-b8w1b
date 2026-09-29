/**
 * Nutrition calculation module.
 * Provides functions to scale and aggregate nutritional data.
 */

/**
 * Scales per-100g nutritional values to the specified gram amount.
 *
 * @param {Object} product - Product with per100g nutritional data
 * @param {number} grams - Amount in grams to scale to
 * @returns {Object} Scaled nutritional values
 * @throws {Error} If grams is negative or not a number
 */
export function calculateNutrition(product, grams) {
  if (typeof grams !== 'number' || isNaN(grams)) {
    throw new Error('Grams must be a valid number');
  }
  if (grams < 0) {
    throw new Error('Grams cannot be negative');
  }
  if (!product || !product.per100g) {
    throw new Error('Product must have per100g nutritional data');
  }

  const factor = grams / 100;
  const per100g = product.per100g;

  return {
    energy: per100g.energy * factor,
    fat: per100g.fat * factor,
    saturatedFat: per100g.saturatedFat * factor,
    carbs: per100g.carbs * factor,
    sugars: per100g.sugars * factor,
    protein: per100g.protein * factor,
    sodium: per100g.sodium * factor
  };
}

/**
 * Aggregates nutritional data across an array of food items.
 * Each item should have a nutrition object with per-serving values.
 *
 * @param {Array<Object>} items - Array of food items with nutrition data
 * @returns {Object} Summed nutritional values
 */
export function sumNutrition(items) {
  if (!Array.isArray(items)) {
    throw new Error('Items must be an array');
  }

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
    if (item && item.nutrition) {
      const nutrition = item.nutrition;
      result.energy += nutrition.energy || 0;
      result.fat += nutrition.fat || 0;
      result.saturatedFat += nutrition.saturatedFat || 0;
      result.carbs += nutrition.carbs || 0;
      result.sugars += nutrition.sugars || 0;
      result.protein += nutrition.protein || 0;
      result.sodium += nutrition.sodium || 0;
    }
  }

  return result;
}