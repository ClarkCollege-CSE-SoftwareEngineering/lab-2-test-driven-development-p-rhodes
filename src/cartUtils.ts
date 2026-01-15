export function applyDiscount(price: number, discountPercent: number): number {
  if (price < 0) {
    throw new Error("Price cannot be negative.");
  }

  if (discountPercent < 0) {
    throw new Error("Discount cannot be negative.");
  }

  if (discountPercent > 100) {
    throw new Error("Discount cannot exceed 100%.");
  }

  const discountMultiplier=1-discountPercent / 100;
  return price*discountMultiplier;
}

export function calculateTax(price: number, taxRate: number, taxExempt: boolean=false): number {
  //return just the tax amount (do not include subtotal)
  
  if (taxExempt) {
    return 0;
  }

  const tax=(price*taxRate) / 100;
  //console.log(tax);
  return tax;
}
