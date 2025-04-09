'use client';

import styles from '../style.module.css';
import StarRatingDisplay from './star-rating-display';
import StarRatingButtons from './star-rating-buttons';
import ProductReviewForm from './product-review-form';
import ProductReviewRow from './product-review-row';
import { ProductReview, ProductSummary, SvTranslations } from './types';
import { useState } from 'react';

export default function ReviewsContainer(props: {
  productId: number;
  customerInfo?: any;
  t: SvTranslations;
}) {
  const [productSummary, setProductSummary] = useState<ProductSummary>();
  const [showThankYou, setShowThankYou] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [productReviews, setProductReviews] = useState<ProductReview[]>([]);
  const [nextPage, setNextPage] = useState(0);
  const [prevPage, setPrevPage] = useState(0);

  const refreshProductSummary = () => {};

  const refreshProductReviews = (page?: number) => {};

  return (
    <div className={`${styles.section} ${styles.container}`}>
      <h3>{props.t.title}</h3>
      <div className={`${styles.row} ${styles.top_spacer}`}>
        <div>
          <h4>{props.t.rating_label}</h4>
          {!!productSummary && (
            <StarRatingDisplay
              average_rating={productSummary.average_rating}
              total_reviews={productSummary.total_reviews}
              t={props.t}
            />
          )}
        </div>
        {!showThankYou && (
          <div>
            <h4>{props.t.star_rating_label}</h4>
            <StarRatingButtons
              onRatingSelected={(val) => {
                setSelectedRating(val);
                setShowForm(true);
              }}
            />
          </div>
        )}
      </div>

      {showForm && (
        <ProductReviewForm
          product_id={`${props.productId}`}
          customerAccount={props.customerInfo}
          selectedRating={selectedRating}
          t={props.t}
          onReviewSubmitted={() => {
            setShowForm(false);
            setSelectedRating(0);
            setShowThankYou(true);
            refreshProductSummary();
            refreshProductReviews();
          }}
        />
      )}

      {showThankYou && (
        <div className={`${styles.top_spacer_lg} ${styles.container}`}>
          Thank you for your feedback!
        </div>
      )}

      <div className={`${styles.top_spacer_lg} ${styles.container}`}>
        <h4>
          {props.t.reviews_label} ({productSummary?.total_reviews || 0})
        </h4>
        <div>
          {productReviews.map((r) => (
            <ProductReviewRow key={r.id} product_review={r} />
          ))}
        </div>
        <div className={styles.row}>
          <div>
            <button
              className={styles.secondary_button}
              disabled={prevPage === 0}
              onClick={() => refreshProductReviews(prevPage)}
            >
              Prev
            </button>
          </div>
          <div>
            <button
              className={styles.secondary_button}
              disabled={nextPage === 0}
              onClick={() => refreshProductReviews(nextPage)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
