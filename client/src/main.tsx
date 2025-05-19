import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

// Add title and meta tags for SEO
document.title = "AI サブスク管理アプリ | AIサービス料金を一元管理";
const meta = document.createElement('meta');
meta.name = "description";
meta.content = "複数のAIサービスの月額課金状況を日本円で一元管理。自動為替レート変換、最新プラン情報自動更新対応。ChatGPT、Gemini、Claude、NotionAIなど主要AIサブスクを簡単に管理。";
document.head.appendChild(meta);

createRoot(root).render(<App />);
