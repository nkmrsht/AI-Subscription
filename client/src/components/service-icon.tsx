import React from 'react';
import { SiOpenai, SiGoogle, SiGithub, SiNotion, SiAdobe } from 'react-icons/si';
import { Bot, Image, Sparkles } from 'lucide-react';

// Map service names to icons
const serviceIconMap: Record<string, React.ReactNode> = {
  // Major AI services
  'ChatGPT Plus': <SiOpenai className="w-full h-full p-1 text-[#00A67E]" />,
  'Gemini Advanced': <SiGoogle className="w-full h-full p-1 text-[#4285F4]" />,
  'Claude Pro': <Sparkles className="w-full h-full p-1 text-[#8A3FFC]" />,
  'Notion AI': <SiNotion className="w-full h-full p-1 text-black" />,
  'GitHub Copilot': <SiGithub className="w-full h-full p-1 text-[#24292e]" />,
  'Adobe Firefly': <SiAdobe className="w-full h-full p-1 text-[#FF0000]" />, 
  'Midjourney': <Image className="w-full h-full p-1 text-[#7289DA]" />,
  'Perplexity Pro': <Bot className="w-full h-full p-1 text-[#2563EB]" />,
  'Replit Pro': <Bot className="w-full h-full p-1 text-[#F26207]" />
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
  // Check if we have a predefined icon for this service
  const icon = serviceIconMap[serviceName];
  
  if (icon) {
    return (
      <div className={`bg-white rounded-lg overflow-hidden flex items-center justify-center ${className}`}>
        {icon}
      </div>
    );
  }
  
  // For services without an icon, generate a colored box with first letter
  const firstLetter = serviceName.charAt(0).toUpperCase();
  const colorIndex = serviceName.charCodeAt(0) % defaultColors.length;
  const bgColorClass = defaultColors[colorIndex];
  
  return (
    <div className={`${bgColorClass} rounded-lg flex items-center justify-center font-bold ${className}`}>
      {firstLetter}
    </div>
  );
}
