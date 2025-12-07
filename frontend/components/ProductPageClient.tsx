"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import { Review } from "@/types/review";
import { ProductDetails } from "./ProductDetails";
import { ReviewForm } from "./ReviewForm";
import { ReviewList } from "./ReviewList";

interface ProductPageClientProps {
  product: Product;
  initialReviews: Review[];
}

export function ProductPageClient({ product, initialReviews }: ProductPageClientProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const handleReviewSubmit = (data: { email: string; rating: number; comment: string }) => {
    // Generate new ID based on existing reviews
    const newId = reviews.length > 0 ? Math.max(...reviews.map(r => r.id)) + 1 : 1;

    // Create new review object
    const newReview: Review = {
      id: newId,
      productId: product.id,
      rating: data.rating,
      comment: data.comment,
      authorEmail: data.email,
      date: new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
    };

    // Add new review to the beginning of the array (most recent first)
    setReviews([newReview, ...reviews]);
  };

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <ProductDetails product={product} />
      <ReviewForm onSubmit={handleReviewSubmit} />
      <ReviewList reviews={reviews} />
    </div>
  );
}
