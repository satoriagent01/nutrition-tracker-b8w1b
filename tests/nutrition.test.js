import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { calculateNutrition, sumNutrition } from "../src/nutrition.js";

describe("calculateNutrition", () => {
  test("AC-3: calculates nutrition for 100g of a product", () => {
    const product = {
      name: "Chocolate Bar",
      energy: 549,
      fat: 33,
      saturatedFat: 13,
      carbs: 55,
      sugars: 45,
      protein: 6.8,
      sodium: 0.18
    };

    const result = calculateNutrition(product, 100);

    assert.equal(result.energy, 549);
    assert.equal(result.fat, 33);
    assert.equal(result.saturatedFat, 13);
    assert.equal(result.carbs, 55);
    assert.equal(result.sugars, 45);
    assert.equal(result.protein, 6.8);
    assert.equal(result.sodium, 0.18);
  });

  test("AC-3: calculates nutrition for 30g of a product", () => {
    const product = {
      name: "Chocolate Bar",
      energy: 549,
      fat: 33,
      saturatedFat: 13,
      carbs: 55,
      sugars: 45,
      protein: 6.8,
      sodium: 0.18
    };

    const result = calculateNutrition(product, 30);

    assert.equal(result.energy, 164.7);
    assert.equal(result.fat, 9.9);
    assert.equal(result.saturatedFat, 3.9);
    assert.equal(result.carbs, 16.5);
    assert.equal(result.sugars, 13.5);
    assert.equal(result.protein, 2.04);
    assert.equal(result.sodium, 0.054);
  });

  test("AC-3: calculates nutrition for 200ml of juice (per 100ml)", () => {
    const product = {
      name: "Apple Juice",
      energy: 47,
      fat: 0,
      saturatedFat: 0,
      carbs: 11,
      sugars: 10,
      protein: 0.7,
      sodium: 0
    };

    const result = calculateNutrition(product, 200);

    assert.equal(result.energy, 94);
    assert.equal(result.fat, 0);
    assert.equal(result.saturatedFat, 0);
    assert.equal(result.carbs, 22);
    assert.equal(result.sugars, 20);
    assert.equal(result.protein, 1.4);
    assert.equal(result.sodium, 0);
  });
});

describe("sumNutrition", () => {
  test("AC-4: sums nutrition across multiple meal items", () => {
    const items = [
      {
        name: "Chocolate Bar (30g)",
        energy: 164.7,
        fat: 9.9,
        saturatedFat: 3.9,
        carbs: 16.5,
        sugars: 13.5,
        protein: 2.04,
        sodium: 0.054
      },
      {
        name: "Apple Juice (200ml)",
        energy: 94,
        fat: 0,
        saturatedFat: 0,
        carbs: 22,
        sugars: 20,
        protein: 1.4,
        sodium: 0
      }
    ];

    const result = sumNutrition(items);

    assert.equal(result.energy, 258.7);
    assert.equal(result.fat, 9.9);
    assert.equal(result.saturatedFat, 3.9);
    assert.equal(result.carbs, 38.5);
    assert.equal(result.sugars, 33.5);
    assert.equal(result.protein, 3.44);
    assert.equal(result.sodium, 0.054);
  });

  test("AC-4: sums nutrition for a single item", () => {
    const items = [
      {
        name: "Olive Oil (20g)",
        energy: 180,
        fat: 20,
        saturatedFat: 3,
        carbs: 0,
        sugars: 0,
        protein: 0,
        sodium: 0
      }
    ];

    const result = sumNutrition(items);

    assert.equal(result.energy, 180);
    assert.equal(result.fat, 20);
    assert.equal(result.saturatedFat, 3);
    assert.equal(result.carbs, 0);
    assert.equal(result.sugars, 0);
    assert.equal(result.protein, 0);
    assert.equal(result.sodium, 0);
  });

  test("AC-4: handles empty array", () => {
    const result = sumNutrition([]);

    assert.equal(result.energy, 0);
    assert.equal(result.fat, 0);
    assert.equal(result.saturatedFat, 0);
    assert.equal(result.carbs, 0);
    assert.equal(result.sugars, 0);
    assert.equal(result.protein, 0);
    assert.equal(result.sodium, 0);
  });
});