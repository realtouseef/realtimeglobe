Create a real-time 3D globe visualization component using React, Vite, and TypeScript. The globe should display animated data points with the following requirements:

TECH STACK:
- React ^19.2.0 with TypeScript
- Vite as build tool
- Globe.GL library for 3D globe rendering
- Three.js for WebGL rendering
- Use pnpm for installing packages

PROJECT STRUCTURE:
src/
├── components/
│   ├── Globe.tsx (main globe component)
│   └── GlobeControls.tsx (optional UI controls)
├── hooks/
│   ├── useGlobe.ts (globe initialization and management)
│   └── useRealtimeData.ts (real-time data handling)
├── types/
│   └── globe.types.ts (TypeScript interfaces)
└── App.tsx

CORE FEATURES:
1. Interactive 3D globe with Earth texture and atmosphere
2. Add animated points at lat/lng coordinates with custom colors and sizes
3. Animated arcs connecting two points
4. Expanding ring animations at specific locations (like radar pulses)
5. Auto-rotation with configurable speed
6. Responsive canvas that fills container
7. Clean component lifecycle (proper cleanup on unmount)

TYPESCRIPT INTERFACES NEEDED:
- GlobeConfig (container ref, images, colors, rotation settings)
- DataPoint (lat, lng, color, size, altitude, label, custom data)
- ArcData (start/end coordinates, color, altitude, stroke width)
- RingData (lat, lng, max radius, speed, color)

COMPONENT API:
The Globe component should accept props for:
- Initial configuration
- Callback functions for point clicks
- Data arrays for points, arcs, and rings
- Methods to add/remove data dynamically

Include a demo App.tsx that:
- Renders the globe component
- Simulates real-time data by adding random points every 2 seconds
- Has buttons to add points, arcs, clear data, and toggle rotation
- Shows recent events in a sidebar

Make it production-ready with proper TypeScript types, error handling, and performance optimizations for handling hundreds of data points.