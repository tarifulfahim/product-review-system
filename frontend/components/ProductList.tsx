import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

// Mock data - will be replaced with API call later
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    averageRating: 4.5,
    reviewCount: 128,
  },
  {
    id: 2,
    name: "Smart Watch",
    averageRating: 4.2,
    reviewCount: 89,
  },
  {
    id: 3,
    name: "Laptop Stand",
    averageRating: 4.8,
    reviewCount: 245,
  },
  {
    id: 4,
    name: "USB-C Hub",
    averageRating: 4.0,
    reviewCount: 67,
  },
  {
    id: 5,
    name: "Mechanical Keyboard",
    averageRating: 4.7,
    reviewCount: 312,
  },
  {
    id: 6,
    name: "Gaming Mouse",
    averageRating: 4.6,
    reviewCount: 198,
  },
];

export function ProductList() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
