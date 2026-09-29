import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { saveProduct, getProducts, saveMeal, getMeals, deleteProduct, getMeal } from "../src/storage.js";

describe("storage", () => {
  // Use a mock storage object instead of localStorage
  const createMockStorage = () => {
    const store = {};
    return {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => { store[key] = value; },
      clear: () => { Object.keys(store).forEach(key => delete store[key]); }
    };
  };

  const mockStorage = createMockStorage();

  test("AC-2: saves and retrieves a product", () => {
    const product = {
      id: "product-1",
      name: "Chocolate Bar",
      per100g: {
        energy: 549,
        fat: 33,
        saturatedFat: 13,
        carbs: 55,
        sugars: 45,
        protein: 6.8,
        sodium: 0.18
      }
    };

    saveProduct(product, mockStorage);
    const products = getProducts(mockStorage);

    assert.equal(products.length, 1);
    assert.equal(products[0].name, "Chocolate Bar");
    assert.equal(products[0].per100g.energy, 549);
  });

  test("AC-2: stores multiple products", () => {
    const product1 = {
      id: "product-1",
      name: "Chocolate Bar",
      per100g: {
        energy: 549,
        fat: 33,
        saturatedFat: 13,
        carbs: 55,
        sugars: 45,
        protein: 6.8,
        sodium: 0.18
      }
    };

    const product2 = {
      id: "product-2",
      name: "Apple Juice",
      per100g: {
        energy: 47,
        fat: 0,
        saturatedFat: 0,
        carbs: 11,
        sugars: 10,
        protein: 0.7,
        sodium: 0
      }
    };

    saveProduct(product1, mockStorage);
    saveProduct(product2, mockStorage);
    const products = getProducts(mockStorage);

    assert.equal(products.length, 2);
    assert.ok(products.some(p => p.name === "Chocolate Bar"));
    assert.ok(products.some(p => p.name === "Apple Juice"));
  });

  test("AC-2: returns empty array when no products stored", () => {
    mockStorage.clear();
    const products = getProducts(mockStorage);
    assert.equal(products.length, 0);
  });

  test("AC-2: updates existing product", () => {
    const product1 = {
      id: "product-1",
      name: "Chocolate Bar",
      per100g: { energy: 549, fat: 33, saturatedFat: 13, carbs: 55, sugars: 45, protein: 6.8, sodium: 0.18 }
    };

    const product2 = {
      id: "product-1",
      name: "Chocolate Bar",
      per100g: { energy: 600, fat: 35, saturatedFat: 15, carbs: 50, sugars: 40, protein: 7, sodium: 0.2 }
    };

    saveProduct(product1, mockStorage);
    saveProduct(product2, mockStorage);
    const products = getProducts(mockStorage);

    assert.equal(products.length, 1);
    assert.equal(products[0].per100g.energy, 600);
  });

  test("AC-2: deletes a product", () => {
    const product = {
      id: "product-1",
      name: "Chocolate Bar",
      per100g: { energy: 549, fat: 33, saturatedFat: 13, carbs: 55, sugars: 45, protein: 6.8, sodium: 0.18 }
    };

    saveProduct(product, mockStorage);
    deleteProduct("Chocolate Bar", mockStorage);
    const products = getProducts(mockStorage);

    assert.equal(products.length, 0);
  });

  test("AC-5: saves and retrieves a meal", () => {
    const meal = {
      id: "meal-1",
      name: "Snack Time",
      items: [
        {
          productId: "product-1",
          productName: "Chocolate Bar",
          grams: 30,
          nutrition: {
            energy: 164.7,
            fat: 9.9,
            saturatedFat: 3.9,
            carbs: 16.5,
            sugars: 13.5,
            protein: 2.04,
            sodium: 0.054
          }
        }
      ],
      totalNutrition: {
        energy: 164.7,
        fat: 9.9,
        saturatedFat: 3.9,
        carbs: 16.5,
        sugars: 13.5,
        protein: 2.04,
        sodium: 0.054
      }
    };

    saveMeal(meal, mockStorage);
    const meals = getMeals(mockStorage);

    assert.equal(meals.length, 1);
    assert.equal(meals[0].name, "Snack Time");
    assert.equal(meals[0].items.length, 1);
    assert.equal(meals[0].totalNutrition.energy, 164.7);
  });

  test("AC-5: stores multiple meals", () => {
    const meal1 = {
      id: "meal-1",
      name: "Breakfast",
      items: [],
      totalNutrition: { energy: 0, fat: 0, saturatedFat: 0, carbs: 0, sugars: 0, protein: 0, sodium: 0 }
    };

    const meal2 = {
      id: "meal-2",
      name: "Lunch",
      items: [],
      totalNutrition: { energy: 0, fat: 0, saturatedFat: 0, carbs: 0, sugars: 0, protein: 0, sodium: 0 }
    };

    saveMeal(meal1, mockStorage);
    saveMeal(meal2, mockStorage);
    const meals = getMeals(mockStorage);

    assert.equal(meals.length, 2);
    assert.ok(meals.some(m => m.name === "Breakfast"));
    assert.ok(meals.some(m => m.name === "Lunch"));
  });

  test("AC-5: returns empty array when no meals stored", () => {
    mockStorage.clear();
    const meals = getMeals(mockStorage);
    assert.equal(meals.length, 0);
  });

  test("AC-5: retrieves a specific meal by name", () => {
    const meal = {
      id: "meal-1",
      name: "Breakfast",
      items: [],
      totalNutrition: { energy: 0, fat: 0, saturatedFat: 0, carbs: 0, sugars: 0, protein: 0, sodium: 0 }
    };

    saveMeal(meal, mockStorage);
    const retrievedMeal = getMeal("Breakfast", mockStorage);

    assert.ok(retrievedMeal);
    assert.equal(retrievedMeal.name, "Breakfast");
  });

  test("AC-5: returns undefined for non-existent meal", () => {
    mockStorage.clear();
    const retrievedMeal = getMeal("NonExistent", mockStorage);

    assert.equal(retrievedMeal, undefined);
  });
});