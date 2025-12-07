import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // const handleClick = () => {
  //   // Empty for now - will be implemented later
  // };

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow"
    >
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Rating:</span>
            <span className="text-sm text-muted-foreground">
              {product.averageRating.toFixed(1)} / 5.0
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Reviews:</span>
            <span className="text-sm text-muted-foreground">
              {product.reviewCount}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
