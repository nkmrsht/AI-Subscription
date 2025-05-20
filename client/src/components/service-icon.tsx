import React from 'react';
import { 
  SiOpenai, 
  SiGoogle, 
  SiGithub, 
  SiNotion, 
  SiAdobe,
  SiReplit
} from 'react-icons/si';
import { 
  Bot, 
  Image, 
  Sparkles, 
  Sun, 
  Zap, 
  Code, 
  Rocket,
  FileCode,
  Palette,
  BrainCircuit
} from 'lucide-react';

// 各サービスの最新ロゴを使用
const serviceIconMap: Record<string, React.ReactNode> = {
  // サービス名によるマッピング
  // OpenAI
  'ChatGPT Plus': <SiOpenai className="w-full h-full p-1 text-[#00A67E]" />,
  'ChatGPT Pro': <SiOpenai className="w-full h-full p-1 text-[#00A67E]" />,
  'ChatGPT Team': <SiOpenai className="w-full h-full p-1 text-[#00A67E]" />,
  'ChatGPT Enterprise': <SiOpenai className="w-full h-full p-1 text-[#00A67E]" />,
  'ChatGPT Free': <SiOpenai className="w-full h-full p-1 text-[#00A67E]" />,
  'OpenAI API Pro': <SiOpenai className="w-full h-full p-1 text-[#00A67E]" />,
  'OpenAI API Team': <SiOpenai className="w-full h-full p-1 text-[#00A67E]" />,
  
  // Google
  'Gemini Advanced': <SiGoogle className="w-full h-full p-1 text-[#4285F4]" />,
  'Gemini Business': <SiGoogle className="w-full h-full p-1 text-[#4285F4]" />,
  'Gemini Enterprise': <SiGoogle className="w-full h-full p-1 text-[#4285F4]" />,
  'Gemini Free': <SiGoogle className="w-full h-full p-1 text-[#4285F4]" />,
  
  // Anthropic
  'Claude Free': <Sparkles className="w-full h-full p-1 text-[#8A3FFC]" />,
  'Claude Pro': <Sparkles className="w-full h-full p-1 text-[#8A3FFC]" />,
  'Claude Team': <Sparkles className="w-full h-full p-1 text-[#8A3FFC]" />,
  'Claude Business': <Sparkles className="w-full h-full p-1 text-[#8A3FFC]" />,
  'Claude Enterprise': <Sparkles className="w-full h-full p-1 text-[#8A3FFC]" />,
  
  // Notion
  'Notion AI Personal': <SiNotion className="w-full h-full p-1 text-black" />,
  'Notion AI Plus': <SiNotion className="w-full h-full p-1 text-black" />,
  'Notion AI Business': <SiNotion className="w-full h-full p-1 text-black" />,
  
  // GitHub
  'GitHub Copilot Individual': <SiGithub className="w-full h-full p-1 text-[#24292e]" />,
  'GitHub Copilot Business': <SiGithub className="w-full h-full p-1 text-[#24292e]" />,
  'GitHub Copilot Enterprise': <SiGithub className="w-full h-full p-1 text-[#24292e]" />,
  
  // Adobe
  'Adobe Firefly Single App': <SiAdobe className="w-full h-full p-1 text-[#FF0000]" />,
  'Adobe Firefly (Creative Cloud)': <SiAdobe className="w-full h-full p-1 text-[#FF0000]" />,
  'Adobe Express Premium': <SiAdobe className="w-full h-full p-1 text-[#FF0000]" />,
  
  // Midjourney
  'Midjourney Basic': <Image className="w-full h-full p-1 text-[#7289DA]" />,
  'Midjourney Standard': <Image className="w-full h-full p-1 text-[#7289DA]" />,
  'Midjourney Pro': <Image className="w-full h-full p-1 text-[#7289DA]" />,
  'Midjourney Mega': <Image className="w-full h-full p-1 text-[#7289DA]" />,
  
  // Perplexity
  'Perplexity Pro': <Bot className="w-full h-full p-1 text-[#2563EB]" />,
  'Perplexity Pro+': <Bot className="w-full h-full p-1 text-[#2563EB]" />,
  'Perplexity Business': <Bot className="w-full h-full p-1 text-[#2563EB]" />,
  
  // Replit
  'Replit Core': <SiReplit className="w-full h-full p-1 text-[#F26207]" />,
  'Replit Pro': <SiReplit className="w-full h-full p-1 text-[#F26207]" />,
  'Replit Free': <SiReplit className="w-full h-full p-1 text-[#F26207]" />,
  'Replit Teams for Education': <SiReplit className="w-full h-full p-1 text-[#F26207]" />,
  'Replit Teams Pro': <SiReplit className="w-full h-full p-1 text-[#F26207]" />,
  
  // Microsoft
  'Microsoft Copilot Free': <Code className="w-full h-full p-1 text-[#00A4EF]" />,
  'Microsoft Copilot Pro': <Code className="w-full h-full p-1 text-[#00A4EF]" />,
  'Microsoft Copilot for Business': <Code className="w-full h-full p-1 text-[#00A4EF]" />,
  'Microsoft Copilot for M365': <Code className="w-full h-full p-1 text-[#00A4EF]" />,
  
  // Stability AI
  'Stability Core Membership': <Zap className="w-full h-full p-1 text-[#2D333B]" />,
  'Stability Pro Membership': <Zap className="w-full h-full p-1 text-[#2D333B]" />,
  'Stability API Standard': <Zap className="w-full h-full p-1 text-[#2D333B]" />,
  
  // RunwayML
  'Runway Standard': <Rocket className="w-full h-full p-1 text-[#9146FF]" />,
  'Runway Pro': <Rocket className="w-full h-full p-1 text-[#9146FF]" />,
  'Runway Unlimited': <Rocket className="w-full h-full p-1 text-[#9146FF]" />,
  
  // Leonardo.ai
  'Leonardo Premium': <Palette className="w-full h-full p-1 text-[#6F4FF0]" />,
  'Leonardo Pro': <Palette className="w-full h-full p-1 text-[#6F4FF0]" />,
  'Leonardo Enterprise': <Palette className="w-full h-full p-1 text-[#6F4FF0]" />,
  
  // Genspark
  'Genspark Basic': <BrainCircuit className="w-full h-full p-1 text-[#FF6B00]" />,
  'Genspark Pro': <BrainCircuit className="w-full h-full p-1 text-[#FF6B00]" />,
  'Genspark Business': <BrainCircuit className="w-full h-full p-1 text-[#FF6B00]" />,
  'Genspark Enterprise': <BrainCircuit className="w-full h-full p-1 text-[#FF6B00]" />
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
