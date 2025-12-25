import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  ArrowLeft,
  Plus,
  Trash2,
  Edit2,
  Download,
  Loader2,
  Check,
  X,
  ShoppingBag,
  Shirt,
  UtensilsCrossed,
  Briefcase,
  Palette,
  Hash,
  MessageSquare,
  Copy,
  Menu,
  ChevronLeft,
  Lightbulb,
  Zap,
} from "lucide-react";

// Examples Modal Component (inline to avoid import issues)
function ExamplesModal({ isOpen, onClose, onUseExample }) {
  const [copiedId, setCopiedId] = useState(null);

  const examples = [
    {
      id: 1,
      category: "E-commerce",
      brand: "TechVibe",
      promotion: "40% Off Black Friday Sale",
      style: "modern",
      description: "Sleek wireless earbuds with charging case, floating on gradient background, product photography style",
      tags: ["Tech", "Products", "Sale"]
    },
    {
      id: 2,
      category: "Food",
      brand: "Brew & Co.",
      promotion: "Buy 2 Get 1 Free",
      style: "casual",
      description: "Steaming cup of latte with latte art, coffee beans scattered around, rustic wooden table, morning light",
      tags: ["Coffee", "Beverage", "Cafe"]
    },
    {
      id: 3,
      category: "Clothing",
      brand: "FitPro Athletics",
      promotion: "Summer Sale - Up to 60% Off",
      style: "vibrant",
      description: "Athletic woman in yoga pose wearing activewear, sunset beach background, energetic and motivational",
      tags: ["Sportswear", "Fitness", "Active"]
    },
    {
      id: 4,
      category: "Business",
      brand: "Pixel Perfect",
      promotion: "Free Consultation",
      style: "professional",
      description: "Modern office workspace, laptop showing creative designs, team collaboration, sleek and corporate",
      tags: ["Agency", "Professional", "Corporate"]
    },
    {
      id: 5,
      category: "E-commerce",
      brand: "Cozy Haven",
      promotion: "Free Shipping This Week",
      style: "minimalist",
      description: "Scandinavian-style living room with plants, natural wood furniture, warm sunlight through windows",
      tags: ["Home Decor", "Minimalist", "Interior"]
    },
    {
      id: 6,
      category: "Food",
      brand: "Bella Italia",
      promotion: "Happy Hour 5-7 PM",
      style: "vibrant",
      description: "Delicious pizza with melting cheese, fresh basil, tomatoes, Italian flag colors in background",
      tags: ["Restaurant", "Italian", "Food"]
    },
    {
      id: 7,
      category: "Clothing",
      brand: "Noir Elegance",
      promotion: "Exclusive Collection Launch",
      style: "luxury",
      description: "Black evening gown on runway, spotlight effect, bokeh lights, high fashion photography",
      tags: ["Luxury", "Fashion", "Elegant"]
    },
    {
      id: 8,
      category: "E-commerce",
      brand: "Glow Cosmetics",
      promotion: "New Skincare Line",
      style: "elegant",
      description: "Luxury skincare bottles on marble surface, water droplets, botanical elements, soft pink lighting, spa-like atmosphere",
      tags: ["Beauty", "Skincare", "Premium"]
    }
  ];

  const quickTips = [
    "Be specific about lighting (studio, natural, golden hour)",
    "Mention photography style (commercial, editorial, product)",
    "Include mood/atmosphere (energetic, calm, luxurious)",
    "Describe composition (centered, floating, close-up)",
    "Add quality keywords (professional, high-resolution, detailed)"
  ];

  const copyExample = (example) => {
    const text = `Brand: ${example.brand}
Promotion: ${example.promotion}
Style: ${example.style}
Description: ${example.description}`;
    
    navigator.clipboard.writeText(text);
    setCopiedId(example.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
              <Lightbulb className="w-5 sm:w-6 h-5 sm:h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-bold">Examples & Inspiration</h2>
              <p className="text-xs sm:text-sm text-slate-400 hidden sm:block">Get started with these ready-to-use templates</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-all"
          >
            <X className="w-5 sm:w-6 h-5 sm:h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* Quick Tips */}
          <div className="mb-6 sm:mb-8 bg-violet-500/10 border border-violet-500/20 rounded-xl p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
              <Lightbulb className="w-4 sm:w-5 h-4 sm:h-5 text-violet-400" />
              Quick Tips for Better Results
            </h3>
            <ul className="space-y-2">
              {quickTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-slate-300">
                  <span className="text-violet-400 mt-0.5">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Examples Grid */}
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Popular Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {examples.map((example) => (
              <div
                key={example.id}
                className="bg-slate-800/50 rounded-xl p-4 sm:p-5 border border-slate-700 hover:border-violet-500 transition-all group"
              >
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="px-2 py-1 bg-violet-500/20 text-violet-300 rounded text-xs font-medium">
                        {example.category}
                      </span>
                      <span className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs font-medium capitalize">
                        {example.style}
                      </span>
                    </div>
                    <h4 className="font-semibold text-base sm:text-lg">{example.brand}</h4>
                    <p className="text-xs sm:text-sm text-violet-400 mt-1">{example.promotion}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyExample(example)}
                      className="p-2 hover:bg-slate-700 rounded-lg transition-all"
                      title="Copy example"
                    >
                      {copiedId === example.id ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 mb-3 sm:mb-4 line-clamp-3">
                  {example.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                  {example.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-slate-700/50 text-slate-400 rounded text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => {
                    onUseExample(example);
                    onClose();
                  }}
                  className="w-full py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg font-semibold text-xs sm:text-sm hover:opacity-90 transition-all"
                >
                  Use This Example
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdGenerator({ generatedAds, setGeneratedAds }) {
  const navigate = useNavigate();

  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("E-commerce");
  const [sidebarOpen, setSidebarOpen] = useState(false); // Changed default to false for mobile
  const [showExamples, setShowExamples] = useState(false);
  
  // Form inputs
  const [inputPrompt, setInputPrompt] = useState("");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const [brandName, setBrandName] = useState("");
  const [promotionText, setPromotionText] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("modern");
  
  // UI states
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showEnhanced, setShowEnhanced] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState("");
  const [editingChatId, setEditingChatId] = useState(null);
  const [editingName, setEditingName] = useState("");
  
  // Generated content
  const [generatedImage, setGeneratedImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [hashtags, setHashtags] = useState([]);

  const CLOUDFLARE_API = import.meta.env.VITE_CLOUDFLARE_API;
  const DEAPI_KEY = import.meta.env.VITE_DEAPI_KEY;

  const categories = [
    { name: "E-commerce", icon: ShoppingBag, color: "blue" },
    { name: "Clothing", icon: Shirt, color: "purple" },
    { name: "Food", icon: UtensilsCrossed, color: "orange" },
    { name: "Business", icon: Briefcase, color: "green" },
    { name: "General", icon: Palette, color: "violet" },
  ];

  const styles = [
    "modern",
    "minimalist",
    "vibrant",
    "elegant",
    "playful",
    "professional",
    "luxury",
    "casual",
  ];

  // Auto-open sidebar on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load chats
  useEffect(() => {
    try {
      const savedChats = localStorage.getItem("ai-ad-chats");
      if (savedChats) {
        setChats(JSON.parse(savedChats));
      }
    } catch (error) {
      console.error("Error loading chats:", error);
    }
  }, []);

  // Save chats
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem("ai-ad-chats", JSON.stringify(chats));
    }
  }, [chats]);

  // Get chats by category
  const chatsByCategory = chats.reduce((acc, chat) => {
    const cat = chat.category || "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(chat);
    return acc;
  }, {});

  const createNewChat = (category) => {
    const categoryChats = chats.filter((c) => c.category === category);
    const newChat = {
      id: Date.now().toString(),
      name: `${category} Campaign ${categoryChats.length + 1}`,
      category,
      messages: [],
      createdAt: Date.now(),
    };
    setChats([newChat, ...chats]);
    setActiveChat(newChat);
    setSelectedCategory(category);
    resetForm();
  };

  const deleteChat = (chatId) => {
    const updatedChats = chats.filter((c) => c.id !== chatId);
    setChats(updatedChats);
    if (activeChat?.id === chatId) {
      setActiveChat(null);
    }
    localStorage.setItem("ai-ad-chats", JSON.stringify(updatedChats));
  };

  const updateChatName = (chatId, newName) => {
    const updatedChats = chats.map((c) =>
      c.id === chatId ? { ...c, name: newName } : c
    );
    setChats(updatedChats);
    if (activeChat?.id === chatId) {
      setActiveChat({ ...activeChat, name: newName });
    }
    setEditingChatId(null);
  };

  const resetForm = () => {
    setInputPrompt("");
    setEnhancedPrompt("");
    setBrandName("");
    setPromotionText("");
    setShowEnhanced(false);
    setGeneratedImage(null);
    setCaption("");
    setHashtags([]);
    setProgress(0);
  };

  const enhancePrompt = async () => {
    if (!inputPrompt.trim()) return;

    setIsEnhancing(true);
    setProgress(10);
    setProgressMessage("Enhancing prompt with AI...");

    const warningTimeoutId = setTimeout(() => {
      setProgressMessage("Still working... First request may take longer (cold start)");
    }, 10000);

    try {
      let fullPrompt = inputPrompt;
      if (brandName) fullPrompt = `Brand: ${brandName}. ${fullPrompt}`;
      if (promotionText) fullPrompt += ` Promotion: ${promotionText}`;
      if (selectedStyle) fullPrompt += ` Style: ${selectedStyle}`;

      let enhanceData = null;
      const maxRetries = 2;

      for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
          if (attempt > 0) {
            setProgressMessage(`Retrying... (attempt ${attempt + 1}/${maxRetries})`);
          }

          const controller = new AbortController();
          const timeout = attempt === 0 ? 60000 : 30000;
          const abortTimeoutId = setTimeout(() => controller.abort(), timeout);

          const enhanceResponse = await fetch(CLOUDFLARE_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ input: fullPrompt }),
            signal: controller.signal
          });

          clearTimeout(abortTimeoutId);

          if (!enhanceResponse.ok) {
            const errorText = await enhanceResponse.text();
            throw new Error(`Enhancement failed (${enhanceResponse.status}): ${errorText}`);
          }

          enhanceData = await enhanceResponse.json();
          
          if (!enhanceData || !enhanceData.refined_prompt) {
            throw new Error('Invalid response from enhancement service');
          }

          break;

        } catch (error) {
          if (error.name === 'AbortError' && attempt < maxRetries - 1) {
            console.log(`Attempt ${attempt + 1} timed out, retrying...`);
            await new Promise(resolve => setTimeout(resolve, 2000));
            continue;
          }
          
          throw error;
        }
      }

      clearTimeout(warningTimeoutId);

      if (!enhanceData || !enhanceData.refined_prompt) {
        throw new Error('Failed to get valid response after retries');
      }

      setEnhancedPrompt(enhanceData.refined_prompt);
      setShowEnhanced(true);
      setProgress(30);
      setProgressMessage("Prompt enhanced! Review and proceed.");
      
    } catch (error) {
      clearTimeout(warningTimeoutId);
      console.error("Enhancement error:", error);
      
      if (error.name === 'AbortError') {
        alert('Request timeout. The AI service took too long.\n\n💡 First request is often slower (cold start). Please try again - it should be faster!');
      } else {
        alert(`Failed to enhance prompt: ${error.message}\n\n💡 Tip: Try again or use a simpler description.`);
      }
      setProgress(0);
      setProgressMessage("");
    } finally {
      setIsEnhancing(false);
    }
  };

  const generateDirectly = async () => {
    if (!inputPrompt.trim() || !activeChat) return;

    // Use the input prompt directly without enhancement
    const finalPrompt = inputPrompt.trim();
    await generateImageWithPrompt(finalPrompt);
  };

  const generateWithEnhancement = async () => {
    if (!enhancedPrompt.trim() || !activeChat) return;
    await generateImageWithPrompt(enhancedPrompt);
  };

  const generateImageWithPrompt = async (promptToUse) => {
    setIsGenerating(true);
    setShowEnhanced(false);
    setProgress(50);
    setProgressMessage("Generating image...");

    try {
      const imageResponse = await fetch(
        "https://api.deapi.ai/api/v1/client/txt2img",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${DEAPI_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "ZImageTurbo_INT8",
            prompt: promptToUse,
            width: 1024,
            height: 576,
            steps: 20,
            guidance: 7.5,
            seed: -1,
          }),
        }
      );

      if (!imageResponse.ok) {
        throw new Error(`Image generation failed: ${imageResponse.status}`);
      }

      const imageData = await imageResponse.json();
      const requestId = imageData.data.request_id;

      setProgress(70);
      setProgressMessage("Processing image...");

      const pollResult = async (reqId, maxAttempts = 60) => {
        for (let i = 0; i < maxAttempts; i++) {
          const statusResponse = await fetch(
            `https://api.deapi.ai/api/v1/client/request-status/${reqId}`,
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${DEAPI_KEY}`,
              },
            }
          );

          if (!statusResponse.ok) {
            throw new Error(`Status check failed: ${statusResponse.status}`);
          }

          const statusData = await statusResponse.json();
          const { status, result_url } = statusData.data;

          if (status === "done") {
            return result_url;
          } else if (status === "error") {
            throw new Error(statusData.data.error || "Image generation failed");
          }

          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
        throw new Error("Image generation timeout");
      };

      const imageUrl = await pollResult(requestId);
      
      setProgress(85);
      setProgressMessage("Generating caption...");

      const metadataResponse = await fetch(CLOUDFLARE_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          input: `Generate a social media caption and hashtags for this ad: ${promptToUse}. Brand: ${brandName || 'N/A'}. Promotion: ${promotionText || 'N/A'}`,
          mode: "caption"
        }),
      });

      let generatedCaption = "";
      let generatedHashtags = [];

      if (metadataResponse.ok) {
        const metadataData = await metadataResponse.json();
        generatedCaption = metadataData.caption || "";
        generatedHashtags = metadataData.hashtags || [];
      }

      setProgress(100);
      setProgressMessage("Complete!");

      setGeneratedImage(imageUrl);
      setCaption(generatedCaption);
      setHashtags(generatedHashtags);

      const imageMessage = {
        id: Date.now().toString(),
        type: "image",
        content: imageUrl,
        prompt: promptToUse,
        originalPrompt: inputPrompt,
        brandName,
        promotionText,
        style: selectedStyle,
        caption: generatedCaption,
        hashtags: generatedHashtags,
        timestamp: Date.now(),
      };

      const updatedChat = {
        ...activeChat,
        messages: [...activeChat.messages, imageMessage],
      };
      setActiveChat(updatedChat);
      setChats(chats.map((c) => (c.id === activeChat.id ? updatedChat : c)));

      if (typeof setGeneratedAds === 'function') {
        const newAd = {
          id: imageMessage.id,
          imageUrl,
          brandName,
          promotionText,
          originalPrompt: inputPrompt,
          enhancedPrompt: promptToUse,
          style: selectedStyle,
          category: activeChat.category,
          caption: generatedCaption,
          hashtags: generatedHashtags,
          timestamp: Date.now(),
        };
        
        const currentAds = Array.isArray(generatedAds) ? generatedAds : [];
        setGeneratedAds([newAd, ...currentAds]);
      }

      setInputPrompt("");
      setBrandName("");
      setPromotionText("");
      setEnhancedPrompt("");
      setShowEnhanced(false);

    } catch (error) {
      console.error("Error:", error);
      alert(`Failed to generate image: ${error.message}`);
      setProgress(0);
      setProgressMessage("");
    } finally {
      setIsGenerating(false);
    }
  };

  const loadPreviousGeneration = (message) => {
    setGeneratedImage(message.content);
    setCaption(message.caption || "");
    setHashtags(message.hashtags || []);
    setBrandName(message.brandName || "");
    setPromotionText(message.promotionText || "");
    setSelectedStyle(message.style || "modern");
  };

  const downloadImage = async (imageUrl, filename) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename || `ad-banner-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download image");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const handleUseExample = (example) => {
    if (!activeChat) {
      const newChat = {
        id: Date.now().toString(),
        name: `${example.category} Campaign 1`,
        category: example.category,
        messages: [],
        createdAt: Date.now(),
      };
      setChats([newChat, ...chats]);
      setActiveChat(newChat);
      setSelectedCategory(example.category);
    }
    
    setBrandName(example.brand);
    setPromotionText(example.promotion);
    setSelectedStyle(example.style);
    setInputPrompt(example.description);
    
    setShowEnhanced(false);
    setEnhancedPrompt("");
    setGeneratedImage(null);
    setCaption("");
    setHashtags([]);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex flex-col">
      <ExamplesModal
        isOpen={showExamples}
        onClose={() => setShowExamples(false)}
        onUseExample={handleUseExample}
      />

      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 hover:bg-slate-800 rounded-lg transition-all"
              title="Back to dashboard"
            >
              <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5" />
            </button>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-800 rounded-lg transition-all lg:hidden"
              title={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {sidebarOpen ? <X className="w-4 sm:w-5 h-4 sm:h-5" /> : <Menu className="w-4 sm:w-5 h-4 sm:h-5" />}
            </button>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                <Sparkles className="w-4 sm:w-6 h-4 sm:h-6" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl font-bold">Snap Banner</h1>
                <p className="text-xs text-slate-400">Create stunning banners</p>
              </div>
              <h1 className="text-base font-bold sm:hidden">Snap Banner</h1>
            </div>
          </div>
          <button
            onClick={() => setShowExamples(true)}
            className="px-3 sm:px-4 py-2 bg-violet-500/20 hover:bg-violet-500/30 border border-violet-500/30 rounded-lg transition-all flex items-center gap-2 text-violet-300"
          >
            <Lightbulb className="w-3 sm:w-4 h-3 sm:h-4" />
            <span className="hidden sm:inline text-sm">Examples</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Overlay on mobile, side panel on desktop */}
        {sidebarOpen && (
          <>
            {/* Mobile overlay backdrop */}
            <div 
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            
            {/* Sidebar content */}
            <div className="fixed lg:relative inset-y-0 left-0 w-80 lg:w-80 border-r border-slate-800 bg-slate-950/95 lg:bg-slate-950/30 z-50 lg:z-0 flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Category Tabs */}
                <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-2">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const categoryCount = chatsByCategory[cat.name]?.length || 0;
                    return (
                      <button
                        key={cat.name}
                        onClick={() => setSelectedCategory(cat.name)}
                        className={`w-full p-3 rounded-lg transition-all flex items-center justify-between ${
                          selectedCategory === cat.name
                            ? "bg-violet-500 text-white"
                            : "bg-transparent text-slate-400 hover:bg-slate-800"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5" />
                          <span className="text-sm font-medium">{cat.name}</span>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-white/10">
                          {categoryCount}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* New Campaign Button */}
                <button
                  onClick={() => {
                    createNewChat(selectedCategory);
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  New Campaign
                </button>

                {/* Chats List */}
                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
                  <h3 className="text-sm font-semibold mb-3 text-slate-400">
                    {selectedCategory} Campaigns
                  </h3>
                  <div className="space-y-2">
                    {(chatsByCategory[selectedCategory] || []).map((chat) => (
                      <div
                        key={chat.id}
                        className={`p-3 rounded-lg cursor-pointer transition-all group ${
                          activeChat?.id === chat.id
                            ? "bg-violet-500/20 border border-violet-500"
                            : "bg-slate-800/50 hover:bg-slate-800 border border-transparent"
                        }`}
                        onClick={() => {
                          setActiveChat(chat);
                          resetForm();
                          if (window.innerWidth < 1024) setSidebarOpen(false);
                        }}
                      >
                        <div className="flex items-center justify-between gap-2">
                          {editingChatId === chat.id ? (
                            <input
                              type="text"
                              value={editingName}
                              onChange={(e) => setEditingName(e.target.value)}
                              onBlur={() => updateChatName(chat.id, editingName)}
                              onKeyDown={(e) =>
                                e.key === "Enter" && updateChatName(chat.id, editingName)
                              }
                              className="bg-slate-950 px-2 py-1 rounded text-sm flex-1 mr-2 outline-none"
                              autoFocus
                              onClick={(e) => e.stopPropagation()}
                            />
                          ) : (
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm truncate">{chat.name}</h4>
                              <p className="text-xs text-slate-400">
                                {chat.messages.filter((m) => m.type === "image").length} ads
                              </p>
                            </div>
                          )}
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingChatId(chat.id);
                                setEditingName(chat.name);
                              }}
                              className="p-1.5 hover:bg-slate-700 rounded"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (confirm("Delete this campaign?")) deleteChat(chat.id);
                              }}
                              className="p-1.5 hover:bg-red-500/20 rounded text-red-400"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {(!chatsByCategory[selectedCategory] ||
                      chatsByCategory[selectedCategory].length === 0) && (
                      <div className="text-center py-12 text-slate-500">
                        <p className="text-sm">No campaigns yet</p>
                        <p className="text-xs mt-1">Create your first one</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {activeChat ? (
            <>
              {/* Form Panel */}
              <div className="w-full lg:w-1/2 overflow-y-auto border-b lg:border-b-0 lg:border-r border-slate-800">
                <div className="p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Ad Details</h2>

                  {/* Previous Generations */}
                  {activeChat.messages.filter(m => m.type === 'image').length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-slate-400">Previous Generations</h3>
                        {activeChat.messages.filter(m => m.type === 'image').length > 4 && (
                          <span className="text-xs text-slate-500">
                            {activeChat.messages.filter(m => m.type === 'image').length} total
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        {activeChat.messages
                          .filter(m => m.type === 'image')
                          .slice(0, 4)
                          .map((msg) => (
                            <div
                              key={msg.id}
                              onClick={() => loadPreviousGeneration(msg)}
                              className="relative group cursor-pointer rounded-lg overflow-hidden border border-slate-700 hover:border-violet-500 transition-all"
                            >
                              <img
                                src={msg.content}
                                alt="Previous generation"
                                className="w-full aspect-video object-cover group-hover:scale-105 transition-transform"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all flex items-center justify-center">
                                <span className="text-white text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                  View Details
                                </span>
                              </div>
                              {msg.brandName && (
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-1.5 sm:p-2">
                                  <p className="text-white text-xs font-medium truncate">
                                    {msg.brandName}
                                  </p>
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-2 block">
                        Brand Name
                      </label>
                      <input
                        type="text"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        placeholder="Enter brand name"
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all text-sm sm:text-base"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-2 block">
                        Promotion Text
                      </label>
                      <input
                        type="text"
                        value={promotionText}
                        onChange={(e) => setPromotionText(e.target.value)}
                        placeholder="e.g., 50% Off Holiday Sale"
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all text-sm sm:text-base"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-3 block">
                        Style
                      </label>
                      <div className="flex gap-2 flex-wrap">
                        {styles.map((style) => (
                          <button
                            key={style}
                            onClick={() => setSelectedStyle(style)}
                            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                              selectedStyle === style
                                ? "bg-violet-500 text-white"
                                : "bg-slate-800/50 text-slate-300 hover:bg-slate-700 border border-slate-700"
                            }`}
                          >
                            {style}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-2 block">
                        Description
                      </label>
                      <textarea
                        value={inputPrompt}
                        onChange={(e) => setInputPrompt(e.target.value)}
                        placeholder="Describe your ad banner..."
                        rows={4}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none text-sm sm:text-base"
                      />
                    </div>

                    {/* Enhanced Prompt Preview */}
                    {showEnhanced && (
                      <div className="bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-500/30 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2 text-violet-300">
                            <Sparkles className="w-4 sm:w-5 h-4 sm:h-5" />
                            <span className="font-semibold text-sm sm:text-base">AI Enhanced Prompt</span>
                          </div>
                          <button
                            onClick={() => {
                              setShowEnhanced(false);
                              setEnhancedPrompt("");
                              setProgress(0);
                            }}
                            className="p-2 hover:bg-slate-700/50 rounded-lg"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-200 mb-4">{enhancedPrompt}</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setShowEnhanced(false);
                              setEnhancedPrompt("");
                              setProgress(0);
                            }}
                            className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg font-medium transition-all text-sm"
                          >
                            Edit Again
                          </button>
                          <button
                            onClick={generateWithEnhancement}
                            disabled={isGenerating}
                            className="flex-1 py-2.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                          >
                            {isGenerating ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Generating...
                              </>
                            ) : (
                              <>
                                <Zap className="w-4 h-4" />
                                Generate
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Progress Bar */}
                    {progress > 0 && !showEnhanced && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs sm:text-sm">
                          <span className="text-slate-300">{progressMessage}</span>
                          <span className="text-violet-400 font-bold">{progress}%</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-2 sm:h-3 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    {!showEnhanced && (
                      <div className="pt-4 space-y-3">
                        <button
                          onClick={enhancePrompt}
                          disabled={!inputPrompt.trim() || isEnhancing || isGenerating}
                          className="w-full py-3 sm:py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl font-semibold disabled:opacity-50 hover:opacity-90 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                        >
                          {isEnhancing ? (
                            <>
                              <Loader2 className="w-4 sm:w-5 h-4 sm:h-5 animate-spin" />
                              Enhancing with AI...
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-4 sm:w-5 h-4 sm:h-5" />
                              Enhance with AI
                            </>
                          )}
                        </button>
                        
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-700"></div>
                          </div>
                          <div className="relative flex justify-center text-xs">
                            <span className="px-2 bg-slate-950 text-slate-500">or</span>
                          </div>
                        </div>

                        <button
                          onClick={generateDirectly}
                          disabled={!inputPrompt.trim() || isEnhancing || isGenerating}
                          className="w-full py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-medium disabled:opacity-50 transition-all flex items-center justify-center gap-2 text-sm"
                        >
                          <Zap className="w-4 h-4" />
                          Generate Without AI Enhancement
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Preview Panel */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Preview</h2>

                  {generatedImage ? (
                    <div className="space-y-4 sm:space-y-6">
                      <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
                        <img src={generatedImage} alt="Generated ad" className="w-full" />
                      </div>

                      {caption && (
                        <div className="bg-slate-800/50 rounded-xl p-4 sm:p-5 border border-slate-700">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <MessageSquare className="w-4 sm:w-5 h-4 sm:h-5" />
                              <span className="font-semibold text-sm sm:text-base">Caption</span>
                            </div>
                            <button
                              onClick={() => copyToClipboard(caption)}
                              className="p-2 hover:bg-slate-700 rounded-lg"
                              title="Copy caption"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-200">{caption}</p>
                        </div>
                      )}

                      {hashtags.length > 0 && (
                        <div className="bg-slate-800/50 rounded-xl p-4 sm:p-5 border border-slate-700">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Hash className="w-4 sm:w-5 h-4 sm:h-5" />
                              <span className="font-semibold text-sm sm:text-base">Hashtags</span>
                            </div>
                            <button
                              onClick={() => copyToClipboard(hashtags.join(" "))}
                              className="p-2 hover:bg-slate-700 rounded-lg"
                              title="Copy hashtags"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {hashtags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="px-2 sm:px-3 py-1 sm:py-2 bg-violet-500/20 text-violet-300 rounded-lg text-xs sm:text-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() =>
                          downloadImage(
                            generatedImage,
                            `${brandName || "ad"}-banner-${Date.now()}.png`
                          )
                        }
                        className="w-full py-3 sm:py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                      >
                        <Download className="w-4 sm:w-5 h-4 sm:h-5" />
                        Download Banner
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-64 lg:h-full">
                      <div className="text-center text-slate-500">
                        <Sparkles className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-4 opacity-30" />
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">No Preview Yet</h3>
                        <p className="text-xs sm:text-sm">Fill in details and generate</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center text-slate-500">
                <Sparkles className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-4 opacity-30" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">No Campaign Selected</h3>
                <p className="text-xs sm:text-sm mb-4">Create or select a campaign to start</p>
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="px-6 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl font-semibold hover:opacity-90 transition-all inline-flex items-center gap-2"
                >
                  <Menu className="w-4 h-4" />
                  Open Campaigns
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}