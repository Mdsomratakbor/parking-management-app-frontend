export interface Product {
  title: string;
  description: string;
  brand: string;
  code: string;
  price: number;
  categoryId: number; // Assuming CategoryId is a number
  subCategoryId: number | null; // Assuming SubCategoryId can be null
}
