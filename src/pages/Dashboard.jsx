import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowLeft, 
  ShoppingBag, 
  Shirt, 
  UtensilsCrossed, 
  Briefcase,
  Palette,
  TrendingUp,
  Image as ImageIcon,
  FolderOpen,
  Plus
} from 'lucide-react';

export default function Dashboard({ generatedAds }) {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);

  // Category icons mapping
  const categoryIcons = {
    'E-commerce': ShoppingBag,
    'Clothing': Shirt,
    'Food': UtensilsCrossed,
    'Business': Briefcase,
    'General': Palette
  };

  const categoryColors = {
    'E-commerce': 'from-blue-500 to-cyan-500',
    'Clothing': 'from-purple-500 to-pink-500',
    'Food': 'from-orange-500 to-red-500',
    'Business': 'from-green-500 to-emerald-500',
    'General': 'from-violet-500 to-fuchsia-500'
  };

  // Load chats from localStorage
  useEffect(() => {
    try {
      const savedChats = localStorage.getItem('ai-ad-chats');
      if (savedChats) {
        setChats(JSON.parse(savedChats));
      }
    } catch (error) {
      console.error('Error loading chats:', error);
    }
  }, []);

  const weekAgo = useMemo(() => {
  return Date.now() - 7 * 24 * 60 * 60 * 1000;
}, []);

  // Calculate statistics
  const stats = {
    totalChats: chats.length,
    totalAds: generatedAds.length,
    categories: [...new Set(chats.map(c => c.category))].length,
    thisWeek: generatedAds.filter(ad => {
      const weekAgo =  Date.now() - 7 * 24 * 60 * 60 * 1000;
      return ad.timestamp > weekAgo;
    }).length
  };

  // Group chats by category
  const chatsByCategory = chats.reduce((acc, chat) => {
    const category = chat.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(chat);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-slate-800 rounded-lg transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Dashboard</h1>
                <p className="text-xs text-slate-400">Manage your ad campaigns</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/gallery')}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all"
            >
              Gallery
            </button>
            <button
              onClick={() => navigate('/generator')}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Campaign
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center">
                <FolderOpen className="w-6 h-6 text-violet-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-3xl font-bold mb-1">{stats.totalChats}</p>
            <p className="text-slate-400 text-sm">Total Campaigns</p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-blue-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-3xl font-bold mb-1">{stats.totalAds}</p>
            <p className="text-slate-400 text-sm">Generated Ads</p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Palette className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <p className="text-3xl font-bold mb-1">{stats.categories}</p>
            <p className="text-slate-400 text-sm">Categories</p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-green-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-3xl font-bold mb-1">{stats.thisWeek}</p>
            <p className="text-slate-400 text-sm">This Week</p>
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Campaigns by Category</h2>
          
          {Object.keys(chatsByCategory).length > 0 ? (
            <div className="space-y-6">
              {Object.entries(chatsByCategory).map(([category, categoryChats]) => {
                const Icon = categoryIcons[category] || Palette;
                const colorClass = categoryColors[category] || categoryColors.General;
                
                return (
                  <div
                    key={category}
                    className="rounded-2xl bg-slate-900/50 border border-slate-800 overflow-hidden"
                  >
                    {/* Category Header */}
                    <div className={`p-6 bg-gradient-to-r ${colorClass} bg-opacity-10`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">{category}</h3>
                            <p className="text-slate-400 text-sm">{categoryChats.length} campaigns</p>
                          </div>
                        </div>
                        <button
                          onClick={() => navigate('/generator', { state: { category } })}
                          className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
                        >
                          View All
                        </button>
                      </div>
                    </div>

                    {/* Campaign Cards */}
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categoryChats.slice(0, 6).map((chat) => {
                          const imageCount = chat.messages?.filter(m => m.type === 'image').length || 0;
                          
                          return (
                            <div
                              key={chat.id}
                              onClick={() => navigate('/generator', { state: { chatId: chat.id } })}
                              className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-violet-500 transition-all cursor-pointer group"
                            >
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="font-semibold text-sm group-hover:text-violet-400 transition-colors">
                                  {chat.name}
                                </h4>
                                <span className="px-2 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs">
                                  {imageCount} ads
                                </span>
                              </div>
                              <p className="text-xs text-slate-400">
                                Created {new Date(chat.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800">
              <FolderOpen className="w-16 h-16 mx-auto mb-4 text-slate-600" />
              <h3 className="text-xl font-semibold mb-2">No Campaigns Yet</h3>
              <p className="text-slate-400 mb-6">Start creating your first ad campaign</p>
              <button
                onClick={() => navigate('/generator')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Campaign
              </button>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        {generatedAds?.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Recent Ads</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {generatedAds.slice(0, 4).map((ad) => (
                <div
                  key={ad.id}
                  className="rounded-xl overflow-hidden border border-slate-800 hover:border-violet-500 transition-all group bg-slate-900/50"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={ad.imageUrl}
                      alt={ad.brandName || 'Ad'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-slate-400 line-clamp-2">{ad.originalPrompt}</p>
                    <p className="text-xs text-slate-500 mt-2">
                      {new Date(ad.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}