import React, { useState } from "react";
import { InputLabel } from "@mui/material";

interface RatingProps {
  id?: string;
  value: number;
  updateValue: (newValue: number) => void;
  label: any;
  schema: any;
}

export const Rating: React.FC<RatingProps> = ({
  id,
  value,
  updateValue,
  label,
  schema,
}) => {
  const [hoverAt, setHoverAt] = useState<number | null>(null);

  // Assign the min and max values.  Use 1,5 if not provided
  let min = schema.minimum ? schema.minimum : 1;
  let max = schema.maximum ? schema.maximum : 5;
  let stars = Array.apply(null, { length: max + 1 - min }).map(function (
    _: any,
    idx: number
  ) {
    return idx;
  });

  let fullId = "#properties/" + id;
  console.log(fullId);
  return (
    <div id={fullId} className="rating">
      <InputLabel shrink>{label}</InputLabel>
      <div className="human-feedback-rating">
        {stars.map((i: number) => {
          const fullStars = hoverAt ?? value;

          return (
            <span
              onMouseOver={() => setHoverAt(i + 1)}
              onMouseOut={() => setHoverAt(null)}
              onClick={() => updateValue(i + 1)}
              key={`${id}_${i}`}
            >
              {i < fullStars ? "\u2605" : "\u2606"}
            </span>
          );
        })}
      </div>
    </div>
  );
};
