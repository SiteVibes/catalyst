import { NextRequest, NextResponse } from 'next/server';
import { svRetrieveProductReviewsSummary } from '~/components/sitevibes/api/reviews';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const productId = searchParams.get('product_id');
  const rs = await svRetrieveProductReviewsSummary(Number(productId));
  if (!rs.status) {
    return NextResponse.json({ message: rs.message }, { status: 500 });
  }
  return NextResponse.json(rs.data, { status: 200 });
}
