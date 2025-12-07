import api from "./api";

export interface ProductApiResponse {
  id: string;
  name: string;
  description: string | null;
  average_rating: string | null;
  review_count: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface SingleProductApiResponse {
  message: string;
  id: string;
  name: string;
  description: string | null;
  average_rating: string | null;
  revire_count: string | null;
  created_at: Date;
  updated_at: Date;
  reviews: ReviewApiResponse[];
}

export interface ReviewApiResponse {
  id: string;
  user_email: string;
  rating: string;
  comment: string;
  created_at: Date;
}

export interface CreateReviewPayload {
  user_email: string;
  rating: string;
  comment: string;
}

export const productApi = {
  // Get all products
  getAllProducts: async (): Promise<ProductApiResponse[]> => {
    const response = await api.get<ProductApiResponse[]>(
      "/products/allProducts"
    );
    return response.data;
  },

  //   Get single product with reviews
  getSingleProduct: async (id: string): Promise<SingleProductApiResponse> => {
    const response = await api.get<SingleProductApiResponse>(
      `/products/singleProduct/${id}`
    );
    return response.data;
  },

  registerProducts: async (
    products: Omit<
      ProductApiResponse,
      "created_at" | "updated_at" | "average_rating" | "review_count"
    >[]
  ): Promise<{ count: number }> => {
    const response = await api.post<{ count: number }>(
      "/products/register",
      products
    );
    return response.data;
  },
};

export const reviewApi = {
  //   Submit a review for a product
  createReview: async (
    productId: string,
    review: CreateReviewPayload
  ): Promise<
    ReviewApiResponse & {
      id: string;
      product_id: string;
      created_at: Date;
      updated_at: Date;
    }
  > => {
    const response = await api.post<
      ReviewApiResponse & {
        id: string;
        product_id: string;
        created_at: Date;
        updated_at: Date;
      }
    >(`/products/${productId}/reviews`, review);
    return response.data;
  },
};

/**
 * Server-side fetch function for products (uses native fetch for Next.js)
 */
export async function fetchProducts() {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";
  const res = await fetch(`${baseUrl}/products/`, {
    cache: "no-store",
  });

  console.log(res);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: ProductApiResponse[] = await res.json();
  console.log(data);
  return data.map(transformers.productToFrontend);
}

/**
 * Server-side fetch function for single product with reviews
 */
export async function fetchSingleProduct(id: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";
  const res = await fetch(`${baseUrl}/products/singleProduct/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const data: SingleProductApiResponse = await res.json();

  return {
    product: {
      id: data.id,
      name: data.name,
      description: data.description || "",
      averageRating: parseFloat(data.average_rating || "0"),
      reviewCount: parseInt(data.revire_count || "0", 10),
    },
    reviews: data.reviews.map((review) => ({
      id: review.id,
      productId: data.id,
      rating: parseFloat(review.rating),
      comment: review.comment,
      authorEmail: review.user_email,
      date: new Date(review.created_at).toISOString().split("T")[0],
    })),
  };
}

export const transformers = {
  //   Transform backend product to frontend format
  productToFrontend: (product: ProductApiResponse) => ({
    id: product.id,
    name: product.name,
    description: product.description || "",
    averageRating: parseFloat(product.average_rating || "0"),
    reviewCount: parseInt(product.review_count || "0", 10),
  }),

  //   Transform backend review to frontend format
  reviewToFrontend: (
    review: ReviewApiResponse & {
      product_id?: string;
    }
  ) => ({
    id: review.id,
    productId: review.product_id || "",
    rating: parseFloat(review.rating),
    comment: review.comment,
    authorEmail: review.user_email,
    date: new Date(review.created_at).toISOString().split("T")[0],
  }),

  //   Transform frontend review form to backend format
  reviewToBackend: (
    email: string,
    rating: number,
    comment: string
  ): CreateReviewPayload => ({
    user_email: email,
    rating: rating.toString(),
    comment: comment,
  }),
};
