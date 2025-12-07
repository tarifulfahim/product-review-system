import { ProductDetails } from "@/components/ProductDetails";
import { ReviewList } from "@/components/ReviewList";
import { Product } from "@/types/product";
import { Review } from "@/types/review";

// Mock product data
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation and superior sound quality. Perfect for music lovers and professionals.",
    averageRating: 4.5,
    reviewCount: 3,
  },
  {
    id: 2,
    name: "Smart Watch",
    description: "Feature-rich smartwatch with fitness tracking, heart rate monitoring, and smartphone notifications.",
    averageRating: 4.2,
    reviewCount: 2,
  },
  {
    id: 3,
    name: "Laptop Stand",
    description: "Ergonomic aluminum laptop stand that improves posture and keeps your laptop cool during extended use.",
    averageRating: 4.8,
    reviewCount: 3,
  },
  {
    id: 4,
    name: "USB-C Hub",
    description: "Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader for enhanced connectivity.",
    averageRating: 4.0,
    reviewCount: 2,
  },
  {
    id: 5,
    name: "Mechanical Keyboard",
    description: "Premium mechanical keyboard with RGB lighting and tactile switches for the ultimate typing experience.",
    averageRating: 4.7,
    reviewCount: 3,
  },
  {
    id: 6,
    name: "Gaming Mouse",
    description: "High-precision gaming mouse with customizable DPI settings and programmable buttons.",
    averageRating: 4.6,
    reviewCount: 2,
  },
];

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: 1,
    productId: 1,
    rating: 5.0,
    comment: "Absolutely amazing headphones! The noise cancellation is top-notch and the battery life is incredible.",
    authorEmail: "john.doe@example.com",
    date: "2024-11-15",
  },
  {
    id: 2,
    productId: 1,
    rating: 4.5,
    comment: "Great sound quality and comfortable to wear for long periods. Highly recommend!",
    authorEmail: "jane.smith@example.com",
    date: "2024-11-20",
  },
  {
    id: 3,
    productId: 1,
    rating: 4.0,
    comment: "Good headphones overall, but a bit pricey. Sound quality is excellent though.",
    authorEmail: "mike.wilson@example.com",
    date: "2024-11-25",
  },
  {
    id: 4,
    productId: 2,
    rating: 4.0,
    comment: "Nice smartwatch with lots of features. Battery could be better.",
    authorEmail: "sarah.johnson@example.com",
    date: "2024-11-18",
  },
  {
    id: 5,
    productId: 2,
    rating: 4.5,
    comment: "Love the fitness tracking features! Very accurate and easy to use.",
    authorEmail: "david.brown@example.com",
    date: "2024-11-22",
  },
  {
    id: 6,
    productId: 3,
    rating: 5.0,
    comment: "Best laptop stand I've ever used. Sturdy and looks great on my desk.",
    authorEmail: "emily.davis@example.com",
    date: "2024-11-10",
  },
  {
    id: 7,
    productId: 3,
    rating: 4.5,
    comment: "Very solid build quality. Improved my posture significantly.",
    authorEmail: "robert.miller@example.com",
    date: "2024-11-14",
  },
  {
    id: 8,
    productId: 3,
    rating: 5.0,
    comment: "Excellent product! Worth every penny.",
    authorEmail: "lisa.anderson@example.com",
    date: "2024-11-28",
  },
  {
    id: 9,
    productId: 4,
    rating: 4.0,
    comment: "Does what it's supposed to do. No complaints.",
    authorEmail: "thomas.taylor@example.com",
    date: "2024-11-12",
  },
  {
    id: 10,
    productId: 4,
    rating: 4.0,
    comment: "Good hub for the price. All ports work perfectly.",
    authorEmail: "maria.garcia@example.com",
    date: "2024-11-19",
  },
  {
    id: 11,
    productId: 5,
    rating: 5.0,
    comment: "Amazing keyboard! The typing experience is phenomenal.",
    authorEmail: "james.martinez@example.com",
    date: "2024-11-16",
  },
  {
    id: 12,
    productId: 5,
    rating: 4.5,
    comment: "Love the RGB lighting and the switches feel great.",
    authorEmail: "jennifer.rodriguez@example.com",
    date: "2024-11-21",
  },
  {
    id: 13,
    productId: 5,
    rating: 4.5,
    comment: "Best keyboard for programming. Highly recommend!",
    authorEmail: "william.lopez@example.com",
    date: "2024-11-26",
  },
  {
    id: 14,
    productId: 6,
    rating: 4.5,
    comment: "Great gaming mouse. Very responsive and comfortable.",
    authorEmail: "patricia.gonzalez@example.com",
    date: "2024-11-17",
  },
  {
    id: 15,
    productId: 6,
    rating: 4.7,
    comment: "Perfect for gaming. The DPI settings are very customizable.",
    authorEmail: "christopher.wilson@example.com",
    date: "2024-11-23",
  },
];

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const productId = parseInt(id);
  const product = mockProducts.find((p) => p.id === productId);
  const reviews = mockReviews.filter((r) => r.productId === productId);

  if (!product) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <ProductDetails product={product} />
      <ReviewList reviews={reviews} />
    </div>
  );
}
