/**
 * UI rendering module for the nutrition tracker.
 * Provides functions to render the product form, meal planner, and nutrition summary.
 * These functions return HTML strings that can be injected into the DOM.
 */

/**
 * Renders the product form HTML.
 *
 * @returns {string} HTML string for the product form
 */
export function renderProductForm() {
  return `
    <section id="product-form-section">
      <h2>Add Product</h2>
      <form id="product-form">
        <div class="form-group">
          <label for="product-name">Product Name</label>
          <input type="text" id="product-name" name="name" required />
        </div>
        <div class="form-group">
          <label for="product-energy">Energy (kcal per 100g)</label>
          <input type="number" id="product-energy" name="energy" step="0.1" required />
        </div>
        <div class="form-group">
          <label for="product-fat">Fat (g per 100g)</label>
          <input type="number" id="product-fat" name="fat" step="0.1" required />
        </div>
        <div class="form-group">
          <label for="product-saturated-fat">Saturated Fat (g per 100g)</label>
          <input type="number" id="product-saturated-fat" name="saturatedFat" step="0.1" />
        </div>
        <div class="form-group">
          <label for="product-carbs">Carbohydrates (g per 100g)</label>
          <input type="number" id="product-carbs" name="carbs" step="0.1" required />
        </div>
        <div class="form-group">
          <label for="product-sugars">Sugars (g per 100g)</label>
          <input type="number" id="product-sugars" name="sugars" step="0.1" />
        </div>
        <div class="form-group">
          <label for="product-protein">Protein (g per 100g)</label>
          <input type="number" id="product-protein" name="protein" step="0.1" />
        </div>
        <div class="form-group">
          <label for="product-sodium">Sodium (g per 100g)</label>
          <input type="number" id="product-sodium" name="sodium" step="0.01" />
        </div>
        <button type="submit">Save Product</button>
      </form>
    </section>
  `;
}

/**
 * Renders the meal planner HTML.
 *
 * @returns {string} HTML string for the meal planner
 */
export function renderMealPlanner() {
  return `
    <section id="meal-planner-section">
      <h2>Meal Planner</h2>
      <form id="meal-form">
        <div class="form-group">
          <label for="meal-name">Meal Name</label>
          <input type="text" id="meal-name" name="name" required />
        </div>
        <div class="form-group">
          <label for="meal-date">Date</label>
          <input type="date" id="meal-date" name="date" required />
        </div>
        <div id="meal-items">
          <div class="meal-item">
            <div class="form-group">
              <label for="meal-product-0">Product</label>
              <select id="meal-product-0" name="productId" required>
                <option value="">Select a product</option>
              </select>
            </div>
            <div class="form-group">
              <label for="meal-grams-0">Grams</label>
              <input type="number" id="meal-grams-0" name="grams" step="0.1" required />
            </div>
          </div>
        </div>
        <button type="button" id="add-meal-item">Add Item</button>
        <button type="submit">Save Meal</button>
      </form>
      <div id="saved-meals"></div>
    </section>
  `;
}

/**
 * Renders the nutrition summary HTML.
 *
 * @param {object} nutrition - Nutritional summary object
 * @returns {string} HTML string for the nutrition summary
 */
export function renderNutritionSummary(nutrition) {
  const n = nutrition || {
    energy: 0,
    fat: 0,
    saturatedFat: 0,
    carbs: 0,
    sugars: 0,
    protein: 0,
    sodium: 0,
  };

  return `
    <section id="nutrition-summary-section">
      <h2>Nutrition Summary</h2>
      <div class="nutrition-grid">
        <div class="nutrition-item">
          <span class="nutrition-label">Energy</span>
          <span class="nutrition-value">${n.energy} kcal</span>
        </div>
        <div class="nutrition-item">
          <span class="nutrition-label">Fat</span>
          <span class="nutrition-value">${n.fat} g</span>
        </div>
        <div class="nutrition-item">
          <span class="nutrition-label">Saturated Fat</span>
          <span class="nutrition-value">${n.saturatedFat} g</span>
        </div>
        <div class="nutrition-item">
          <span class="nutrition-label">Carbohydrates</span>
          <span class="nutrition-value">${n.carbs} g</span>
        </div>
        <div class="nutrition-item">
          <span class="nutrition-label">Sugars</span>
          <span class="nutrition-value">${n.sugars} g</span>
        </div>
        <div class="nutrition-item">
          <span class="nutrition-label">Protein</span>
          <span class="nutrition-value">${n.protein} g</span>
        </div>
        <div class="nutrition-item">
          <span class="nutrition-label">Sodium</span>
          <span class="nutrition-value">${n.sodium} g</span>
        </div>
      </div>
    </section>
  `;
}