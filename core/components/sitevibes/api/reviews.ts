'use server';

import {
  SvCreateProductReviewRq,
  SvProductReviewsRs,
  SvProductsSummaryRs,
  SvResponse,
} from '../types';
import { v4 as uuid } from 'uuid';

const { SV_API_HOST, SV_API_TOKEN } = process.env;

export async function svRetrieveProductReviewsSummary(
  productId: number,
): Promise<SvResponse<SvProductsSummaryRs>> {
  const app_id = uuid();
  const url = `https://${SV_API_HOST}/api/v1/product-summary?app_id=${app_id}&product_id=${productId}`;
  const rs = await fetch(url, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${SV_API_TOKEN}`,
    },
  });

  const rsData = (await rs.json()) as SvResponse<SvProductsSummaryRs>;

  return rsData;
}

export async function svRetrieveProductReviews(
  productId: number,
): Promise<SvResponse<SvProductReviewsRs>> {
  const app_id = uuid();
  const url = `https://${SV_API_HOST}/api/v1/product-reviews?app_id=${app_id}&product_id=${productId}`;
  const rs = await fetch(url, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${SV_API_TOKEN}`,
    },
  });

  const rsData = (await rs.json()) as SvResponse<SvProductReviewsRs>;

  return rsData;
}

export async function svCreateProductReview(
  review: SvCreateProductReviewRq,
): Promise<SvResponse<any>> {
  review.app_id = uuid();
  review.user_session_id = uuid();
  const url = `https://${SV_API_HOST}/api/v1/product-reviews`;
  const rs = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${SV_API_TOKEN}`,
    },
    body: JSON.stringify(review),
  });

  const rsData = (await rs.json()) as SvResponse<any>;

  return rsData;
}
