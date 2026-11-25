import {
  formatPrice,
  getFinalPrice,
  getStockStatus,
  parseProductId,
} from "../utils/format";

export function FormatExamples() {
  // Task 2.1: formatPrice examples
  console.log("=== Task 2.1: formatPrice ===");
  console.log(formatPrice(99.5)); // "$99.50"
  console.log(formatPrice(99.5, "EUR")); // "€99.50"
  console.log(formatPrice(1000, "GBP")); // "£1,000.00"

  // Task 2.1: getFinalPrice examples
  console.log("\n=== Task 2.1: getFinalPrice ===");
  console.log(getFinalPrice(100, 10)); // 90
  console.log(getFinalPrice(100)); // 100 (no discount)
  console.log(getFinalPrice(99.99, 5)); // 94.99

  // Task 2.1: getStockStatus examples
  console.log("\n=== Task 2.1: getStockStatus ===");
  console.log(getStockStatus(0)); // "out-of-stock"
  console.log(getStockStatus(5)); // "low-stock"
  console.log(getStockStatus(50)); // "in-stock"

  // Task 2.2: parseProductId examples
  console.log("\n=== Task 2.2: parseProductId ===");
  console.log(parseProductId(5)); // 5
  console.log(parseProductId("10")); // 10

  // Invalid cases (should throw errors)
  try {
    parseProductId(-5); // Error: Invalid product ID
  } catch (e) {
    console.log("Error caught:", (e as Error).message);
  }

  try {
    parseProductId("abc"); // Error: Invalid product ID (NaN)
  } catch (e) {
    console.log("Error caught:", (e as Error).message);
  }

  return (
    <div>
      <h2>
        Format Examples :
        <span>
          {" "}
          Check the console for all format utility examples (Task 2.1 & 2.2)
        </span>
      </h2>
    </div>
  );
}
