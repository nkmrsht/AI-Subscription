import React from 'react';
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
  BrainCircuit,
  Star,
  Cpu,
  MessageSquare,
  Gift,
  Server,
  Cloud,
  BookOpen,
  Binary,
  Infinity,
  Search,
  PenTool,
  Lightbulb
} from 'lucide-react';

// 各サービスの最新ロゴを使用
const serviceIconMap: Record<string, React.ReactNode> = {
  // OpenAI
  'ChatGPT': <MessageSquare className="w-full h-full p-1 text-[#00A67E]" />,
  'ChatGPT Plus': <MessageSquare className="w-full h-full p-1 text-[#00A67E]" />,
  'ChatGPT Pro': <MessageSquare className="w-full h-full p-1 text-[#00A67E]" />,
  'ChatGPT Team': <MessageSquare className="w-full h-full p-1 text-[#00A67E]" />,
  'ChatGPT Enterprise': <MessageSquare className="w-full h-full p-1 text-[#00A67E]" />,
  'ChatGPT Free': <MessageSquare className="w-full h-full p-1 text-[#00A67E]" />,
  'OpenAI': <MessageSquare className="w-full h-full p-1 text-[#00A67E]" />,
  'OpenAI API': <MessageSquare className="w-full h-full p-1 text-[#00A67E]" />,
  'OpenAI API Pro': <MessageSquare className="w-full h-full p-1 text-[#00A67E]" />,
  'OpenAI API Team': <MessageSquare className="w-full h-full p-1 text-[#00A67E]" />,
  
  // Google Gemini
  'Gemini': <Gift className="w-full h-full p-1 text-[#4285F4]" />,
  'Gemini Advanced': <Gift className="w-full h-full p-1 text-[#4285F4]" />,
  'Gemini Business': <Gift className="w-full h-full p-1 text-[#4285F4]" />,
  'Gemini Enterprise': <Gift className="w-full h-full p-1 text-[#4285F4]" />,
  'Gemini Free': <Gift className="w-full h-full p-1 text-[#4285F4]" />,
  'Google': <Gift className="w-full h-full p-1 text-[#4285F4]" />,
  
  // Anthropic Claude
  'Claude': <Bot className="w-full h-full p-1 text-[#8A3FFC]" />,
  'Claude Free': <Bot className="w-full h-full p-1 text-[#8A3FFC]" />,
  'Claude Pro': <Bot className="w-full h-full p-1 text-[#8A3FFC]" />,
  'Claude Team': <Bot className="w-full h-full p-1 text-[#8A3FFC]" />,
  'Claude Business': <Bot className="w-full h-full p-1 text-[#8A3FFC]" />,
  'Claude Enterprise': <Bot className="w-full h-full p-1 text-[#8A3FFC]" />,
  'Anthropic': <Bot className="w-full h-full p-1 text-[#8A3FFC]" />,
  
  // Notion
  'Notion': <BookOpen className="w-full h-full p-1 text-black" />,
  'Notion AI': <BookOpen className="w-full h-full p-1 text-black" />,
  'Notion AI Personal': <BookOpen className="w-full h-full p-1 text-black" />,
  'Notion AI Plus': <BookOpen className="w-full h-full p-1 text-black" />,
  'Notion AI Business': <BookOpen className="w-full h-full p-1 text-black" />,
  
  // GitHub Copilot
  'GitHub': <Code className="w-full h-full p-1 text-[#24292e]" />,
  'GitHub Copilot': <Code className="w-full h-full p-1 text-[#24292e]" />,
  'GitHub Copilot Individual': <Code className="w-full h-full p-1 text-[#24292e]" />,
  'GitHub Copilot Business': <Code className="w-full h-full p-1 text-[#24292e]" />,
  'GitHub Copilot Enterprise': <Code className="w-full h-full p-1 text-[#24292e]" />,
  
  // Adobe
  'Adobe': <PenTool className="w-full h-full p-1 text-[#FF0000]" />,
  'Adobe Firefly': <PenTool className="w-full h-full p-1 text-[#FF0000]" />,
  'Adobe Firefly Single App': <PenTool className="w-full h-full p-1 text-[#FF0000]" />,
  'Adobe Firefly (Creative Cloud)': <PenTool className="w-full h-full p-1 text-[#FF0000]" />,
  'Adobe Express Premium': <PenTool className="w-full h-full p-1 text-[#FF0000]" />,
  
  // Midjourney
  'Midjourney': <Image className="w-full h-full p-1 text-[#000000]" />,
  'Midjourney Basic': <Image className="w-full h-full p-1 text-[#000000]" />,
  'Midjourney Standard': <Image className="w-full h-full p-1 text-[#000000]" />,
  'Midjourney Pro': <Image className="w-full h-full p-1 text-[#000000]" />,
  'Midjourney Mega': <Image className="w-full h-full p-1 text-[#000000]" />,
  
  // Perplexity
  'Perplexity': <Search className="w-full h-full p-1 text-[#2563EB]" />,
  'Perplexity Pro': <Search className="w-full h-full p-1 text-[#2563EB]" />,
  'Perplexity Pro+': <Search className="w-full h-full p-1 text-[#2563EB]" />,
  'Perplexity Business': <Search className="w-full h-full p-1 text-[#2563EB]" />,
  
  // Replit
  'Replit': <FileCode className="w-full h-full p-1 text-[#F26207]" />,
  'Replit Core': <FileCode className="w-full h-full p-1 text-[#F26207]" />,
  'Replit Pro': <FileCode className="w-full h-full p-1 text-[#F26207]" />,
  'Replit Free': <FileCode className="w-full h-full p-1 text-[#F26207]" />,
  'Replit Teams for Education': <FileCode className="w-full h-full p-1 text-[#F26207]" />,
  'Replit Teams Pro': <FileCode className="w-full h-full p-1 text-[#F26207]" />,
  
  // Microsoft Copilot
  'Microsoft': <Server className="w-full h-full p-1 text-[#00A4EF]" />,
  'Microsoft Copilot': <Server className="w-full h-full p-1 text-[#00A4EF]" />,
  'Microsoft Copilot Free': <Server className="w-full h-full p-1 text-[#00A4EF]" />,
  'Microsoft Copilot Pro': <Server className="w-full h-full p-1 text-[#00A4EF]" />,
  'Microsoft Copilot for Business': <Server className="w-full h-full p-1 text-[#00A4EF]" />,
  'Microsoft Copilot for M365': <Server className="w-full h-full p-1 text-[#00A4EF]" />,
  
  // Stability AI
  'Stability AI': <Star className="w-full h-full p-1 text-[#2D333B]" />,
  'Stability Core Membership': <Star className="w-full h-full p-1 text-[#2D333B]" />,
  'Stability Pro Membership': <Star className="w-full h-full p-1 text-[#2D333B]" />,
  'Stability API Standard': <Star className="w-full h-full p-1 text-[#2D333B]" />,
  
  // RunwayML
  'Runway': <Rocket className="w-full h-full p-1 text-[#9146FF]" />,
  'RunwayML': <Rocket className="w-full h-full p-1 text-[#9146FF]" />,
  'Runway Standard': <Rocket className="w-full h-full p-1 text-[#9146FF]" />,
  'Runway Pro': <Rocket className="w-full h-full p-1 text-[#9146FF]" />,
  'Runway Unlimited': <Rocket className="w-full h-full p-1 text-[#9146FF]" />,
  
  // Leonardo.ai
  'Leonardo': <Palette className="w-full h-full p-1 text-[#6F4FF0]" />,
  'Leonardo AI': <Palette className="w-full h-full p-1 text-[#6F4FF0]" />,
  'Leonardo Premium': <Palette className="w-full h-full p-1 text-[#6F4FF0]" />,
  'Leonardo Pro': <Palette className="w-full h-full p-1 text-[#6F4FF0]" />,
  'Leonardo Enterprise': <Palette className="w-full h-full p-1 text-[#6F4FF0]" />,
  
  // Genspark
  'Genspark': <Lightbulb className="w-full h-full p-1 text-[#FF6B00]" />,
  'Genspark AI': <Lightbulb className="w-full h-full p-1 text-[#FF6B00]" />,
  'Genspark Basic': <Lightbulb className="w-full h-full p-1 text-[#FF6B00]" />,
  'Genspark Plus': <Lightbulb className="w-full h-full p-1 text-[#FF6B00]" />,
  'Genspark Pro': <Lightbulb className="w-full h-full p-1 text-[#FF6B00]" />,
  'Genspark Business': <Lightbulb className="w-full h-full p-1 text-[#FF6B00]" />,
  'Genspark Enterprise': <Lightbulb className="w-full h-full p-1 text-[#FF6B00]" />
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
