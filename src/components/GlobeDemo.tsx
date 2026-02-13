import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import * as topojson from 'topojson-client';
import { Globe } from './Globe';
import { Dashboard } from './Dashboard';
import { useRealtimeData } from '../hooks/useRealtimeData';
import { getGeoCentroid } from '../utils/geo';
import type { DataPoint, CountryData, LabelData, VisitorData } from '../types/globe.types';

import { CITIES as CITY_LOCATIONS } from '../data/cities';

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
const REFERRERS = ['Google', 'Twitter', 'Direct', 'marclou.com', 'Product Hunt', 'Hacker News'];
const DICEBEAR_STYLES = [
  'adventurer',
  'adventurer-neutral',
  'avataaars',
  'avataaars-neutral',
  'big-ears',
  'big-ears-neutral',
  'big-smile',
  'bottts',
  'bottts-neutral',
  'croodles',
  'fun-emoji',
  'icons',
  'identicon',
  'initials',
  'lorelei',
  'lorelei-neutral',
  'micah',
  'miniavs',
  'notionists',
  'notionists-neutral',
  'open-peeps',
  'personas',
  'pixel-art',
  'pixel-art-neutral',
  'rings',
  'shapes',
  'thumbs',
];
const SITE_NAME = 'realtimeglobe';

// Helper to generate random coordinates (weighted slightly towards populated areas roughly)
// For simplicity we still use random, but we could improve this later
const randomCoords = () => ({
  lat: (Math.random() - 0.5) * 160,
  lng: (Math.random() - 0.5) * 360,
});

export function GlobeDemo({ theme }: { theme?: 'minimal' | 'earth-night' | 'earth-day' }) {
  const {
    points,
    rings,
    addPoint,
    removePoint
  } = useRealtimeData();

  const [logs, setLogs] = useState<string[]>([]);
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [labels, setLabels] = useState<LabelData[]>([]);
  const [selectedVisitor, setSelectedVisitor] = useState<VisitorData | null>(null);
  const [visitorCoords, setVisitorCoords] = useState<{x: number, y: number} | null>(null);
  const getScreenCoordsRef = useRef<((lat: number, lng: number, altitude?: number) => { x: number, y: number } | null) | null>(null);
  const [avatarStyle, setAvatarStyle] = useState('avataaars');

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [localTheme, setLocalTheme] = useState<'minimal' | 'earth-night' | 'earth-day'>('minimal');
  const currentTheme = theme || localTheme;

  const dashboardRef = useRef<HTMLDivElement>(null);

  const addLog = (message: string) => {
    setLogs(prev => [message, ...prev].slice(0, 20)); // Keep last 20 logs
  };

  const createDiceBearUrl = useCallback((style: string, seed: string) => (
    `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(seed)}`
  ), []);

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
                altitude: 0.01,
                type: 'country'
            };
        }).filter((l: LabelData | null) => l !== null && l.label !== '');
         
         // Create city labels
         const cityLabels: LabelData[] = CITY_LOCATIONS.map(city => ({
             lat: city.lat,
             lng: city.lng,
             label: city.name,
             size: 0.5,
             color: 'rgba(255, 255, 255, 0.9)',
             dotRadius: 0.3,
             altitude: 0.005,
             type: 'city'
         }));

         console.log(`Generated ${countryLabels.length} country labels and ${cityLabels.length} city labels`);
         setLabels([...countryLabels, ...cityLabels]);
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
      currentUrl: `https://example.com/${['products', 'blog', 'pricing', 'about'][Math.floor(Math.random() * 4)]}`,
      referrer: REFERRERS[Math.floor(Math.random() * REFERRERS.length)],
      avatarUrl: createDiceBearUrl(avatarStyle, `${type.label}-${lat.toFixed(2)}-${lng.toFixed(2)}`)
    };
    
    addPoint(point);
    addLog(`New ${type.label} from ${point.city}, ${point.country}`);

    // Auto-remove after 60 seconds (handled by effect below or simple timeout here)
    // Using simple timeout for individual point management
    setTimeout(() => {
        removePoint(lat, lng);
    }, 60000);

  }, [addPoint, removePoint, avatarStyle, createDiceBearUrl]);

  const htmlElements = useMemo(() => (
    points.map((point) => ({
      ...point,
      avatarUrl: createDiceBearUrl(
        avatarStyle,
        point.label || `${point.lat.toFixed(2)}-${point.lng.toFixed(2)}`
      )
    }))
  ), [points, avatarStyle, createDiceBearUrl]);

  const avatarPreviewItems = useMemo(() => (
    DICEBEAR_STYLES.map((style) => ({
      style,
      url: createDiceBearUrl(style, SITE_NAME)
    }))
  ), [createDiceBearUrl]);

  const headerAvatarUrl = useMemo(() => (
    createDiceBearUrl(avatarStyle, SITE_NAME)
  ), [avatarStyle, createDiceBearUrl]);

  const selectedAvatarUrl = useMemo(() => {
    if (!selectedVisitor) return '';
    return createDiceBearUrl(
      avatarStyle,
      selectedVisitor.label || `${selectedVisitor.lat.toFixed(2)}-${selectedVisitor.lng.toFixed(2)}`
    );
  }, [selectedVisitor, avatarStyle, createDiceBearUrl]);

  const handleToggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement && dashboardRef.current) {
        await dashboardRef.current.requestFullscreen();
      } else if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch {
      setLogs(prev => ['Fullscreen unavailable in this browser', ...prev].slice(0, 20));
    }
  }, []);

  const globeConfig = useMemo(() => ({
    enableAutoRotate: false,
    autoRotateSpeed: 0.5,
    backgroundColor: 'rgba(0,0,0,0)',
    // theme will handle textures
    globeImageUrl: null,
    bumpImageUrl: null,
    backgroundImageUrl: null,
    enableAtmosphere: true,
    atmosphereColor: '#3a228a',
    atmosphereAltitude: 0.25,
    theme: currentTheme
  }), [currentTheme]);

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

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div ref={dashboardRef} className="w-full h-full relative overflow-hidden rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-transparent bg-no-repeat bg-[length:100%_100%]" style={{ 
      backgroundImage: `radial-gradient(circle at 50% 50%, rgba(30, 58, 138, 0.6) 0%, rgba(30, 58, 138, 0) var(--glow-spread, 40%))`
    }}>


      <Globe 
        config={globeConfig}
        points={points} 
        htmlElements={htmlElements}
        arcs={[]}
        rings={rings}
        countries={countries}
        labels={labels}
        onPointClick={handlePointClick}
        getScreenCoords={(fn) => { getScreenCoordsRef.current = fn; }}
      />
      
      <Dashboard 
        visitors={points as VisitorData[]}
        siteName={SITE_NAME}
        avatarUrl={headerAvatarUrl}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
        onRefresh={handleAddVisitor}
        currentTheme={currentTheme}
        onThemeChange={setLocalTheme}
        avatarStyle={avatarStyle}
        onAvatarStyleChange={setAvatarStyle}
        avatarStyles={avatarPreviewItems}
      />



      {/* Event Log with Glassmorphism */}
      <div className="absolute bottom-4 left-4 w-[260px] bg-[#14141e]/60 backdrop-blur-md rounded-xl p-4 text-[#e0e0e0] font-sans text-xs pointer-events-none z-10 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        <h3 className="m-0 mb-3 text-white text-[13px] uppercase tracking-widest">Live Traffic</h3>
        <div className="h-[160px] overflow-hidden flex flex-col gap-1.5">
          {logs.map((log, i) => (
            <div key={i} className="flex items-center animate-fadeIn" style={{ 
                opacity: 1 - i * 0.05
            }}>
              <span className="text-[#888] text-[11px] mr-2 min-w-[45px]">{new Date().toLocaleTimeString()}</span> 
              <span className="text-[#ccc]">{log}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Visitor Details Card */}
      {selectedVisitor && visitorCoords && (
        <div 
          className="absolute -translate-x-1/2 -translate-y-[120%] bg-[#14141e]/90 backdrop-blur-xl rounded-2xl p-6 w-[320px] text-white font-sans z-[100] border border-white/15 shadow-[0_10px_40px_rgba(0,0,0,0.8)] pointer-events-auto animate-scaleIn"
          style={{
            top: visitorCoords.y,
            left: visitorCoords.x,
        }}>
            {/* Connecting line to the dot */}
            <div className="absolute -bottom-[10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-[#14141e]/90 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]" />
            <button 
                onClick={closeDetails}
                className="absolute top-3 right-3 bg-transparent border-none text-[#888] cursor-pointer text-xl hover:text-white transition-colors"
            >×</button>
            
            <div className="flex items-center mb-5">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-[3px]" style={{ borderColor: selectedVisitor.color }}>
                    <img 
                        src={selectedAvatarUrl} 
                        alt="Avatar" 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <h2 className="m-0 mb-1 text-lg font-semibold">Visitor Details</h2>
                    <div className="text-xs text-[#aaa] flex items-center">
                        <span className="w-2 h-2 rounded-full bg-[#00ff88] mr-1.5"></span>
                        Online Now
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
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
    <div className={fullWidth ? 'col-span-2' : 'col-span-1'}>
        <div className="text-[11px] text-[#888] mb-1 uppercase tracking-wider">{label}</div>
        <div className={`text-sm whitespace-nowrap overflow-hidden text-ellipsis ${isLink ? 'text-[#4a9eff] underline cursor-pointer' : 'text-[#eee] cursor-default'}`}>
            {value}
        </div>
    </div>
);
