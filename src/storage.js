/**
 * Storage module for persisting products, meals, and API configuration.
 * Uses localStorage by default but accepts a custom storage object for testing.
 */

const STORAGE_KEYS = {
  PRODUCTS: 'nutrition_products',
  MEALS: 'nutrition_meals',
  API_KEY: 'nutrition_api_key',
  API_URL: 'nutrition_api_url',
  API_MODEL: 'nutrition_api_model'
};

/**
 * Saves a product to storage.
 * @param {Object} product - The product to save.
 * @param {Object} storage - Storage object (defaults to localStorage).
 */
export function saveProduct(product, storage = localStorage) {
  const products = getProducts(storage);
  products.push(product);
  storage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
}

/**
 * Retrieves all products from storage.
 * @param {Object} storage - Storage object (defaults to localStorage).
 * @returns {Array} Array of products.
 */
export function getProducts(storage = localStorage) {
  const data = storage.getItem(STORAGE_KEYS.PRODUCTS);
  return data ? JSON.parse(data) : [];
}

/**
 * Deletes a product by name.
 * @param {string} name - The name of the product to delete.
 * @param {Object} storage - Storage object (defaults to localStorage).
 */
export function deleteProduct(name, storage = localStorage) {
  const products = getProducts(storage);
  const filtered = products.filter(p => p.name !== name);
  storage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(filtered));
}

/**
 * Saves a meal to storage.
 * @param {Object} meal - The meal to save.
 * @param {Object} storage - Storage object (defaults to localStorage).
 */
export function saveMeal(meal, storage = localStorage) {
  const meals = getMeals(storage);
  meals.push(meal);
  storage.setItem(STORAGE_KEYS.MEALS, JSON.stringify(meals));
}

/**
 * Retrieves all meals from storage.
 * @param {Object} storage - Storage object (defaults to localStorage).
 * @returns {Array} Array of meals.
 */
export function getMeals(storage = localStorage) {
  const data = storage.getItem(STORAGE_KEYS.MEALS);
  return data ? JSON.parse(data) : [];
}

/**
 * Deletes a meal by name.
 * @param {string} name - The name of the meal to delete.
 * @param {Object} storage - Storage object (defaults to localStorage).
 */
export function deleteMeal(name, storage = localStorage) {
  const meals = getMeals(storage);
  const filtered = meals.filter(m => m.name !== name);
  storage.setItem(STORAGE_KEYS.MEALS, JSON.stringify(filtered));
}

/**
 * Exports all data as JSON string.
 * @param {Object} storage - Storage object (defaults to localStorage).
 * @returns {string} JSON string of all data.
 */
export function exportData(storage = localStorage) {
  return JSON.stringify({
    products: getProducts(storage),
    meals: getMeals(storage)
  });
}

/**
 * Imports data from JSON string.
 * @param {string} json - JSON string of data.
 * @param {Object} storage - Storage object (defaults to localStorage).
 */
export function importData(json, storage = localStorage) {
  const data = JSON.parse(json);
  if (data.products) {
    storage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(data.products));
  }
  if (data.meals) {
    storage.setItem(STORAGE_KEYS.MEALS, JSON.stringify(data.meals));
  }
}

/**
 * Clears all data from storage.
 * @param {Object} storage - Storage object (defaults to localStorage).
 */
export function clearData(storage = localStorage) {
  storage.removeItem(STORAGE_KEYS.PRODUCTS);
  storage.removeItem(STORAGE_KEYS.MEALS);
}

/**
 * Saves the API key.
 * @param {string} key - The API key.
 * @param {Object} storage - Storage object (defaults to localStorage).
 */
export function saveApiKey(key, storage = localStorage) {
  storage.setItem(STORAGE_KEYS.API_KEY, key);
}

/**
 * Gets the API key.
 * @param {Object} storage - Storage object (defaults to localStorage).
 * @returns {string|null} The API key or null.
 */
export function getApiKey(storage = localStorage) {
  return storage.getItem(STORAGE_KEYS.API_KEY);
}

/**
 * Saves the API URL.
 * @param {string} url - The API URL.
 * @param {Object} storage - Storage object (defaults to localStorage).
 */
export function saveApiUrl(url, storage = localStorage) {
  storage.setItem(STORAGE_KEYS.API_URL, url);
}

/**
 * Gets the API URL.
 * @param {Object} storage - Storage object (defaults to localStorage).
 * @returns {string|null} The API URL or null.
 */
export function getApiUrl(storage = localStorage) {
  return storage.getItem(STORAGE_KEYS.API_URL);
}

/**
 * Saves the API model.
 * @param {string} model - The API model.
 * @param {Object} storage - Storage object (defaults to localStorage).
 */
export function saveApiModel(model, storage = localStorage) {
  storage.setItem(STORAGE_KEYS.API_MODEL, model);
}

/**
 * Gets the API model.
 * @param {Object} storage - Storage object (defaults to localStorage).
 * @returns {string|null} The API model or null.
 */
export function getApiModel(storage = localStorage) {
  return storage.getItem(STORAGE_KEYS.API_MODEL);
}