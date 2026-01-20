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

  const tax=Math.round(((price*taxRate)/100)*100) / 100;
  return tax;
}

export function calculateTotal(items: CartItem[], discountRate: number, taxRate: number): CartTotals {
  let totals: CartTotals={
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
      const subtotal=applyDiscount(items[i].price, discountRate);
      const discount=items[i].price-subtotal;
      let tax=0;

      totals.subtotal+=subtotal;
      totals.discount+=discount;

      if (items[i].isTaxExempt) {
        tax=calculateTax(subtotal, 0, true);
      }

      else {
        tax=calculateTax(subtotal, taxRate, false);
      }
      
      totals.tax+=tax;

      totals.total+=subtotal+tax;
    }
  }

  //enable these to output carts to stdout
  //console.log(`Calculated Total:\nSubtotal: $${totals.subtotal}`);
  //console.log(`Discount: $${totals.discount}\nTax: $${totals.tax}\nTotal: $${totals.total}`);

  return totals;
}
