'use client';

import { useState } from 'react';
import styles from '../style.module.css';

export default function StarRatingButtons(props: {
  onRatingSelected: (val: number) => void;
}) {
  const [selectedVal, setSelectedVal] = useState(0);
  const [hoveredVal, setHoveredVal] = useState(0);
  const ratingOptions = [1, 2, 3, 4, 5];

  const onSelect = (val: number) => {
    props.onRatingSelected(val);
    setSelectedVal(val);
  };

  const getStarStyle = (val: number) => {
    if (hoveredVal && hoveredVal >= val) {
      return styles.star_button_filled;
    } else if (selectedVal && selectedVal >= val) {
      return styles.star_button_filled;
    }
    return styles.star_button_default;
  };

  return (
    <div className={styles.star_buttons_panel}>
      {ratingOptions.map((r) => (
        <span
          key={r}
          onClick={() => onSelect(r)}
          onMouseEnter={() => setHoveredVal(r)}
          onMouseLeave={() => setHoveredVal(0)}
        >
          <svg
            className={getStarStyle(r)}
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
          >
            <path
              data-v-84709670=""
              d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"
            ></path>
            <path
              data-v-84709670=""
              d="M 12 0.587 l 3.668 7.568 l 8.332 1.151 l -6.064 5.828 l 1.48 8.279 l -7.416 -3.967"
            ></path>
          </svg>
        </span>
      ))}
    </div>
  );
}
