'use client';

import { ProductReview } from './types';
import styles from '../style.module.css';

export default function ProductReviewRow(props: { product_review: ProductReview }) {
  const ratingOptions = [1, 2, 3, 4, 5];
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div>
          {props.product_review.name}
          <div className={styles.star_display_panel}>
            {ratingOptions.map((r) => (
              <span key={r}>
                <svg
                  className={
                    r <= props.product_review.rating ? styles.star_filled : styles.star_default
                  }
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
        </div>
        <div>
          <small>{props.product_review.created_at_text}</small>
        </div>
      </div>
      <div>
        <strong>{props.product_review.title}</strong>
      </div>
      <div>{props.product_review.content}</div>
    </div>
  );
}
