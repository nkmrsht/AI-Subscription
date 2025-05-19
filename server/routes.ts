import { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getExchangeRates } from "./exchange-rate";
import { getServiceUpdates } from "./services";

export async function registerRoutes(app: Express): Promise<Server> {
  // API ROUTES
  
  // Get current exchange rates
  app.get("/api/exchange-rates", async (req: Request, res: Response) => {
    try {
      const ratesData = await getExchangeRates();
      res.json(ratesData);
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
      res.status(500).json({ 
        message: "Failed to fetch exchange rates", 
        error: (error as Error).message 
      });
    }
  });

  // Get service updates
  app.get("/api/service-updates", async (req: Request, res: Response) => {
    try {
      const updates = await getServiceUpdates();
      res.json(updates);
    } catch (error) {
      console.error("Error fetching service updates:", error);
      res.status(500).json({ 
        message: "Failed to fetch service updates", 
        error: (error as Error).message 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
