export type Currency = "JPY" | "USD" | "EUR" | "GBP";

export type BillingCycle = "monthly" | "yearly" | "quarterly";

export interface ExchangeRates {
  USD: number;
  JPY: number;
  EUR: number;
  GBP: number;
  timestamp?: number;
}

export interface AIService {
  id: string;
  name: string;
  company: string;
  price: number;
  currency: Currency;
  billingCycle: BillingCycle;
  startDate?: string;
  memo?: string;
}

export interface APIExchangeRatesResponse {
  rates: {
    [key: string]: number;
  };
  timestamp: number;
}
