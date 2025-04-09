'use client';

import styles from '../style.module.css';
import { SvTranslations } from './types';

export default function StarRatingDisplay(props: {
  average_rating: number;
  total_reviews: number;
  t: SvTranslations;
}) {
  const ratingOptions = [1, 2, 3, 4, 5];
  const ratingText = props.average_rating.toFixed(1);
  return (
    <div className={`${styles.row} ${styles.top_spacer}`}>
      <div className={styles.rating_score_display}>{ratingText}</div>
      <div>
        <div className={styles.star_display_panel}>
          {ratingOptions.map((r) => (
            <span key={r}>
              <svg
                className={r <= props.average_rating ? styles.star_filled : styles.star_default}
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
        <small>
          {props.total_reviews} {props.t.reviews_label}
        </small>
      </div>
    </div>
  );
}
