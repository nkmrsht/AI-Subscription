import React from 'react';

// サービスブランドカラー
const brandColors: Record<string, string> = {
  // OpenAI / ChatGPT
  'ChatGPT': '#00A67E',
  'OpenAI': '#00A67E',
  
  // Google Gemini
  'Gemini': '#8E44AD',
  'Google': '#4285F4',
  
  // Anthropic Claude
  'Claude': '#EF764E',
  'Anthropic': '#8A3FFC',
  
  // Notion
  'Notion': '#000000',
  
  // GitHub Copilot
  'GitHub': '#24292E',
  
  // Microsoft
  'Microsoft': '#00A4EF',
  
  // Replit
  'Replit': '#F26207',
  
  // Midjourney
  'Midjourney': '#000000',
  
  // Perplexity
  'Perplexity': '#2563EB',
  
  // Stability AI
  'Stability': '#2D333B',
  
  // Genspark
  'Genspark': '#FF6B00',
};

// サービス名から表示するイニシャルを取得
function getServiceInitials(serviceName: string): string {
  // 会社名とサービス名が分かれている場合は分割
  if (serviceName.includes(' - ')) {
    const parts = serviceName.split(' - ');
    serviceName = parts[0].trim(); // 会社名を使用
  }

  const words = serviceName.split(/\s+/);
  
  // 特定のサービスは専用の短縮形を使用
  const nameMap: Record<string, string> = {
    'ChatGPT': 'GPT',
    'Claude': 'C',
    'Gemini': 'G',
    'Notion': 'N',
    'GitHub': 'GH',
    'Replit': 'R',
    'Microsoft': 'MS'
  };
  
  const serviceLower = serviceName.toLowerCase();
  for (const [key, value] of Object.entries(nameMap)) {
    if (serviceLower.includes(key.toLowerCase())) {
      return value;
    }
  }
  
  // それ以外の場合は最初の1-2文字を使用
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  } else {
    return (words[0][0] + (words[1] ? words[1][0] : '')).toUpperCase();
  }
}

// サービス名からブランドカラーを取得
function getBrandColor(serviceName: string): string {
  const serviceLower = serviceName.toLowerCase();
  
  for (const [key, color] of Object.entries(brandColors)) {
    if (serviceLower.includes(key.toLowerCase())) {
      return color;
    }
  }
  
  // ブランドカラーが見つからない場合はハッシュ値から生成
  const hash = serviceName.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  const h = Math.abs(hash) % 360;
  return `hsl(${h}, 70%, 50%)`;
}

interface ServiceLogoProps {
  serviceName: string;
  className?: string;
}

export function ServiceLogo({ serviceName, className = '' }: ServiceLogoProps) {
  const initials = getServiceInitials(serviceName);
  const bgColor = getBrandColor(serviceName);
  
  return (
    <div 
      className={`rounded-lg flex items-center justify-center font-bold ${className}`}
      style={{ backgroundColor: bgColor, color: 'white' }}
    >
      {initials}
    </div>
  );
}