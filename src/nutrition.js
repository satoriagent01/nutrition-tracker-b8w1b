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
  const p = product.per100g || product;
  return {
    energy: Number(((p.energy || 0) * factor).toFixed(3)),
    fat: Number(((p.fat || 0) * factor).toFixed(3)),
    saturatedFat: Number(((p.saturatedFat || 0) * factor).toFixed(3)),
    carbs: Number(((p.carbs || 0) * factor).toFixed(3)),
    sugars: Number(((p.sugars || 0) * factor).toFixed(3)),
    protein: Number(((p.protein || 0) * factor).toFixed(3)),
    sodium: Number(((p.sodium || 0) * factor).toFixed(3))
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
    const n = item.nutrition || item;
    if (n) {
      result.energy += n.energy || 0;
      result.fat += n.fat || 0;
      result.saturatedFat += n.saturatedFat || 0;
      result.carbs += n.carbs || 0;
      result.sugars += n.sugars || 0;
      result.protein += n.protein || 0;
      result.sodium += n.sodium || 0;
    }
  }

  // Round all values to 3 decimal places to preserve precision
  for (const key of Object.keys(result)) {
    result[key] = Number(result[key].toFixed(3));
  }

  return result;
}