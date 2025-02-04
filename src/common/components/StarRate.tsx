import { Star, StarHalf, Star as StarFilled } from "lucide-react";
import React from "react";

interface Props {
  starRate: number;
  starCount: number;
  className?: string;
}

export const StarRate = (props: Props) => {
  const { starRate, starCount, className } = props;

  const fullStars = Math.floor(starRate);
  const hasHalfStar = starRate % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={className}>
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, index) => (
          <StarFilled key={`full-${index}`} fill="currentColor" />
        ))}
        {hasHalfStar && <StarHalf key="half" fill="currentColor" />}
        {[...Array(emptyStars)].map((_, index) => (
          <Star key={`empty-${index}`} />
        ))}
      </div>
      <p>{starCount}</p>
    </div>
  );
};
