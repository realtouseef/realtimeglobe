import React, { useMemo, useState } from 'react';
import type { VisitorData } from '../types/globe.types';

interface DashboardProps {
  visitors: VisitorData[];
  siteName: string;
  avatarUrl: string;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onRefresh?: () => void;
  currentTheme: string;
  onThemeChange: (theme: 'minimal' | 'earth-night' | 'earth-day') => void;
  avatarStyle: string;
  onAvatarStyleChange: (style: string) => void;
  avatarStyles: { style: string; url: string }[];
}

// Icons
const Icons = {
  Logo: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Refresh: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 4v6h-6" />
      <path d="M1 20v-6h6" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  ),
  Fullscreen: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
    </svg>
  ),
  Minimize: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
    </svg>
  ),
  Link: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  Desktop: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  Mobile: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
  Google: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.5 12.28c0-.85-.07-1.68-.21-2.48H12v4.7h6.45c-.28 1.5-.96 2.75-2.05 3.48v2.9h3.32c1.94-1.79 3.06-4.43 3.06-7.6z" fill="#4285F4"/>
      <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.32-2.9c-1.07.72-2.44 1.14-4.01 1.14-3.09 0-5.71-2.09-6.64-4.9H2.6v3.08C4.58 21.43 8.02 24 12 24z" fill="#34A853"/>
      <path d="M5.36 14.43c-.23-.69-.36-1.43-.36-2.19 0-.77.13-1.5.36-2.19V6.97H2.6C1.08 9.99 1.08 13.52 2.6 16.55l2.76-2.12z" fill="#FBBC05"/>
      <path d="M12 4.77c1.76 0 3.34.61 4.58 1.8l3.43-3.44C17.94 1.15 15.24 0 12 0 8.02 0 4.58 2.57 2.6 6.97l2.76 2.12c.93-2.81 3.55-4.9 6.64-4.9z" fill="#EA4335"/>
    </svg>
  ),
  Theme: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  )
};

const THEME_STYLES = [
  { id: 'minimal', label: 'Minimal', preview: '//unpkg.com/three-globe/example/img/earth-topology.png' },
  { id: 'earth-night', label: 'Night', preview: '//unpkg.com/three-globe/example/img/earth-night.jpg' },
  { id: 'earth-day', label: 'Day', preview: '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg' }
];

const HeaderButton: React.FC<{ icon: React.ReactNode; onClick?: () => void }> = ({ icon, onClick }) => (
  <button 
    onClick={onClick}
    className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/20 bg-transparent text-white hover:bg-white/10 transition-colors cursor-pointer p-0"
  >
    {icon}
  </button>
);

const StatPill: React.FC<{ icon: React.ReactNode; label: string; count?: number; color?: string }> = ({ icon, label, count, color }) => (
  <div className="bg-[#242426] rounded-md px-2 py-[3px] flex items-center gap-1.5 text-xs text-[#e0e0e0] whitespace-nowrap">
    {typeof icon === 'string' ? (
      <img src={icon} alt="" className="w-4 h-3 rounded-[2px] object-cover" />
    ) : (
      icon
    )}
    <span style={{ color: color || 'inherit' }}>{label}</span>
    {count !== undefined && <span className="text-[#888] ml-0.5">({count})</span>}
  </div>
);

export const Dashboard: React.FC<DashboardProps> = ({
  visitors,
  siteName,
  avatarUrl,
  isFullscreen,
  onToggleFullscreen,
  onRefresh,
  currentTheme,
  onThemeChange,
  avatarStyle,
  onAvatarStyleChange,
  avatarStyles
}) => {
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  // Aggregations
  const referrers = useMemo(() => {
    const counts: Record<string, number> = {};
    visitors.forEach(v => {
      counts[v.referrer] = (counts[v.referrer] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20);
  }, [visitors]);

  const countries = useMemo(() => {
    const counts: Record<string, number> = {};
    visitors.forEach(v => {
      counts[v.country] = (counts[v.country] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20);
  }, [visitors]);

  const devices = useMemo(() => {
    const counts: Record<string, number> = {};
    visitors.forEach(v => {
      // Simplify device names for display
      const simpleDevice = v.device.includes('iPhone') || v.device.includes('Pixel') ? 'Mobile' : 'Desktop';
      counts[simpleDevice] = (counts[simpleDevice] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20);
  }, [visitors]);

  const getReferrerIcon = (ref: string) => {
    if (ref.toLowerCase() === 'direct') return <Icons.Link />;
    
    const domainMap: Record<string, string> = {
      'google': 'google.com',
      'twitter': 'twitter.com',
      'x.com': 'x.com',
      'product hunt': 'producthunt.com',
      'hacker news': 'news.ycombinator.com',
      'github': 'github.com',
      'facebook': 'facebook.com',
      'linkedin': 'linkedin.com',
      'reddit': 'reddit.com',
      'youtube': 'youtube.com',
      'instagram': 'instagram.com'
    };

    let domain = domainMap[ref.toLowerCase()];
    
    if (!domain) {
      if (ref.includes('.')) {
        domain = ref;
      } else {
        // Try to guess for unknown simple names
        domain = `${ref.toLowerCase().replace(/\s+/g, '')}.com`;
      }
    }

    return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
  };

  const getCountryFlag = (countryName: string) => {
    const codeMap: Record<string, string> = {
      'USA': 'us', 'UK': 'gb', 'Japan': 'jp', 'France': 'fr', 'Germany': 'de',
      'Australia': 'au', 'Singapore': 'sg', 'UAE': 'ae', 'Canada': 'ca', 'India': 'in',
      'Philippines': 'ph', 'Bulgaria': 'bg', 'Andorra': 'ad',
      'China': 'cn', 'Brazil': 'br', 'Russia': 'ru', 'South Korea': 'kr', 'Italy': 'it',
      'Spain': 'es', 'Netherlands': 'nl', 'Sweden': 'se', 'Switzerland': 'ch',
      'Indonesia': 'id', 'Turkey': 'tr', 'Saudi Arabia': 'sa', 'Mexico': 'mx'
    };
    const code = codeMap[countryName];
    return code ? `https://flagcdn.com/w40/${code}.png` : 'https://flagcdn.com/w40/un.png';
  };

  return (
    <div className="absolute top-4 left-4 w-80 max-w-[90vw] bg-[#151517] rounded-2xl p-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-white font-sans z-50 border border-white/10">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-md flex items-center justify-center shadow-[0_4px_12px_rgba(37,99,235,0.3)]">
            <Icons.Logo />
          </div>
          <div>
            <h1 className="text-[15px] font-semibold m-0 tracking-tighter">{siteName}</h1>
            <div className="flex items-center gap-1 mt-0">
              <span className="w-1 h-1 rounded-full bg-[#00ff88] shadow-[0_0_6px_#00ff88]" />
              <span className="text-[10px] text-[#888]">Live</span>
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          <HeaderButton icon={<Icons.Refresh />} onClick={onRefresh} />
          <HeaderButton icon={isFullscreen ? <Icons.Minimize /> : <Icons.Fullscreen />} onClick={onToggleFullscreen} />
          
          <div className="relative">
              <button 
                onClick={() => setIsThemeModalOpen(!isThemeModalOpen)}
                className="w-8 h-8 p-0 border-2 border-white/10 rounded-lg overflow-hidden cursor-pointer bg-transparent flex items-center justify-center hover:scale-105 transition-transform"
                title="Change Theme"
              >
                 <img 
                    src={THEME_STYLES.find(t => t.id === currentTheme)?.preview || THEME_STYLES[0].preview} 
                    alt="Theme" 
                    className="w-full h-full object-cover" 
                 />
              </button>

              {isThemeModalOpen && (
                <>
                    <div 
                        className="fixed inset-0 z-[100] cursor-default" 
                        onClick={() => setIsThemeModalOpen(false)}
                    />
                    <div className="absolute top-[calc(100%+8px)] right-0 w-[200px] bg-[#14141e]/95 rounded-xl p-2.5 border border-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.5)] z-[101] backdrop-blur-md">
                      <div className="text-[10px] text-[#8f97b7] tracking-widest mb-2 font-semibold uppercase">
                        Globe Theme
                      </div>
                      <div className="grid grid-cols-[repeat(auto-fill,minmax(32px,1fr))] gap-1">
                        {THEME_STYLES.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => {
                              onThemeChange(item.id as any);
                              setIsThemeModalOpen(false);
                            }}
                            className={`w-8 h-8 rounded-lg p-0 overflow-hidden cursor-pointer transition-all duration-200 ${item.id === currentTheme ? 'border-2 border-blue-500' : 'border border-white/10 bg-white/5'}`}
                            title={item.label}
                          >
                            <img src={item.preview} alt={item.label} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                </>
              )}
          </div>

          <div className="relative">
              <button 
                onClick={() => setIsAvatarModalOpen(!isAvatarModalOpen)}
                className="w-8 h-8 p-0 border-2 border-white/10 rounded-lg overflow-hidden cursor-pointer bg-transparent transition-transform hover:scale-105"
              >
                <img src={avatarUrl} alt="Profile" className="w-full h-full" />
              </button>

              {isAvatarModalOpen && (
                <>
                    <div 
                        className="fixed inset-0 z-[100] cursor-default" 
                        onClick={() => setIsAvatarModalOpen(false)}
                    />
                    <div className="absolute top-[calc(100%+8px)] right-0 w-[200px] bg-[#14141e]/95 rounded-xl p-2.5 border border-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.5)] z-[101] backdrop-blur-md">
                      <div className="text-[10px] text-[#8f97b7] tracking-widest mb-2 font-semibold uppercase">
                        Avatar Style
                      </div>
                      <div className="grid grid-cols-[repeat(auto-fill,minmax(32px,1fr))] gap-1">
                        {avatarStyles.map((item) => (
                          <button
                            key={item.style}
                            onClick={() => {
                              onAvatarStyleChange(item.style);
                              setIsAvatarModalOpen(false);
                            }}
                            className={`w-8 h-8 rounded-lg p-0 overflow-hidden cursor-pointer transition-all duration-200 ${item.style === avatarStyle ? 'border-2 border-blue-500' : 'border border-white/10 bg-white/5'}`}
                            title={item.style}
                          >
                            <img src={item.url} alt={item.style} className="w-full h-full" />
                          </button>
                        ))}
                      </div>
                    </div>
                </>
              )}
          </div>
        </div>
      </div>

      <div className="max-h-[calc(80vh-80px)] overflow-y-auto [&::-webkit-scrollbar]:hidden">
        
        {/* Visitor Summary */}
        <div className="flex items-center gap-1.5 text-xs mb-3 text-[#8f97b7]">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3B82F6]" />
          <div>
            <span className="text-white font-semibold">{visitors.length}</span> visitors on 
          </div>
          <div className="flex items-center gap-1 bg-black px-1.5 py-0.5 rounded border border-white/10">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            <span className="text-white font-semibold">{siteName}</span>
          </div>
          <span className="text-[#888]">(est. <span className="text-[#00ff88] font-medium">${Math.floor(visitors.length * 0.67)}</span>)</span>
        </div>

        {/* Stats Grid */}
      <div className="grid grid-cols-[70px_1fr] gap-2 items-center">
        {/* Referrers */}
        <div className="text-[#888] text-xs font-medium text-left">Referrers</div>
        <div className="flex gap-1.5 overflow-x-auto pb-0.5 [&::-webkit-scrollbar]:hidden">
          {referrers.map(([ref, count]) => (
            <StatPill 
              key={ref} 
              icon={getReferrerIcon(ref)} 
              label={ref} 
              count={count} 
            />
          ))}
          {referrers.length === 0 && <span className="text-[#444] text-[13px]">Waiting for data...</span>}
        </div>

        {/* Countries */}
        <div className="text-[#888] text-xs font-medium text-left">Countries</div>
        <div className="flex gap-1.5 overflow-x-auto pb-0.5 [&::-webkit-scrollbar]:hidden">
          {countries.map(([country, count]) => (
            <StatPill 
              key={country} 
              icon={getCountryFlag(country)} 
              label={country} 
              count={count} 
            />
          ))}
          {countries.length === 0 && <span className="text-[#444] text-[13px]">Waiting for data...</span>}
        </div>

        {/* Devices */}
        <div className="text-[#888] text-xs font-medium text-left">Devices</div>
        <div className="flex gap-1.5 overflow-x-auto pb-0.5 [&::-webkit-scrollbar]:hidden">
          {devices.map(([device, count]) => (
            <StatPill 
              key={device} 
              icon={device === 'Mobile' ? <Icons.Mobile /> : <Icons.Desktop />} 
              label={device} 
              count={count} 
            />
          ))}
          {devices.length === 0 && <span className="text-[#444] text-[13px]">Waiting for data...</span>}
        </div>
      </div>
      </div>
    </div>
  );
};
