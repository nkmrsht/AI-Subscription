import React from 'react';

// サービスコードマッピング
const SERVICE_CODES: Record<string, string> = {
  'ChatGPT': 'GPT',
  'OpenAI': 'GPT',
  'Claude': 'CLD',
  'Anthropic': 'CLD',
  'Gemini': 'GEM',
  'Google': 'GEM',
  'Notion': 'NOT',
  'GitHub': 'GIT',
  'Microsoft': 'MS',
  'Replit': 'REP',
  'Midjourney': 'MID',
  'Perplexity': 'PPX',
  'Stability': 'STB',
  'Genspark': 'GEN'
};

// ブランドカラーマッピング
const BRAND_COLORS: Record<string, string> = {
  'GPT': '#00A67E',  // ChatGPT
  'CLD': '#EF764E',  // Claude
  'GEM': '#8E44AD',  // Gemini
  'NOT': '#000000',  // Notion
  'GIT': '#24292E',  // GitHub
  'MS': '#00A4EF',   // Microsoft
  'REP': '#F26207',  // Replit
  'MID': '#000000',  // Midjourney
  'PPX': '#2563EB',  // Perplexity
  'STB': '#2D333B',  // Stability
  'GEN': '#FF6B00'   // Genspark
};

interface ServiceLogoSimpleProps {
  serviceName: string;
  className?: string;
}

export function ServiceLogoSimple({ serviceName, className = '' }: ServiceLogoSimpleProps) {
  // コードを取得
  let code = '';
  
  // 部分一致探索
  const lowerName = serviceName.toLowerCase();
  for (const [key, value] of Object.entries(SERVICE_CODES)) {
    if (lowerName.includes(key.toLowerCase())) {
      code = value;
      break;
    }
  }
  
  // コードが見つからない場合はデフォルトを生成
  if (!code) {
    const words = serviceName.split(/\s+/);
    if (words.length === 1) {
      code = words[0].substring(0, 3).toUpperCase();
    } else {
      // 複数単語の場合は略語を作成
      code = words.map(word => word[0]).join('').substring(0, 3).toUpperCase();
    }
  }
  
  // 色を取得
  const bgColor = BRAND_COLORS[code] || '#6B7280';
  
  return (
    <div 
      className={`flex items-center justify-center font-bold text-white ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {code}
    </div>
  );
}