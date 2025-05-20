import React from 'react';

// サービス名とロゴ画像のクラス名の対応
const serviceLogoClasses: Record<string, string> = {
  // OpenAI / ChatGPT
  'ChatGPT': 'bg-[#00A67E] text-white',
  'ChatGPT Plus': 'bg-[#00A67E] text-white',
  'ChatGPT Pro': 'bg-[#00A67E] text-white',
  'ChatGPT Team': 'bg-[#00A67E] text-white',
  'ChatGPT Enterprise': 'bg-[#00A67E] text-white',
  'ChatGPT Free': 'bg-[#00A67E] text-white',
  'OpenAI': 'bg-[#00A67E] text-white',
  
  // Google Gemini
  'Gemini': 'bg-gradient-to-r from-purple-500 to-blue-500 text-white',
  'Gemini Advanced': 'bg-gradient-to-r from-purple-500 to-blue-500 text-white',
  'Gemini Business': 'bg-gradient-to-r from-purple-500 to-blue-500 text-white',
  'Gemini Enterprise': 'bg-gradient-to-r from-purple-500 to-blue-500 text-white',
  'Gemini Free': 'bg-gradient-to-r from-purple-500 to-blue-500 text-white',
  'Google': 'bg-[#4285F4] text-white',
  
  // Anthropic Claude
  'Claude': 'bg-[#EF764E] text-white',
  'Claude Free': 'bg-[#EF764E] text-white',
  'Claude Pro': 'bg-[#EF764E] text-white',
  'Claude Team': 'bg-[#EF764E] text-white',
  'Claude Business': 'bg-[#EF764E] text-white',
  'Claude Enterprise': 'bg-[#EF764E] text-white',
  'Anthropic': 'bg-[#EF764E] text-white',
  
  // Notion
  'Notion': 'bg-black text-white',
  'Notion AI': 'bg-black text-white',
  'Notion AI Personal': 'bg-black text-white',
  'Notion AI Plus': 'bg-black text-white',
  'Notion AI Business': 'bg-black text-white',
  
  // GitHub Copilot
  'GitHub': 'bg-[#24292E] text-white',
  'GitHub Copilot': 'bg-[#24292E] text-white',
  'GitHub Copilot Individual': 'bg-[#24292E] text-white',
  'GitHub Copilot Business': 'bg-[#24292E] text-white',
  'GitHub Copilot Enterprise': 'bg-[#24292E] text-white',
  
  // Replit
  'Replit': 'bg-[#F26207] text-white',
  'Replit Core': 'bg-[#F26207] text-white',
  'Replit Pro': 'bg-[#F26207] text-white',
  'Replit Free': 'bg-[#F26207] text-white',
  'Replit Teams for Education': 'bg-[#F26207] text-white',
  'Replit Teams Pro': 'bg-[#F26207] text-white',
  
  // Genspark
  'Genspark': 'bg-black text-white',
  'Genspark AI': 'bg-black text-white',
  'Genspark Basic': 'bg-black text-white',
  'Genspark Plus': 'bg-black text-white',
  'Genspark Pro': 'bg-black text-white',
  'Genspark Business': 'bg-black text-white',
  'Genspark Enterprise': 'bg-black text-white',
  
  // Midjourney
  'Midjourney': 'bg-black text-white',
  'Midjourney Basic': 'bg-black text-white',
  'Midjourney Standard': 'bg-black text-white',
  'Midjourney Pro': 'bg-black text-white',
  'Midjourney Mega': 'bg-black text-white',
  
  // Microsoft
  'Microsoft': 'bg-[#00A4EF] text-white',
  'Microsoft Copilot': 'bg-[#00A4EF] text-white',
  'Microsoft Copilot Free': 'bg-[#00A4EF] text-white',
  'Microsoft Copilot Pro': 'bg-[#00A4EF] text-white',
  'Microsoft Copilot for Business': 'bg-[#00A4EF] text-white',
  'Microsoft Copilot for M365': 'bg-[#00A4EF] text-white',
};

// サービス名のイニシャルを取得
function getServiceInitials(serviceName: string): string {
  // サービス名の単語を分割
  const words = serviceName.split(/\s+/);
  
  // 最初の単語、または最初と2番目の単語のイニシャルを取得
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  } else if (words[0].toLowerCase() === 'chatgpt') {
    return 'GPT';
  } else if (words[0].toLowerCase() === 'claude') {
    return 'C';
  } else if (words[0].toLowerCase() === 'gemini') {
    return 'G';
  } else if (words[0].toLowerCase() === 'notion') {
    return 'N';
  } else if (words[0].toLowerCase() === 'github') {
    return 'GH';
  } else if (words[0].toLowerCase() === 'replit') {
    return 'R';
  } else if (words[0].toLowerCase() === 'microsoft') {
    return 'MS';
  } else if (words[0].toLowerCase() === 'genspark') {
    return 'GS';
  } else if (words[0].toLowerCase() === 'midjourney') {
    return 'MJ';
  } else {
    return words[0].charAt(0).toUpperCase() + (words[1] ? words[1].charAt(0).toUpperCase() : '');
  }
}

// デフォルトの色パレット
const defaultColors = [
  'bg-primary text-white',
  'bg-secondary text-white',
  'bg-emerald-500 text-white',
  'bg-amber-500 text-white',
  'bg-rose-500 text-white',
  'bg-indigo-500 text-white'
];

interface ServiceLogoImageProps {
  serviceName: string;
  className?: string;
}

export function ServiceLogoImage({ serviceName, className = '' }: ServiceLogoImageProps) {
  // まず正確なサービス名でロゴクラスを検索
  let logoClass = serviceLogoClasses[serviceName];
  
  // 正確な名前で見つからない場合は、サービス名の一部を含むものを検索
  if (!logoClass) {
    // サービス名をキーワードに分解
    const keywords = serviceName.toLowerCase().split(/[\s-]/);
    
    // サービス名の一部を含むキーを検索
    for (const key of Object.keys(serviceLogoClasses)) {
      const keyLower = key.toLowerCase();
      if (keywords.some(keyword => keyLower.includes(keyword) && keyword.length > 3)) {
        logoClass = serviceLogoClasses[key];
        break;
      }
    }
  }
  
  // 会社名も抽出してみる
  if (!logoClass && serviceName.includes(' - ')) {
    const companyPart = serviceName.split(' - ')[0].trim();
    for (const key of Object.keys(serviceLogoClasses)) {
      if (key.startsWith(companyPart)) {
        logoClass = serviceLogoClasses[key];
        break;
      }
    }
  }
  
  if (logoClass) {
    return (
      <div className={`${logoClass} rounded-lg flex items-center justify-center font-bold ${className}`}>
        {getServiceInitials(serviceName)}
      </div>
    );
  }
  
  // ロゴクラスが見つからない場合はフォールバック
  const firstLetter = serviceName.charAt(0).toUpperCase();
  const colorIndex = serviceName.charCodeAt(0) % defaultColors.length;
  const bgColorClass = defaultColors[colorIndex];
  
  return (
    <div className={`${bgColorClass} rounded-lg flex items-center justify-center font-bold ${className}`}>
      {firstLetter}
    </div>
  );
}