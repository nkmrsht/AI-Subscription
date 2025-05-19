import { useState, useCallback, useEffect } from "react";
import { AIService } from "@/lib/types";
import { STORAGE_KEYS } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { generateId } from "@/lib/utils";

export function useSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<AIService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Load subscriptions from localStorage on component mount
  useEffect(() => {
    const savedSubscriptions = localStorage.getItem(STORAGE_KEYS.SUBSCRIPTIONS);
    if (savedSubscriptions) {
      try {
        setSubscriptions(JSON.parse(savedSubscriptions));
      } catch (e) {
        console.error("Failed to parse saved subscriptions", e);
        toast({
          title: "保存されたデータの読み込みに失敗しました",
          description: "データが破損している可能性があります",
          variant: "destructive",
        });
      }
    }
    setIsLoading(false);
  }, [toast]);

  // Save subscriptions to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEYS.SUBSCRIPTIONS, JSON.stringify(subscriptions));
    }
  }, [subscriptions, isLoading]);

  const addSubscription = useCallback((subscription: Omit<AIService, "id">) => {
    const newSubscription = { ...subscription, id: generateId() };
    setSubscriptions(prev => [...prev, newSubscription]);
    
    toast({
      title: "サービスを追加しました",
      description: `${subscription.name} を追加しました`,
    });
    
    return newSubscription;
  }, [toast]);

  const updateSubscription = useCallback((id: string, subscription: Partial<AIService>) => {
    setSubscriptions(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...subscription } : item
      )
    );
    
    toast({
      title: "サービスを更新しました",
      description: "変更が保存されました",
    });
  }, [toast]);

  const deleteSubscription = useCallback((id: string) => {
    setSubscriptions(prev => {
      const subscription = prev.find(s => s.id === id);
      const newSubscriptions = prev.filter(item => item.id !== id);
      
      toast({
        title: "サービスを削除しました",
        description: subscription ? `${subscription.name} を削除しました` : "サービスを削除しました",
      });
      
      return newSubscriptions;
    });
  }, [toast]);

  const exportData = useCallback(() => {
    try {
      const dataStr = JSON.stringify(subscriptions);
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
      
      const exportFileDefaultName = `ai-subscriptions-${new Date().toISOString().slice(0, 10)}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast({
        title: "データをエクスポートしました",
        description: "ファイルのダウンロードが開始されました",
      });
    } catch (error) {
      console.error("Failed to export data:", error);
      toast({
        title: "エクスポートに失敗しました",
        description: "もう一度お試しください",
        variant: "destructive",
      });
    }
  }, [subscriptions, toast]);

  const importData = useCallback((jsonData: string) => {
    try {
      const parsedData = JSON.parse(jsonData) as AIService[];
      
      if (!Array.isArray(parsedData)) {
        throw new Error("Invalid data format");
      }
      
      setSubscriptions(parsedData);
      
      toast({
        title: "データをインポートしました",
        description: `${parsedData.length} 件のサービスを読み込みました`,
      });
    } catch (error) {
      console.error("Failed to import data:", error);
      toast({
        title: "インポートに失敗しました",
        description: "ファイル形式が正しくありません",
        variant: "destructive",
      });
    }
  }, [toast]);

  return {
    subscriptions,
    isLoading,
    addSubscription,
    updateSubscription,
    deleteSubscription,
    exportData,
    importData
  };
}
