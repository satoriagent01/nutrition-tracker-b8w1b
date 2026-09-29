/**
 * Storage module for localStorage-based persistence.
 * Provides abstraction over localStorage for products and meals.
 */

const PRODUCTS_KEY = 'nutrition_tracker_products';
const MEALS_KEY = 'nutrition_tracker_meals';

/**
 * Saves a product to storage.
 *
 * @param {Object} product - Product object to save
 * @param {Object} storage - Storage interface (defaults to localStorage)
 */
export function saveProduct(product, storage = localStorage) {
  if (!product || !product.name) {
    throw new Error('Product must have a name');
  }

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
 * Retrieves all products from storage.
 *
 * @param {Object} storage - Storage interface (defaults to localStorage)
 * @returns {Array<Object>} Array of product objects
 */
export function getProducts(storage = localStorage) {
  const data = storage.getItem(PRODUCTS_KEY);
  return data ? JSON.parse(data) : [];
}

/**
 * Deletes a product from storage by name.
 *
 * @param {string} productName - Name of the product to delete
 * @param {Object} storage - Storage interface (defaults to localStorage)
 */
export function deleteProduct(productName, storage = localStorage) {
  const products = getProducts(storage);
  const filtered = products.filter(p => p.name !== productName);
  storage.setItem(PRODUCTS_KEY, JSON.stringify(filtered));
}

/**
 * Saves a meal to storage.
 *
 * @param {Object} meal - Meal object to save
 * @param {Object} storage - Storage interface (defaults to localStorage)
 */
export function saveMeal(meal, storage = localStorage) {
  if (!meal || !meal.name) {
    throw new Error('Meal must have a name');
  }

  const meals = getMeals(storage);
  meals.push(meal);
  storage.setItem(MEALS_KEY, JSON.stringify(meals));
}

/**
 * Retrieves all meals from storage.
 *
 * @param {Object} storage - Storage interface (defaults to localStorage)
 * @returns {Array<Object>} Array of meal objects
 */
export function getMeals(storage = localStorage) {
  const data = storage.getItem(MEALS_KEY);
  return data ? JSON.parse(data) : [];
}

/**
 * Deletes a meal from storage by name.
 *
 * @param {string} mealName - Name of the meal to delete
 * @param {Object} storage - Storage interface (defaults to localStorage)
 */
export function deleteMeal(mealName, storage = localStorage) {
  const meals = getMeals(storage);
  const filtered = meals.filter(m => m.name !== mealName);
  storage.setItem(MEALS_KEY, JSON.stringify(filtered));
}

/**
 * Exports all data (products and meals) as a JSON string.
 *
 * @param {Object} storage - Storage interface (defaults to localStorage)
 * @returns {string} JSON string of all data
 */
export function exportData(storage = localStorage) {
  return JSON.stringify({
    products: getProducts(storage),
    meals: getMeals(storage)
  }, null, 2);
}

/**
 * Imports data from a JSON string.
 *
 * @param {string} data - JSON string of data to import
 * @param {Object} storage - Storage interface (defaults to localStorage)
 */
export function importData(data, storage = localStorage) {
  const parsed = JSON.parse(data);
  if (parsed.products) {
    storage.setItem(PRODUCTS_KEY, JSON.stringify(parsed.products));
  }
  if (parsed.meals) {
    storage.setItem(MEALS_KEY, JSON.stringify(parsed.meals));
  }
}