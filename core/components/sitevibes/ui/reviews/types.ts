export type SvTranslations = {
    title: string;
    rating_label: string;
    reviews_label: string;
    star_rating_label: string;
    write_review_btn_label: string;
    submit_review_btn_label: string;
}

export type ProductReview = {
  id: number;
  product_id: string;
  email: string;
  name: string;
  verified: boolean;
  buyer: boolean;
  incentivized: boolean;
  title: string;
  content: string;
  rating: number;
  vote_up: number;
  vote_down: number;
  created_at: string;
  created_at_text: string;
};

export type ProductReviewFormWidgetProps = {
  product_id: string;
  selectedRating: number;
  customerAccount?: CustomerAccount;
  onReviewSubmitted: () => void;
  t: SvTranslations;
};

export type CustomerAccount = {
  email: string;
  firstName: string;
  lastName: string;
  loyalty_info: LoyaltyInfo;
};

export type LoyaltyInfo = {
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
    loyalty_total_available_points: number;
    loyalty_total_available_points_text: string;
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
  activity?: {
    id: number;
    points: number;
    points_text: string;
    type: string;
    type_text: string;
    created_at: string;
    created_at_text: string;
  }[];
};

export type ProductSummary = { total_reviews: number; average_rating: number };
