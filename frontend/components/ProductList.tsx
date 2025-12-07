import { ProductCard } from "./ProductCard";
import { fetchProducts } from "@/lib/apiClient";

export async function ProductList() {
  const products = await fetchProducts();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      {products.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No products available
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
