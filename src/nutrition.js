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
    energy: product.energy * factor,
    fat: product.fat * factor,
    saturatedFat: product.saturatedFat * factor,
    carbs: product.carbs * factor,
    sugars: product.sugars * factor,
    protein: product.protein * factor,
    sodium: product.sodium * factor,
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

  return totals;
}