import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import * as topojson from 'topojson-client';
import { Globe } from './components/Globe';
import { GlobeControls } from './components/GlobeControls';
import { useRealtimeData } from './hooks/useRealtimeData';
import { getGeoCentroid } from './utils/geo';
import type { DataPoint, CountryData, LabelData, VisitorData } from './types/globe.types';

const VISITOR_TYPES = {
  NEW: { color: '#00ff88', label: 'New Visitor' }, // Bright cyan/green
  ACTIVE: { color: '#0088ff', label: 'Active User' }, // Electric blue
  CONVERSION: { color: '#ffaa00', label: 'Conversion' } // Golden orange
};

// Mock data helpers
const BROWSERS = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Brave'];
const OS_LIST = ['Windows 11', 'macOS Sonoma', 'iOS 17', 'Android 14', 'Linux'];
const DEVICES = ['Desktop', 'iPhone 15', 'Pixel 8', 'MacBook Pro', 'iPad Air'];
const CITIES = ['New York', 'London', 'Tokyo', 'Paris', 'Berlin', 'Sydney', 'Singapore', 'Dubai', 'Toronto', 'Mumbai'];
const COUNTRIES = ['USA', 'UK', 'Japan', 'France', 'Germany', 'Australia', 'Singapore', 'UAE', 'Canada', 'India'];

// Helper to generate random coordinates (weighted slightly towards populated areas roughly)
// For simplicity we still use random, but we could improve this later
const randomCoords = () => ({
  lat: (Math.random() - 0.5) * 160,
  lng: (Math.random() - 0.5) * 360,
});

function App() {
  const {
    points,
    rings,
    addPoint,
    clearAll,
    removePoint
  } = useRealtimeData();

  const [logs, setLogs] = useState<string[]>([]);
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [labels, setLabels] = useState<LabelData[]>([]);
  const [selectedVisitor, setSelectedVisitor] = useState<VisitorData | null>(null);
  const [visitorCoords, setVisitorCoords] = useState<{x: number, y: number} | null>(null);
  const getScreenCoordsRef = useRef<((lat: number, lng: number, altitude?: number) => { x: number, y: number } | null) | null>(null);

  const addLog = (message: string) => {
    setLogs(prev => [message, ...prev].slice(0, 20)); // Keep last 20 logs
  };

  useEffect(() => {
    fetch('//unpkg.com/world-atlas/countries-110m.json')
      .then(res => res.json())
      .then(worldData => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const countriesGeo = (topojson.feature(worldData, worldData.objects.countries) as any).features;
        setCountries(countriesGeo);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const countryLabels: LabelData[] = countriesGeo.map((feature: any) => {
            const centroid = getGeoCentroid(feature);
            if (!centroid) return null;
            
            return {
                lat: centroid.lat,
                lng: centroid.lng,
                label: feature.properties.NAME || feature.properties.name || feature.properties.ADMIN || '',
                size: 0.6,
                color: 'rgba(210, 210, 210, 0.75)',
                dotRadius: 0,
                altitude: 0.01
            };
        }).filter((l: LabelData | null) => l !== null && l.label !== '');
         
         console.log(`Generated ${countryLabels.length} country labels`);
         setLabels(countryLabels as LabelData[]);
      });
  }, []);

  const handleAddVisitor = useCallback(() => {
    const { lat, lng } = randomCoords();
    
    // Determine visitor type
    const rand = Math.random();
    let type = VISITOR_TYPES.ACTIVE;
    if (rand > 0.9) type = VISITOR_TYPES.CONVERSION;
    else if (rand > 0.6) type = VISITOR_TYPES.NEW;

    const randomIdx = Math.floor(Math.random() * CITIES.length);
    
    const point: VisitorData = {
      lat,
      lng,
      size: 0.4, // Small but visible
      color: type.color,
      label: `${type.label} (${lat.toFixed(1)}, ${lng.toFixed(1)})`,
      altitude: 0.02,
      customData: { type: type.label, timestamp: Date.now() },
      city: CITIES[randomIdx],
      country: COUNTRIES[randomIdx],
      device: DEVICES[Math.floor(Math.random() * DEVICES.length)],
      browser: BROWSERS[Math.floor(Math.random() * BROWSERS.length)],
      os: OS_LIST[Math.floor(Math.random() * OS_LIST.length)],
      duration: `${Math.floor(Math.random() * 10) + 1}m ${Math.floor(Math.random() * 60)}s`,
      currentUrl: `https://example.com/${['products', 'blog', 'pricing', 'about'][Math.floor(Math.random() * 4)]}`
    };
    
    addPoint(point);
    addLog(`New ${type.label} from ${point.city}, ${point.country}`);

    // Auto-remove after 60 seconds (handled by effect below or simple timeout here)
    // Using simple timeout for individual point management
    setTimeout(() => {
        removePoint(lat, lng);
    }, 60000);

  }, [addPoint, points, removePoint]);

  const handleClear = useCallback(() => {
    clearAll();
    addLog('Cleared all data');
  }, [clearAll]);

  const globeConfig = useMemo(() => ({
    enableAutoRotate: false,
    autoRotateSpeed: 0.5,
    backgroundColor: '#000011',
    globeImageUrl: '//unpkg.com/three-globe/example/img/earth-night.jpg',
    bumpImageUrl: '//unpkg.com/three-globe/example/img/earth-topology.png',
    backgroundImageUrl: '//unpkg.com/three-globe/example/img/night-sky.png',
    enableAtmosphere: true,
    atmosphereColor: '#3a228a',
    atmosphereAltitude: 0.15
  }), []);

  const handlePointClick = useCallback((point: DataPoint, coords: { x: number, y: number } | null) => {
    if ('city' in point) {
        setSelectedVisitor(point as VisitorData);
        if (coords) {
            setVisitorCoords(coords);
        } else if (getScreenCoordsRef.current) {
            // Fallback if coords not passed directly (e.g. standard point click)
            const screenCoords = getScreenCoordsRef.current(point.lat, point.lng, point.altitude);
            setVisitorCoords(screenCoords);
        }
        addLog(`Viewing details for visitor from ${(point as VisitorData).city}`);
    } else {
        addLog(`Clicked: ${point.label}`);
    }
  }, []);

  // Update coords on every frame if visitor is selected to keep it attached during rotation
  useEffect(() => {
    let animationFrameId: number;
    
    const updateCoords = () => {
        if (selectedVisitor && getScreenCoordsRef.current) {
            const coords = getScreenCoordsRef.current(selectedVisitor.lat, selectedVisitor.lng, selectedVisitor.altitude);
            setVisitorCoords(coords);
        }
        animationFrameId = requestAnimationFrame(updateCoords);
    };

    if (selectedVisitor) {
        updateCoords();
    }

    return () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    };
  }, [selectedVisitor]);

  const closeDetails = useCallback(() => {
    setSelectedVisitor(null);
    setVisitorCoords(null);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', background: '#000011' }}>
      <Globe 
        config={globeConfig}
        points={points} 
        htmlElements={points} // Add this line to render avatars
        arcs={[]} // Removed arcs
        rings={rings}
        countries={countries}
        labels={labels}
        onPointClick={handlePointClick}
        getScreenCoords={(fn) => { getScreenCoordsRef.current = fn; }}
      />
      
      <GlobeControls 
        onAddPoint={handleAddVisitor}
        onAddArc={() => {}} // Disabled manual arc adding for now to keep it automated
        onClear={handleClear}
      />

      {/* Event Log with Glassmorphism */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        width: '300px',
        background: 'rgba(20, 20, 30, 0.6)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        padding: '20px',
        color: '#e0e0e0',
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        fontSize: '13px',
        pointerEvents: 'none',
        zIndex: 10,
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#fff', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Live Traffic</h3>
        <div style={{ height: '200px', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {logs.map((log, i) => (
            <div key={i} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                opacity: 1 - i * 0.05,
                animation: 'fadeIn 0.3s ease-in'
            }}>
              <span style={{ 
                  color: '#888', 
                  fontSize: '11px', 
                  marginRight: '10px',
                  minWidth: '50px' 
              }}>{new Date().toLocaleTimeString()}</span> 
              <span style={{ color: '#ccc' }}>{log}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Visitor Details Card */}
      {selectedVisitor && visitorCoords && (
        <div style={{
            position: 'absolute',
            top: visitorCoords.y,
            left: visitorCoords.x,
            transform: 'translate(-50%, -120%)', // Position above the dot
            background: 'rgba(20, 20, 30, 0.9)',
            backdropFilter: 'blur(16px)',
            borderRadius: '16px',
            padding: '24px',
            width: '320px',
            color: '#fff',
            fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            zIndex: 100,
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.8)',
            animation: 'scaleIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            pointerEvents: 'auto'
        }}>
            {/* Connecting line to the dot */}
            <div style={{
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '0',
                height: '0',
                borderLeft: '10px solid transparent',
                borderRight: '10px solid transparent',
                borderTop: '10px solid rgba(20, 20, 30, 0.9)',
                filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.5))'
            }} />
            <button 
                onClick={closeDetails}
                style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'transparent',
                    border: 'none',
                    color: '#888',
                    cursor: 'pointer',
                    fontSize: '20px'
                }}
            >×</button>
            
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ 
                    width: '64px', 
                    height: '64px', 
                    borderRadius: '50%', 
                    overflow: 'hidden',
                    border: `3px solid ${selectedVisitor.color}`,
                    marginRight: '16px'
                }}>
                    <img 
                        src={selectedVisitor.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedVisitor.label}`} 
                        alt="Avatar" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
                <div>
                    <h2 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>Visitor Details</h2>
                    <div style={{ fontSize: '12px', color: '#aaa', display: 'flex', alignItems: 'center' }}>
                        <span style={{ 
                            width: '8px', 
                            height: '8px', 
                            borderRadius: '50%', 
                            background: '#00ff88', 
                            marginRight: '6px' 
                        }}></span>
                        Online Now
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <DetailItem label="Location" value={`${selectedVisitor.city}, ${selectedVisitor.country}`} fullWidth />
                <DetailItem label="Device" value={selectedVisitor.device} />
                <DetailItem label="Browser" value={selectedVisitor.browser} />
                <DetailItem label="OS" value={selectedVisitor.os} />
                <DetailItem label="Time on Site" value={selectedVisitor.duration} />
                <DetailItem label="Current Page" value={selectedVisitor.currentUrl} fullWidth isLink />
            </div>
        </div>
      )}
    </div>
  );
}

// Helper component for details
const DetailItem = ({ label, value, fullWidth = false, isLink = false }: { label: string, value: string, fullWidth?: boolean, isLink?: boolean }) => (
    <div style={{ gridColumn: fullWidth ? 'span 2' : 'span 1' }}>
        <div style={{ fontSize: '11px', color: '#888', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
        <div style={{ 
            fontSize: '14px', 
            color: isLink ? '#4a9eff' : '#eee', 
            whiteSpace: 'nowrap', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis',
            textDecoration: isLink ? 'underline' : 'none',
            cursor: isLink ? 'pointer' : 'default'
        }}>
            {value}
        </div>
    </div>
);

export default App;
