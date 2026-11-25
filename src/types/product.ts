// // phase 1.1

// interface Reviews {
//   rating: number;
//   comment: string;
//   date: string;
//   reviewerName: string;
//   reviewerEmail: string;
// }

// interface Dimensions {
//   width: number;
//   height: number;
//   depth: number;
// }
// interface Meta {
//   createdAt: string;
//   updatedAt: string;
//   barcode: string;
//   qrCode: string;
// }

interface Products {
  readonly id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  //   sku: string;
  //   weight: number;
  //   warrantyInformation: string;
  //   shippingInformation: string;
  //   availabilityStatus: string;
  //   returnPolicy: string;
  //   minimumOrderQuantity: number;
  //   reviews: Array<Reviews>;
  //   dimensions: Dimensions;
  //   meta: Meta;
  images: Array<string>;
  thumbnail: string;
  brand?: string;
}

// phase 1.2
type StockStatus = "in-stock" | "out-of-stock" | "low-stock";
type SortKey = "title" | "price" | "rating";
type SortDirection = "asc" | "desc";

// phase 1.3
type ProductPreview = Pick<Products, "id" | "title" | "price" | "thumbnail">;
type NewProduct = Pick<
  Products,
  "title" | "description" | "price" | "stock" | "category"
>;
type ProductUpdate = Partial<Products>;
type ProductFormErrors = Partial<Record<keyof NewProduct, string>>;

// phase 1.4
export const CATEGORIES = [
  "smartphones",
  "laptops",
  "fragrances",
  "groceries",
] as const;

type PriceRange = [number, number]; // tuple: [min, max]

export type Category = (typeof CATEGORIES)[number];

export type {
  Products,
  StockStatus,
  SortKey,
  SortDirection,
  ProductPreview,
  NewProduct,
  ProductUpdate,
  ProductFormErrors,
  PriceRange,
};
