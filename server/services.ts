// This file would normally fetch the latest service information
// from various sources (APIs, web scraping, etc.)
// For now, we'll return a static list of services

interface ServiceUpdate {
  id: string;
  name: string;
  company: string;
  price: number;
  currency: string;
  billingCycle: string;
  lastUpdated: string;
}

// Static service data - in a real implementation this would be fetched from 
// external sources or a database that gets regularly updated
const SERVICES: ServiceUpdate[] = [
  {
    id: "chatgpt",
    name: "ChatGPT Plus",
    company: "OpenAI",
    price: 20,
    currency: "USD",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  {
    id: "geminiadv", 
    name: "Gemini Advanced",
    company: "Google",
    price: 19.99,
    currency: "USD",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  {
    id: "claudepro",
    name: "Claude Pro",
    company: "Anthropic",
    price: 20,
    currency: "USD",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  {
    id: "notionai",
    name: "Notion AI",
    company: "Notion",
    price: 10,
    currency: "USD",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  {
    id: "midjourney",
    name: "Midjourney",
    company: "Midjourney, Inc.",
    price: 10,
    currency: "USD",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  {
    id: "githubcopilot",
    name: "GitHub Copilot",
    company: "GitHub",
    price: 10,
    currency: "USD",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  {
    id: "adobefirefly",
    name: "Adobe Firefly",
    company: "Adobe",
    price: 1980,
    currency: "JPY",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  {
    id: "perplexitypro",
    name: "Perplexity Pro",
    company: "Perplexity AI",
    price: 20,
    currency: "USD",
    billingCycle: "monthly",
    lastUpdated: new Date().toISOString()
  },
  {
    id: "replitpro",
    name: "Replit Pro",
    company: "Replit",
    price: 10,
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
