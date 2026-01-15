export interface CartItem {
  price: number;
  quantity: number;
  isTaxExempt?: boolean;
}

export interface CartTotals {
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
}

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

export function calculateTax(
    price: number, 
    taxRate: number, 
    taxExempt: boolean=false): number {

  //return just the tax amount (do not include subtotal)

  if (price < 0) {
    throw new Error("Price cannot be negative.");
  }

  if (taxRate < 0) {
    throw new Error("Tax rate cannot be negative.");
  }
  
  if (taxExempt) {
    return 0;
  }

  const tax=(price*taxRate) / 100;
  //console.log(tax);
  return Math.round(tax*100) / 100;
}

export function calculateTotal(items: CartItem[], discountRate: number, taxRate: number): number {
  let totals: CartTotal={
    subtotal: 0,
    discount: 0,
    tax: 0,
    total: 0
  };

  if (items.length === 0) {
    return totals;
  }

  for (let i=0;i<items.length;i++) {
    for (let j=0;j<items[i].quantity;j++) {
      totals.subtotal+=applyDiscount(items[i].price, discountRate); //refactor into one function call later
      totals.discount+=items[i].price-applyDiscount(items[i].price, discountRate);
      if (!items[i].taxExempt) {
        totals.tax+=calculateTax(applyDiscount(items[i].price, discountRate), taxRate, items[i].isTaxExempt);
      }
      totals.total+=applyDiscount(items[i].price, discountRate)+calculateTax(applyDiscount(items[i].price, discountRate), taxRate);
    }
  }

  return totals;
}
