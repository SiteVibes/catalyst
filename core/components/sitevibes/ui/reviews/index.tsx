'use server';

import { getTranslations } from 'next-intl/server';
import ReviewsContainer from './product-reviews-container';
import { SvTranslations } from './types';

export default async function SvReviews(props: { productId: number; customerInfo?: any }) {
  const t = await getTranslations('SiteVibes.Reviews');

  const content: SvTranslations = {
    title: t('title'),
    rating_label: t('rating_label'),
    reviews_label: t('reviews_label'),
    star_rating_label: t('star_rating_label'),
    write_review_btn_label: t('write_review_btn_label'),
    submit_review_btn_label: t('submit_review_btn_label'),
  };

  return (
    <ReviewsContainer productId={props.productId} customerInfo={props.customerInfo} t={content} />
  );
}
