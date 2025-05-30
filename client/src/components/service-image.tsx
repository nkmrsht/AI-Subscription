import React from 'react';

// サービス名とロゴ画像のパスのマッピング
const serviceLogoMap: Record<string, string> = {
  // OpenAI / ChatGPT - OpenAI関連のすべてのサービス
  'ChatGPT': '/assets/logos/openai-logo.png',
  'ChatGPT Plus': '/assets/logos/openai-logo.png', 
  'ChatGPT Pro': '/assets/logos/openai-logo.png',
  'ChatGPT Team': '/assets/logos/openai-logo.png',
  'ChatGPT Enterprise': '/assets/logos/openai-logo.png',
  'ChatGPT Free': '/assets/logos/openai-logo.png',
  'OpenAI': '/assets/logos/openai-logo.png',
  'OpenAI API': '/assets/logos/openai-logo.png',
  
  // Google / Gemini - Google関連のすべてのサービス
  'Gemini': '/assets/logos/gemini-logo.png',
  'Gemini Advanced': '/assets/logos/gemini-logo.png',
  'Gemini Business': '/assets/logos/gemini-logo.png',
  'Gemini Enterprise': '/assets/logos/gemini-logo.png',
  'Gemini Free': '/assets/logos/gemini-logo.png',
  'Google': '/assets/logos/gemini-logo.png',
  
  // Anthropic / Claude - Claude関連のすべてのサービス
  'Claude': '/assets/logos/claude-logo.png',
  'Claude Free': '/assets/logos/claude-logo.png',
  'Claude Pro': '/assets/logos/claude-logo.png',
  'Claude Team': '/assets/logos/claude-logo.png',
  'Claude Business': '/assets/logos/claude-logo.png',
  'Claude Enterprise': '/assets/logos/claude-logo.png',
  'Anthropic': '/assets/logos/claude-logo.png',
  
  // Notion - Notion関連のすべてのサービス
  'Notion': '/assets/logos/notion-logo.png',
  'Notion AI': '/assets/logos/notion-logo.png',
  'Notion AI Personal': '/assets/logos/notion-logo.png',
  'Notion Personal Pro': '/assets/logos/notion-logo.png',
  'Notion Team': '/assets/logos/notion-logo.png',
  'Notion Business': '/assets/logos/notion-logo.png',
  
  // Replit - Replit関連のすべてのサービス
  'Replit': '/assets/logos/replit-logo.png',
  'Replit Core': '/assets/logos/replit-logo.png',
  'Replit Pro': '/assets/logos/replit-logo.png',
  'Replit Free': '/assets/logos/replit-logo.png',
  'Replit Teams for Education': '/assets/logos/replit-logo.png',
  'Replit Teams Pro': '/assets/logos/replit-logo.png',
};

// サービス名からブランドカラーを取得
function getBrandColor(serviceName: string): string {
  const brandColors: Record<string, string> = {
    'ChatGPT': '#00A67E',
    'OpenAI': '#00A67E',
    'Gemini': '#8E44AD',
    'Google': '#4285F4',
    'Claude': '#EF764E',
    'Anthropic': '#8A3FFC',
    'Notion': '#000000',
    'Replit': '#F26207',
    'GitHub': '#24292E',
    'Microsoft': '#00A4EF',
    'Midjourney': '#000000',
    'Perplexity': '#2563EB',
    'Genspark': '#FF6B00',
  };

  const serviceLower = serviceName.toLowerCase();
  
  for (const [key, color] of Object.entries(brandColors)) {
    if (serviceLower.includes(key.toLowerCase())) {
      return color;
    }
  }
  
  // デフォルトカラー
  return '#6B7280';
}

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
    'Genspark': 'GEN',
    'Stability': 'STB',
    'Perplexity': 'PPX'
  };
  
  const serviceLower = serviceName.toLowerCase();
  for (const [key, value] of Object.entries(nameMap)) {
    if (serviceLower.includes(key.toLowerCase())) {
      return value;
    }
  }
  
  // それ以外の場合は最初の2-3文字を使用
  if (words.length === 1) {
    // 1つの単語なら最初の3文字
    return words[0].substring(0, 3).toUpperCase();
  } else {
    // 複数の単語なら最初の単語から2文字
    return words[0].substring(0, 2).toUpperCase();
  }
}

interface ServiceImageProps {
  serviceName: string;
  className?: string;
}

export function ServiceImage({ serviceName, className = '' }: ServiceImageProps) {
  // サービス名に一致するロゴを探す
  let logoPath = '';
  const serviceNameLower = serviceName.toLowerCase();
  
  // 完全一致を探す
  if (serviceLogoMap[serviceName]) {
    logoPath = serviceLogoMap[serviceName];
  } else {
    // 部分一致を探す
    for (const [key, path] of Object.entries(serviceLogoMap)) {
      if (serviceNameLower.includes(key.toLowerCase())) {
        logoPath = path;
        break;
      }
    }
  }
  
  // ロゴ画像がある場合はそれを表示
  if (logoPath) {
    return (
      <div className={`bg-white rounded-lg flex items-center justify-center overflow-hidden ${className}`}>
        <img 
          src={logoPath} 
          alt={`${serviceName} logo`} 
          className="w-full h-full object-contain p-1"
        />
      </div>
    );
  }
  
  // ロゴ画像がない場合はイニシャルでフォールバック
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