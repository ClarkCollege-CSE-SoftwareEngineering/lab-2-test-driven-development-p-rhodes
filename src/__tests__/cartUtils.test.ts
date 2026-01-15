import { describe, it, expect } from "vitest";
import { applyDiscount, 
         calculateTax,
         calculateTotal,
         CartItem,
         CartTotals } from "../cartUtils";

describe("applyDiscount", () => {
  it("applies a percentage discount to a price", () => {
    expect(applyDiscount(100, 10)).toBe(90);
  });

  it("returns original price when discount is 0%", () => {
    expect(applyDiscount(50, 0)).toBe(50);
  });

  it("returns 0 when discount is 100%", () => {
    expect(applyDiscount(75, 100)).toBe(0);
  });

  it("handles decimal prices correctly", () => {
    expect(applyDiscount(19.99, 10)).toBeCloseTo(17.99, 2);
  });

  it("throws an error for negative prices", () => {
    expect(() => applyDiscount(-10, 10)).toThrow("Price cannot be negative.");
  });

  it("throws an error for negative discount percentages", () => {
    expect(() => applyDiscount(100, -5)).toThrow("Discount cannot be negative.");
  });

  it("throws an error for discount greater than 100%", () => {
    expect(() => applyDiscount(100, 150)).toThrow("Discount cannot exceed 100%.");
  });
});

describe("calculateTax", () => {
  it("calculates tax on a price", () => {
    expect(calculateTax(100, 8.5)).toBeCloseTo(8.5, 2); //what is the 2 doing here?
  });

  it("returns 0 tax when rate is 0%", () => {
    expect(calculateTax(100, 0)).toBe(0);
  });

  it("handles decimal prices correctly", () => {
    expect(calculateTax(19.99, 10)).toBeCloseTo(2.0, 2);
  });

  it("returns 0 tax when item is tax exempt", () => {
    expect(calculateTax(100, 8.5, true)).toBe(0);
  });

  it("throws an error for negative prices", () => {
    expect(() => calculateTax(-10, 8.5)).toThrow("Price cannot be negative.");
  });

  it("throws an error for negative tax rates", () => {
    expect(() => calculateTax(100, -0.5)).toThrow("Tax rate cannot be negative.");
  });
});

describe("calculateTotal", () => {
  it("calculates totals for a single item", () => {
    let items: CartItem[]=[];
    items[0]={ price: 100, quantity: 1 };

    expect(calculateTotal(items, 0, 8.5).total).toBe(108.5);
  });

  it("calculates totals for multiple items", () => {
    let items: CartItems[]=[];

    items.push({ price: 100, quantity: 1 });
    items.push({ price: 100, quantity: 1 });
    items.push({ price: 100, quantity: 1 });

    expect(calculateTotal(items, 0, 8.5).total).toBeCloseTo(325.5, 2);
  });

  it("calculates totals for items with multiple quantities", () => {
    let items: CartItems[]=[];

    items.push({ price: 100, quantity: 2 });

    expect(calculateTotal(items, 0, 8.5).total).toBeCloseTo(217, 2);
  });

  it("applies discount before calculating tax", () => {
    let items: CartItems[]=[];

    items.push({ price: 100, quantity: 1 });

    expect(calculateTotal(items, 10, 8.5).total).toBeCloseTo(97.65, 2);
  });

  it("excludes tax-exempt item from tax calculation", () => {
    let items: CartItems[]=[];

    items.push({ price: 100, quantity: 1, isTaxExempt: true });

    expect(calculateTotal(items, 0, 8.5).tax).toBe(0);
  });

  it("returns 0 if no items are in cart", () => {
    let items: CartItems[]=[];

    expect(calculateTotal(items, 0, 8.5).total).toBe(0);
  });

  it("only applies tax on taxable items", () => {
    let items: CartItems[]=[];

    items.push({ price: 100, quantity: 1 });
    items.push({ price: 100, quantity: 1, isTaxExempt: true });

    expect(calculateTotal(items, 0, 8.5).total).toBe(208.5);
  });

  it("correctly calculates the discounts applied", () => {
    let items: CartItems[]=[];

    items.push({ price: 100, quantity: 1 });

    expect(calculateTotal(items, 10, 8.5).discount).toBe(10);
  });

});
