export type Currency = "JPY" | "USD" | "EUR" | "GBP";

export type BillingCycle = "monthly" | "yearly" | "quarterly";

export interface ExchangeRates {
  USD: number;
  JPY: number;
  EUR: number;
  GBP: number;
  timestamp?: number;
}

export interface PlanPricing {
  monthly?: {
    price: number;
    currency: Currency;
  };
  yearly?: {
    price: number;
    currency: Currency;
  };
  quarterly?: {
    price: number;
    currency: Currency;
  };
}

export interface ServicePlan {
  id: string;
  name: string;
  pricing: PlanPricing;
  features?: string[];
}

export interface AIServiceDefinition {
  id: string;
  name: string;
  company: string;
  plans: ServicePlan[];
}

// 実際にユーザーが登録したサブスクリプション
export interface AIService {
  id: string;
  name: string;
  company: string;
  price: number;
  currency: Currency;
  billingCycle: BillingCycle;
  startDate?: string;
  memo?: string;
  planName?: string; // プラン名を追加
  serviceId?: string; // 元のサービスIDを参照
}

export interface APIExchangeRatesResponse {
  rates: {
    [key: string]: number;
  };
  timestamp: number;
}
