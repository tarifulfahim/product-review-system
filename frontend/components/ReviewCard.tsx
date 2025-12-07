import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Review } from "@/types/review";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{review.authorEmail}</span>
          <span className="text-sm text-muted-foreground">
            {review.rating} / 5.0
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{review.comment}</p>
        <p className="text-xs text-muted-foreground mt-2">
          {new Date(review.date).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}
