# 🎨 SnapBanner - AI-Powered Ad Banner Generator

[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

> Create stunning, professional ad banners in seconds using AI. No design skills required.

![SnapBanner Preview](https://via.placeholder.com/1200x600/1e293b/ffffff?text=SnapBanner+AI+Ad+Generator)

## ✨ Features

### 🤖 AI-Powered Generation
- **Smart Prompt Enhancement**: AI refines your descriptions for better results
- **Optional AI Mode**: Choose to enhance prompts or generate directly
- **Caption & Hashtag Generation**: Automatic social media content creation
- **Multi-Style Support**: 8+ aesthetic styles (modern, minimalist, luxury, etc.)

### 🎯 Campaign Management
- **Organized Campaigns**: Sort ads by category (E-commerce, Food, Clothing, Business)
- **Chat-based Interface**: Each campaign maintains conversation history
- **Previous Generations**: Quick access to past creations
- **Rename & Delete**: Full campaign management controls

### 🎨 Professional Output
- **High Resolution**: 1024x576px print-ready banners
- **Brand Customization**: Add brand name and promotion text
- **Style Selection**: Choose from 8 distinct visual styles
- **Instant Download**: One-click banner download

### 📱 Responsive Design
- **Mobile-First**: Fully optimized for mobile devices
- **Tablet Support**: Perfect experience on iPads and tablets
- **Desktop Layout**: Collapsible sidebar for maximum workspace
- **Touch-Friendly**: Optimized for touch interactions

### 💡 User Experience
- **Examples & Templates**: 8 pre-made examples to get started
- **Quick Tips**: Built-in guidance for better prompts
- **Progress Tracking**: Real-time generation status
- **Copy to Clipboard**: Easy caption and hashtag copying

## 🚀 Quick Start

### Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager
- API keys for:
  - Cloudflare Workers AI (for prompt enhancement)
  - DEAPI (for image generation)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ft-prince/AISnapbanner.git
   cd AISnapbanner
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_CLOUDFLARE_API=your_cloudflare_api_url
   VITE_DEAPI_KEY=your_deapi_key
   ```

4. **Add sample images** (optional)
   
   Place your sample banner images in `public/assets/`:
   - 1.png, 2.png, 3.png, 4.png, 5.png, 6.png, 7.png, 8.png, 9.png

5. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
snapbanner/
├── public/
│   ├── assets/              # Sample banner images
│   │   ├── 1.png
│   │   ├── 2.png
│   │   └── ...
│   └── vite.svg
├── src/
│   ├── pages/
│   │   ├── HomePage.jsx     # Landing page with showcase
│   │   └── AdGenerator.jsx  # Main generator interface
│   ├── App.jsx              # Main app component & routing
│   ├── main.jsx            # App entry point
│   └── index.css           # Global styles
├── .env                    # Environment variables (create this)
├── vercel.json            # Vercel deployment config
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Usage Guide

### Creating Your First Banner

1. **Start a Campaign**
   - Click "Get Started" or navigate to Generator
   - Select a category (E-commerce, Food, Clothing, etc.)
   - Click "New Campaign"

2. **Fill in Details**
   - **Brand Name**: Your company or product name
   - **Promotion Text**: Special offer or message
   - **Style**: Choose from 8 visual styles
   - **Description**: Describe your desired banner

3. **Generate**
   - **Option 1**: Click "Enhance with AI" to refine your prompt, then review and generate
   - **Option 2**: Click "Generate Without AI Enhancement" for direct generation

4. **Download & Share**
   - Preview your generated banner
   - Copy the AI-generated caption
   - Copy suggested hashtags
   - Download high-resolution image

### Using Examples

Click the "Examples" button to:
- View 8 pre-made templates
- Copy example details
- Use as starting point for your banner

## 🎨 Available Styles

| Style | Best For |
|-------|----------|
| **Modern** | Tech, startups, contemporary brands |
| **Minimalist** | Clean designs, luxury goods, professional services |
| **Vibrant** | Youth brands, events, entertainment |
| **Elegant** | Fashion, beauty, upscale products |
| **Playful** | Children's products, fun brands, casual dining |
| **Professional** | Corporate, B2B, financial services |
| **Luxury** | Premium brands, high-end products |
| **Casual** | Everyday brands, comfort products |

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_CLOUDFLARE_API` | Cloudflare Workers AI endpoint for prompt enhancement | Yes |
| `VITE_DEAPI_KEY` | DEAPI authentication key for image generation | Yes |

### API Endpoints

**Cloudflare Workers AI**
- Purpose: Prompt enhancement and caption generation
- Model: Uses Cloudflare's AI models
- Timeout: 60s for first request, 30s for retries

**DEAPI**
- Purpose: Text-to-image generation
- Model: ZImageTurbo_INT8
- Resolution: 1024x576 pixels
- Processing: Asynchronous with polling

## 📦 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Add environment variables** in Vercel dashboard:
   - `VITE_CLOUDFLARE_API`
   - `VITE_DEAPI_KEY`

4. **The `vercel.json` file handles routing** for React Router

### Other Platforms

For platforms like Netlify, AWS Amplify, or GitHub Pages:

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder

3. Configure rewrites for SPA routing (similar to `vercel.json`)

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **Routing**: React Router 6
- **Icons**: Lucide React
- **State Management**: React Hooks + localStorage

### Key Dependencies

```json
{
  "react": "^18.x",
  "react-router-dom": "^6.x",
  "lucide-react": "latest",
  "tailwindcss": "^3.x"
}
```

## 🎨 Customization

### Adding New Categories

Edit `AdGenerator.jsx`:

```javascript
const categories = [
  { name: "Your Category", icon: YourIcon },
  // ... existing categories
];
```

### Adding New Styles

Edit `AdGenerator.jsx`:

```javascript
const styles = [
  "your-style",
  // ... existing styles
];
```

### Modifying Examples

Edit the `examples` array in the `ExamplesModal` component:

```javascript
const examples = [
  {
    id: 1,
    category: "Your Category",
    brand: "Your Brand",
    promotion: "Your Promotion",
    style: "your-style",
    description: "Your description...",
    tags: ["Tag1", "Tag2"]
  },
  // ... more examples
];
```

## 🐛 Troubleshooting

### Common Issues

**1. 404 Error on Direct Route Access**
- **Solution**: Ensure `vercel.json` is properly configured
- The file redirects all routes to `/index.html`

**2. API Timeout on First Request**
- **Cause**: Cold start on serverless functions
- **Solution**: Wait and retry - subsequent requests are faster

**3. Images Not Loading**
- **Check**: Images are in `public/assets/` folder
- **Verify**: File names match (1.png, 2.png, etc.)

**4. Generation Fails**
- **Verify**: API keys are correctly set in `.env`
- **Check**: Console for error messages
- **Try**: Simpler, shorter descriptions

## 📝 Best Practices

### Writing Effective Prompts

✅ **Do:**
- Be specific about lighting and mood
- Mention photography style
- Include composition details
- Add quality keywords

❌ **Don't:**
- Use vague descriptions
- Omit important details
- Make descriptions too long (>500 chars)

### Example Prompts

**Good Prompt:**
```
Sleek wireless earbuds with charging case, floating on gradient 
background, studio lighting, product photography style, 
professional, high-resolution, modern aesthetic
```

**Poor Prompt:**
```
Earbuds
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI Models**: Cloudflare Workers AI & DEAPI
- **Hosting**: [Vercel](https://vercel.com/)

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/snapbanner/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/snapbanner/discussions)
- **Email**: support@snapbanner.com

## 🗺️ Roadmap

- [ ] Multi-language support
- [ ] Custom dimensions
- [ ] Batch generation
- [ ] Template library
- [ ] Brand kit management
- [ ] Video banner generation
- [ ] A/B testing suggestions
- [ ] Analytics integration

---

<div align="center">

**Made with ❤️ by the Prince**


</div>