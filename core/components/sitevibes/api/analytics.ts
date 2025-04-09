'use server';

import { client } from '~/client';
import { graphql } from '~/client/graphql';
import { SvProductViewRq, SvResponse } from '../types';
import { v4 as uuid } from 'uuid';

const { SV_API_HOST, SV_API_TOKEN, SV_STOREFRONT_URL } = process.env;

const ProductInfoQuery = graphql(`
  query productById($productId: Int!) {
    site {
      product(entityId: $productId) {
        id
        entityId
        name
        description
        categories {
          edges {
            node {
              name
            }
          }
        }
        images(first: 10) {
          edges {
            node {
              urlOriginal
            }
          }
        }
        brand {
          name
        }
        path
        prices {
          price {
            currencyCode
            formatted
            value
          }
          basePrice {
            currencyCode
            formatted
            value
          }
          salePrice {
            currencyCode
            formatted
            value
          }
        }
        inventory {
          aggregated {
            availableToSell
          }
        }
      }
    }
  }
`);

export async function svProductViewed(productId: number): Promise<SvResponse<any>> {
  const data = await client.fetch({
    document: ProductInfoQuery,
    variables: { productId },
  });

  const product = data.data.site.product!;

  let image_url = '';
  if (product.images?.edges?.length) {
    image_url = product.images.edges[0]?.node.urlOriginal!;
  }

  const svProductViewRq: SvProductViewRq = {
    app_id: uuid(),
    user_session_id: uuid(),
    id: product.id,
    name: product.name,
    description: product.description,
    url: SV_STOREFRONT_URL + product.path,
    image_url,
    price: product.prices?.basePrice?.value,
    price_sale: product.prices?.salePrice?.value,
    quantity: product.inventory.aggregated?.availableToSell,
  };

  const url = `https://${SV_API_HOST}/api/v1/product-view`;
  const rs = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${SV_API_TOKEN}`,
    },
    body: JSON.stringify(svProductViewRq),
  });

  const rsData = (await rs.json()) as SvResponse<any>;

  return rsData;
}
