export type SvSesssionData = {
  svSessionId: string;
  account?: {
    accountId: string;
    email: string;
    firstName: string;
    lastName: string;
    confirmed: boolean;
    addresses: any[];
  };
  cartId?: string;
};

export type SvResponse<T> = {
  message: string;
  status: boolean;
  data: T;
};

export type SvProductViewRq = {
  app_id: string;
  user_session_id: string;
  id: string;
  variant_id?: string;
  name?: string;
  description?: string;
  categories?: string[];
  brand?: string;
  url?: string;
  image_url?: string;
  price?: number;
  price_sale?: number;
  quantity?: number;
  variants?: SvProductViewVariant[];
};

export type SvProductViewVariant = {
  id?: string;
  name?: string;
  sku?: string;
  image_url?: string;
  price?: number;
  price_sale?: number;
};

export type SvCreateProductReviewRq = {
  app_id: string;
  user_session_id: string;
  product_id: string;
  email: string;
  name: string;
  title: string;
  content: string;
  rating: number;
};

export type SvLoyaltyCustomerData = {
  app_id: string;
  status?: string;
  customer: {
    cid: string;
    created_at?: string;
    created_at_text?: string;
    current_tier_name?: string;
    current_tier_value?: number;
    current_tier_value_text?: string;
    email: string;
    first_name: string;
    last_name: string;
    instagram_username?: string;
    loyalty_points?: number;
    loyalty_points_text?: string;
    birthday_day?: number;
    birthday_month?: number;
  };
  rewards?: {
    id: number;
    available: boolean;
    code: string;
    type: string;
    title: string;
    points: number;
    points_text: string;
    coupon_usage: {
      amount_discount: number;
      percentage_discount: number;
    };
    created_at: string;
    created_at_text: string;
    expire_at: string;
    expire_at_text: string;
    expired: boolean;
    used: boolean;
    used_at: string;
    used_at_text: string;
  }[];
  ways_to_earn?: {
    id: number;
    enabled: boolean;
    name: string;
    action_value: string;
    completed: boolean;
    points: number;
    points_text: string;
    type: string;
    type_text: string;
  }[];
  ways_to_redeem?: {
    id: number;
    enabled: boolean;
    expire_days: number;
    min_purchase_amount: number;
    min_purchase_amount_text: string;
    points: number;
    points_text: string;
    redeemable: boolean;
    type: string;
    type_text: string;
  }[];
};

export type SvLoyaltyActivityData = {
  limit: number;
  page: number;
  total: number;
  items: {
    id: number;
    reward: boolean;
    type: string;
    points: number;
    points_text: string;
    description: string;
    created_at: string;
    created_at_text: string;
  }[];
};

export type SvWayToEarnData = {
  id: number;
  enabled: boolean;
  custom: boolean;
  type: string;
  type_text: string;
  points: string;
  points_text: string;
  limit: number;
  used: number;
  completed: boolean;
};

export type SvWayToRedeemData = {
  id: number;
  enabled: boolean;
  type: string;
  type_text: string;
  points: number;
  points_text: string;
  redeemable: boolean;
  min_purchase_amount: number;
  min_purchase_amount_text: string;
  expire_days: number;
  excluded_categories: string[];
  excluded_categories_text: string;
  excluded_products: {
    product_id: number;
    product_name: string;
  }[];
  excluded_product_text: string;
};

export type SvSendOrderDataRequest = {
  app_id: string;
  user_session_id: string;
  order_id: string;
  channel?: 'online' | 'in_store' | 'phone' | 'website' | 'app';
  payment_methods?: string;
  email: string;
  first_name: string;
  last_name: string;
  coupon?: string[];
  products: {
    id: string;
    variant_id?: string;
    sku?: string;
    quantity: number;
    price?: number;
    price_after_discount?: number;
    subscription_product?: boolean;
  }[];
};

export type SvOrderData = {
  order_id: number;
  email: string;
  first_name: string;
  last_name: string;
  total_price: number;
  payment_methods: string[];
  date: string;
  cancelled: boolean;
  review_request_url: string;
  items: {
    product_id: number;
    product_variant_id: string;
    quantity: number;
    unit_price: number;
    unit_price_after_discount: number;
  }[];
};

export type SvCustomerRedeemRewardRq = {
  app_id: string;
  reward_id: number;
  cid?: string;
  email?: string;
  phone?: string;
  identifier?: string;
};

export type SvProductsSummaryRs = {
  page: number;
  limit: number;
  total: number;
  count: number;
  items: {
    product_id: string;
    total_reviews: number;
    total_questions: number;
    average_rating: number;
  }[];
};

export type SvProductReviewsRs = {
  page: number;
  limit: number;
  total: number;
  item: {
    id: number;
    product_id: string;
    email: string;
    name: string;
    title: string;
    content: string;
    rating: number;
    created_at: string;
    created_at_text: string;
  }[];
};
