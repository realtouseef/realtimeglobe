# RealtimeGlobe 🌍

A stunning, interactive 3D globe visualization built with React, Three.js, and Globe.gl. This application simulates real-time visitor tracking with a beautiful, futuristic dashboard interface.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## ✨ Features

### 🌐 Interactive 3D Globe
- **High-Performance Rendering**: Built on Three.js and Globe.gl for smooth 60fps animations.
- **Dynamic Zoom & Controls**: Seamless zoom limits, auto-rotation, and interactive controls.
- **Smart Labels**: City labels automatically appear when zooming in to reduce clutter.
- **Atmospheric Effects**: Realistic atmosphere glow and background radial gradients.

### 🎨 Theming & Customization
- **Multiple Themes**:
  - **Minimal**: Clean, vector-based dark grey aesthetic.
  - **Earth Night**: Satellite imagery of Earth at night.
  - **Earth Day**: Realistic daytime satellite imagery.
- **Avatar Personalization**: Choose from multiple avatar styles (e.g., Avataaars, Bottts, etc.) powered by DiceBear.

### 📊 Real-time Dashboard
- **Live Visitor Tracking**: Visualizes user sessions as interactive markers on the globe.
- **Analytics Cards**:
  - **Referrers**: Top traffic sources (Google, Twitter, Direct, etc.).
  - **Countries**: Visitor distribution by country.
  - **Devices**: Desktop vs. Mobile usage breakdown.
- **Visitor Details**: Click on any visitor marker to see detailed info including location, status, and avatar.

### 💻 Modern UI/UX
- **Glassmorphism Design**: Sleek, translucent UI elements with blur effects.
- **Fullscreen Mode**: Immersive viewing experience.
- **Responsive Layout**: Adapts to different screen sizes.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **3D Library**: [Three.js](https://threejs.org/) & [Globe.gl](https://globe.gl/)
- **Map Data**: [TopoJSON](https://github.com/topojson/topojson)
- **Styling**: CSS Modules & Inline Styles

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/realtimeglobe.git
   cd realtimeglobe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📂 Project Structure

```
src/
├── assets/          # Static assets
├── components/      # React components
│   ├── Dashboard.tsx    # Analytics panel & UI overlays
│   ├── Globe.tsx        # 3D Globe wrapper
│   └── GlobeControls.tsx # Camera controls
├── data/            # Static data files (Cities, etc.)
├── hooks/           # Custom React Hooks
│   ├── useGlobe.ts      # Core globe logic & configuration
│   └── useRealtimeData.ts # Data simulation/fetching
├── types/           # TypeScript definitions
└── utils/           # Helper functions (Geo calculations)
```

## 🎮 Controls

- **Left Click + Drag**: Rotate the globe.
- **Scroll**: Zoom in/out.
- **Click Marker**: View visitor details.
- **Dashboard Icons**:
  - 🔄 Refresh data
  - ⛶ Toggle Fullscreen
  - 👤 Change Avatar Style (Dropdown)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
