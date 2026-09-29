/**
 * Storage module for persisting products and meals.
 * Uses localStorage by default, but accepts a mock storage object for testing.
 */

const PRODUCTS_KEY = "nutrition-tracker-products";
const MEALS_KEY = "nutrition-tracker-meals";

/**
 * Saves a product to storage.
 *
 * @param {object} product - Product object with id, name, and nutritional values
 * @param {object} [storage] - Storage interface (defaults to localStorage)
 */
export function saveProduct(product, storage) {
  const store = storage || localStorage;
  const products = getProducts(store);
  // Check if product already exists, update it
  const existingIndex = products.findIndex((p) => p.id === product.id);
  if (existingIndex >= 0) {
    products[existingIndex] = product;
  } else {
    products.push(product);
  }
  store.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

/**
 * Retrieves all saved products.
 *
 * @param {object} [storage] - Storage interface (defaults to localStorage)
 * @returns {Array<object>} Array of product objects
 */
export function getProducts(storage) {
  const store = storage || localStorage;
  const data = store.getItem(PRODUCTS_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

/**
 * Saves a meal to storage.
 *
 * @param {object} meal - Meal object with id, name, date, and items
 * @param {object} [storage] - Storage interface (defaults to localStorage)
 */
export function saveMeal(meal, storage) {
  const store = storage || localStorage;
  const meals = getMeals(store);
  // Check if meal already exists, update it
  const existingIndex = meals.findIndex((m) => m.id === meal.id);
  if (existingIndex >= 0) {
    meals[existingIndex] = meal;
  } else {
    meals.push(meal);
  }
  store.setItem(MEALS_KEY, JSON.stringify(meals));
}

/**
 * Retrieves all saved meals.
 *
 * @param {object} [storage] - Storage interface (defaults to localStorage)
 * @returns {Array<object>} Array of meal objects
 */
export function getMeals(storage) {
  const store = storage || localStorage;
  const data = store.getItem(MEALS_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}