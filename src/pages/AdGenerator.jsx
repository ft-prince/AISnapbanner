import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Sparkles,
  ArrowLeft,
  Plus,
  Trash2,
  Edit2,
  Download,
  Loader2,
  Send,
  Check,
  X,
  ShoppingBag,
  Shirt,
  UtensilsCrossed,
  Briefcase,
  Palette,
} from "lucide-react";

export default function AdGenerator({ generatedAds, setGeneratedAds }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [inputPrompt, setInputPrompt] = useState("");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showEnhanced, setShowEnhanced] = useState(false);
  const [editingChatId, setEditingChatId] = useState(null);
  const [editingName, setEditingName] = useState("");

  // Brand details
  const [brandName, setBrandName] = useState("");
  const [promotionText, setPromotionText] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("modern");

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

  // Load chats
  useEffect(() => {
    try {
      const savedChats = localStorage.getItem("ai-ad-chats");
      if (savedChats) {
        const parsedChats = JSON.parse(savedChats);
        setChats(parsedChats);

        // Load specific chat if passed via navigation
        if (location.state?.chatId) {
          const chat = parsedChats.find((c) => c.id === location.state.chatId);
          if (chat) setActiveChat(chat);
        }
      }
    } catch (error) {
      console.error("Error loading chats:", error);
    }
  }, [location]);

  // Save chats
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem("ai-ad-chats", JSON.stringify(chats));
    }
  }, [chats]);

  const createNewChat = (category = "General") => {
    const newChat = {
      id: Date.now().toString(),
      name: `${category} Campaign ${
        chats.filter((c) => c.category === category).length + 1
      }`,
      category,
      messages: [],
      createdAt: Date.now(),
    };
    setChats([newChat, ...chats]);
    setActiveChat(newChat);
    setShowEnhanced(false);
    setEnhancedPrompt("");
    setInputPrompt("");
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

  const enhancePrompt = async () => {
    if (!inputPrompt.trim()) return;

    setIsEnhancing(true);

    try {
      // Build comprehensive prompt with brand details
      let fullPrompt = inputPrompt;
      if (brandName) fullPrompt = `Brand: ${brandName}. ${fullPrompt}`;
      if (promotionText) fullPrompt += ` Promotion: ${promotionText}`;
      if (selectedStyle) fullPrompt += ` Style: ${selectedStyle}`;

      const enhanceResponse = await fetch(CLOUDFLARE_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: fullPrompt }),
      });

      if (!enhanceResponse.ok) {
        throw new Error(`Enhancement failed: ${enhanceResponse.status}`);
      }

      const enhanceData = await enhanceResponse.json();
      setEnhancedPrompt(enhanceData.refined_prompt);
      setShowEnhanced(true);
    } catch (error) {
      console.error("Error:", error);
      alert(`Failed to enhance prompt: ${error.message}`);
    } finally {
      setIsEnhancing(false);
    }
  };

  const generateImage = async () => {
    if (!enhancedPrompt.trim() || !activeChat) return;

    const userMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputPrompt,
      brandName,
      promotionText,
      style: selectedStyle,
      timestamp: Date.now(),
    };

    const updatedChat = {
      ...activeChat,
      messages: [...activeChat.messages, userMessage],
    };
    setActiveChat(updatedChat);
    setChats(chats.map((c) => (c.id === activeChat.id ? updatedChat : c)));

    setShowEnhanced(false);
    setIsGenerating(true);

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
            prompt: enhancedPrompt,
            width: 1024,
            height: 576,
            steps: 20,
            guidance: 7.5,
            seed: 42,
          }),
        }
      );

      if (!imageResponse.ok) {
        throw new Error(`Image generation failed: ${imageResponse.status}`);
      }

      const imageData = await imageResponse.json();
      const requestId = imageData.data.request_id;

      // Poll for result
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

      // Add to messages
      const imageMessage = {
        id: (Date.now() + 1).toString(),
        type: "image",
        content: imageUrl,
        prompt: enhancedPrompt,
        originalPrompt: inputPrompt,
        brandName,
        promotionText,
        style: selectedStyle,
        timestamp: Date.now(),
      };

      const finalChat = {
        ...updatedChat,
        messages: [...updatedChat.messages, imageMessage],
      };
      setActiveChat(finalChat);
      setChats(chats.map((c) => (c.id === activeChat.id ? finalChat : c)));

      // Add to global gallery
      const newAd = {
        id: imageMessage.id,
        imageUrl,
        brandName,
        promotionText,
        originalPrompt: inputPrompt,
        enhancedPrompt,
        style: selectedStyle,
        category: activeChat.category,
        timestamp: Date.now(),
      };
      setGeneratedAds([newAd, ...generatedAds]);

      // Reset form
      setInputPrompt("");
      setBrandName("");
      setPromotionText("");
      setEnhancedPrompt("");
    } catch (error) {
      console.error("Error:", error);
      alert(`Failed to generate image: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 hover:bg-slate-800 rounded-lg transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Ad Generator</h1>
                <p className="text-xs text-slate-400">
                  Create stunning banners
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6 flex gap-6 h-[calc(100vh-88px)]">
        {/* Sidebar */}
        <div className="w-80 flex flex-col gap-4">
          {/* Category Selector */}
          <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
            <h3 className="text-sm font-semibold mb-3 text-slate-400">
              New Campaign
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.name}
                    onClick={() => createNewChat(cat.name)}
                    className="p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700 transition-all group text-left"
                  >
                    <Icon className="w-5 h-5 mb-2 text-slate-400 group-hover:text-violet-400" />
                    <p className="text-xs font-medium">{cat.name}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chats List */}
          <div className="flex-1 overflow-y-auto bg-slate-900/50 rounded-xl p-4 border border-slate-800">
            <h3 className="text-sm font-semibold mb-3 text-slate-400">
              Your Campaigns
            </h3>
            <div className="space-y-2">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all group ${
                    activeChat?.id === chat.id
                      ? "bg-violet-500/20 border border-violet-500"
                      : "bg-slate-800/50 hover:bg-slate-800 border border-transparent"
                  }`}
                  onClick={() => {
                    setActiveChat(chat);
                    setShowEnhanced(false);
                  }}
                >
                  <div className="flex items-center justify-between">
                    {editingChatId === chat.id ? (
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        onBlur={() => updateChatName(chat.id, editingName)}
                        onKeyDown={(e) =>
                          e.key === "Enter" &&
                          updateChatName(chat.id, editingName)
                        }
                        className="bg-slate-950 px-2 py-1 rounded text-sm flex-1 mr-2 outline-none"
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{chat.name}</h4>
                        <p className="text-xs text-slate-400">
                          {
                            chat.messages.filter((m) => m.type === "image")
                              .length
                          }{" "}
                          ads
                        </p>
                      </div>
                    )}
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
                          if (confirm("Delete this campaign?"))
                            deleteChat(chat.id);
                        }}
                        className="p-1.5 hover:bg-red-500/20 rounded text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {chats.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                  <p className="text-sm">No campaigns yet</p>
                  <p className="text-xs mt-1">Select a category above</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-slate-900/30 rounded-2xl border border-slate-800 overflow-hidden">
          {activeChat ? (
            <>
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {activeChat.messages.map((message) => (
                  <div key={message.id}>
                    {message.type === "user" && (
                      <div className="flex justify-end mb-4">
                        <div className="bg-violet-500 rounded-2xl rounded-br-md px-4 py-3 max-w-md">
                          <p className="text-sm font-medium mb-2">
                            {message.content}
                          </p>
                          {message.brandName && (
                            <p className="text-xs opacity-80">
                              Brand: {message.brandName}
                            </p>
                          )}
                          {message.promotionText && (
                            <p className="text-xs opacity-80">
                              Promo: {message.promotionText}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    {message.type === "image" && (
                      <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700">
                        <img
                          src={message.content}
                          alt="Generated ad"
                          className="w-full rounded-lg mb-4"
                        />
                        <div className="space-y-2 text-sm mb-4">
                          {message.brandName && (
                            <div>
                              <span className="text-slate-400">Brand: </span>
                              <span className="text-slate-200">
                                {message.brandName}
                              </span>
                            </div>
                          )}
                          <div>
                            <span className="text-slate-400">Original: </span>
                            <span className="text-slate-200">
                              {message.originalPrompt}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-400">Enhanced: </span>
                            <span className="text-slate-300 text-xs">
                              {message.prompt}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            downloadImage(
                              message.content,
                              `${message.brandName || "ad"}-banner-${
                                message.id
                              }.png`
                            )
                          }
                          className="w-full py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download Banner
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Input Section */}
              <div className="border-t border-slate-800 p-6">
                {!showEnhanced ? (
                  <div className="space-y-4">
                    {/* Brand Details */}
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        placeholder="Brand name (optional)"
                        className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 outline-none focus:border-violet-500 transition-colors text-sm"
                      />
                      <input
                        type="text"
                        value={promotionText}
                        onChange={(e) => setPromotionText(e.target.value)}
                        placeholder="Promotion text (optional)"
                        className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 outline-none focus:border-violet-500 transition-colors text-sm"
                      />
                    </div>

                    {/* Style Selector */}
                    <div className="flex gap-2 flex-wrap">
                      {styles.map((style) => (
                        <button
                          key={style}
                          onClick={() => setSelectedStyle(style)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                            selectedStyle === style
                              ? "bg-violet-500 text-white"
                              : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                          }`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>

                    {/* Main Prompt */}
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={inputPrompt}
                        onChange={(e) => setInputPrompt(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && !isEnhancing && enhancePrompt()
                        }
                        placeholder="Describe your ad banner..."
                        className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-violet-500 transition-colors"
                        disabled={isEnhancing}
                      />
                      <button
                        onClick={enhancePrompt}
                        disabled={!inputPrompt.trim() || isEnhancing}
                        className="px-6 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity flex items-center gap-2"
                      >
                        {isEnhancing ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Sparkles className="w-5 h-5" />
                        )}
                        Enhance
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-slate-800/50 border border-violet-500/30 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-violet-400">
                          <Sparkles className="w-4 h-4" />
                          <span className="font-semibold text-sm">
                            Enhanced Prompt
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            setShowEnhanced(false);
                            setEnhancedPrompt("");
                          }}
                          className="p-1 hover:bg-slate-700 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-slate-200">{enhancedPrompt}</p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setShowEnhanced(false);
                          setEnhancedPrompt("");
                        }}
                        className="flex-1 py-3 bg-slate-800 rounded-xl font-semibold hover:bg-slate-700 transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={generateImage}
                        disabled={isGenerating}
                        className="flex-1 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl font-semibold disabled:opacity-50 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Check className="w-5 h-5" />
                            Generate Banner
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-500">
              <div className="text-center">
                <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">
                  No Campaign Selected
                </h3>
                <p className="text-sm">Select or create a campaign to start</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
