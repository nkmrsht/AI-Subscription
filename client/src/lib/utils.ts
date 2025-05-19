import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { AIService, BillingCycle, Currency } from "./types";

/**
 * Combines multiple class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a currency amount according to locale
 */
export function formatCurrency(amount: number, currency: Currency = "JPY") {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency,
    currencyDisplay: "symbol",
  }).format(amount);
}

/**
 * Formats a date to Japanese style (YYYY/MM/DD)
 */
export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).replace(/-/g, '/');
}

/**
 * Formats a timestamp to Japanese style (YYYY/MM/DD HH:mm)
 */
export function formatTimestamp(timestamp: number) {
  const date = new Date(timestamp);
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).replace(/-/g, '/');
}

/**
 * Computes the monthly cost in JPY for a subscription
 */
export function getMonthlyJPYCost(
  subscription: AIService,
  exchangeRates: { [key: string]: number }
): number {
  // For JPY, no conversion needed
  if (subscription.currency === "JPY") {
    return getMonthlyAmount(subscription);
  }
  
  // For other currencies, convert to JPY
  const exchangeRate = exchangeRates[subscription.currency] || 1;
  return getMonthlyAmount(subscription) * exchangeRate;
}

/**
 * Computes the monthly amount for a subscription, considering billing cycle
 */
export function getMonthlyAmount(subscription: AIService): number {
  switch (subscription.billingCycle) {
    case "yearly":
      return subscription.price / 12;
    case "quarterly":
      return subscription.price / 3;
    case "monthly":
    default:
      return subscription.price;
  }
}

/**
 * Generates a random ID for subscriptions
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

/**
 * Checks if the exchange rates are older than 7 days
 */
export function isExchangeRateOutdated(timestamp?: number): boolean {
  if (!timestamp) return true;
  
  const now = Date.now();
  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  
  return now - timestamp > sevenDays;
}
