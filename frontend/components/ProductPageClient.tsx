"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import { Review } from "@/types/review";
import { ProductDetails } from "./ProductDetails";
import { ReviewForm } from "./ReviewForm";
import { ReviewList } from "./ReviewList";
import { reviewApi, transformers } from "@/lib/apiClient";

interface ProductPageClientProps {
  product: Product;
  initialReviews: Review[];
}

export function ProductPageClient({
  product,
  initialReviews,
}: ProductPageClientProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [currentProduct, setCurrentProduct] = useState<Product>(product);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReviewSubmit = async (data: {
    email: string;
    rating: number;
    comment: string;
  }) => {
    setIsSubmitting(true);

    try {
      const reviewPayload = transformers.reviewToBackend(
        data.email,
        data.rating,
        data.comment
      );

      const newReview = await reviewApi.createReview(
        currentProduct.id,
        reviewPayload
      );

      const transformedReview = transformers.reviewToFrontend({
        ...newReview,
        product_id: currentProduct.id,
      });
      setReviews([transformedReview, ...reviews]);

      const newReviewCount = currentProduct.reviewCount + 1;
      const newAverageRating =
        (currentProduct.averageRating * currentProduct.reviewCount +
          data.rating) /
        newReviewCount;

      setCurrentProduct({
        ...currentProduct,
        reviewCount: newReviewCount,
        averageRating: parseFloat(newAverageRating.toFixed(2)),
      });

      alert("Review submitted successfully!");
    } catch (error: unknown) {
      console.error("Failed to submit review:", error);
      alert("Error submitting review!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <ProductDetails product={currentProduct} />
      <ReviewForm onSubmit={handleReviewSubmit} isSubmitting={isSubmitting} />
      <ReviewList reviews={reviews} />
    </div>
  );
}
