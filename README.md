# 🚀 Story Lab - AI-Powered Story Creation Tool

Turn a one-sentence idea into a complete visual storyboard in under 5 minutes. Story Lab is a zero-backend, mobile-friendly web application that helps creators generate outlines, images, and export complete story packages.

## ✨ Features

### 🧙‍♂️ 4-Step Wizard Flow
1. **Idea Entry** - Start with a simple logline
2. **Outline & Script** - AI-generated story structure with optional scripting
3. **Visual Generation** - Create images for each scene with AI or custom URLs
4. **Simple Cuts & Export** - Arrange scenes and export complete packages

### 🎨 Visual Generation
- **Multiple AI Providers** - OpenAI DALL-E, Stability AI, Replicate, and more
- **Session-Based Keys** - Secure, memory-only API key storage
- **URL Fallback** - Paste custom image URLs when no API key available
- **Style Consistency** - Global style lock with per-scene override capability

### 📱 Mobile-First Design
- **Touch-Friendly** - 48px minimum touch targets
- **Responsive Layout** - Works seamlessly on phone, tablet, and desktop
- **Offline-Capable** - All functionality works without internet (except image generation)

### 💾 Zero-Backend Architecture
- **Local Storage** - All projects saved in browser localStorage
- **Auto-Save** - Continuous saving every 10 seconds
- **Export System** - Download complete ZIP bundles with organized assets

## 🎯 MVP Scope

This is the **Minimum Viable Product** version focused on speed and core functionality:

- ✅ **Local Persistence** - Projects stored in browser
- ✅ **4-Step Wizard** - Streamlined creation flow
- ✅ **Image Generation** - AI-powered visuals with fallback options
- ✅ **Simple Cuts Editor** - Basic timeline with reordering and duration
- ✅ **Export Bundles** - ZIP download with scripts, images, and preview
- ✅ **Mobile UX** - Touch-optimized interface
- ✅ **Session Keys** - Secure API key management

### 🚫 Out of Scope (Phase 2+)
- Audio/TTS generation
- Video transitions beyond hard cuts
- User authentication
- Cloud synchronization
- Real-time collaboration
- Advanced timeline editing

## 🚀 Quick Start

### Option 1: Direct Browser Use
1. Download or clone this repository
2. Open `index.html` in your web browser
3. Start creating stories immediately!

### Option 2: Local Development Server
```bash
# Clone the repository
git clone https://github.com/undeadpickle/ai-story-lab.git
cd ai-story-lab

# Serve locally (Python 3)
python3 -m http.server 8000

# Or use Node.js
npx http-server -p 8000

# Open http://localhost:8000
```

## 📖 Usage Guide

### Creating Your First Story

1. **Start a Story**: Click "Start a Story" on the home screen
2. **Enter Your Idea**: Type a one-sentence logline (e.g., "A robot learns to paint watercolors")
3. **Generate Outline**: Click "Generate Outline" to create a structured story
4. **Create Visuals**: Load scenes and generate images (API key optional)
5. **Export**: Download your complete story package as a ZIP file

### API Keys (Optional)

For image generation, you can add API keys from supported providers:

- **OpenAI DALL-E** - Get key from [platform.openai.com](https://platform.openai.com)
- **Stability AI** - Get key from [stability.ai](https://stability.ai)
- **Replicate** - Get key from [replicate.com](https://replicate.com)

**Security Note**: Keys are stored only in memory for your current session and never saved permanently.

### Without API Keys

You can still create complete stories by:
- Using the "Paste Image URL" option for custom images
- Downloading story packages with placeholder images
- Focusing on the story structure and scripts

## 🏗️ Architecture

### Core Components

- **`storage.js`** - Local storage management and project CRUD operations
- **`outline-engine.js`** - Pattern-based story outline generation
- **`session-keys.js`** - Secure API key management system
- **`wizard.js`** - 4-step wizard flow controller
- **`app.js`** - Main application and navigation

### Story Templates

Three built-in story structures:
- **Simple Story** - Beginning, middle, end (3 scenes)
- **Three Act Structure** - Setup, conflict, resolution (5 scenes)
- **Hero's Journey** - Classic adventure structure (5 scenes)

### Data Model

```javascript
// Project Structure
{
  id: "story_timestamp_random",
  title: "Generated from logline",
  logline: "User's story idea",
  step: 1, // Current wizard step (1-4)
  outline: {
    template: "threeAct",
    scenes: [...]
  },
  visualScenes: [
    {
      id: "scene_1",
      title: "Scene Title",
      prompt: "Visual description",
      selectedImage: "image_url",
      generatedImages: [...]
    }
  ]
}
```

## 🧪 Testing

### Automated Tests
- **`test-outline.html`** - Test story outline generation engine
- **`test-wizard.html`** - Test wizard navigation and flow
- **`test-image-generation.html`** - Test complete image generation workflow

### Manual Testing Checklist
1. Create new story and test each wizard step
2. Test with and without API keys
3. Verify mobile responsiveness (375px width)
4. Test offline functionality
5. Verify export ZIP contents

## 🎨 Design Philosophy

### User Experience Principles
- **One Thing at a Time** - Each screen focuses on a single decision
- **Show the Path** - Clear progress indicators and breadcrumbs
- **Touch-First** - Optimized for mobile interaction
- **Gentle Guardrails** - Friendly error messages and recovery options

### Technical Principles
- **Zero Dependencies** - Pure HTML, CSS, JavaScript
- **Offline-First** - Works without internet connection
- **Privacy-Focused** - No data sent to external servers
- **Progressive Enhancement** - Core functionality without advanced features

## 🔄 Development Status

### ✅ Completed Features
- [x] Local storage system with auto-save
- [x] 4-step wizard with smooth navigation
- [x] Pattern-based outline generation
- [x] Session key management system
- [x] Image generation interface with fallbacks
- [x] Mobile-responsive design
- [x] Export system foundation

### 🚧 In Progress
- [ ] Simple cuts timeline editor
- [ ] ZIP bundle generation
- [ ] Video generation integration

### 📋 Planned Features
- [ ] Advanced export options
- [ ] Template customization
- [ ] Batch story creation
- [ ] Integration with more AI providers

## 🤝 Contributing

This project is in active development. Contributions welcome!

### Development Setup
1. Clone the repository
2. Make changes to the relevant files
3. Test using the provided test files
4. Submit a pull request

### Code Style
- 2-space indentation
- camelCase for variables and functions
- PascalCase for classes
- Max 120 characters per line
- ES6+ JavaScript features

## 📄 License

MIT License - see LICENSE file for details.

## 🔗 Links

- **Live Demo**: [Coming Soon]
- **Documentation**: See `/docs` folder for detailed specifications
- **Issues**: [GitHub Issues](https://github.com/undeadpickle/ai-story-lab/issues)

## 🙏 Acknowledgments

Built with Claude Code for rapid prototyping and development. Designed for creators who want to quickly turn ideas into visual stories.

---

**Ready to create your first story?** Open `index.html` and start building! 🚀