import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Zap,
  Image as ImageIcon,
  Grid3x3,
  ArrowRight,
  Wand2,
} from "lucide-react";

//

export default function HomePage({ generatedAds }) {
  const navigate = useNavigate();

  // Get latest 6 ads for showcase
  const recentAds = generatedAds.slice(0, 6);

  const features = [
    {
      icon: Wand2,
      title: "AI-Powered Generation",
      description:
        "Advanced AI enhances your prompts and creates stunning ad banners",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate professional banners in seconds, not hours",
    },
    {
      icon: Grid3x3,
      title: "Multiple Categories",
      description: "Organize ads by e-commerce, food, clothing, and more",
    },
    {
      icon: ImageIcon,
      title: "High Resolution",
      description: "Download print-ready banners up to 1024x576px",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">AI Ads Generator</h1>
              <p className="text-xs text-slate-400">
                Create stunning banners instantly
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate("/gallery")}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all"
            >
              Gallery
            </button>
            <button
              onClick={() => navigate("/generator")}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Ad Banner Generation</span>
          </div>

          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-violet-200 to-fuchsia-200 bg-clip-text text-transparent">
            Create Professional Ad Banners in Seconds
          </h1>

          <p className="text-xl text-slate-300 mb-8">
            Transform your ideas into stunning, high-resolution ad banners with
            AI. No design skills required.
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate("/generator")}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 font-semibold text-lg hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              Start Creating
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate("/gallery")}
              className="px-8 py-4 rounded-xl bg-slate-800 font-semibold text-lg hover:bg-slate-700 transition-all"
            >
              View Examples
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-violet-500/50 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Example Gallery */}
      {recentAds.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-800">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Recent Creations</h2>
            <p className="text-slate-400 text-lg">
              See what others have created with AI Ads Generator
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {recentAds.map((ad) => (
              <div
                key={ad.id}
                className="group relative rounded-2xl overflow-hidden border border-slate-800 hover:border-violet-500 transition-all bg-slate-900/50"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={ad.imageUrl}
                    alt={ad.brandName || "Generated ad"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    {ad.brandName && (
                      <h3 className="font-semibold text-lg">{ad.brandName}</h3>
                    )}
                    <span className="px-2 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs">
                      {ad.category}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm line-clamp-2">
                    {ad.originalPrompt}
                  </p>
                  <p className="text-slate-500 text-xs mt-2">
                    {new Date(ad.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate("/gallery")}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition-all inline-flex items-center gap-2"
            >
              View All Creations
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-800">
        <div className="text-center bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 rounded-3xl p-12">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Create Your First Ad?
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            Join thousands of marketers creating professional banners with AI
          </p>
          <button
            onClick={() => navigate("/generator")}
            className="px-10 py-4 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 font-semibold text-lg hover:opacity-90 transition-opacity inline-flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Start Creating Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-500 text-sm">
          <p>© 2024 AI Ads Generator. Powered by DeAPI & Cloudflare AI.</p>
        </div>
      </footer>
    </div>
  );
}
