import { ProductPageClient } from "@/components/ProductPageClient";
import { fetchSingleProduct } from "@/lib/apiClient";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await fetchSingleProduct(id).catch(() => null);

  if (!data) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    );
  }

  return (
    <ProductPageClient product={data.product} initialReviews={data.reviews} />
  );
}
