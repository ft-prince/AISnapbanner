import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowLeft, 
  Download,
  Filter,
  Search,
  X,
  Calendar,
  Tag
} from 'lucide-react';

export default function Gallery({ generatedAds }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAd, setSelectedAd] = useState(null);
  const [sortBy, setSortBy] = useState('newest');

  // Get unique categories
  const categories = ['all', ...new Set(generatedAds.map(ad => ad.category).filter(Boolean))];

  // Filter and sort ads
  const filteredAds = generatedAds
    .filter(ad => {
      const matchesSearch = !searchQuery || 
        ad.originalPrompt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ad.brandName?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || ad.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return b.timestamp - a.timestamp;
      if (sortBy === 'oldest') return a.timestamp - b.timestamp;
      if (sortBy === 'brand') return (a.brandName || '').localeCompare(b.brandName || '');
      return 0;
    });

  const downloadImage = async (imageUrl, filename) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename || `ad-banner-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download image');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
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
                <h1 className="text-xl font-bold">Gallery</h1>
                <p className="text-xs text-slate-400">{filteredAds.length} banners</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate('/generator')}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 font-semibold hover:opacity-90 transition-opacity"
          >
            Create New
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by brand name or description..."
              className="w-full bg-slate-900/50 border border-slate-800 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-violet-500 transition-colors"
            />
          </div>

          {/* Category Filter & Sort */}
          <div className="flex gap-4 flex-wrap items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-400">Category:</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-violet-500 text-white'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {category === 'all' ? 'All' : category}
                </button>
              ))}
            </div>

            <div className="ml-auto flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-violet-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="brand">By Brand</option>
              </select>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredAds.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAds.map((ad) => (
              <div
                key={ad.id}
                className="group relative rounded-2xl overflow-hidden border border-slate-800 hover:border-violet-500 transition-all bg-slate-900/50 cursor-pointer"
                onClick={() => setSelectedAd(ad)}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={ad.imageUrl}
                    alt={ad.brandName || 'Generated ad'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadImage(ad.imageUrl, `${ad.brandName || 'ad'}-banner-${ad.id}.png`);
                    }}
                    className="w-full py-2 bg-white/20 backdrop-blur-sm rounded-lg font-semibold hover:bg-white/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    {ad.brandName ? (
                      <h3 className="font-semibold text-lg">{ad.brandName}</h3>
                    ) : (
                      <span className="text-slate-500 text-sm italic">Untitled</span>
                    )}
                    {ad.category && (
                      <span className="px-2 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {ad.category}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-400 text-sm line-clamp-2 mb-2">
                    {ad.originalPrompt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{new Date(ad.timestamp).toLocaleDateString()}</span>
                    {ad.style && <span className="capitalize">{ad.style}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800">
            <Sparkles className="w-16 h-16 mx-auto mb-4 text-slate-600" />
            <h3 className="text-xl font-semibold mb-2">No Ads Found</h3>
            <p className="text-slate-400 mb-6">
              {searchQuery || selectedCategory !== 'all'
                ? 'Try adjusting your filters'
                : 'Start creating your first ad banner'}
            </p>
            <button
              onClick={() => navigate('/generator')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Create First Banner
            </button>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {selectedAd && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedAd(null)}
        >
          <div
            className="max-w-5xl w-full bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-800">
              <div>
                <h2 className="text-2xl font-bold mb-1">
                  {selectedAd.brandName || 'Untitled Banner'}
                </h2>
                <p className="text-slate-400 text-sm">
                  {new Date(selectedAd.timestamp).toLocaleDateString()} • {selectedAd.category}
                </p>
              </div>
              <button
                onClick={() => setSelectedAd(null)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <img
                  src={selectedAd.imageUrl}
                  alt={selectedAd.brandName || 'Ad'}
                  className="w-full rounded-xl"
                />
              </div>

              <div className="space-y-4 mb-6">
                {selectedAd.brandName && (
                  <div>
                    <span className="text-slate-400 text-sm">Brand Name:</span>
                    <p className="text-lg font-semibold">{selectedAd.brandName}</p>
                  </div>
                )}
                {selectedAd.promotionText && (
                  <div>
                    <span className="text-slate-400 text-sm">Promotion:</span>
                    <p className="text-slate-200">{selectedAd.promotionText}</p>
                  </div>
                )}
                <div>
                  <span className="text-slate-400 text-sm">Original Prompt:</span>
                  <p className="text-slate-200">{selectedAd.originalPrompt}</p>
                </div>
                <div>
                  <span className="text-slate-400 text-sm">Enhanced Prompt:</span>
                  <p className="text-slate-300 text-sm">{selectedAd.enhancedPrompt}</p>
                </div>
                {selectedAd.style && (
                  <div>
                    <span className="text-slate-400 text-sm">Style:</span>
                    <p className="text-slate-200 capitalize">{selectedAd.style}</p>
                  </div>
                )}
              </div>

              <button
                onClick={() => downloadImage(
                  selectedAd.imageUrl,
                  `${selectedAd.brandName || 'ad'}-banner-${selectedAd.id}.png`
                )}
                className="w-full py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download High-Resolution Banner
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}