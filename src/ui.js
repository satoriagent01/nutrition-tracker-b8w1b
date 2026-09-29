/**
 * UI module for rendering the nutrition tracker interface.
 * Provides DOM rendering functions for the web interface.
 */

/**
 * Renders the product form HTML.
 * @returns {string} HTML string for the product form.
 */
export function renderProductForm() {
  return `
    <div class="form-section">
      <h2>Add Product</h2>
      <form id="productForm">
        <div class="form-group">
          <label for="productName">Product Name:</label>
          <input type="text" id="productName" required>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="productEnergy">Energy (kcal/100g):</label>
            <input type="number" id="productEnergy" step="0.1" min="0" required>
          </div>
          <div class="form-group">
            <label for="productFat">Fat (g/100g):</label>
            <input type="number" id="productFat" step="0.1" min="0" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="productSaturatedFat">Saturated Fat (g/100g):</label>
            <input type="number" id="productSaturatedFat" step="0.1" min="0" required>
          </div>
          <div class="form-group">
            <label for="productCarbs">Carbs (g/100g):</label>
            <input type="number" id="productCarbs" step="0.1" min="0" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="productSugars">Sugars (g/100g):</label>
            <input type="number" id="productSugars" step="0.1" min="0" required>
          </div>
          <div class="form-group">
            <label for="productProtein">Protein (g/100g):</label>
            <input type="number" id="productProtein" step="0.1" min="0" required>
          </div>
        </div>
        <div class="form-group">
          <label for="productSodium">Sodium (mg/100g):</label>
          <input type="number" id="productSodium" step="0.1" min="0" required>
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  `;
}

/**
 * Renders the meal planner HTML.
 * @returns {string} HTML string for the meal planner.
 */
export function renderMealPlanner() {
  return `
    <div class="form-section">
      <h2>Meal Planner</h2>
      <form id="mealForm">
        <div class="form-group">
          <label for="mealName">Meal Name:</label>
          <input type="text" id="mealName" required>
        </div>
        <div class="form-group">
          <label for="mealProduct">Product:</label>
          <select id="mealProduct" required>
            <option value="">Select a product</option>
          </select>
        </div>
        <div class="form-group">
          <label for="mealGrams">Amount (grams):</label>
          <input type="number" id="mealGrams" min="0" step="1" required>
        </div>
        <button type="submit">Add to Meal</button>
      </form>
    </div>
  `;
}

/**
 * Renders the nutrition summary HTML.
 * @returns {string} HTML string for the nutrition summary.
 */
export function renderNutritionSummary() {
  return `
    <div class="summary-section">
      <h2>Nutrition Summary</h2>
      <div id="nutritionSummary">
        <p>No meals added yet.</p>
      </div>
    </div>
  `;
}

/**
 * Renders a product item HTML.
 * @param {Object} product - The product to render.
 * @returns {string} HTML string for the product item.
 */
export function renderProductItem(product) {
  return `
    <div class="product-item">
      <div class="product-info">
        <strong>${product.name}</strong>
        <span>Energy: ${product.energy} kcal</span>
        <span>Fat: ${product.fat}g</span>
        <span>Carbs: ${product.carbs}g</span>
        <span>Protein: ${product.protein}g</span>
        <span>Sodium: ${product.sodium}mg</span>
      </div>
      <button class="delete-btn" data-name="${product.name}">Delete</button>
    </div>
  `;
}

/**
 * Renders a meal item HTML.
 * @param {Object} meal - The meal to render.
 * @returns {string} HTML string for the meal item.
 */
export function renderMealItem(meal) {
  return `
    <div class="meal-item">
      <div class="meal-info">
        <strong>${meal.name}</strong>
        <span>${meal.productName} - ${meal.grams}g</span>
        <span>Energy: ${meal.nutrition.energy} kcal</span>
        <span>Sodium: ${meal.nutrition.sodium}mg</span>
      </div>
      <button class="delete-btn" data-name="${meal.name}">Delete</button>
    </div>
  `;
}