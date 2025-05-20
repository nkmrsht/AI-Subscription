import { useMemo } from "react";
import { CalendarIcon, Edit, MessageSquare, Trash } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { 
  formatCurrency, 
  formatDate, 
  getMonthlyAmount, 
  getMonthlyJPYCost 
} from "@/lib/utils";
import { AIService, ExchangeRates } from "@/lib/types";
import { BILLING_CYCLES } from "@/lib/constants";
import { ServiceLogoImage } from "./service-logo-image";

interface SubscriptionCardProps {
  subscription: AIService;
  exchangeRates: ExchangeRates;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function SubscriptionCard({
  subscription,
  exchangeRates,
  onEdit,
  onDelete
}: SubscriptionCardProps) {
  const monthlyOriginalAmount = useMemo(() => 
    getMonthlyAmount(subscription),
  [subscription]);

  const monthlyJPYAmount = useMemo(() => 
    getMonthlyJPYCost(subscription, exchangeRates),
  [subscription, exchangeRates]);

  return (
    <Card className="overflow-hidden hover:shadow-md transition">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <ServiceLogoImage serviceName={subscription.name} className="w-10 h-10 rounded-lg mr-3" />
            <div>
              <h3 className="font-bold text-neutral-800">{subscription.name}</h3>
              <div className="text-sm text-neutral-500">{subscription.company}</div>
            </div>
          </div>
          <div className="flex space-x-1">
            <button 
              className="text-neutral-400 hover:text-neutral-600 transition p-1"
              onClick={() => onEdit(subscription.id)}
              aria-label="サービスを編集"
            >
              <Edit className="h-5 w-5" />
            </button>
            <button 
              className="text-neutral-400 hover:text-destructive transition p-1"
              onClick={() => onDelete(subscription.id)}
              aria-label="サービスを削除"
            >
              <Trash className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="flex justify-between mb-3">
          <div className="text-sm text-neutral-600">料金プラン</div>
          <div className="text-sm font-medium">
            {BILLING_CYCLES[subscription.billingCycle].label}プラン
          </div>
        </div>
        
        <div className="mb-3">
          <div className="flex justify-between mb-1">
            <div className="text-sm text-neutral-600">元の料金</div>
            <div className="text-sm font-medium currency">
              {formatCurrency(subscription.price, subscription.currency)} / {BILLING_CYCLES[subscription.billingCycle].label.replace('額', '')}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-sm text-neutral-600">
              {subscription.billingCycle !== 'monthly' ? '日本円（月換算）' : '日本円'}
            </div>
            <div className="text-base font-bold text-neutral-800 currency">
              {formatCurrency(monthlyJPYAmount)} / 月
            </div>
          </div>
        </div>
        
        {subscription.startDate && (
          <div className="text-xs text-neutral-500 mt-4 flex items-center">
            <CalendarIcon className="h-4 w-4 mr-1" />
            契約開始日: {formatDate(subscription.startDate)}
          </div>
        )}
      </CardContent>
      
      {subscription.memo && (
        <CardFooter className="px-5 py-3 bg-neutral-50 border-t border-neutral-200">
          <div className="text-sm text-neutral-600">
            <MessageSquare className="h-4 w-4 inline mr-1 text-neutral-400" />
            {subscription.memo}
          </div>
        </CardFooter>
      )}
      {!subscription.memo && (
        <CardFooter className="px-5 py-3 bg-neutral-50 border-t border-neutral-200">
          <div className="text-sm text-neutral-600">
            <MessageSquare className="h-4 w-4 inline mr-1 text-neutral-400" />
            メモなし
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
