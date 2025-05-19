import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { ExchangeRates } from "@/lib/types";
import { STORAGE_KEYS, DEFAULT_EXCHANGE_RATE } from "@/lib/constants";
import { apiRequest } from "@/lib/queryClient";

export function useExchangeRates() {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>(() => {
    // Load from localStorage on initialization
    const savedRates = localStorage.getItem(STORAGE_KEYS.EXCHANGE_RATES);
    const savedTimestamp = localStorage.getItem(STORAGE_KEYS.EXCHANGE_RATES_TIMESTAMP);
    
    if (savedRates) {
      try {
        return {
          ...JSON.parse(savedRates),
          timestamp: savedTimestamp ? parseInt(savedTimestamp) : undefined
        };
      } catch (e) {
        console.error("Failed to parse saved exchange rates", e);
      }
    }
    
    return DEFAULT_EXCHANGE_RATE;
  });
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const fetchExchangeRates = useCallback(async () => {
    setIsLoading(true);
    
    try {
      const response = await apiRequest("GET", "/api/exchange-rates", undefined);
      const data = await response.json();
      
      if (data && data.rates) {
        const newRates = {
          USD: data.rates.USD || 147.35,
          JPY: 1,
          EUR: data.rates.EUR || 158.72,
          GBP: data.rates.GBP || 186.41,
          timestamp: data.timestamp
        };
        
        setExchangeRates(newRates);
        
        // Save to localStorage
        localStorage.setItem(STORAGE_KEYS.EXCHANGE_RATES, JSON.stringify({
          USD: newRates.USD,
          JPY: newRates.JPY,
          EUR: newRates.EUR,
          GBP: newRates.GBP
        }));
        
        localStorage.setItem(
          STORAGE_KEYS.EXCHANGE_RATES_TIMESTAMP, 
          data.timestamp.toString()
        );
        
        toast({
          title: "為替レートを更新しました",
          description: `最新の為替レート： 1 USD = ${newRates.USD.toFixed(2)} 円`,
        });
      }
    } catch (error) {
      console.error("Failed to fetch exchange rates:", error);
      toast({
        title: "為替レートの更新に失敗しました",
        description: "後でもう一度お試しください",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  return {
    exchangeRates,
    isLoading,
    fetchExchangeRates
  };
}
