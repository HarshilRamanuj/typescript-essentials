import type { AsyncState, Paginated } from "../types/api";
import type { Product, Category } from "../types/product";
import { FormatExamples } from "./FormatExamples";

export function ProductExamples() {
  // Task 1.1: Product interface example
  console.log("=== Task 1.1: Product Interface ===");
  const product: Product = {
    id: 1,
    title: "TS Essentials",
    description: "Learning typescript essentials",
    price: 87,
    category: "learning",
    discountPercentage: 10,
    rating: 4.5,
    images: ["image1.jpg", "image2.jpg"],
    thumbnail: "thumb.jpg",
    stock: 90,
    brand: "Tech Academy",
  };
  console.log("Product:", product);

  // Task 1.4: Category type from CATEGORIES constant
  console.log("\n=== Task 1.4: Category Type ===");
  const cat: Category = "smartphones";
  console.log("Category:", cat);

  // Task 1.5: AsyncState discriminated union examples
  console.log("\n=== Task 1.5: AsyncState ===");

  const stateIdle: AsyncState<Product> = { status: "idle" };
  console.log("Idle state:", stateIdle);

  const stateLoading: AsyncState<Product> = { status: "loading" };
  console.log("Loading state:", stateLoading);

  const stateSuccess: AsyncState<Product> = {
    status: "success",
    data: product,
  };
  console.log("Success state:", stateSuccess);
  console.log("Access data (only in success):", stateSuccess.data?.title);

  const stateError: AsyncState<Product> = {
    status: "error",
    message: "Failed to fetch product",
  };
  console.log("Error state:", stateError);

  // Task 1.5: Paginated type example
  console.log("\n=== Task 1.5: Paginated ===");
  const paginatedProducts: Paginated<Product> = {
    items: [product],
    total: 100,
    skip: 0,
    limit: 1,
  };
  console.log("Paginated products:", paginatedProducts);

  // Task 1.5: AsyncState with Paginated combination
  console.log("\n=== Task 1.5: AsyncState<Paginated<Product>> ===");
  const paginatedState: AsyncState<Paginated<Product>> = {
    status: "success",
    data: paginatedProducts,
  };
  console.log("Paginated state:", paginatedState);
  if (paginatedState.status === "success") {
    console.log("Items count:", paginatedState.data.items.length);
    console.log("Total:", paginatedState.data.total);
  }
  const myName = "Harshil Ramanuj";
  return (
    <div>
      <h1>Hello, {myName.toUpperCase()}</h1>
      <h2>
        Product Examples :
        <span> Check the console for all product type examples (Phase 1)</span>
      </h2>
      <FormatExamples />
    </div>
  );
}
