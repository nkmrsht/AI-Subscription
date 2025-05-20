import React from 'react';

// PNGロゴのインポート
import openaiLogo from '../assets/logos/openai-logo.png';
import notionLogo from '../assets/logos/notion-logo.png';
import geminiLogo from '../assets/logos/gemini-logo.png';
import claudeLogo from '../assets/logos/claude-logo.png';
import replitLogo from '../assets/logos/replit-logo.png';

// サービス名と対応するロゴのマッピング
const serviceLogoMap: Record<string, string> = {
  // OpenAI
  'ChatGPT': openaiLogo,
  'ChatGPT Plus': openaiLogo,
  'ChatGPT Pro': openaiLogo,
  'ChatGPT Team': openaiLogo,
  'ChatGPT Enterprise': openaiLogo,
  'ChatGPT Free': openaiLogo,
  'OpenAI': openaiLogo,
  'OpenAI API': openaiLogo,
  'OpenAI API Pro': openaiLogo,
  'OpenAI API Team': openaiLogo,
  
  // Google Gemini
  'Gemini': geminiLogo,
  'Gemini Advanced': geminiLogo,
  'Gemini Business': geminiLogo,
  'Gemini Enterprise': geminiLogo,
  'Gemini Free': geminiLogo,
  'Google': geminiLogo,
  
  // Anthropic Claude
  'Claude': claudeLogo,
  'Claude Free': claudeLogo,
  'Claude Pro': claudeLogo,
  'Claude Team': claudeLogo,
  'Claude Business': claudeLogo,
  'Claude Enterprise': claudeLogo,
  'Anthropic': claudeLogo,
  
  // Notion
  'Notion': notionLogo,
  'Notion AI': notionLogo,
  'Notion AI Personal': notionLogo,
  'Notion AI Plus': notionLogo,
  'Notion AI Business': notionLogo,
  
  // Replit
  'Replit': replitLogo,
  'Replit Core': replitLogo,
  'Replit Pro': replitLogo,
  'Replit Free': replitLogo,
  'Replit Teams for Education': replitLogo,
  'Replit Teams Pro': replitLogo
};

// デフォルトの色パレット
const defaultColors = [
  'bg-primary text-white',
  'bg-secondary text-white',
  'bg-emerald-500 text-white',
  'bg-amber-500 text-white',
  'bg-rose-500 text-white',
  'bg-indigo-500 text-white'
];

interface ServiceLogoProps {
  serviceName: string;
  className?: string;
}

export function ServiceLogo({ serviceName, className = '' }: ServiceLogoProps) {
  // まず正確なサービス名でロゴを検索
  let logoSrc = serviceLogoMap[serviceName];
  
  // 正確な名前で見つからない場合は、サービス名の一部を含むものを検索
  if (!logoSrc) {
    // サービス名をキーワードに分解
    const keywords = serviceName.toLowerCase().split(/[\s-]/);
    
    // サービス名の一部を含むキーを検索
    for (const key of Object.keys(serviceLogoMap)) {
      const keyLower = key.toLowerCase();
      if (keywords.some(keyword => keyLower.includes(keyword) && keyword.length > 3)) {
        logoSrc = serviceLogoMap[key];
        break;
      }
    }
  }
  
  // 会社名も抽出してみる
  if (!logoSrc && serviceName.includes(' - ')) {
    const companyPart = serviceName.split(' - ')[0].trim();
    for (const key of Object.keys(serviceLogoMap)) {
      if (key.startsWith(companyPart)) {
        logoSrc = serviceLogoMap[key];
        break;
      }
    }
  }
  
  if (logoSrc) {
    return (
      <div className={`bg-white rounded-lg overflow-hidden flex items-center justify-center ${className}`}>
        <img src={logoSrc} alt={`${serviceName} logo`} className="w-full h-full object-contain p-1" />
      </div>
    );
  }
  
  // ロゴが見つからない場合はフォールバック
  const firstLetter = serviceName.charAt(0).toUpperCase();
  const colorIndex = serviceName.charCodeAt(0) % defaultColors.length;
  const bgColorClass = defaultColors[colorIndex];
  
  return (
    <div className={`${bgColorClass} rounded-lg flex items-center justify-center font-bold ${className}`}>
      {firstLetter}
    </div>
  );
}