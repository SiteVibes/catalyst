import { NextRequest, NextResponse } from 'next/server';
import {
  svCreateProductReview,
  svRetrieveProductReviews,
} from '~/components/sitevibes/api/reviews';
import { SvCreateProductReviewRq } from '~/components/sitevibes/types';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const productId = searchParams.get('product_id');
  let page: number | undefined;
  const pageParam = searchParams.get('page');
  if (pageParam) {
    page = Number(pageParam);
  }
  const rs = await svRetrieveProductReviews(Number(productId), page);
  if (!rs.status) {
    return NextResponse.json({ message: rs.message }, { status: 500 });
  }
  return NextResponse.json(rs.data, { status: 200 });
}

export async function POST(request: NextRequest) {
  const review = (await request.json()) as SvCreateProductReviewRq;
  const rs = await svCreateProductReview(review);
  if (!rs.status) {
    return NextResponse.json({ message: rs.message }, { status: 500 });
  }
  return NextResponse.json(rs.data, { status: 200 });
}
