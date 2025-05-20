import React from 'react';
import {
  FaCode,
  FaBrain,
  FaRobot,
  FaImage,
  FaBook,
  FaSearch,
  FaStar,
  FaRocket,
  FaServer,
  FaFileCode,
  FaPalette,
  FaGift,
  FaSitemap,
  FaCloudDownloadAlt
} from 'react-icons/fa';

// 各サービスの最新ロゴを使用
const serviceIconMap: Record<string, React.ReactNode> = {
  // OpenAI
  'ChatGPT': <FaRobot className="w-full h-full p-1 text-[#00A67E]" />,
  'ChatGPT Plus': <FaRobot className="w-full h-full p-1 text-[#00A67E]" />,
  'ChatGPT Pro': <FaRobot className="w-full h-full p-1 text-[#00A67E]" />,
  'ChatGPT Team': <FaRobot className="w-full h-full p-1 text-[#00A67E]" />,
  'ChatGPT Enterprise': <FaRobot className="w-full h-full p-1 text-[#00A67E]" />,
  'ChatGPT Free': <FaRobot className="w-full h-full p-1 text-[#00A67E]" />,
  'OpenAI': <FaRobot className="w-full h-full p-1 text-[#00A67E]" />,
  'OpenAI API': <FaRobot className="w-full h-full p-1 text-[#00A67E]" />,
  'OpenAI API Pro': <FaRobot className="w-full h-full p-1 text-[#00A67E]" />,
  'OpenAI API Team': <FaRobot className="w-full h-full p-1 text-[#00A67E]" />,
  
  // Google Gemini
  'Gemini': <FaGift className="w-full h-full p-1 text-[#4285F4]" />,
  'Gemini Advanced': <FaGift className="w-full h-full p-1 text-[#4285F4]" />,
  'Gemini Business': <FaGift className="w-full h-full p-1 text-[#4285F4]" />,
  'Gemini Enterprise': <FaGift className="w-full h-full p-1 text-[#4285F4]" />,
  'Gemini Free': <FaGift className="w-full h-full p-1 text-[#4285F4]" />,
  'Google': <FaGift className="w-full h-full p-1 text-[#4285F4]" />,
  
  // Anthropic Claude
  'Claude': <FaRobot className="w-full h-full p-1 text-[#8A3FFC]" />,
  'Claude Free': <FaRobot className="w-full h-full p-1 text-[#8A3FFC]" />,
  'Claude Pro': <FaRobot className="w-full h-full p-1 text-[#8A3FFC]" />,
  'Claude Team': <FaRobot className="w-full h-full p-1 text-[#8A3FFC]" />,
  'Claude Business': <FaRobot className="w-full h-full p-1 text-[#8A3FFC]" />,
  'Claude Enterprise': <FaRobot className="w-full h-full p-1 text-[#8A3FFC]" />,
  'Anthropic': <FaRobot className="w-full h-full p-1 text-[#8A3FFC]" />,
  
  // Notion
  'Notion': <FaBook className="w-full h-full p-1 text-black" />,
  'Notion AI': <FaBook className="w-full h-full p-1 text-black" />,
  'Notion AI Personal': <FaBook className="w-full h-full p-1 text-black" />,
  'Notion AI Plus': <FaBook className="w-full h-full p-1 text-black" />,
  'Notion AI Business': <FaBook className="w-full h-full p-1 text-black" />,
  
  // GitHub Copilot
  'GitHub': <FaCode className="w-full h-full p-1 text-[#24292e]" />,
  'GitHub Copilot': <FaCode className="w-full h-full p-1 text-[#24292e]" />,
  'GitHub Copilot Individual': <FaCode className="w-full h-full p-1 text-[#24292e]" />,
  'GitHub Copilot Business': <FaCode className="w-full h-full p-1 text-[#24292e]" />,
  'GitHub Copilot Enterprise': <FaCode className="w-full h-full p-1 text-[#24292e]" />,
  
  // Adobe
  'Adobe': <FaPalette className="w-full h-full p-1 text-[#FF0000]" />,
  'Adobe Firefly': <FaPalette className="w-full h-full p-1 text-[#FF0000]" />,
  'Adobe Firefly Single App': <FaPalette className="w-full h-full p-1 text-[#FF0000]" />,
  'Adobe Firefly (Creative Cloud)': <FaPalette className="w-full h-full p-1 text-[#FF0000]" />,
  'Adobe Express Premium': <FaPalette className="w-full h-full p-1 text-[#FF0000]" />,
  
  // Midjourney
  'Midjourney': <FaImage className="w-full h-full p-1 text-[#000000]" />,
  'Midjourney Basic': <FaImage className="w-full h-full p-1 text-[#000000]" />,
  'Midjourney Standard': <FaImage className="w-full h-full p-1 text-[#000000]" />,
  'Midjourney Pro': <FaImage className="w-full h-full p-1 text-[#000000]" />,
  'Midjourney Mega': <FaImage className="w-full h-full p-1 text-[#000000]" />,
  
  // Perplexity
  'Perplexity': <FaSearch className="w-full h-full p-1 text-[#2563EB]" />,
  'Perplexity Pro': <FaSearch className="w-full h-full p-1 text-[#2563EB]" />,
  'Perplexity Pro+': <FaSearch className="w-full h-full p-1 text-[#2563EB]" />,
  'Perplexity Business': <FaSearch className="w-full h-full p-1 text-[#2563EB]" />,
  
  // Replit
  'Replit': <FaFileCode className="w-full h-full p-1 text-[#F26207]" />,
  'Replit Core': <FaFileCode className="w-full h-full p-1 text-[#F26207]" />,
  'Replit Pro': <FaFileCode className="w-full h-full p-1 text-[#F26207]" />,
  'Replit Free': <FaFileCode className="w-full h-full p-1 text-[#F26207]" />,
  'Replit Teams for Education': <FaFileCode className="w-full h-full p-1 text-[#F26207]" />,
  'Replit Teams Pro': <FaFileCode className="w-full h-full p-1 text-[#F26207]" />,
  
  // Microsoft Copilot
  'Microsoft': <FaServer className="w-full h-full p-1 text-[#00A4EF]" />,
  'Microsoft Copilot': <FaServer className="w-full h-full p-1 text-[#00A4EF]" />,
  'Microsoft Copilot Free': <FaServer className="w-full h-full p-1 text-[#00A4EF]" />,
  'Microsoft Copilot Pro': <FaServer className="w-full h-full p-1 text-[#00A4EF]" />,
  'Microsoft Copilot for Business': <FaServer className="w-full h-full p-1 text-[#00A4EF]" />,
  'Microsoft Copilot for M365': <FaServer className="w-full h-full p-1 text-[#00A4EF]" />,
  
  // Stability AI
  'Stability AI': <FaStar className="w-full h-full p-1 text-[#2D333B]" />,
  'Stability Core Membership': <FaStar className="w-full h-full p-1 text-[#2D333B]" />,
  'Stability Pro Membership': <FaStar className="w-full h-full p-1 text-[#2D333B]" />,
  'Stability API Standard': <FaStar className="w-full h-full p-1 text-[#2D333B]" />,
  
  // RunwayML
  'Runway': <FaRocket className="w-full h-full p-1 text-[#9146FF]" />,
  'RunwayML': <FaRocket className="w-full h-full p-1 text-[#9146FF]" />,
  'Runway Standard': <FaRocket className="w-full h-full p-1 text-[#9146FF]" />,
  'Runway Pro': <FaRocket className="w-full h-full p-1 text-[#9146FF]" />,
  'Runway Unlimited': <FaRocket className="w-full h-full p-1 text-[#9146FF]" />,
  
  // Leonardo.ai
  'Leonardo': <FaPalette className="w-full h-full p-1 text-[#6F4FF0]" />,
  'Leonardo AI': <FaPalette className="w-full h-full p-1 text-[#6F4FF0]" />,
  'Leonardo Premium': <FaPalette className="w-full h-full p-1 text-[#6F4FF0]" />,
  'Leonardo Pro': <FaPalette className="w-full h-full p-1 text-[#6F4FF0]" />,
  'Leonardo Enterprise': <FaPalette className="w-full h-full p-1 text-[#6F4FF0]" />,
  
  // Genspark
  'Genspark': <FaBrain className="w-full h-full p-1 text-[#FF6B00]" />,
  'Genspark AI': <FaBrain className="w-full h-full p-1 text-[#FF6B00]" />,
  'Genspark Basic': <FaBrain className="w-full h-full p-1 text-[#FF6B00]" />,
  'Genspark Plus': <FaBrain className="w-full h-full p-1 text-[#FF6B00]" />,
  'Genspark Pro': <FaBrain className="w-full h-full p-1 text-[#FF6B00]" />,
  'Genspark Business': <FaBrain className="w-full h-full p-1 text-[#FF6B00]" />,
  'Genspark Enterprise': <FaBrain className="w-full h-full p-1 text-[#FF6B00]" />
};

// A default color palette for services without specific colors
const defaultColors = [
  'bg-primary text-white',
  'bg-secondary text-white',
  'bg-emerald-500 text-white',
  'bg-amber-500 text-white',
  'bg-rose-500 text-white',
  'bg-indigo-500 text-white'
];

interface ServiceIconProps {
  serviceName: string;
  className?: string;
}

export function ServiceIcon({ serviceName, className = '' }: ServiceIconProps) {
  // まず正確なサービス名でアイコンを検索
  let icon = serviceIconMap[serviceName];
  
  // 正確な名前で見つからない場合は、サービス名の一部を含むものを検索
  if (!icon) {
    // サービス名をキーワードに分解
    const keywords = serviceName.toLowerCase().split(/[\s-]/);
    
    // サービス名の一部を含むキーを検索
    for (const key of Object.keys(serviceIconMap)) {
      const keyLower = key.toLowerCase();
      if (keywords.some(keyword => keyLower.includes(keyword) && keyword.length > 3)) {
        icon = serviceIconMap[key];
        break;
      }
    }
  }
  
  // 会社名も抽出してみる
  if (!icon && serviceName.includes(' - ')) {
    const companyPart = serviceName.split(' - ')[0].trim();
    for (const key of Object.keys(serviceIconMap)) {
      if (key.startsWith(companyPart)) {
        icon = serviceIconMap[key];
        break;
      }
    }
  }
  
  if (icon) {
    return (
      <div className={`bg-white rounded-lg overflow-hidden flex items-center justify-center ${className}`}>
        {icon}
      </div>
    );
  }
  
  // アイコンが見つからない場合はフォールバック
  const firstLetter = serviceName.charAt(0).toUpperCase();
  const colorIndex = serviceName.charCodeAt(0) % defaultColors.length;
  const bgColorClass = defaultColors[colorIndex];
  
  return (
    <div className={`${bgColorClass} rounded-lg flex items-center justify-center font-bold ${className}`}>
      {firstLetter}
    </div>
  );
}
