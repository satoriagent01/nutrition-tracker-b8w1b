/**
 * Nutrition calculation module.
 * Scales per-100g nutritional values to a given gram amount,
 * and sums nutrition across multiple food items.
 */

/**
 * Calculates nutritional values for a given gram amount of a product.
 * Product values are per 100g.
 *
 * @param {object} product - Product with nutritional values per 100g
 * @param {number} grams - Amount in grams (or ml)
 * @returns {object} Nutritional values scaled to the given amount
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
    sodium: Math.round(product.sodium * factor * 100) / 100,
  };
}

/**
 * Sums nutritional values across an array of food items.
 * Each item should have the same nutritional keys.
 *
 * @param {Array<object>} items - Array of food items with nutritional data
 * @returns {object} Total nutritional values
 */
export function sumNutrition(items) {
  const totals = {
    energy: 0,
    fat: 0,
    saturatedFat: 0,
    carbs: 0,
    sugars: 0,
    protein: 0,
    sodium: 0,
  };

  for (const item of items) {
    totals.energy += item.energy || 0;
    totals.fat += item.fat || 0;
    totals.saturatedFat += item.saturatedFat || 0;
    totals.carbs += item.carbs || 0;
    totals.sugars += item.sugars || 0;
    totals.protein += item.protein || 0;
    totals.sodium += item.sodium || 0;
  }

  // Round all values to 2 decimal places
  for (const key of Object.keys(totals)) {
    totals[key] = Math.round(totals[key] * 100) / 100;
  }

  return totals;
}