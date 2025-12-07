import { Product } from "@/types/product";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold">{product.name}</h1>
      <p className="text-lg text-muted-foreground">{product.description}</p>
    </div>
  );
}
