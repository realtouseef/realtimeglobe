Create a stunning real-time 3D globe visualization with the following exact specifications:

GLOBE APPEARANCE:
- Use a dark space background (#000011 or similar deep blue-black)
- Earth texture: Use night-time Earth texture showing city lights (from three-globe examples or NASA)
- Add a glowing atmospheric layer around the globe in purple/blue (#3a228a or #4a5fff)
- Atmosphere altitude: 0.15-0.25 for subtle glow effect
- Add bump/topology map for 3D terrain relief
- Ambient lighting: soft and atmospheric, not too bright
- Two directional lights: one from top-right, one from bottom-left for depth

GLOBE BEHAVIOR:
- Auto-rotate slowly (0.3-0.5 speed) for cinematic effect
- Smooth, continuous rotation on Y-axis
- Camera positioned at distance ~250-300 units from globe center
- Enable mouse controls for manual rotation (optional: disable to keep it elegant)

VISITOR POINTS DISPLAY:
Each visitor should appear as:
- Small glowing dot at exact lat/lng coordinates
- Color scheme: 
  - New visitors: bright cyan/green (#00ff88, #00ffff)
  - Active users: electric blue (#0088ff)
  - Conversions/important events: golden orange (#ffaa00, #ff6b00)
- Point size: 0.3-0.5 units (small but visible)
- Point altitude: 0.01-0.02 (slightly above surface)
- Semi-transparent glow effect around each point

VISITOR ARRIVAL ANIMATION:
When a new visitor appears:
1. Point fades in over 0.5 seconds
2. Simultaneously, an expanding ring emanates from that location:
   - Starts at radius 0
   - Expands to max radius 2-4 units
   - Duration: 1.5-2 seconds
   - Fades out as it expands (opacity goes from 0.8 to 0)
   - Color matches the visitor point color
   - Creates a "radar ping" or "sonar pulse" effect

OPTIONAL ENHANCEMENTS:
- Connection arcs: Draw curved lines between consecutive visitors (showing journey)
- Arc animation: Dash animation flowing from start to end point
- Label on hover: Show city/country name when hovering over a point
- Trailing effect: Points fade out after 30-60 seconds to prevent clutter
- Particle effects: Tiny particles that rise from visitor locations briefly

VISITOR DATA SIMULATION:
For demo purposes, generate random visitors every 1-3 seconds with:
- Random lat/lng coordinates (weighted toward populated areas if possible)
- Random visitor type (90% regular, 10% conversion)
- Store last 50-100 visitors for performance
- Auto-remove old points after 60 seconds

PERFORMANCE OPTIMIZATIONS:
- Merge points into single geometry for better performance
- Limit total visible points to 100-200 max
- Use requestAnimationFrame for smooth 60fps rendering
- Dispose of old geometries properly to prevent memory leaks

STYLING DETAILS:
- Container should be full viewport (100vw, 100vh)
- No borders, margins, or padding on canvas
- Background: match the space theme gradient
- If adding UI controls, use glassmorphism effect (translucent dark background with blur)

The final result should look like a premium analytics dashboard - sleek, modern, and mesmerizing to watch as visitor data flows in real-time across the planet.