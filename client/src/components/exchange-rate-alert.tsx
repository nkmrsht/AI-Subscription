import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { isExchangeRateOutdated } from "@/lib/utils";

interface ExchangeRateAlertProps {
  exchangeRatesTimestamp?: number;
  onRefresh: () => Promise<void>;
  isLoading: boolean;
}

export function ExchangeRateAlert({ 
  exchangeRatesTimestamp, 
  onRefresh,
  isLoading
}: ExchangeRateAlertProps) {
  const [shouldShow, setShouldShow] = useState(false);
  
  useEffect(() => {
    if (isExchangeRateOutdated(exchangeRatesTimestamp)) {
      setShouldShow(true);
    } else {
      setShouldShow(false);
    }
  }, [exchangeRatesTimestamp]);

  if (!shouldShow) return null;

  return (
    <Alert variant="warning" className="bg-warning/10 border-warning/30 mb-6">
      <AlertCircle className="h-5 w-5 text-warning" />
      <div className="flex-1">
        <AlertTitle className="font-medium text-neutral-800">為替レートが7日以上更新されていません</AlertTitle>
        <AlertDescription className="text-sm text-neutral-600">
          最新の料金を表示するには「レート更新」ボタンをクリックしてください。
        </AlertDescription>
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        className="ml-auto bg-primary text-white hover:bg-primary/90 border-none"
        onClick={onRefresh}
        disabled={isLoading}
      >
        {isLoading ? "更新中..." : "今すぐ更新"}
      </Button>
    </Alert>
  );
}
