import { useState, useMemo, useCallback } from "react";
import { Link } from "wouter";
import { PlusCircle, Search, RefreshCw, Calendar, Download, Upload, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useSubscriptions } from "@/hooks/use-subscriptions";
import { useExchangeRates } from "@/hooks/use-exchange-rates";
import { AddSubscriptionModal } from "@/components/add-subscription-modal";
import { SubscriptionCard } from "@/components/subscription-card";
import { ExchangeRateAlert } from "@/components/exchange-rate-alert";
import { AIService } from "@/lib/types";
import { formatCurrency, formatTimestamp, getMonthlyJPYCost } from "@/lib/utils";

export default function Home() {
  const { subscriptions, addSubscription, updateSubscription, deleteSubscription, exportData, importData } = useSubscriptions();
  const { exchangeRates, isLoading, fetchExchangeRates } = useExchangeRates();
  const { toast } = useToast();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<AIService | undefined>(undefined);
  const [searchText, setSearchText] = useState("");
  
  // Filter subscriptions based on search text
  const filteredSubscriptions = useMemo(() => {
    if (!searchText) return subscriptions;
    
    const searchLower = searchText.toLowerCase();
    return subscriptions.filter(sub => 
      sub.name.toLowerCase().includes(searchLower) || 
      sub.company.toLowerCase().includes(searchLower)
    );
  }, [subscriptions, searchText]);

  // Calculate total monthly cost in JPY
  const totalMonthlyJPY = useMemo(() => {
    return subscriptions.reduce(
      (total, subscription) => total + getMonthlyJPYCost(subscription, exchangeRates),
      0
    );
  }, [subscriptions, exchangeRates]);

  // Calculate average service cost
  const averageServiceCost = useMemo(() => {
    return subscriptions.length > 0 ? totalMonthlyJPY / subscriptions.length : 0;
  }, [totalMonthlyJPY, subscriptions.length]);

  // Calculate currency breakdown
  const currencyBreakdown = useMemo(() => {
    const breakdown: Record<string, number> = {};
    
    subscriptions.forEach(subscription => {
      const monthlyCost = getMonthlyJPYCost(subscription, exchangeRates);
      
      if (!breakdown[subscription.currency]) {
        breakdown[subscription.currency] = 0;
      }
      
      breakdown[subscription.currency] += monthlyCost;
    });
    
    return Object.entries(breakdown).map(([currency, amount]) => ({
      currency,
      amount,
      percentage: totalMonthlyJPY > 0 ? (amount / totalMonthlyJPY) * 100 : 0
    }));
  }, [subscriptions, exchangeRates, totalMonthlyJPY]);

  // Handlers
  const handleOpenAddModal = () => {
    setEditingSubscription(undefined);
    setIsAddModalOpen(true);
  };
  
  const handleEditSubscription = (id: string) => {
    const subscription = subscriptions.find(s => s.id === id);
    if (subscription) {
      setEditingSubscription(subscription);
      setIsAddModalOpen(true);
    }
  };
  
  const handleDeleteSubscription = (id: string) => {
    if (window.confirm("本当に削除しますか？この操作は元に戻せません。")) {
      deleteSubscription(id);
    }
  };
  
  const handleSaveSubscription = (subscription: Omit<AIService, "id">) => {
    if (editingSubscription) {
      updateSubscription(editingSubscription.id, subscription);
    } else {
      addSubscription(subscription);
    }
  };

  const handleFileInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) {
        importData(content);
      }
    };
    reader.readAsText(file);
    
    // Reset the input
    event.target.value = '';
  }, [importData]);

  const handleImport = () => {
    // Create a hidden file input and trigger it
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = handleFileInput as any;
    input.click();
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="flex items-center mb-3 sm:mb-0">
            <PlusCircle className="h-8 w-8 text-primary" />
            <h1 className="ml-2 text-xl font-bold text-neutral-800">AI サブスク管理</h1>
          </div>
          
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-3 w-full sm:w-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <div className="text-neutral-600 text-sm mr-2">月額合計</div>
              <div className="text-2xl font-bold text-neutral-800 currency">
                {formatCurrency(totalMonthlyJPY)}
              </div>
              <Button 
                variant="outline"
                size="sm"
                className="ml-auto sm:ml-4 text-xs bg-primary text-white rounded px-2 py-1 hover:bg-primary/90"
                onClick={() => fetchExchangeRates()}
                disabled={isLoading}
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                レート更新
              </Button>
            </div>
            <div className="text-xs text-neutral-500 mt-1">
              最終更新: {exchangeRates.timestamp 
                ? formatTimestamp(exchangeRates.timestamp) 
                : "まだ更新していません"} 
              (1 USD = {formatCurrency(exchangeRates.USD || 147.35, "JPY")})
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        {/* Action bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h2 className="text-lg font-bold text-neutral-800 mb-2">登録中のサービス</h2>
            <div className="text-sm text-neutral-600">
              現在 <span className="font-medium">{subscriptions.length}</span> 件のサービスを管理中
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-4 sm:mt-0 w-full sm:w-auto">
            <div className="relative">
              <Input
                type="text"
                placeholder="サービス名で検索"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="pl-9 pr-4 py-2 w-full sm:w-56"
              />
              <Search className="h-5 w-5 text-neutral-400 absolute left-3 top-2.5" />
            </div>
            
            <Button 
              className="flex items-center justify-center" 
              onClick={handleOpenAddModal}
            >
              <PlusCircle className="h-5 w-5 mr-1" />
              サービスを追加
            </Button>
          </div>
        </div>
        
        {/* Exchange rate alert */}
        <ExchangeRateAlert 
          exchangeRatesTimestamp={exchangeRates.timestamp} 
          onRefresh={fetchExchangeRates}
          isLoading={isLoading}
        />
        
        {/* Subscription cards */}
        {filteredSubscriptions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {filteredSubscriptions.map(subscription => (
              <SubscriptionCard
                key={subscription.id}
                subscription={subscription}
                exchangeRates={exchangeRates}
                onEdit={handleEditSubscription}
                onDelete={handleDeleteSubscription}
              />
            ))}
          </div>
        ) : (
          <Card className="p-8 mb-8 text-center">
            <h3 className="text-lg font-medium mb-2">サービスがありません</h3>
            <p className="text-neutral-500 mb-4">「サービスを追加」ボタンから最初のサービスを追加してください。</p>
            <Button onClick={handleOpenAddModal}>サービスを追加</Button>
          </Card>
        )}
        
        {subscriptions.length > 0 && (
          <>
            {/* Summary widget */}
            <Card className="p-5 mb-8">
              <h3 className="text-lg font-bold text-neutral-800 mb-4">支払い概要</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-neutral-50 rounded-lg p-4">
                  <div className="text-sm text-neutral-600 mb-1">月額合計</div>
                  <div className="text-2xl font-bold text-neutral-800 currency">
                    {formatCurrency(totalMonthlyJPY)}
                  </div>
                  <div className="text-xs text-neutral-500 mt-1">
                    {subscriptions.length}つのサービス
                  </div>
                </div>
                
                <div className="bg-neutral-50 rounded-lg p-4">
                  <div className="text-sm text-neutral-600 mb-1">年間換算</div>
                  <div className="text-2xl font-bold text-neutral-800 currency">
                    {formatCurrency(totalMonthlyJPY * 12)}
                  </div>
                  <div className="text-xs text-neutral-500 mt-1">
                    月額 × 12ヶ月
                  </div>
                </div>
                
                <div className="bg-neutral-50 rounded-lg p-4">
                  <div className="text-sm text-neutral-600 mb-1">平均サービス単価</div>
                  <div className="text-2xl font-bold text-neutral-800 currency">
                    {formatCurrency(averageServiceCost)}
                  </div>
                  <div className="text-xs text-neutral-500 mt-1">
                    月額 ÷ サービス数
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Currency breakdown */}
            <Card className="p-5">
              <h3 className="text-lg font-bold text-neutral-800 mb-4">通貨別内訳</h3>
              
              {currencyBreakdown.map(({ currency, amount, percentage }) => (
                <div key={currency} className="mb-6 last:mb-0">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium text-neutral-700">
                      {currency}
                    </div>
                    <div className="text-sm font-medium text-neutral-700">
                      {formatCurrency(amount)} ({percentage.toFixed(0)}%)
                    </div>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2.5">
                    <div 
                      className={`${currency === "USD" ? "bg-primary" : "bg-secondary"} h-2.5 rounded-full`} 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </Card>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 py-6 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="text-sm text-neutral-500">データは端末内に保存されています</div>
              <div className="text-xs text-neutral-400 mt-1">
                最終更新: {new Date().toLocaleDateString("ja-JP").replace(/-/g, '/')}
              </div>
            </div>
            
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-neutral-500 hover:text-neutral-700" onClick={exportData}>
                <Download className="h-4 w-4 mr-1" />
                データをエクスポート
              </Button>
              <Button variant="ghost" size="sm" className="text-neutral-500 hover:text-neutral-700" onClick={handleImport}>
                <Upload className="h-4 w-4 mr-1" />
                データをインポート
              </Button>
              <Link href="/settings">
                <Button variant="ghost" size="sm" className="text-neutral-500 hover:text-neutral-700">
                  <Settings className="h-4 w-4 mr-1" />
                  設定
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Subscription modal */}
      <AddSubscriptionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveSubscription}
        subscription={editingSubscription}
        exchangeRates={exchangeRates}
      />
    </div>
  );
}
