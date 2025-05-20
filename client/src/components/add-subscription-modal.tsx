import { useEffect, useState } from "react";
import { RefreshCw, InfoIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  AI_SERVICES, 
  AI_SERVICES_DEFINITIONS,
  CURRENCY_SYMBOLS, 
  BILLING_CYCLES 
} from "@/lib/constants";
import { 
  AIService, 
  Currency, 
  BillingCycle, 
  AIServiceDefinition,
  ServicePlan
} from "@/lib/types";
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
  const [planName, setPlanName] = useState("");
  
  // 新しい選択フロー用のステート
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [selectedService, setSelectedService] = useState<AIServiceDefinition | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<ServicePlan | null>(null);

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
        setPlanName(subscription.planName || "");
        setServiceType("custom"); // Always set to custom in edit mode
        setSelectedServiceId("");
        setSelectedPlanId("");
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
        setPlanName("");
        setSelectedServiceId("");
        setSelectedPlanId("");
        setSelectedService(null);
        setSelectedPlan(null);
      }
    }
  }, [isOpen, subscription]);

  // サービスが選択された時に実行
  useEffect(() => {
    if (selectedServiceId) {
      const service = AI_SERVICES_DEFINITIONS[selectedServiceId];
      if (service) {
        setSelectedService(service);
        setCompany(service.company);
        // プランは選択されるまで設定しない
        setSelectedPlanId("");
        setSelectedPlan(null);
      }
    }
  }, [selectedServiceId]);

  // プランが選択された時に実行
  useEffect(() => {
    if (selectedServiceId && selectedPlanId) {
      const service = AI_SERVICES_DEFINITIONS[selectedServiceId];
      if (service) {
        const plan = service.plans.find(p => p.id === selectedPlanId);
        if (plan) {
          setSelectedPlan(plan);
          setName(`${service.name} - ${plan.name}`);
          setPlanName(plan.name);
          
          // 手動入力の推奨価格として設定
          // 請求サイクルの初期値を選択するだけ
          if (plan.pricing.monthly) {
            setCurrency(plan.pricing.monthly.currency);
          }
          // 価格は最初は空にして手動入力を促す
          setPrice(0);
        }
      }
    }
  }, [selectedServiceId, selectedPlanId]);

  // 請求サイクルが変更された時に価格を更新
  useEffect(() => {
    if (selectedPlan && selectedPlan.pricing[billingCycle]) {
      const pricing = selectedPlan.pricing[billingCycle];
      if (pricing) {
        setPrice(pricing.price);
        setCurrency(pricing.currency);
      }
    }
  }, [billingCycle, selectedPlan]);

  // Calculate JPY amount for display
  const calculatedJPY = currency === 'JPY' 
    ? price 
    : price * (exchangeRates[currency] || 1);

  // Calculate monthly JPY based on billing cycle
  const monthlyJPY = (() => {
    let amount = calculatedJPY;
    
    // 選択されたプランから月額を計算（正確な割引率を反映）
    if (selectedPlan && billingCycle === "yearly" && selectedPlan.pricing.yearly && selectedPlan.pricing.monthly) {
      // 年払い料金の実際の月額換算（プランに定義されている実際の年払い料金を使用）
      const yearlyPriceInJPY = selectedPlan.pricing.yearly.price * 
        (selectedPlan.pricing.yearly.currency === "JPY" ? 1 : exchangeRates[selectedPlan.pricing.yearly.currency] || 1);
      amount = yearlyPriceInJPY / 12;
    } else if (billingCycle === "yearly") {
      // プラン詳細がない場合の標準計算
      amount = amount / 12;
    } else if (billingCycle === "quarterly") {
      amount = amount / 3;
    }
    
    return amount;
  })();

  // Calculate yearly JPY total, preserving any discounts
  const yearlyTotal = (() => {
    // 選択されたプランから年額を計算（正確な割引率を反映）
    if (selectedPlan && selectedPlan.pricing.yearly) {
      // プランに年払いオプションがある場合、その金額を使用
      const yearlyPrice = selectedPlan.pricing.yearly.price;
      return selectedPlan.pricing.yearly.currency === "JPY" 
        ? yearlyPrice 
        : yearlyPrice * (exchangeRates[selectedPlan.pricing.yearly.currency] || 1);
    } else if (billingCycle === "yearly") {
      // 既に年払いの場合はそのまま
      return calculatedJPY;
    } else {
      // その他の場合は月額から年間換算
      return monthlyJPY * 12;
    }
  })();

  const handleSave = () => {
    const newSubscription: Omit<AIService, "id"> = {
      name,
      company,
      price,
      currency,
      billingCycle,
      startDate: startDate?.toISOString(),
      memo: memo || undefined,
      planName: planName || undefined,
      serviceId: selectedServiceId || undefined
    };
    
    onSave(newSubscription);
    onClose();
  };

  // プランが特定のサイクルの支払いオプションを持っているかチェック
  const hasPricingOption = (plan: ServicePlan, cycle: BillingCycle) => {
    return !!plan.pricing[cycle];
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
          <>
            {/* サービス選択 */}
            <div className="mb-4">
              <Label htmlFor="service" className="block text-sm font-medium text-neutral-700 mb-2">
                サービス選択
              </Label>
              <Select 
                value={selectedServiceId} 
                onValueChange={(value) => setSelectedServiceId(value)}
              >
                <SelectTrigger id="service">
                  <SelectValue placeholder="AIサービスを選択" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(AI_SERVICES_DEFINITIONS).map(([key, service]) => (
                    <SelectItem key={key} value={key}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* プラン選択 (サービスが選択されている場合のみ表示) */}
            {selectedService && (
              <div className="mb-6">
                <Label className="block text-sm font-medium text-neutral-700 mb-2">
                  プラン選択
                </Label>
                <div className="grid grid-cols-1 gap-2">
                  {selectedService.plans.map((plan) => (
                    <div 
                      key={plan.id}
                      className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                        selectedPlanId === plan.id 
                          ? "border-primary bg-primary/5" 
                          : "border-neutral-200 hover:border-neutral-300"
                      }`}
                      onClick={() => setSelectedPlanId(plan.id)}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <div className="font-medium">{plan.name}</div>
                      </div>
                      {plan.features && plan.features.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {plan.features.map((feature, idx) => (
                            <Badge 
                              key={idx} 
                              variant="outline" 
                              className="text-xs font-normal py-0 px-2"
                            >
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* 支払いサイクル選択 (プランが選択されている場合のみ表示) */}
            {selectedPlan && (
              <div className="mb-4">
                <Label className="block text-sm font-medium text-neutral-700 mb-2">
                  支払いサイクル
                </Label>
                <Tabs 
                  defaultValue="monthly" 
                  value={billingCycle} 
                  onValueChange={(value) => setBillingCycle(value as BillingCycle)}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="monthly">
                      月払い
                    </TabsTrigger>
                    <TabsTrigger value="yearly">
                      年払い
                    </TabsTrigger>
                    <TabsTrigger value="quarterly">
                      四半期
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            )}
            
            {/* 支払日の選択（プランが選択されている場合のみ表示） */}
            {selectedPlan && (
              <div className="mb-4">
                <Label className="block text-sm font-medium text-neutral-700 mb-2">
                  支払日
                </Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <Input
                      type="number"
                      min="1"
                      max={billingCycle === "monthly" ? "31" : "12"}
                      placeholder={billingCycle === "monthly" ? "例: 1-31" : "例: 1-12"}
                      className="w-full"
                    />
                  </div>
                  <div className="col-span-2 flex items-center text-sm text-neutral-500">
                    {billingCycle === "monthly" ? "日（毎月）" : 
                     billingCycle === "yearly" ? "月（毎年）" : 
                     "日（3ヶ月ごと）"}
                  </div>
                </div>
              </div>
            )}
            
            {/* 料金設定（プランが選択されている場合のみ表示） */}
            {selectedPlan && (
              <div className="mb-4">
                <Label className="block text-sm font-medium text-neutral-700 mb-2">
                  料金（手動入力）
                </Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <Select
                      value={currency}
                      onValueChange={(value) => setCurrency(value as Currency)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="通貨" />
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
                  <div className="col-span-2">
                    <div className="relative">
                      <Input
                        type="number"
                        value={price === 0 ? "" : price.toString()}
                        onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                        placeholder="料金を入力"
                        className="w-full pr-16"
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
              </div>
            )}
          </>
        )}
        
        {/* カスタムサービスまたは編集モードの場合 */}
        {(serviceType === "custom" || subscription) && (
          <>
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
              />
            </div>
            
            <div className="mb-4">
              <Label htmlFor="planName" className="block text-sm font-medium text-neutral-700 mb-2">
                プラン名
              </Label>
              <Input
                id="planName"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                placeholder="Basic、Pro、Enterprise など"
                className="w-full"
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
          </>
        )}
        
        {/* 共通フィールド */}
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
        
        {/* 料金情報サマリー */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
          <div className="flex items-start mb-3">
            <RefreshCw className="h-5 w-5 text-primary mr-2 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-neutral-700">
                換算レート: <strong>1 {currency} = {formatCurrency(exchangeRates[currency] || 1, "JPY")}</strong>
              </p>
            </div>
          </div>
          
          <div className="border-t border-primary/10 pt-3">
            <div className="flex justify-between items-center">
              <div className="text-sm text-neutral-600">月額(日本円換算)</div>
              <div className="font-medium">{formatCurrency(monthlyJPY, "JPY")}</div>
            </div>
            <div className="flex justify-between items-center mt-1">
              <div className="text-sm text-neutral-600">年間(日本円換算)</div>
              <div className="font-medium">{formatCurrency(yearlyTotal, "JPY")}</div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            キャンセル
          </Button>
          <Button onClick={handleSave} disabled={!name || !company || price === 0}>
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
