import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, AlertCircle, Trash2, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { STORAGE_KEYS } from "@/lib/constants";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useSubscriptions } from "@/hooks/use-subscriptions";

export default function Settings() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { exportData } = useSubscriptions();
  const [autoFetch, setAutoFetch] = useState<boolean>(true);
  
  const clearAllData = () => {
    if (window.confirm("全てのデータを削除します。この操作は元に戻せません。続けますか？")) {
      // Clear all localStorage data
      localStorage.removeItem(STORAGE_KEYS.SUBSCRIPTIONS);
      localStorage.removeItem(STORAGE_KEYS.EXCHANGE_RATES);
      localStorage.removeItem(STORAGE_KEYS.EXCHANGE_RATES_TIMESTAMP);
      
      toast({
        title: "データを削除しました",
        description: "全てのデータがクリアされました",
      });
      
      // Navigate back to home
      navigate("/");
    }
  };
  
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mr-2"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              戻る
            </Button>
            <h1 className="text-2xl font-bold">設定</h1>
          </div>
          
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>注意：現在、設定は実装中です</AlertTitle>
            <AlertDescription>
              一部の設定はまだ実装されていません。将来のアップデートで追加される予定です。
            </AlertDescription>
          </Alert>
          
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>データ管理</CardTitle>
                <CardDescription>
                  アプリのデータを管理します。
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">データのエクスポート</h3>
                    <p className="text-sm text-neutral-500">
                      全てのサブスクリプションデータをJSONファイルとして保存します
                    </p>
                  </div>
                  <Button onClick={exportData} className="flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    エクスポート
                  </Button>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">データのインポート</h3>
                    <p className="text-sm text-neutral-500">
                      エクスポートしたデータをインポートします
                    </p>
                  </div>
                  <Link href="/">
                    <Button className="flex items-center">
                      <Upload className="h-4 w-4 mr-2" />
                      インポート
                    </Button>
                  </Link>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-red-600">全データを削除</h3>
                    <p className="text-sm text-neutral-500">
                      全てのサブスクリプションデータと設定を削除します
                    </p>
                  </div>
                  <Button 
                    variant="destructive" 
                    onClick={clearAllData}
                    className="flex items-center"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    削除
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>自動更新</CardTitle>
                <CardDescription>
                  為替レートとサービス情報の自動更新設定
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-fetch">アプリ起動時に為替レートを取得</Label>
                    <p className="text-sm text-neutral-500">
                      アプリを開くたびに最新の為替レートを取得します
                    </p>
                  </div>
                  <Switch
                    id="auto-fetch"
                    checked={autoFetch}
                    onCheckedChange={setAutoFetch}
                  />
                </div>
              </CardContent>
              <CardFooter className="border-t pt-6 text-sm text-neutral-500">
                自動更新機能は今後のアップデートで拡張される予定です。
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
