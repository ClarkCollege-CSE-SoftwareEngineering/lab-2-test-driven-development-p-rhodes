import { describe, it, expect } from "vitest";
import { applyDiscount } from "../cartUtils";

describe("applyDiscount", () => {
  it("applies a percentage discount to a price", () => {
    expect(applyDiscount(100, 10)).toBe(90);
  });
});
