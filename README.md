# Realtime Globe 🌍

A high-performance, interactive 3D globe component for React, built with Three.js and Globe.gl. Perfect for visualizing real-time data, visitor tracking, or global networks.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-0.1.0-green.svg)

## ✨ Features

- **High-Performance Rendering**: Built on Three.js and Globe.gl for smooth 60fps animations.
- **Dynamic Themes**: Switch between Minimal, Earth Night, and Earth Day modes.
- **Interactive Data**: Support for Points, Arcs, Rings, and HTML markers.
- **Smart Zooming**: Automatic level-of-detail adjustments and label visibility.
- **Atmospheric Effects**: Realistic atmosphere glow and custom backgrounds.
- **Fully Typed**: Comprehensive TypeScript definitions included.

## 📦 Installation

This package requires `react`, `react-dom`, and `three` as peer dependencies.

```bash
npm install realtime-globe three
# or
yarn add realtime-globe three
# or
pnpm add realtime-globe three
```

## 🚀 Basic Usage

```tsx
import React from 'react';
import { Globe } from 'realtime-globe';

function App() {
  const points = [
    { 
      lat: 40.7128, 
      lng: -74.0060, 
      size: 0.5, 
      color: '#ff0000', 
      label: 'New York' 
    },
    { 
      lat: 51.5074, 
      lng: -0.1278, 
      size: 0.5, 
      color: '#00ff00', 
      label: 'London' 
    }
  ];

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Globe 
        points={points}
        config={{
          theme: 'earth-night',
          enableAtmosphere: true
        }}
        onPointClick={(point) => console.log('Clicked:', point)}
      />
    </div>
  );
}
```

## 📖 API Reference

### `<Globe />` Component

The main component for rendering the 3D globe.

| Prop | Type | Description |
|------|------|-------------|
| `config` | `GlobeConfig` | Configuration object for visual appearance. |
| `points` | `DataPoint[]` | Array of points to render on the globe surface. |
| `arcs` | `ArcData[]` | Array of arcs (lines) connecting points. |
| `rings` | `RingData[]` | Array of animated rings (ripples) at specific coordinates. |
| `labels` | `LabelData[]` | Text labels to display at coordinates. |
| `htmlElements` | `VisitorData[]` | Custom HTML markers (useful for avatars/tooltips). |
| `width` | `number` | Width of the globe container (defaults to 100%). |
| `height` | `number` | Height of the globe container (defaults to 100%). |
| `onPointClick` | `(point, event, coords) => void` | Callback when a point is clicked. |
| `onGlobeReady` | `() => void` | Callback when the globe is fully initialized. |

### Configuration (`GlobeConfig`)

Pass this object to the `config` prop to customize the globe's appearance.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `theme` | `'minimal' \| 'earth-night' \| 'earth-day' \| 'earth-blue'` | `'minimal'` | Preset visual themes. |
| `enableAutoRotate` | `boolean` | `false` | Whether the globe should rotate automatically. |
| `autoRotateSpeed` | `number` | `0.5` | Speed of auto-rotation. |
| `enableAtmosphere` | `boolean` | `true` | Show atmospheric glow. |
| `atmosphereColor` | `string` | `'#3a228a'` | Color of the atmosphere. |
| `backgroundColor` | `string` | `'#000011'` | Background color of the scene. |
| `globeImageUrl` | `string` | `null` | Custom texture URL for the globe surface. |
| `bumpImageUrl` | `string` | `null` | Custom bump map URL for topography. |

### Data Types

#### `DataPoint`
```typescript
interface DataPoint {
  lat: number;
  lng: number;
  color?: string;
  size?: number;
  altitude?: number;
  label?: string;
  customData?: any;
}
```

#### `ArcData`
```typescript
interface ArcData {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color?: string | string[];
  altitude?: number;
  strokeWidth?: number;
  dashLength?: number;
  animationTime?: number;
}
```

## 🛠️ Local Development

To run the example dashboard included in this repository:

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

## 📄 License

MIT
