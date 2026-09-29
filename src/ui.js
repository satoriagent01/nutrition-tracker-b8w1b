/**
 * UI rendering module for the nutrition tracker.
 * Provides functions to render DOM elements for the web interface.
 */

/**
 * Renders the product form HTML.
 *
 * @returns {string} HTML string for the product form
 */
export function renderProductForm() {
  return `
    <div class="card">
      <h2>Add Product</h2>
      <div class="form-group">
        <label for="productName">Product Name</label>
        <input type="text" id="productName" placeholder="e.g., Organic Milk">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="productEnergy">Energy (kcal/100g)</label>
          <input type="number" id="productEnergy" step="0.1" placeholder="0">
        </div>
        <div class="form-group">
          <label for="productFat">Fat (g/100g)</label>
          <input type="number" id="productFat" step="0.1" placeholder="0">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="productSaturatedFat">Saturated Fat (g/100g)</label>
          <input type="number" id="productSaturatedFat" step="0.1" placeholder="0">
        </div>
        <div class="form-group">
          <label for="productCarbs">Carbs (g/100g)</label>
          <input type="number" id="productCarbs" step="0.1" placeholder="0">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="productSugars">Sugars (g/100g)</label>
          <input type="number" id="productSugars" step="0.1" placeholder="0">
        </div>
        <div class="form-group">
          <label for="productProtein">Protein (g/100g)</label>
          <input type="number" id="productProtein" step="0.1" placeholder="0">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="productSodium">Sodium (mg/100g)</label>
          <input type="number" id="productSodium" step="0.1" placeholder="0">
        </div>
      </div>
      <button id="addProductBtn" class="btn btn-primary">Add Product</button>
    </div>
  `;
}

/**
 * Renders the meal planner HTML.
 *
 * @returns {string} HTML string for the meal planner
 */
export function renderMealPlanner() {
  return `
    <div class="card">
      <h2>Meal Planner</h2>
      <div class="form-group">
        <label for="mealName">Meal Name</label>
        <input type="text" id="mealName" placeholder="e.g., Breakfast">
      </div>
      <div class="form-group">
        <label for="mealProduct">Select Product</label>
        <select id="mealProduct">
          <option value="">-- Select a product --</option>
        </select>
      </div>
      <div class="form-group">
        <label for="mealGrams">Amount (grams)</label>
        <input type="number" id="mealGrams" placeholder="100">
      </div>
      <button id="addMealItemBtn" class="btn btn-primary">Add to Meal</button>
      <div id="mealItemsList" class="meal-items-list"></div>
      <button id="saveMealBtn" class="btn btn-success">Save Meal</button>
    </div>
  `;
}

/**
 * Renders the nutrition summary HTML.
 *
 * @returns {string} HTML string for the nutrition summary
 */
export function renderNutritionSummary() {
  return `
    <div class="card">
      <h2>Nutrition Summary</h2>
      <div class="nutrition-grid">
        <div class="nutrition-item">
          <span class="nutrition-label">Energy</span>
          <span class="nutrition-value" id="summaryEnergy">0</span>
          <span class="nutrition-unit">kcal</span>
        </div>
        <div class="nutrition-item">
          <span class="nutrition-label">Fat</span>
          <span class="nutrition-value" id="summaryFat">0</span>
          <span class="nutrition-unit">g</span>
        </div>
        <div class="nutrition-item">
          <span class="nutrition-label">Saturated Fat</span>
          <span class="nutrition-value" id="summarySaturatedFat">0</span>
          <span class="nutrition-unit">g</span>
        </div>
        <div class="nutrition-item">
          <span class="nutrition-label">Carbs</span>
          <span class="nutrition-value" id="summaryCarbs">0</span>
          <span class="nutrition-unit">g</span>
        </div>
        <div class="nutrition-item">
          <span class="nutrition-label">Sugars</span>
          <span class="nutrition-value" id="summarySugars">0</span>
          <span class="nutrition-unit">g</span>
        </div>
        <div class="nutrition-item">
          <span class="nutrition-label">Protein</span>
          <span class="nutrition-value" id="summaryProtein">0</span>
          <span class="nutrition-unit">g</span>
        </div>
        <div class="nutrition-item">
          <span class="nutrition-label">Sodium</span>
          <span class="nutrition-value" id="summarySodium">0</span>
          <span class="nutrition-unit">mg</span>
        </div>
      </div>
    </div>
  `;
}

/**
 * Renders a product item HTML.
 *
 * @param {Object} product - Product object
 * @returns {string} HTML string for the product item
 */
export function renderProductItem(product) {
  return `
    <div class="product-item">
      <div class="product-info">
        <strong>${product.name}</strong>
        <span class="product-details">
          ${product.energy} kcal | ${product.fat}g fat | ${product.carbs}g carbs | ${product.protein}g protein
        </span>
      </div>
      <button class="btn btn-danger btn-small delete-product-btn" data-name="${product.name}">Delete</button>
    </div>
  `;
}

/**
 * Renders a meal item HTML.
 *
 * @param {Object} meal - Meal object
 * @returns {string} HTML string for the meal item
 */
export function renderMealItem(meal) {
  return `
    <div class="meal-item">
      <div class="meal-info">
        <strong>${meal.name}</strong>
        <span class="meal-details">
          ${meal.items ? meal.items.length : 0} items
        </span>
      </div>
      <button class="btn btn-danger btn-small delete-meal-btn" data-name="${meal.name}">Delete</button>
    </div>
  `;
}