import React from 'react';

// サービス名と表示するロゴテキストのマッピング
const serviceLogoTexts: Record<string, string> = {
  // OpenAI / ChatGPT
  'ChatGPT': 'GPT',
  'ChatGPT Plus': 'GPT',
  'ChatGPT Pro': 'GPT',
  'ChatGPT Team': 'GPT',
  'ChatGPT Enterprise': 'GPT',
  'ChatGPT Free': 'GPT',
  'OpenAI': 'GPT',
  'OpenAI API': 'GPT',
  
  // Claude
  'Claude': 'CLD',
  'Claude Free': 'CLD',
  'Claude Pro': 'CLD',
  'Claude Team': 'CLD',
  'Claude Business': 'CLD',
  'Claude Enterprise': 'CLD',
  'Anthropic': 'CLD',
  
  // Gemini
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
  
  // Replit
  'Replit': 'REP',
  'Replit Core': 'REP',
  'Replit Pro': 'REP',
  'Replit Free': 'REP',
  'Replit Teams for Education': 'REP',
  'Replit Teams Pro': 'REP',
  
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
  'Genspark Enterprise': 'GEN',
};

// サービス名とブランドカラーのマッピング
const serviceBrandColors: Record<string, string> = {
  // OpenAI / ChatGPT - 緑
  'GPT': '#00A67E',
  
  // Claude - オレンジ
  'CLD': '#EF764E',
  
  // Gemini - 紫/青
  'GEM': '#8E44AD',
  
  // Notion - 黒
  'NOT': '#000000',
  
  // GitHub - ダークグレー
  'GIT': '#24292E',
  
  // Microsoft - 青
  'MS': '#00A4EF',
  
  // Replit - オレンジ
  'REP': '#F26207',
  
  // Midjourney - 黒
  'MID': '#000000',
  
  // Perplexity - 青
  'PPX': '#2563EB',
  
  // Stability AI - ダークグレー
  'STB': '#2D333B',
  
  // Genspark - オレンジ
  'GEN': '#FF6B00',
};

// サービス名からロゴテキストを取得
function getServiceLogoText(serviceName: string): string {
  // 完全一致を確認
  if (serviceLogoTexts[serviceName]) {
    return serviceLogoTexts[serviceName];
  }
  
  // 部分一致を確認（前方一致優先）
  const serviceLower = serviceName.toLowerCase();
  let bestMatch = '';
  
  // 前方一致を探す
  for (const key of Object.keys(serviceLogoTexts)) {
    const keyLower = key.toLowerCase();
    if (serviceLower.startsWith(keyLower) && (!bestMatch || keyLower.length > bestMatch.length)) {
      bestMatch = key;
    }
  }
  
  // 前方一致がなければ部分一致を探す
  if (!bestMatch) {
    for (const key of Object.keys(serviceLogoTexts)) {
      const keyLower = key.toLowerCase();
      if (serviceLower.includes(keyLower) && (!bestMatch || keyLower.length > bestMatch.length)) {
        bestMatch = key;
      }
    }
  }
  
  if (bestMatch) {
    return serviceLogoTexts[bestMatch];
  }
  
  // どちらも見つからない場合はデフォルトを生成
  const words = serviceName.split(/\s+/);
  if (words.length === 1) {
    return words[0].substring(0, 3).toUpperCase();
  } else {
    const acronym = words.map(word => word[0]).join('').toUpperCase();
    return acronym.substring(0, 3);
  }
}

// ロゴテキストから背景色を取得
function getLogoBackgroundColor(logoText: string): string {
  return serviceBrandColors[logoText] || generateColorFromText(logoText);
}

// テキストからカラーを生成
function generateColorFromText(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 40%)`;
}

interface ServiceLogoProps {
  serviceName: string;
  className?: string;
}

export function ServiceLogoV2({ serviceName, className = '' }: ServiceLogoProps) {
  const logoText = getServiceLogoText(serviceName);
  const bgColor = getLogoBackgroundColor(logoText);
  
  return (
    <div 
      className={`flex items-center justify-center font-bold text-white rounded-lg ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {logoText}
    </div>
  );
}