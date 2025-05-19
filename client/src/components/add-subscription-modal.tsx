import { useEffect, useState } from "react";
import { X, RefreshCw } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { 
  AI_SERVICES, 
  CURRENCY_SYMBOLS, 
  BILLING_CYCLES 
} from "@/lib/constants";
import { AIService, Currency, BillingCycle } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

interface AddSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (subscription: Omit<AIService, "id">) => void;
  subscription?: AIService;
  exchangeRates: { [key: string]: number };
}

export function AddSubscriptionModal({
  isOpen,
  onClose,
  onSave,
  subscription,
  exchangeRates
}: AddSubscriptionModalProps) {
  const [serviceType, setServiceType] = useState<"ai-service" | "custom">("ai-service");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [currency, setCurrency] = useState<Currency>("USD");
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [memo, setMemo] = useState("");
  const [aiServiceKey, setAIServiceKey] = useState("");

  // Reset form when opening the modal
  useEffect(() => {
    if (isOpen) {
      if (subscription) {
        // Edit mode
        setName(subscription.name);
        setCompany(subscription.company);
        setPrice(subscription.price);
        setCurrency(subscription.currency);
        setBillingCycle(subscription.billingCycle);
        setStartDate(subscription.startDate ? new Date(subscription.startDate) : undefined);
        setMemo(subscription.memo || "");
        setServiceType("custom"); // Always set to custom in edit mode
      } else {
        // Add mode
        setServiceType("ai-service");
        setName("");
        setCompany("");
        setPrice(0);
        setCurrency("USD");
        setBillingCycle("monthly");
        setStartDate(new Date());
        setMemo("");
        setAIServiceKey("");
      }
    }
  }, [isOpen, subscription]);

  // When an AI service is selected from dropdown
  const handleServiceChange = (value: string) => {
    setAIServiceKey(value);
    const service = AI_SERVICES[value as keyof typeof AI_SERVICES];
    if (service) {
      setName(service.name);
      setCompany(service.company);
      setPrice(service.price);
      setCurrency(service.currency);
      setBillingCycle(service.billingCycle);
    }
  };

  // Calculate JPY amount for display
  const calculatedJPY = currency === 'JPY' 
    ? price 
    : price * (exchangeRates[currency] || 1);

  // Calculate monthly JPY
  const monthlyJPY = (() => {
    let amount = calculatedJPY;
    if (billingCycle === "yearly") {
      amount = amount / 12;
    } else if (billingCycle === "quarterly") {
      amount = amount / 3;
    }
    return amount;
  })();

  const handleSave = () => {
    const newSubscription: Omit<AIService, "id"> = {
      name,
      company,
      price,
      currency,
      billingCycle,
      startDate: startDate?.toISOString(),
      memo: memo || undefined
    };
    
    onSave(newSubscription);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            {subscription ? "サービスを編集" : "サービスを追加"}
          </DialogTitle>
        </DialogHeader>
        
        {!subscription && (
          <div className="mb-6">
            <div className="text-sm font-medium text-neutral-700 mb-2">サービスタイプ</div>
            <div className="flex space-x-2">
              <Button
                type="button"
                onClick={() => setServiceType("ai-service")}
                variant={serviceType === "ai-service" ? "default" : "outline"}
                className="flex-1"
              >
                AIサービス
              </Button>
              <Button
                type="button"
                onClick={() => setServiceType("custom")}
                variant={serviceType === "custom" ? "default" : "outline"}
                className="flex-1"
              >
                カスタム
              </Button>
            </div>
          </div>
        )}
        
        {serviceType === "ai-service" && !subscription && (
          <div className="mb-4">
            <Label htmlFor="service" className="block text-sm font-medium text-neutral-700 mb-2">
              サービス選択
            </Label>
            <Select value={aiServiceKey} onValueChange={handleServiceChange}>
              <SelectTrigger id="service">
                <SelectValue placeholder="AIサービスを選択" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(AI_SERVICES).map(([key, service]) => (
                  <SelectItem key={key} value={key}>
                    {service.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        <div className="mb-4">
          <Label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
            サービス名
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ChatGPT Plus"
            className="w-full"
            disabled={serviceType === "ai-service" && !!aiServiceKey}
          />
        </div>
        
        <div className="mb-4">
          <Label htmlFor="company" className="block text-sm font-medium text-neutral-700 mb-2">
            提供会社
          </Label>
          <Input
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="OpenAI"
            className="w-full"
            disabled={serviceType === "ai-service" && !!aiServiceKey}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="currency" className="block text-sm font-medium text-neutral-700 mb-2">
              通貨
            </Label>
            <Select
              value={currency}
              onValueChange={(value) => setCurrency(value as Currency)}
              disabled={serviceType === "ai-service" && !!aiServiceKey}
            >
              <SelectTrigger id="currency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(CURRENCY_SYMBOLS).map(([currencyCode, symbol]) => (
                  <SelectItem key={currencyCode} value={currencyCode}>
                    {currencyCode} ({symbol})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="price" className="block text-sm font-medium text-neutral-700 mb-2">
              金額
            </Label>
            <div className="relative">
              <Input
                id="price"
                type="number"
                value={price.toString()}
                onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                placeholder="20.00"
                className="w-full pr-16"
                disabled={serviceType === "ai-service" && !!aiServiceKey}
                step="0.01"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-neutral-500">
                  {billingCycle === "monthly" ? "/ 月" : 
                   billingCycle === "yearly" ? "/ 年" : "/ 四半期"}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <Label htmlFor="billingCycle" className="block text-sm font-medium text-neutral-700 mb-2">
            支払いサイクル
          </Label>
          <Select
            value={billingCycle}
            onValueChange={(value) => setBillingCycle(value as BillingCycle)}
            disabled={serviceType === "ai-service" && !!aiServiceKey}
          >
            <SelectTrigger id="billingCycle">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(BILLING_CYCLES).map(([cycle, { label }]) => (
                <SelectItem key={cycle} value={cycle}>
                  {label}払い
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="mb-4">
          <Label htmlFor="startDate" className="block text-sm font-medium text-neutral-700 mb-2">
            契約開始日
          </Label>
          <DatePicker
            date={startDate}
            setDate={setStartDate}
          />
        </div>
        
        <div className="mb-4">
          <Label htmlFor="memo" className="block text-sm font-medium text-neutral-700 mb-2">
            メモ
          </Label>
          <Textarea
            id="memo"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="備考やリマインダーなど"
            className="w-full h-20"
          />
        </div>
        
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4 flex items-start">
          <RefreshCw className="h-5 w-5 text-primary mr-2" />
          <div>
            <p className="text-sm text-neutral-700">
              換算レート: <strong>1 {currency} = {formatCurrency(exchangeRates[currency] || 1, "JPY")}</strong>
            </p>
            <p className="text-xs text-neutral-500 mt-1">
              日本円換算: <strong>{formatCurrency(monthlyJPY, "JPY")} / 月</strong>
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            キャンセル
          </Button>
          <Button onClick={handleSave}>
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
