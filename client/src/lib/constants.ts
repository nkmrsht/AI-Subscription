// AI services with their plans and pricing options
// 2025年5月20日時点での最新料金情報
import { AIServiceDefinition } from "./types";

export const AI_SERVICES_DEFINITIONS: Record<string, AIServiceDefinition> = {
  // OpenAI
  openai: {
    id: "openai",
    name: "ChatGPT / OpenAI",
    company: "OpenAI",
    plans: [
      {
        id: "chatgpt_free",
        name: "ChatGPT Free",
        pricing: {
          monthly: {
            price: 0,
            currency: "USD"
          }
        },
        features: ["GPT-3.5", "限定された機能"]
      },
      {
        id: "chatgpt_plus",
        name: "ChatGPT Plus",
        pricing: {
          monthly: {
            price: 20,
            currency: "USD"
          },
          yearly: {
            price: 200,
            currency: "USD"
          }
        },
        features: ["GPT-4o", "DALL-E 3", "高速レスポンス"]
      },
      {
        id: "chatgpt_team",
        name: "ChatGPT Team",
        pricing: {
          monthly: {
            price: 30,
            currency: "USD"
          },
          yearly: {
            price: 300,
            currency: "USD"
          }
        },
        features: ["共有ワークスペース", "チーム管理機能"]
      },
      {
        id: "chatgpt_enterprise",
        name: "ChatGPT Enterprise",
        pricing: {
          monthly: {
            price: 60,
            currency: "USD"
          }
        },
        features: ["大規模チーム向け", "高度なセキュリティ", "カスタムモデル"]
      }
    ]
  },
  
  // Google
  google: {
    id: "google",
    name: "Gemini",
    company: "Google",
    plans: [
      {
        id: "gemini_free",
        name: "Gemini Free",
        pricing: {
          monthly: {
            price: 0,
            currency: "USD"
          }
        },
        features: ["基本機能", "Gemini 1.0"]
      },
      {
        id: "gemini_advanced",
        name: "Gemini Advanced",
        pricing: {
          monthly: {
            price: 19.99,
            currency: "USD"
          },
          yearly: {
            price: 199.99,
            currency: "USD"
          }
        },
        features: ["Gemini 1.5 Pro", "長い会話", "高度な問題解決"]
      },
      {
        id: "gemini_business",
        name: "Gemini Business",
        pricing: {
          monthly: {
            price: 30,
            currency: "USD"
          },
          yearly: {
            price: 300,
            currency: "USD"
          }
        },
        features: ["ビジネス向け統合", "管理機能"]
      },
      {
        id: "gemini_enterprise",
        name: "Gemini Enterprise",
        pricing: {
          monthly: {
            price: 50,
            currency: "USD"
          }
        },
        features: ["エンタープライズセキュリティ", "カスタムモデル"]
      }
    ]
  },
  
  // Anthropic
  anthropic: {
    id: "anthropic",
    name: "Claude",
    company: "Anthropic",
    plans: [
      {
        id: "claude_free",
        name: "Claude Free",
        pricing: {
          monthly: {
            price: 0,
            currency: "USD"
          }
        },
        features: ["基本機能", "Claude 3 Haiku"]
      },
      {
        id: "claude_pro",
        name: "Claude Pro",
        pricing: {
          monthly: {
            price: 20,
            currency: "USD"
          },
          yearly: {
            price: 192,
            currency: "USD"
          }
        },
        features: ["Claude 3 Sonnet", "優先アクセス", "高いトークン上限"]
      },
      {
        id: "claude_team",
        name: "Claude Team",
        pricing: {
          monthly: {
            price: 30,
            currency: "USD"
          }
        },
        features: ["チーム向け共有機能", "ワークスペース"]
      },
      {
        id: "claude_business",
        name: "Claude Business",
        pricing: {
          monthly: {
            price: 35,
            currency: "USD"
          }
        },
        features: ["Claude 3 Opus", "ビジネス向け機能"]
      },
      {
        id: "claude_enterprise",
        name: "Claude Enterprise",
        pricing: {
          monthly: {
            price: 100,
            currency: "USD"
          }
        },
        features: ["エンタープライズセキュリティ", "高度なカスタマイズ"]
      }
    ]
  },
  
  // Replit
  replit: {
    id: "replit",
    name: "Replit",
    company: "Replit",
    plans: [
      {
        id: "replit_free",
        name: "Replit Free",
        pricing: {
          monthly: {
            price: 0,
            currency: "USD"
          }
        },
        features: ["基本的な開発機能", "公開プロジェクト"]
      },
      {
        id: "replit_core",
        name: "Replit Core",
        pricing: {
          monthly: {
            price: 25,
            currency: "USD"
          },
          yearly: {
            price: 250,
            currency: "USD"
          }
        },
        features: ["高性能コンピュート", "プライベートリポジトリ", "共同編集"]
      },
      {
        id: "replit_pro",
        name: "Replit Pro",
        pricing: {
          monthly: {
            price: 20,
            currency: "USD"
          },
          yearly: {
            price: 190,
            currency: "USD"
          }
        },
        features: ["Ghostwriter", "10GB ストレージ", "4GB RAM"]
      },
      {
        id: "replit_teams_for_education",
        name: "Replit Teams for Education",
        pricing: {
          monthly: {
            price: 15,
            currency: "USD"
          },
          yearly: {
            price: 150,
            currency: "USD"
          }
        },
        features: ["教育機関向け", "授業管理", "学生専用機能"]
      },
      {
        id: "replit_teams_pro",
        name: "Replit Teams Pro",
        pricing: {
          monthly: {
            price: 35,
            currency: "USD"
          },
          yearly: {
            price: 350,
            currency: "USD"
          }
        },
        features: ["チームでの共同開発", "高度なプロジェクト管理", "チームリポジトリ"]
      }
    ]
  },
  
  // Microsoft Copilot
  microsoft: {
    id: "microsoft",
    name: "Microsoft Copilot",
    company: "Microsoft",
    plans: [
      {
        id: "microsoft_copilot_free",
        name: "Microsoft Copilot Free",
        pricing: {
          monthly: {
            price: 0,
            currency: "USD"
          }
        },
        features: ["基本機能", "無料利用枠"]
      },
      {
        id: "microsoft_copilot_pro",
        name: "Microsoft Copilot Pro",
        pricing: {
          monthly: {
            price: 20,
            currency: "USD"
          },
          yearly: {
            price: 200,
            currency: "USD"
          }
        },
        features: ["GPT-4 Turbo", "Office連携", "優先アクセス"]
      },
      {
        id: "microsoft_copilot_business",
        name: "Microsoft Copilot for Business",
        pricing: {
          monthly: {
            price: 30,
            currency: "USD"
          },
          yearly: {
            price: 300,
            currency: "USD"
          }
        },
        features: ["ビジネスデータ保護", "管理機能"]
      },
      {
        id: "microsoft_copilot_for_m365",
        name: "Microsoft Copilot for M365",
        pricing: {
          monthly: {
            price: 30,
            currency: "USD"
          },
          yearly: {
            price: 300,
            currency: "USD"
          }
        },
        features: ["Microsoft 365統合", "メール・文書作成補助"]
      }
    ]
  },
  
  // Adobe AI
  adobe: {
    id: "adobe",
    name: "Adobe AI",
    company: "Adobe",
    plans: [
      {
        id: "adobe_firefly_single_app",
        name: "Adobe Firefly Single App",
        pricing: {
          monthly: {
            price: 1980,
            currency: "JPY"
          },
          yearly: {
            price: 19800,
            currency: "JPY"
          }
        },
        features: ["画像生成", "画像編集", "商用利用可"]
      },
      {
        id: "adobe_firefly_cc",
        name: "Adobe Firefly (Creative Cloud)",
        pricing: {
          monthly: {
            price: 6980,
            currency: "JPY"
          },
          yearly: {
            price: 69800,
            currency: "JPY"
          }
        },
        features: ["Creative Cloud全アプリ利用可", "高度な統合機能"]
      },
      {
        id: "adobe_express_premium",
        name: "Adobe Express Premium",
        pricing: {
          monthly: {
            price: 1200,
            currency: "JPY"
          },
          yearly: {
            price: 12000,
            currency: "JPY"
          }
        },
        features: ["簡単な画像編集", "テンプレート", "Firefly生成AI"]
      }
    ]
  }
};

// レガシーサポート（後方互換性のため、このオブジェクトは残しておきます）
export const AI_SERVICES = {
  // OpenAI
  chatgpt_plus: {
    name: "ChatGPT Plus",
    company: "OpenAI",
    price: 20,
    currency: "USD",
    billingCycle: "monthly"
  },
  // 他のレガシーサービス定義もここに追加
  // ...
  
  // Replit (公式サイトの料金を反映 - 2025年5月更新)
  replit_core: {
    name: "Replit Core",
    company: "Replit",
    price: 25,
    currency: "USD",
    billingCycle: "monthly"
  },
  replit_pro: {
    name: "Replit Pro",
    company: "Replit",
    price: 20,
    currency: "USD",
    billingCycle: "monthly"
  }
};

export const CURRENCY_SYMBOLS = {
  USD: "$",
  JPY: "¥",
  EUR: "€",
  GBP: "£"
};

export const BILLING_CYCLES = {
  monthly: {
    label: "月額",
    monthsMultiplier: 1,
  },
  yearly: {
    label: "年額",
    monthsMultiplier: 12,
  },
  quarterly: {
    label: "四半期",
    monthsMultiplier: 3,
  }
};

export const STORAGE_KEYS = {
  SUBSCRIPTIONS: "ai-subscriptions",
  EXCHANGE_RATES: "exchange-rates",
  EXCHANGE_RATES_TIMESTAMP: "exchange-rates-timestamp"
};

export const DEFAULT_EXCHANGE_RATE = {
  USD: 147.35,
  EUR: 158.72,
  GBP: 186.41,
  JPY: 1
};
