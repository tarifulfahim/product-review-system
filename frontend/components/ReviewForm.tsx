"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ReviewFormProps {
  onSubmit: (data: { email: string; rating: number; comment: string }) => void;
}

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState<string>("5");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!email || !comment) {
      alert("Please fill in all fields");
      return;
    }

    // Submit the review
    onSubmit({ email, rating: Number(rating), comment });

    // Clear form
    setEmail("");
    setRating("5");
    setComment("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Write a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="rating" className="block text-sm font-medium mb-2">
              Rating
            </label>
            <Select value={rating} onValueChange={setRating}>
              <SelectTrigger>
                <SelectValue placeholder="Select a rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 - Excellent</SelectItem>
                <SelectItem value="4">4 - Good</SelectItem>
                <SelectItem value="3">3 - Average</SelectItem>
                <SelectItem value="2">2 - Poor</SelectItem>
                <SelectItem value="1">1 - Terrible</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="comment" className="block text-sm font-medium mb-2">
              Comment
            </label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this product..."
              className="min-h-[100px]"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Submit Review
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
