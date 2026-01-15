export function applyDiscount(price: number, discountPercent: number): number {
  return price - (price*discountPercent) / 100;
}
