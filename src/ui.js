/**
 * UI rendering functions for the nutrition tracker.
 */

/**
 * Renders the product form HTML.
 * @returns {string} HTML string for the product form
 */
export function renderProductForm() {
  return `
    <div class="card">
      <h2>Add Product</h2>
      <form id="product-form">
        <div class="form-group">
          <label for="product-name">Product Name</label>
          <input type="text" id="product-name" required>
        </div>
        <div class="form-group">
          <label for="product-energy">Energy (kcal/100g)</label>
          <input type="number" id="product-energy" min="0" step="0.1" required>
        </div>
        <div class="form-group">
          <label for="product-fat">Fat (g/100g)</label>
          <input type="number" id="product-fat" min="0" step="0.1" required>
        </div>
        <div class="form-group">
          <label for="product-saturated-fat">Saturated Fat (g/100g)</label>
          <input type="number" id="product-saturated-fat" min="0" step="0.1" required>
        </div>
        <div class="form-group">
          <label for="product-carbs">Carbs (g/100g)</label>
          <input type="number" id="product-carbs" min="0" step="0.1" required>
        </div>
        <div class="form-group">
          <label for="product-sugars">Sugars (g/100g)</label>
          <input type="number" id="product-sugars" min="0" step="0.1" required>
        </div>
        <div class="form-group">
          <label for="product-protein">Protein (g/100g)</label>
          <input type="number" id="product-protein" min="0" step="0.1" required>
        </div>
        <div class="form-group">
          <label for="product-salt">Salt (g/100g)</label>
          <input type="number" id="product-salt" min="0" step="0.01" required>
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  `;
}

/**
 * Renders the meal planner HTML.
 * @returns {string} HTML string for the meal planner
 */
export function renderMealPlanner() {
  return `
    <div class="card">
      <h2>Meal Planner</h2>
      <form id="meal-form">
        <div class="form-group">
          <label for="meal-name">Meal Name</label>
          <input type="text" id="meal-name" required>
        </div>
        <div class="form-group">
          <label for="meal-date">Date</label>
          <input type="date" id="meal-date" required>
        </div>
        <div id="meal-items">
          <div class="meal-item-row">
            <select class="product-select" required>
              <option value="">Select Product</option>
            </select>
            <input type="number" class="grams-input" placeholder="Grams" min="0" step="1" required>
            <button type="button" class="remove-item-btn" style="display:none;">×</button>
          </div>
        </div>
        <button type="button" id="add-item-btn">+ Add Item</button>
        <button type="submit">Save Meal</button>
      </form>
      <div id="meals-list"></div>
    </div>
  `;
}

/**
 * Renders the nutrition summary HTML.
 * @returns {string} HTML string for the nutrition summary
 */
export function renderNutritionSummary() {
  return `
    <div class="card">
      <h2>Nutrition Summary</h2>
      <div id="nutrition-summary">
        <p>Select a meal to view its nutrition summary.</p>
      </div>
    </div>
  `;
}

/**
 * Renders a product list item.
 * @param {object} product - Product object
 * @returns {string} HTML string for the product item
 */
export function renderProductItem(product) {
  return `
    <div class="product-item">
      <span>${product.name}</span>
      <button class="delete-product-btn" data-id="${product.id}">Delete</button>
    </div>
  `;
}

/**
 * Renders a meal list item.
 * @param {object} meal - Meal object
 * @returns {string} HTML string for the meal item
 */
export function renderMealItem(meal) {
  return `
    <div class="meal-item" data-id="${meal.id}">
      <h4>${meal.name} (${meal.date})</h4>
      <button class="delete-meal-btn" data-id="${meal.id}">Delete</button>
    </div>
  `;
}