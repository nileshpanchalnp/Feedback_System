import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  initialRating?: number;
  onChange: (rating: number) => void;
  readonly?: boolean;
  size?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ 
  initialRating = 0, 
  onChange, 
  readonly = false,
  size = 24
}) => {
  const [rating, setRating] = useState<number>(initialRating);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleClick = (selectedRating: number) => {
    if (readonly) return;
    
    setRating(selectedRating);
    onChange(selectedRating);
  };

  const handleMouseEnter = (hoveredRating: number) => {
    if (readonly) return;
    setHoverRating(hoveredRating);
  };

  const handleMouseLeave = () => {
    if (readonly) return;
    setHoverRating(0);
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          disabled={readonly}
          className={`transition-all duration-150 ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}`}
          aria-label={`Rate ${star} stars`}
        >
          <Star
            size={size}
            className={`
              ${
                (hoverRating || rating) >= star
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              }
              transition-colors duration-150
            `}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;