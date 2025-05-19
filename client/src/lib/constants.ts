// Common service names and their default properties
export const AI_SERVICES = {
  chatgpt: {
    name: "ChatGPT Plus",
    company: "OpenAI",
    price: 20,
    currency: "USD",
    billingCycle: "monthly"
  },
  geminiadv: {
    name: "Gemini Advanced",
    company: "Google",
    price: 19.99,
    currency: "USD",
    billingCycle: "monthly"
  },
  claudepro: {
    name: "Claude Pro",
    company: "Anthropic",
    price: 20,
    currency: "USD",
    billingCycle: "monthly"
  },
  notionai: {
    name: "Notion AI",
    company: "Notion",
    price: 10,
    currency: "USD",
    billingCycle: "monthly"
  },
  midjourney: {
    name: "Midjourney",
    company: "Midjourney, Inc.",
    price: 10,
    currency: "USD",
    billingCycle: "monthly"
  },
  githubcopilot: {
    name: "GitHub Copilot",
    company: "GitHub",
    price: 10,
    currency: "USD",
    billingCycle: "monthly"
  },
  adobefirefly: {
    name: "Adobe Firefly",
    company: "Adobe",
    price: 1980,
    currency: "JPY",
    billingCycle: "monthly"
  },
  perplexitypro: {
    name: "Perplexity Pro",
    company: "Perplexity AI",
    price: 20,
    currency: "USD",
    billingCycle: "monthly"
  },
  replit: {
    name: "Replit Pro",
    company: "Replit",
    price: 10,
    currency: "USD",
    billingCycle: "monthly"
  }
};

export const CURRENCY_SYMBOLS = {
  USD: "$",
  JPY: "¥",
  EUR: "€",
  GBP: "£"
};

export const BILLING_CYCLES = {
  monthly: {
    label: "月額",
    monthsMultiplier: 1,
  },
  yearly: {
    label: "年額",
    monthsMultiplier: 12,
  },
  quarterly: {
    label: "四半期",
    monthsMultiplier: 3,
  }
};

export const STORAGE_KEYS = {
  SUBSCRIPTIONS: "ai-subscriptions",
  EXCHANGE_RATES: "exchange-rates",
  EXCHANGE_RATES_TIMESTAMP: "exchange-rates-timestamp"
};

export const DEFAULT_EXCHANGE_RATE = {
  USD: 147.35,
  EUR: 158.72,
  GBP: 186.41,
  JPY: 1
};
