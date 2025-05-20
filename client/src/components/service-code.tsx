import React from 'react';

// サービス名とその表示コードのマッピング
const SERVICE_CODES: Record<string, string> = {
  // OpenAI / ChatGPT
  'ChatGPT': 'GPT',
  'ChatGPT Plus': 'GPT',
  'ChatGPT Pro': 'GPT',
  'ChatGPT Team': 'GPT',
  'ChatGPT Enterprise': 'GPT',
  'ChatGPT Free': 'GPT',
  'OpenAI': 'GPT',
  'OpenAI API': 'GPT',
  
  // Claude / Anthropic
  'Claude': 'CLD',
  'Claude Free': 'CLD',
  'Claude Pro': 'CLD',
  'Claude Team': 'CLD',
  'Claude Business': 'CLD',
  'Claude Enterprise': 'CLD',
  'Anthropic': 'CLD',
  
  // Gemini / Google
  'Gemini': 'GEM',
  'Gemini Advanced': 'GEM',
  'Gemini Business': 'GEM',
  'Gemini Enterprise': 'GEM',
  'Gemini Free': 'GEM',
  'Google': 'GEM',
  
  // Notion
  'Notion': 'NOT',
  'Notion AI': 'NOT',
  'Personal Pro (+ Notion AI)': 'NOT',
  'Team (+ Notion AI)': 'NOT',
  'Business (+ Notion AI)': 'NOT',
  
  // Replit
  'Replit': 'REP',
  'Replit Core': 'REP',
  'Replit Pro': 'REP',
  'Replit Free': 'REP',
  'Replit Teams for Education': 'REP',
  'Replit Teams Pro': 'REP',
  
  // GitHub
  'GitHub': 'GIT',
  'GitHub Copilot': 'GIT',
  'GitHub Copilot Individual': 'GIT',
  'GitHub Copilot Business': 'GIT',
  'GitHub Copilot Enterprise': 'GIT',
  
  // Microsoft
  'Microsoft': 'MS',
  'Microsoft Copilot': 'MS',
  'Microsoft Copilot Free': 'MS',
  'Microsoft Copilot Pro': 'MS',
  'Microsoft Copilot for Business': 'MS',
  'Microsoft Copilot for M365': 'MS',
  
  // Midjourney
  'Midjourney': 'MID',
  'Midjourney Basic': 'MID',
  'Midjourney Standard': 'MID',
  'Midjourney Pro': 'MID',
  'Midjourney Mega': 'MID',
  
  // Perplexity
  'Perplexity': 'PPX',
  'Perplexity Pro': 'PPX',
  'Perplexity Pro+': 'PPX',
  'Perplexity Business': 'PPX',
  
  // Stability AI
  'Stability AI': 'STB',
  'Stability Core Membership': 'STB',
  'Stability Pro Membership': 'STB',
  'Stability API Standard': 'STB',
  
  // Genspark
  'Genspark': 'GEN',
  'Genspark AI': 'GEN',
  'Genspark Basic': 'GEN',
  'Genspark Plus': 'GEN',
  'Genspark Pro': 'GEN',
  'Genspark Business': 'GEN',
  'Genspark Enterprise': 'GEN'
};

// サービスコードとブランドカラーのマッピング
const BRAND_COLORS: Record<string, string> = {
  'GPT': '#00A67E',  // OpenAI/ChatGPT - グリーン
  'CLD': '#EF764E',  // Claude - オレンジ
  'GEM': '#8E44AD',  // Gemini - パープル
  'NOT': '#000000',  // Notion - ブラック
  'GIT': '#24292E',  // GitHub - ダークグレー
  'MS': '#00A4EF',   // Microsoft - ブルー
  'REP': '#F26207',  // Replit - オレンジ
  'MID': '#000000',  // Midjourney - ブラック
  'PPX': '#2563EB',  // Perplexity - ブルー
  'STB': '#2D333B',  // Stability AI - ダークグレー
  'GEN': '#FF6B00'   // Genspark - オレンジ
};

interface ServiceCodeProps {
  serviceName: string;
  className?: string;
}

export function ServiceCode({ serviceName, className = '' }: ServiceCodeProps) {
  // サービスコードを取得
  let code = '';
  
  // 完全一致を確認
  if (SERVICE_CODES[serviceName]) {
    code = SERVICE_CODES[serviceName];
  } else {
    // 部分一致を確認
    const serviceNameLower = serviceName.toLowerCase();
    for (const [key, value] of Object.entries(SERVICE_CODES)) {
      if (serviceNameLower.includes(key.toLowerCase())) {
        code = value;
        break;
      }
    }
    
    // 見つからなかった場合はデフォルト（先頭3文字）
    if (!code) {
      const words = serviceName.split(/\s+/);
      if (words.length === 1) {
        code = words[0].substring(0, 3).toUpperCase();
      } else {
        code = words.map(word => word.charAt(0)).join('').substring(0, 3).toUpperCase();
      }
    }
  }
  
  // ブランドカラーを取得
  let bgColor = BRAND_COLORS[code] || '#6B7280';
  
  return (
    <div 
      className={`flex items-center justify-center font-bold text-white rounded-lg ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {code}
    </div>
  );
}