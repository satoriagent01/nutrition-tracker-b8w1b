/**
 * localStorage-based persistence module.
 * All functions accept a storage object (default: window.localStorage)
 * to allow testing with mock storage.
 */

const PRODUCTS_KEY = 'nutrition_tracker_products';
const MEALS_KEY = 'nutrition_tracker_meals';

/**
 * Saves a product to storage.
 * @param {object} product - Product object
 * @param {object} [storage] - Storage object (default: localStorage)
 */
export function saveProduct(product, storage = globalThis.localStorage) {
  if (!storage) return;
  const products = getProducts(storage);
  const existingIndex = products.findIndex(p => p.name === product.name);
  if (existingIndex >= 0) {
    products[existingIndex] = product;
  } else {
    products.push(product);
  }
  storage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

/**
 * Gets all products from storage.
 * @param {object} [storage] - Storage object (default: localStorage)
 * @returns {Array<object>} Array of products
 */
export function getProducts(storage = globalThis.localStorage) {
  if (!storage) return [];
  const data = storage.getItem(PRODUCTS_KEY);
  return data ? JSON.parse(data) : [];
}

/**
 * Saves a meal to storage.
 * @param {object} meal - Meal object
 * @param {object} [storage] - Storage object (default: localStorage)
 */
export function saveMeal(meal, storage = globalThis.localStorage) {
  if (!storage) return;
  const meals = getMeals(storage);
  const existingIndex = meals.findIndex(m => m.name === meal.name);
  if (existingIndex >= 0) {
    meals[existingIndex] = meal;
  } else {
    meals.push(meal);
  }
  storage.setItem(MEALS_KEY, JSON.stringify(meals));
}

/**
 * Gets all meals from storage.
 * @param {object} [storage] - Storage object (default: localStorage)
 * @returns {Array<object>} Array of meals
 */
export function getMeals(storage = globalThis.localStorage) {
  if (!storage) return [];
  const data = storage.getItem(MEALS_KEY);
  return data ? JSON.parse(data) : [];
}

/**
 * Deletes a product by name.
 * @param {string} productName - Product name to delete
 * @param {object} [storage] - Storage object (default: localStorage)
 */
export function deleteProduct(productName, storage = globalThis.localStorage) {
  if (!storage) return;
  const products = getProducts(storage);
  const filtered = products.filter(p => p.name !== productName);
  storage.setItem(PRODUCTS_KEY, JSON.stringify(filtered));
}

/**
 * Deletes a meal by name.
 * @param {string} mealName - Meal name to delete
 * @param {object} [storage] - Storage object (default: localStorage)
 */
export function deleteMeal(mealName, storage = globalThis.localStorage) {
  if (!storage) return;
  const meals = getMeals(storage);
  const filtered = meals.filter(m => m.name !== mealName);
  storage.setItem(MEALS_KEY, JSON.stringify(filtered));
}

/**
 * Exports all data as a JSON string.
 * @param {object} [storage] - Storage object (default: localStorage)
 * @returns {string} JSON string of all data
 */
export function exportData(storage = globalThis.localStorage) {
  return JSON.stringify({
    products: getProducts(storage),
    meals: getMeals(storage)
  }, null, 2);
}

/**
 * Imports data from a JSON string.
 * @param {string} data - JSON string of data
 * @param {object} [storage] - Storage object (default: localStorage)
 */
export function importData(data, storage = globalThis.localStorage) {
  if (!storage) return;
  const parsed = JSON.parse(data);
  if (parsed.products) {
    storage.setItem(PRODUCTS_KEY, JSON.stringify(parsed.products));
  }
  if (parsed.meals) {
    storage.setItem(MEALS_KEY, JSON.stringify(parsed.meals));
  }
}

/**
 * Clears all data from storage.
 * @param {object} [storage] - Storage object (default: localStorage)
 */
export function clearData(storage = globalThis.localStorage) {
  if (!storage) return;
  storage.removeItem(PRODUCTS_KEY);
  storage.removeItem(MEALS_KEY);
}