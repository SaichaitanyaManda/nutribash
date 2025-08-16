# 🥗 NutriPlate

> An interactive nutrition tracking web app that makes meal planning as satisfying as the meals themselves.

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-brightgreen?style=for-the-badge)](https://saichaitanyamanda.github.io/nutribash)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=flat-square&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![WebGL](https://img.shields.io/badge/WebGL-Shaders-red?style=flat-square&logo=opengl)](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)
[![Chart.js](https://img.shields.io/badge/Chart.js-Visualization-ff6384?style=flat-square&logo=chart.js)](https://www.chartjs.org/)

## ✨ Features

### 🎯 **Smart Nutrition Tracking**
- **Drag & Drop Interface**: Intuitively add ingredients to your plate
- **Real-time Analysis**: Instant nutrition breakdown as you build meals
- **AI-Powered Recommendations**: Get personalized suggestions for balanced nutrition

### 🎨 **Beautiful UI/UX**
- **WebGL Wave Background**: Mesmerizing animated gradients using custom shaders
- **Glassmorphism Design**: Modern frosted glass aesthetic with backdrop blur
- **Dark/Light Themes**: Seamless theme switching with localStorage persistence
- **Mobile-First**: Fully responsive with touch-optimized controls

### 📊 **Advanced Visualizations**
- **Concurrent Pie Charts**: Inner ring shows recommended values, outer ring displays current intake
- **Progress Bars**: Real-time macro tracking with color-coded feedback
- **Smart Analytics**: Dynamic nutrition balance analysis

### 🛠️ **Interaction Methods**
- **Desktop**: Drag ingredients from panel to plate
- **Mobile**: Tap counter buttons for precise control
- **Right-click**: Weight adjustment modal for fine-tuning
- **Drag-out**: Remove ingredients by dragging outside the plate

## 🚀 Quick Start

### Local Development
```bash
# Clone the repository
git clone https://github.com/SaichaitanyaManda/nutribash.git
cd nutribash

# Option 1: Python server
python server.py

# Option 2: Node.js server
node server.js

# Option 3: Simple HTTP server
python -m http.server 8000
```

### Live Demo
Visit the hosted version: **[nutribash.vercel.app](https://saichaitanyamanda.github.io/nutribash)**

## 🏗️ Technical Architecture

### Frontend Stack
- **Vanilla JavaScript** - Pure ES6+ with modern APIs
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **WebGL** - Custom vertex/fragment shaders for background
- **Chart.js** - Data visualization library
- **HTML5** - Semantic markup with accessibility features

### Key Components
```
📁 Project Structure
├── 🎨 styles.css          # Glassmorphism UI with CSS custom properties
├── ⚡ script.js           # Core app logic and WebGL shaders
├── 🏠 index.html          # Semantic HTML structure
├── 🖼️ image-assets/       # Ingredient images (JPEG)
└── 🚀 server.js/py        # Development servers
```

### WebGL Implementation
```glsl
// Custom fragment shader for wave animation
precision mediump float;
uniform vec2 iResolution;
uniform float iTime;

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (2.0 * fragCoord - iResolution.xy) / min(iResolution.x, iResolution.y);
    
    for(float i = 1.0; i < 8.0; i++) {
        uv.y += i * 0.1 / i * 
            sin(uv.x * i * i + iTime * 0.5) * sin(uv.y * i * i + iTime * 0.5);
    }
    
    vec3 col;
    col.r = uv.y - 0.1;
    col.g = uv.y + 0.3;
    col.b = uv.y + 0.95;
    
    fragColor = vec4(col, 1.0);
}
```

### Data Management
- **LocalStorage**: Custom ingredient persistence
- **Real-time Calculations**: Nutrition values computed per 50g servings
- **State Management**: Reactive updates across all components

## 🎮 User Interactions

| Action | Desktop | Mobile |
|--------|---------|--------|
| Add Ingredient | Drag & Drop | Tap + Button |
| Remove Serving | Click - Button | Tap - Button |
| Remove All | Drag Outside Plate | - |
| Adjust Weight | Right-click Item | - |
| Theme Toggle | Click 🌙/☀️ | Tap 🌙/☀️ |

## 🎯 Nutrition Algorithm

The app calculates nutrition based on a **50g serving system**:

```javascript
// Nutrition calculation per serving
const GRAMS_PER_SERVING = 50;
const multiplier = GRAMS_PER_SERVING / 100; // Database values are per 100g

const nutritionValue = (ingredientValue * multiplier);
```

**Recommended Balance:**
- 🍞 Carbohydrates: 45%
- 💪 Proteins: 25%  
- 🥑 Fats: 20%
- 🥬 Fiber: 10%

## 🌟 Performance Features

- **60fps Animations**: Optimized WebGL rendering loop
- **Efficient DOM Updates**: Smart re-rendering only when needed
- **Responsive Images**: Optimized asset loading
- **Mobile Optimizations**: Touch-friendly interactions
- **Cross-browser Support**: Works on all modern browsers

## 🔧 Browser Compatibility

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ⚠️ Requires WebGL support for background animation

## 📱 Responsive Design

- **Desktop**: Full drag-and-drop experience
- **Tablet**: Optimized touch interactions
- **Mobile**: Counter-based ingredient management
- **Ultra-wide**: Adaptive grid layouts

## 🤝 Contributing

Found a bug or want to add a feature? Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this project for learning or building upon!

---

<div align="center">

**Built with ❤️ using modern web technologies**

[⭐ Star this repo](https://github.com/SaichaitanyaManda/nutribash) • [🐛 Report Bug](https://github.com/SaichaitanyaManda/nutribash/issues) • [💡 Request Feature](https://github.com/SaichaitanyaManda/nutribash/issues)

</div>