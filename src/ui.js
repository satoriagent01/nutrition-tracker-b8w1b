/**
 * UI module for the nutrition tracker.
 * Provides functions to render and manage the user interface.
 */

/**
 * Renders the product form HTML.
 *
 * @returns {string} HTML string for the product form
 */
export function renderProductForm() {
  return `
    <div class="form-section">
      <h2>Add Product</h2>
      <form id="product-form">
        <div class="form-group">
          <label for="product-name">Product Name:</label>
          <input type="text" id="product-name" name="name" required>
        </div>
        <div class="form-group">
          <label for="product-energy">Energy (kcal/100g):</label>
          <input type="number" id="product-energy" name="energy" min="0" step="any" required>
        </div>
        <div class="form-group">
          <label for="product-fat">Fat (g/100g):</label>
          <input type="number" id="product-fat" name="fat" min="0" step="any" required>
        </div>
        <div class="form-group">
          <label for="product-saturated-fat">Saturated Fat (g/100g):</label>
          <input type="number" id="product-saturated-fat" name="saturatedFat" min="0" step="any" required>
        </div>
        <div class="form-group">
          <label for="product-carbs">Carbs (g/100g):</label>
          <input type="number" id="product-carbs" name="carbs" min="0" step="any" required>
        </div>
        <div class="form-group">
          <label for="product-sugars">Sugars (g/100g):</label>
          <input type="number" id="product-sugars" name="sugars" min="0" step="any" required>
        </div>
        <div class="form-group">
          <label for="product-protein">Protein (g/100g):</label>
          <input type="number" id="product-protein" name="protein" min="0" step="any" required>
        </div>
        <div class="form-group">
          <label for="product-sodium">Sodium (mg/100g):</label>
          <input type="number" id="product-sodium" name="sodium" min="0" step="any" required>
        </div>
        <button type="submit">Save Product</button>
      </form>
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
    <div class="form-section">
      <h2>Add Meal</h2>
      <form id="meal-form">
        <div class="form-group">
          <label for="meal-name">Meal Name:</label>
          <input type="text" id="meal-name" name="name" required>
        </div>
        <div class="form-group">
          <label for="meal-product">Product:</label>
          <select id="meal-product" name="product" required>
            <option value="">Select a product</option>
          </select>
        </div>
        <div class="form-group">
          <label for="meal-grams">Amount (grams):</label>
          <input type="number" id="meal-grams" name="grams" min="0" step="any" required>
        </div>
        <button type="submit">Add to Meal</button>
      </form>
    </div>
  `;
}

/**
 * Renders the nutrition summary HTML.
 *
 * @param {Object} nutrition - Nutritional data to display
 * @returns {string} HTML string for the nutrition summary
 */
export function renderNutritionSummary(nutrition) {
  return `
    <div class="nutrition-summary">
      <h2>Nutrition Summary</h2>
      <table>
        <tr><th>Nutrient</th><th>Amount</th></tr>
        <tr><td>Energy</td><td>${(nutrition.energy || 0).toFixed(1)} kcal</td></tr>
        <tr><td>Fat</td><td>${(nutrition.fat || 0).toFixed(1)} g</td></tr>
        <tr><td>Saturated Fat</td><td>${(nutrition.saturatedFat || 0).toFixed(1)} g</td></tr>
        <tr><td>Carbs</td><td>${(nutrition.carbs || 0).toFixed(1)} g</td></tr>
        <tr><td>Sugars</td><td>${(nutrition.sugars || 0).toFixed(1)} g</td></tr>
        <tr><td>Protein</td><td>${(nutrition.protein || 0).toFixed(1)} g</td></tr>
        <tr><td>Sodium</td><td>${(nutrition.sodium || 0).toFixed(1)} mg</td></tr>
      </table>
    </div>
  `;
}

/**
 * Renders the OCR upload section HTML.
 *
 * @returns {string} HTML string for the OCR upload section
 */
export function renderOcrUpload() {
  return `
    <div class="form-section">
      <h2>Scan Nutrition Label</h2>
      <div id="ocr-upload-area">
        <input type="file" id="ocr-file" accept="image/*">
        <button id="ocr-process-btn" disabled>Process Image</button>
        <div id="ocr-loading" class="loading-indicator" style="display: none;">
          <div class="spinner"></div>
          <p>Processing image...</p>
        </div>
        <div id="ocr-result" class="ocr-result"></div>
      </div>
    </div>
  `;
}

/**
 * Renders the API configuration section HTML.
 *
 * @returns {string} HTML string for the API config section
 */
export function renderApiConfig() {
  return `
    <div class="form-section">
      <h2>AI Configuration</h2>
      <form id="api-config-form">
        <div class="form-group">
          <label for="api-url">API Endpoint URL:</label>
          <input type="url" id="api-url" name="url" placeholder="https://api.openai.com/v1/chat/completions">
        </div>
        <div class="form-group">
          <label for="api-key">API Key:</label>
          <input type="password" id="api-key" name="key" placeholder="Your API key">
        </div>
        <div class="form-group">
          <label for="api-model">Model:</label>
          <input type="text" id="api-model" name="model" placeholder="gpt-4" value="gpt-4">
        </div>
        <button type="submit">Save Configuration</button>
      </form>
    </div>
  `;
}

/**
 * Renders the data management section HTML.
 *
 * @returns {string} HTML string for the data management section
 */
export function renderDataManagement() {
  return `
    <div class="form-section">
      <h2>Data Management</h2>
      <button id="export-data-btn">Export Data</button>
      <button id="import-data-btn">Import Data</button>
      <input type="file" id="import-file" accept=".json" style="display: none;">
    </div>
  `;
}

/**
 * Renders the products list HTML.
 *
 * @param {Array<Object>} products - Array of product objects
 * @returns {string} HTML string for the products list
 */
export function renderProductsList(products) {
  if (!products || products.length === 0) {
    return '<p>No products added yet.</p>';
  }

  let html = '<h3>Saved Products</h3><ul>';
  for (const product of products) {
    html += `<li>
      ${product.name}
      <button class="delete-product-btn" data-name="${product.name}">Delete</button>
    </li>`;
  }
  html += '</ul>';
  return html;
}

/**
 * Renders the meals list HTML.
 *
 * @param {Array<Object>} meals - Array of meal objects
 * @returns {string} HTML string for the meals list
 */
export function renderMealsList(meals) {
  if (!meals || meals.length === 0) {
    return '<p>No meals added yet.</p>';
  }

  let html = '<h3>Saved Meals</h3><ul>';
  for (const meal of meals) {
    html += `<li>
      ${meal.name} (${meal.items ? meal.items.length : 0} items)
      <button class="delete-meal-btn" data-name="${meal.name}">Delete</button>
    </li>`;
  }
  html += '</ul>';
  return html;
}

/**
 * Initializes all UI event listeners.
 *
 * @param {Object} config - Configuration object with handler functions
 */
export function initUI(config) {
  const {
    onProductSubmit,
    onMealSubmit,
    onOcrProcess,
    onApiConfigSave,
    onDeleteProduct,
    onDeleteMeal,
    onExportData,
    onImportData,
    onProductSelect,
    onProductDelete,
    onMealDelete
  } = config;

  // Product form submission
  const productForm = document.getElementById('product-form');
  if (productForm) {
    productForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(productForm);
      const product = {
        name: formData.get('name'),
        per100g: {
          energy: parseFloat(formData.get('energy')) || 0,
          fat: parseFloat(formData.get('fat')) || 0,
          saturatedFat: parseFloat(formData.get('saturatedFat')) || 0,
          carbs: parseFloat(formData.get('carbs')) || 0,
          sugars: parseFloat(formData.get('sugars')) || 0,
          protein: parseFloat(formData.get('protein')) || 0,
          sodium: parseFloat(formData.get('sodium')) || 0
        }
      };
      onProductSubmit(product);
      productForm.reset();
    });
  }

  // Meal form submission
  const mealForm = document.getElementById('meal-form');
  if (mealForm) {
    mealForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(mealForm);
      const meal = {
        name: formData.get('name'),
        product: formData.get('product'),
        grams: parseFloat(formData.get('grams')) || 0
      };
      onMealSubmit(meal);
      mealForm.reset();
    });
  }

  // OCR file input change
  const ocrFile = document.getElementById('ocr-file');
  const ocrProcessBtn = document.getElementById('ocr-process-btn');
  if (ocrFile && ocrProcessBtn) {
    ocrFile.addEventListener('change', () => {
      ocrProcessBtn.disabled = !ocrFile.files.length;
    });

    ocrProcessBtn.addEventListener('click', async () => {
      const file = ocrFile.files[0];
      if (!file) return;

      // Show loading indicator
      const loadingIndicator = document.getElementById('ocr-loading');
      if (loadingIndicator) {
        loadingIndicator.style.display = 'block';
      }
      ocrProcessBtn.disabled = true;

      try {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const imageData = event.target.result;
          await onOcrProcess(imageData);
        };
        reader.readAsDataURL(file);
      } finally {
        // Hide loading indicator and re-enable button
        if (loadingIndicator) {
          loadingIndicator.style.display = 'none';
        }
        ocrProcessBtn.disabled = false;
      }
    });
  }

  // API config form submission
  const apiConfigForm = document.getElementById('api-config-form');
  if (apiConfigForm) {
    apiConfigForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(apiConfigForm);
      const config = {
        url: formData.get('url'),
        key: formData.get('key'),
        model: formData.get('model')
      };

      // Confirmation dialog before saving API key
      if (config.key && !confirm('Are you sure you want to save your API key? It will be stored in localStorage.')) {
        return;
      }

      onApiConfigSave(config);
    });
  }

  // Export data button
  const exportBtn = document.getElementById('export-data-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', onExportData);
  }

  // Import data button
  const importBtn = document.getElementById('import-data-btn');
  const importFileInput = document.getElementById('import-file');
  if (importBtn && importFileInput) {
    importBtn.addEventListener('click', () => {
      importFileInput.click();
    });

    importFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        onImportData(event.target.result);
      };
      reader.readAsText(file);
      importFileInput.value = '';
    });
  }

  // Product select change
  const productSelect = document.getElementById('meal-product');
  if (productSelect) {
    productSelect.addEventListener('change', (e) => {
      onProductSelect(e.target.value);
    });
  }

  // Delete product buttons (event delegation)
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-product-btn')) {
      const productName = e.target.dataset.name;
      if (confirm(`Are you sure you want to delete "${productName}"?`)) {
        onProductDelete(productName);
      }
    }
    if (e.target.classList.contains('delete-meal-btn')) {
      const mealName = e.target.dataset.name;
      if (confirm(`Are you sure you want to delete "${mealName}"?`)) {
        onMealDelete(mealName);
      }
    }
  });
}