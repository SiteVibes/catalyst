'use server';

import { getTranslations } from 'next-intl/server';
import ReviewsContainer from './product-reviews-container';
import { CustomerAccount, SvTranslations } from './types';
import { getSessionCustomerAccessToken } from '~/auth';
import { client } from '~/client';
import { graphql } from '~/client/graphql';

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

  let customerInfo: CustomerAccount | undefined;
  const customerAccessToken = await getSessionCustomerAccessToken();
  if (customerAccessToken) {
    const CustomerQuery = graphql(`
      query CustomerQuery {
        customer {
          email
          firstName
          lastName
        }
      }
    `);
    const response = await client.fetch({
      document: CustomerQuery,
      customerAccessToken,
    });
    customerInfo = response.data.customer!;
  }

  return <ReviewsContainer productId={props.productId} customerInfo={customerInfo} t={content} />;
}
