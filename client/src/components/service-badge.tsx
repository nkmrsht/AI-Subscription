import React from 'react';

// サービス名とその略称のマッピング
const SERVICE_CODES: Record<string, string> = {
  'ChatGPT': 'GPT',
  'OpenAI': 'GPT',
  'Claude': 'CLD',
  'Anthropic': 'CLD',
  'Gemini': 'GEM',
  'Google': 'GEM',
  'Notion': 'NOT',
  'Replit': 'REP',
  'GitHub': 'GIT',
  'Microsoft': 'MS',
  'Midjourney': 'MID',
  'Perplexity': 'PPX',
  'Stability': 'STB',
  'Genspark': 'GEN'
};

// サービスコードとブランドカラーのマッピング
const BRAND_COLORS: Record<string, string> = {
  'GPT': '#00A67E',  // OpenAI/ChatGPT
  'CLD': '#EF764E',  // Claude
  'GEM': '#8E44AD',  // Gemini
  'NOT': '#000000',  // Notion
  'GIT': '#24292E',  // GitHub
  'MS': '#00A4EF',   // Microsoft
  'REP': '#F26207',  // Replit
  'MID': '#000000',  // Midjourney
  'PPX': '#2563EB',  // Perplexity
  'STB': '#2D333B',  // Stability AI
  'GEN': '#FF6B00'   // Genspark
};

interface ServiceBadgeProps {
  serviceName: string;
  className?: string;
}

export function ServiceBadge({ serviceName, className = '' }: ServiceBadgeProps) {
  // 短縮コードを取得
  let code = '';
  
  // 完全一致または前方一致を探す
  for (const [key, value] of Object.entries(SERVICE_CODES)) {
    if (serviceName === key || serviceName.startsWith(key + ' ')) {
      code = value;
      break;
    }
  }
  
  // 見つからなかった場合は部分一致を探す
  if (!code) {
    for (const [key, value] of Object.entries(SERVICE_CODES)) {
      if (serviceName.toLowerCase().includes(key.toLowerCase())) {
        code = value;
        break;
      }
    }
  }
  
  // 見つからなかった場合はデフォルト（先頭3文字）
  if (!code) {
    const words = serviceName.split(/\s+/);
    if (words.length === 1) {
      code = words[0].substring(0, 3).toUpperCase();
    } else {
      const initials = words.map(word => word[0]).join('');
      code = initials.substring(0, 3).toUpperCase();
    }
  }
  
  // 背景色を取得
  const bgColor = BRAND_COLORS[code] || generateColorFromText(code);
  
  return (
    <div 
      className={`flex items-center justify-center font-bold text-white rounded-lg ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {code}
    </div>
  );
}

// テキストから色を生成
function generateColorFromText(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 40%)`;
}