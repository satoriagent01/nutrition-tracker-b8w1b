/**
 * Storage module for persisting products, meals, and API configuration.
 * Uses localStorage by default but accepts a custom storage interface.
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
 *
 * @param {Object} product - Product object with name and nutritional data
 * @param {Object} storage - Storage interface (default: localStorage)
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
  storage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
}

/**
 * Retrieves all products from storage.
 *
 * @param {Object} storage - Storage interface (default: localStorage)
 * @returns {Array} Array of product objects
 */
export function getProducts(storage = globalThis.localStorage) {
  if (!storage) return [];
  const data = storage.getItem(STORAGE_KEYS.PRODUCTS);
  return data ? JSON.parse(data) : [];
}

/**
 * Saves a meal to storage.
 *
 * @param {Object} meal - Meal object with name and items
 * @param {Object} storage - Storage interface (default: localStorage)
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
  storage.setItem(STORAGE_KEYS.MEALS, JSON.stringify(meals));
}

/**
 * Retrieves all meals from storage.
 *
 * @param {Object} storage - Storage interface (default: localStorage)
 * @returns {Array} Array of meal objects
 */
export function getMeals(storage = globalThis.localStorage) {
  if (!storage) return [];
  const data = storage.getItem(STORAGE_KEYS.MEALS);
  return data ? JSON.parse(data) : [];
}

/**
 * Deletes a product by name.
 *
 * @param {string} name - Product name to delete
 * @param {Object} storage - Storage interface (default: localStorage)
 */
export function deleteProduct(name, storage = globalThis.localStorage) {
  if (!storage) return;
  const products = getProducts(storage).filter(p => p.name !== name);
  storage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
}

/**
 * Deletes a meal by name.
 *
 * @param {string} name - Meal name to delete
 * @param {Object} storage - Storage interface (default: localStorage)
 */
export function deleteMeal(name, storage = globalThis.localStorage) {
  if (!storage) return;
  const meals = getMeals(storage).filter(m => m.name !== name);
  storage.setItem(STORAGE_KEYS.MEALS, JSON.stringify(meals));
}

/**
 * Exports all data as JSON string.
 *
 * @param {Object} storage - Storage interface (default: localStorage)
 * @returns {string} JSON string of all data
 */
export function exportData(storage = globalThis.localStorage) {
  if (!storage) return '{}';
  return JSON.stringify({
    products: getProducts(storage),
    meals: getMeals(storage)
  }, null, 2);
}

/**
 * Imports data from JSON string.
 *
 * @param {string} json - JSON string of data
 * @param {Object} storage - Storage interface (default: localStorage)
 */
export function importData(json, storage = globalThis.localStorage) {
  if (!storage) return;
  try {
    const data = JSON.parse(json);
    if (data.products) {
      storage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(data.products));
    }
    if (data.meals) {
      storage.setItem(STORAGE_KEYS.MEALS, JSON.stringify(data.meals));
    }
  } catch (e) {
    throw new Error('Invalid JSON data');
  }
}

/**
 * Clears all stored data.
 *
 * @param {Object} storage - Storage interface (default: localStorage)
 */
export function clearData(storage = globalThis.localStorage) {
  if (!storage) return;
  storage.removeItem(STORAGE_KEYS.PRODUCTS);
  storage.removeItem(STORAGE_KEYS.MEALS);
  storage.removeItem(STORAGE_KEYS.API_KEY);
  storage.removeItem(STORAGE_KEYS.API_URL);
  storage.removeItem(STORAGE_KEYS.API_MODEL);
}

/**
 * Saves the API key to storage.
 *
 * @param {string} key - The API key
 * @param {Object} storage - Storage interface (default: localStorage)
 */
export function saveApiKey(key, storage = globalThis.localStorage) {
  if (!storage) return;
  storage.setItem(STORAGE_KEYS.API_KEY, key);
}

/**
 * Retrieves the API key from storage.
 *
 * @param {Object} storage - Storage interface (default: localStorage)
 * @returns {string|null} The API key or null
 */
export function getApiKey(storage = globalThis.localStorage) {
  if (!storage) return null;
  return storage.getItem(STORAGE_KEYS.API_KEY);
}

/**
 * Saves the API URL to storage.
 *
 * @param {string} url - The API URL
 * @param {Object} storage - Storage interface (default: localStorage)
 */
export function saveApiUrl(url, storage = globalThis.localStorage) {
  if (!storage) return;
  storage.setItem(STORAGE_KEYS.API_URL, url);
}

/**
 * Retrieves the API URL from storage.
 *
 * @param {Object} storage - Storage interface (default: localStorage)
 * @returns {string|null} The API URL or null
 */
export function getApiUrl(storage = globalThis.localStorage) {
  if (!storage) return null;
  return storage.getItem(STORAGE_KEYS.API_URL);
}

/**
 * Saves the API model to storage.
 *
 * @param {string} model - The model name
 * @param {Object} storage - Storage interface (default: localStorage)
 */
export function saveApiModel(model, storage = globalThis.localStorage) {
  if (!storage) return;
  storage.setItem(STORAGE_KEYS.API_MODEL, model);
}

/**
 * Retrieves the API model from storage.
 *
 * @param {Object} storage - Storage interface (default: localStorage)
 * @returns {string|null} The model name or null
 */
export function getApiModel(storage = globalThis.localStorage) {
  if (!storage) return null;
  return storage.getItem(STORAGE_KEYS.API_MODEL);
}