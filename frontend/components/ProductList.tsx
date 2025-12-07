import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

// Mock data - will be replaced with API call later
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation and superior sound quality.",
    averageRating: 4.5,
    reviewCount: 3,
  },
  {
    id: 2,
    name: "Smart Watch",
    description: "Feature-rich smartwatch with fitness tracking and heart rate monitoring.",
    averageRating: 4.2,
    reviewCount: 2,
  },
  {
    id: 3,
    name: "Laptop Stand",
    description: "Ergonomic aluminum laptop stand that improves posture.",
    averageRating: 4.8,
    reviewCount: 3,
  },
  {
    id: 4,
    name: "USB-C Hub",
    description: "Multi-port USB-C hub with HDMI and USB 3.0.",
    averageRating: 4.0,
    reviewCount: 2,
  },
  {
    id: 5,
    name: "Mechanical Keyboard",
    description: "Premium mechanical keyboard with RGB lighting.",
    averageRating: 4.7,
    reviewCount: 3,
  },
  {
    id: 6,
    name: "Gaming Mouse",
    description: "High-precision gaming mouse with customizable DPI.",
    averageRating: 4.6,
    reviewCount: 2,
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
