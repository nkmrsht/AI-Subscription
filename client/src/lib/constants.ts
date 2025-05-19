// Common service names and their default properties
export const AI_SERVICES = {
  // OpenAI
  chatgpt_plus: {
    name: "ChatGPT Plus",
    company: "OpenAI",
    price: 20,
    currency: "USD",
    billingCycle: "monthly"
  },
  chatgpt_team: {
    name: "ChatGPT Team",
    company: "OpenAI",
    price: 30,
    currency: "USD",
    billingCycle: "monthly"
  },
  chatgpt_enterprise: {
    name: "ChatGPT Enterprise",
    company: "OpenAI",
    price: 60,
    currency: "USD",
    billingCycle: "monthly"
  },
  openai_api_pro: {
    name: "OpenAI API Pro",
    company: "OpenAI",
    price: 20,
    currency: "USD",
    billingCycle: "monthly"
  },
  openai_api_team: {
    name: "OpenAI API Team",
    company: "OpenAI",
    price: 40,
    currency: "USD",
    billingCycle: "monthly"
  },
  
  // Google
  gemini_advanced: {
    name: "Gemini Advanced",
    company: "Google",
    price: 19.99,
    currency: "USD",
    billingCycle: "monthly"
  },
  gemini_business: {
    name: "Gemini Business",
    company: "Google",
    price: 30,
    currency: "USD",
    billingCycle: "monthly"
  },
  gemini_enterprise: {
    name: "Gemini Enterprise",
    company: "Google",
    price: 50,
    currency: "USD",
    billingCycle: "monthly"
  },
  
  // Anthropic
  claude_basic: {
    name: "Claude Basic",
    company: "Anthropic",
    price: 8,
    currency: "USD",
    billingCycle: "monthly"
  },
  claude_pro: {
    name: "Claude Pro",
    company: "Anthropic",
    price: 20,
    currency: "USD",
    billingCycle: "monthly"
  },
  claude_team: {
    name: "Claude Team",
    company: "Anthropic",
    price: 30,
    currency: "USD",
    billingCycle: "monthly"
  },
  claude_enterprise: {
    name: "Claude Enterprise",
    company: "Anthropic",
    price: 60,
    currency: "USD",
    billingCycle: "monthly"
  },
  
  // Notion
  notion_ai_personal: {
    name: "Notion AI Personal",
    company: "Notion",
    price: 10,
    currency: "USD",
    billingCycle: "monthly"
  },
  notion_ai_plus: {
    name: "Notion AI Plus",
    company: "Notion",
    price: 18,
    currency: "USD",
    billingCycle: "monthly"
  },
  notion_ai_business: {
    name: "Notion AI Business",
    company: "Notion",
    price: 25,
    currency: "USD",
    billingCycle: "yearly"
  },
  
  // Midjourney
  midjourney_basic: {
    name: "Midjourney Basic",
    company: "Midjourney, Inc.",
    price: 10,
    currency: "USD",
    billingCycle: "monthly"
  },
  midjourney_standard: {
    name: "Midjourney Standard",
    company: "Midjourney, Inc.",
    price: 30,
    currency: "USD",
    billingCycle: "monthly"
  },
  midjourney_pro: {
    name: "Midjourney Pro",
    company: "Midjourney, Inc.",
    price: 60,
    currency: "USD",
    billingCycle: "monthly"
  },
  midjourney_mega: {
    name: "Midjourney Mega",
    company: "Midjourney, Inc.",
    price: 120,
    currency: "USD",
    billingCycle: "monthly"
  },
  
  // GitHub
  github_copilot_individual: {
    name: "GitHub Copilot Individual",
    company: "GitHub",
    price: 10,
    currency: "USD",
    billingCycle: "monthly"
  },
  github_copilot_business: {
    name: "GitHub Copilot Business",
    company: "GitHub",
    price: 19,
    currency: "USD",
    billingCycle: "monthly"
  },
  github_copilot_enterprise: {
    name: "GitHub Copilot Enterprise",
    company: "GitHub",
    price: 39,
    currency: "USD",
    billingCycle: "monthly"
  },
  
  // Adobe
  adobe_firefly_single_app: {
    name: "Adobe Firefly Single App",
    company: "Adobe",
    price: 1980,
    currency: "JPY",
    billingCycle: "monthly"
  },
  adobe_firefly_cc: {
    name: "Adobe Firefly (Creative Cloud)",
    company: "Adobe",
    price: 6980,
    currency: "JPY",
    billingCycle: "monthly"
  },
  adobe_express_premium: {
    name: "Adobe Express Premium",
    company: "Adobe",
    price: 1200,
    currency: "JPY",
    billingCycle: "monthly"
  },
  
  // Perplexity
  perplexity_pro: {
    name: "Perplexity Pro",
    company: "Perplexity AI",
    price: 20,
    currency: "USD",
    billingCycle: "monthly"
  },
  perplexity_pro_plus: {
    name: "Perplexity Pro+",
    company: "Perplexity AI",
    price: 30,
    currency: "USD",
    billingCycle: "monthly"
  },
  perplexity_business: {
    name: "Perplexity Business",
    company: "Perplexity AI",
    price: 40,
    currency: "USD",
    billingCycle: "monthly"
  },
  
  // Replit
  replit_core: {
    name: "Replit Core",
    company: "Replit",
    price: 7,
    currency: "USD",
    billingCycle: "monthly"
  },
  replit_pro: {
    name: "Replit Pro",
    company: "Replit",
    price: 20,
    currency: "USD",
    billingCycle: "monthly"
  },
  replit_teams_for_education: {
    name: "Replit Teams for Education",
    company: "Replit",
    price: 10,
    currency: "USD",
    billingCycle: "monthly"
  },
  replit_teams_pro: {
    name: "Replit Teams Pro",
    company: "Replit",
    price: 20,
    currency: "USD",
    billingCycle: "monthly"
  },
  
  // Microsoft Copilot
  microsoft_copilot_personal: {
    name: "Microsoft Copilot",
    company: "Microsoft",
    price: 20,
    currency: "USD",
    billingCycle: "monthly"
  },
  microsoft_copilot_pro: {
    name: "Microsoft Copilot Pro",
    company: "Microsoft",
    price: 30,
    currency: "USD",
    billingCycle: "monthly"
  },
  microsoft_copilot_business: {
    name: "Microsoft Copilot for Business",
    company: "Microsoft",
    price: 30,
    currency: "USD",
    billingCycle: "monthly"
  },
  microsoft_copilot_for_m365: {
    name: "Microsoft Copilot for M365",
    company: "Microsoft",
    price: 30,
    currency: "USD",
    billingCycle: "monthly"
  },
  
  // Stability AI
  stability_core_membership: {
    name: "Stability Core Membership",
    company: "Stability AI",
    price: 10,
    currency: "USD",
    billingCycle: "monthly"
  },
  stability_pro_membership: {
    name: "Stability Pro Membership",
    company: "Stability AI",
    price: 20,
    currency: "USD",
    billingCycle: "monthly"
  },
  stability_api_standard: {
    name: "Stability API Standard",
    company: "Stability AI",
    price: 40,
    currency: "USD",
    billingCycle: "monthly"
  },
  
  // RunwayML
  runway_standard: {
    name: "Runway Standard",
    company: "RunwayML",
    price: 15,
    currency: "USD",
    billingCycle: "monthly"
  },
  runway_pro: {
    name: "Runway Pro",
    company: "RunwayML",
    price: 35,
    currency: "USD",
    billingCycle: "monthly"
  },
  runway_unlimited: {
    name: "Runway Unlimited",
    company: "RunwayML",
    price: 95,
    currency: "USD",
    billingCycle: "monthly"
  },
  
  // Leonardo.ai
  leonardo_premium: {
    name: "Leonardo Premium",
    company: "Leonardo.ai",
    price: 10,
    currency: "USD",
    billingCycle: "monthly"
  },
  leonardo_pro: {
    name: "Leonardo Pro",
    company: "Leonardo.ai",
    price: 24,
    currency: "USD",
    billingCycle: "monthly"
  },
  leonardo_enterprise: {
    name: "Leonardo Enterprise",
    company: "Leonardo.ai",
    price: 48,
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
