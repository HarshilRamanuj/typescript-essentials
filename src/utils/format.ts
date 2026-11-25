// Format utilities

import type { StockStatus } from "../types/product";
// phase 2.1
export function formatPrice(amount: number, currency?: string): string {
  const curr = currency ?? "USD";
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: curr,
  });
  return formatter.format(amount);
}

export function getFinalPrice(
  price: number,
  discountPercentage?: number,
): number {
  const discount = discountPercentage ?? 0;
  const finalPrice = price * (1 - discount / 100);
  return Math.round(finalPrice * 100) / 100;
}

export function getStockStatus(stock: number): StockStatus {
  if (stock <= 0) {
    return "out-of-stock";
  } else if (stock > 0 && stock < 10) {
    return "low-stock";
  } else {
    return "in-stock";
  }
}
// phase 2.2
export function parseProductId(value: string | number): number {
  let result: number;

  if (typeof value === "string") {
    result = Number(value);
  } else {
    result = value;
  }

  if (isNaN(result) || result <= 0) {
    throw new Error("Invalid product ID");
  }

  return result;
}

// phase 2.3
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return "Something went wrong";
}
