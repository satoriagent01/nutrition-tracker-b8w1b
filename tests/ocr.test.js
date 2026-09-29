import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { extractNutrition } from "../src/ocr.js";

describe("extractNutrition", () => {
  test("AC-1: extracts energy, fat, carbs, sugars, protein, sodium from a sample OCR response", () => {
    const sampleOcrResponse = "Energy: 549 kcal\nFat: 33 g\nSaturated Fat: 13 g\nCarbohydrates: 55 g\nSugars: 45 g\nProtein: 6.8 g\nSodium: 0.18 g";

    const result = extractNutrition(sampleOcrResponse);

    assert.equal(result.energy, 549);
    assert.equal(result.fat, 33);
    assert.equal(result.saturatedFat, 13);
    assert.equal(result.carbs, 55);
    assert.equal(result.sugars, 45);
    assert.equal(result.protein, 6.8);
    assert.equal(result.sodium, 0.18);
  });

  test("AC-1: handles missing values gracefully", () => {
    const sampleOcrResponse = "Energy: 47 kcal\nCarbohydrates: 11 g";

    const result = extractNutrition(sampleOcrResponse);

    assert.equal(result.energy, 47);
    assert.equal(result.fat, 0);
    assert.equal(result.saturatedFat, 0);
    assert.equal(result.carbs, 11);
    assert.equal(result.sugars, 0);
    assert.equal(result.protein, 0);
    assert.equal(result.sodium, 0);
  });

  test("AC-1: parses kcal value correctly", () => {
    const sampleOcrResponse = "Energy: 165 kcal\nFat: 10 g\nCarbohydrates: 16 g\nSugars: 14 g\nProtein: 2.0 g\nSodium: 0.05 g";

    const result = extractNutrition(sampleOcrResponse);

    assert.equal(result.energy, 165);
    assert.equal(result.fat, 10);
    assert.equal(result.saturatedFat, 0);
    assert.equal(result.carbs, 16);
    assert.equal(result.sugars, 14);
    assert.equal(result.protein, 2.0);
    assert.equal(result.sodium, 0.05);
  });
});