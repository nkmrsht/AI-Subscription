// このファイルは通常、様々な情報源（API、Webスクレイピングなど）から
// 最新のサービス情報を取得します。
// 現時点では、静的なサービスリストを返します。

interface ServiceUpdate {
  id: string;
  name: string;
  company: string;
  price: number;
  currency: string;
  billingCycle: string;
  lastUpdated: string;
}

// 静的なサービスデータ - 実際の実装では外部ソースやデータベースから
// 定期的に更新されるデータを取得します
const SERVICES: ServiceUpdate[] = [
  // OpenAI
  {
    id: "chatgpt_plus",
    name: "ChatGPT Plus",
    company: "OpenAI",
    price: 20,
    currency: "USD",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  {
    id: "chatgpt_pro",
    name: "ChatGPT Pro",
    company: "OpenAI",
    price: 240,
    currency: "USD",
    billingCycle: "yearly",
    lastUpdated: new Date().toISOString()
  },
  {
    id: "chatgpt_team",
    name: "ChatGPT Team",
    company: "OpenAI",
    price: 30,
    currency: "USD",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  {
    id: "chatgpt_enterprise",
    name: "ChatGPT Enterprise",
    company: "OpenAI",
    price: 60,
    currency: "USD",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  {
    id: "openai_api_pro",
    name: "OpenAI API Pro",
    company: "OpenAI",
    price: 20,
    currency: "USD",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  
  // Google
  {
    id: "gemini_advanced", 
    name: "Gemini Advanced",
    company: "Google",
    price: 19.99,
    currency: "USD",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  {
    id: "gemini_business", 
    name: "Gemini Business",
    company: "Google",
    price: 30,
    currency: "USD",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  
  // Anthropic
  {
    id: "claude_free",
    name: "Claude Free",
    company: "Anthropic",
    price: 0,
    currency: "USD",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  {
    id: "claude_pro",
    name: "Claude Pro",
    company: "Anthropic",
    price: 20,
    currency: "USD",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  {
    id: "claude_team",
    name: "Claude Team",
    company: "Anthropic",
    price: 30,
    currency: "USD",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  {
    id: "claude_business",
    name: "Claude Business",
    company: "Anthropic",
    price: 35,
    currency: "USD",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  
  // Notion
  {
    id: "notion_ai_personal",
    name: "Notion AI Personal",
    company: "Notion",
    price: 10,
    currency: "USD",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  {
    id: "notion_ai_plus",
    name: "Notion AI Plus",
    company: "Notion",
    price: 18,
    currency: "USD",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  
  // Midjourney
  {
    id: "midjourney_basic",
    name: "Midjourney Basic",
    company: "Midjourney, Inc.",
    price: 10,
    currency: "USD",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  {
    id: "midjourney_standard",
    name: "Midjourney Standard",
    company: "Midjourney, Inc.",
    price: 30,
    currency: "USD",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  {
    id: "midjourney_pro",
    name: "Midjourney Pro",
    company: "Midjourney, Inc.",
    price: 60,
    currency: "USD",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  
  // GitHub
  {
    id: "github_copilot_individual",
    name: "GitHub Copilot Individual",
    company: "GitHub",
    price: 10,
    currency: "USD",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  {
    id: "github_copilot_business",
    name: "GitHub Copilot Business",
    company: "GitHub",
    price: 19,
    currency: "USD",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  
  // Adobe
  {
    id: "adobe_firefly_single_app",
    name: "Adobe Firefly Single App",
    company: "Adobe",
    price: 1980,
    currency: "JPY",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  {
    id: "adobe_firefly_cc",
    name: "Adobe Firefly (Creative Cloud)",
    company: "Adobe",
    price: 6980,
    currency: "JPY",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  
  // Perplexity
  {
    id: "perplexity_pro",
    name: "Perplexity Pro",
    company: "Perplexity AI",
    price: 20,
    currency: "USD",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  {
    id: "perplexity_pro_plus",
    name: "Perplexity Pro+",
    company: "Perplexity AI",
    price: 30,
    currency: "USD",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  
  // Replit
  {
    id: "replit_core",
    name: "Replit Core",
    company: "Replit",
    price: 7,
    currency: "USD",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  {
    id: "replit_pro",
    name: "Replit Pro",
    company: "Replit",
    price: 12,
    currency: "USD",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  {
    id: "replit_teams_pro",
    name: "Replit Teams Pro",
    company: "Replit",
    price: 20,
    currency: "USD",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  {
    id: "replit_teams_for_education",
    name: "Replit Teams for Education",
    company: "Replit",
    price: 12,
    currency: "USD",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  
  // Microsoft
  {
    id: "microsoft_copilot_free",
    name: "Microsoft Copilot Free",
    company: "Microsoft",
    price: 0,
    currency: "USD",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  {
    id: "microsoft_copilot_pro",
    name: "Microsoft Copilot Pro",
    company: "Microsoft",
    price: 20,
    currency: "USD",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  
  // Stability AI
  {
    id: "stability_core_membership",
    name: "Stability Core Membership",
    company: "Stability AI",
    price: 10,
    currency: "USD",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  {
    id: "stability_pro_membership",
    name: "Stability Pro Membership",
    company: "Stability AI",
    price: 20,
    currency: "USD",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  
  // RunwayML
  {
    id: "runway_standard",
    name: "Runway Standard",
    company: "RunwayML",
    price: 15,
    currency: "USD",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  {
    id: "runway_pro",
    name: "Runway Pro",
    company: "RunwayML",
    price: 35,
    currency: "USD",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  
  // Leonardo.ai
  {
    id: "leonardo_premium",
    name: "Leonardo Premium",
    company: "Leonardo.ai",
    price: 10,
    currency: "USD",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  {
    id: "leonardo_pro",
    name: "Leonardo Pro",
    company: "Leonardo.ai",
    price: 24,
    currency: "USD",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  }
];

/**
 * In a real implementation, this would fetch the latest service information
 * from various sources (APIs, web scraping, etc.)
 */
export async function getServiceUpdates() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return static data
  return {
    services: SERVICES,
    lastUpdated: new Date().toISOString()
  };
}
