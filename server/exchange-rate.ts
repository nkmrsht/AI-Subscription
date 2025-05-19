import fetch from "node-fetch";

// Free exchange rate API (limited, but sufficient for our needs)
// In production, you might want to use a paid API with higher rate limits
const API_URL = "https://open.er-api.com/v6/latest/JPY";

/**
 * Fetches the latest exchange rates from the API and inverts them to get JPY as base
 * Returns rates as JPY to XXX (how many JPY for 1 unit of another currency)
 */
export async function getExchangeRates() {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }
    
    const data = await response.json() as any;
    
    if (!data.rates) {
      throw new Error("Invalid response from exchange rate API");
    }
    
    // Convert from JPY as base to other currencies as base
    // e.g. from (1 JPY = 0.0068 USD) to (1 USD = 147.35 JPY)
    const rates = {
      USD: 1 / data.rates.USD,
      EUR: 1 / data.rates.EUR,
      GBP: 1 / data.rates.GBP,
      JPY: 1
    };
    
    return {
      rates,
      timestamp: Date.now()
    };
  } catch (error) {
    console.error("Failed to fetch exchange rates:", error);
    
    // Return fallback rates
    return {
      rates: {
        USD: 147.35,
        EUR: 158.72,
        GBP: 186.41,
        JPY: 1
      },
      timestamp: Date.now(),
      error: (error as Error).message
    };
  }
}
