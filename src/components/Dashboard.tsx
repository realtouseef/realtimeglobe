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
    style={{
      background: 'transparent',
      border: '1px solid rgba(255,255,255,0.2)',
      borderRadius: '10px',
      width: '36px',
      height: '36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      cursor: 'pointer',
      transition: 'background 0.2s',
      padding: 0
    }}
    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
  >
    {icon}
  </button>
);

const StatPill: React.FC<{ icon: React.ReactNode; label: string; count?: number; color?: string }> = ({ icon, label, count, color }) => (
  <div style={{
    background: '#242426',
    borderRadius: '8px',
    padding: '4px 10px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: '#e0e0e0',
    whiteSpace: 'nowrap'
  }}>
    {typeof icon === 'string' ? (
      <img src={icon} alt="" style={{ width: '14px', height: '14px', borderRadius: '2px' }} />
    ) : (
      icon
    )}
    <span style={{ color: color || 'inherit' }}>{label}</span>
    {count !== undefined && <span style={{ color: '#888', marginLeft: '2px' }}>({count})</span>}
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
    if (ref.toLowerCase().includes('google')) return <Icons.Google />;
    if (ref.toLowerCase().includes('twitter') || ref.toLowerCase().includes('x.com')) return 'https://abs.twimg.com/favicons/twitter.ico';
    if (ref.toLowerCase() === 'direct') return <Icons.Link />;
    return <Icons.Link />; // Default
  };

  const getCountryFlag = (countryName: string) => {
    // Map country name to flag code if needed, or just use a generic flag icon
    // For now using emoji flags is easiest without a library
    // A simple mapping for demo purposes
    const countryMap: Record<string, string> = {
      'USA': '🇺🇸', 'UK': '🇬🇧', 'Japan': '🇯🇵', 'France': '🇫🇷', 'Germany': '🇩🇪',
      'Australia': '🇦🇺', 'Singapore': '🇸🇬', 'UAE': '🇦🇪', 'Canada': '🇨🇦', 'India': '🇮🇳',
      'Philippines': '🇵🇭', 'Bulgaria': '🇧🇬', 'Andorra': '🇦🇩'
    };
    return countryMap[countryName] || '🏳️';
  };

  return (
    <div style={{
      position: 'absolute',
      top: '24px',
      left: '24px',
      width: '500px',
      maxWidth: '90vw',
      background: '#151517',
      borderRadius: '24px',
      padding: '24px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
      color: '#fff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      zIndex: 50,
      border: '1px solid rgba(255,255,255,0.08)'
    }}>
      <style>{`
        .scroll-container::-webkit-scrollbar {
          display: none;
        }
        .scroll-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', 
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
          }}>
            <Icons.Logo />
          </div>
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: '600', margin: 0, letterSpacing: '-0.5px' }}>{siteName}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 8px #00ff88' }} />
              <span style={{ fontSize: '12px', color: '#888' }}>Live</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <HeaderButton icon={<Icons.Refresh />} onClick={onRefresh} />
          <HeaderButton icon={isFullscreen ? <Icons.Minimize /> : <Icons.Fullscreen />} onClick={onToggleFullscreen} />
          
          <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setIsThemeModalOpen(!isThemeModalOpen)}
                style={{
                  width: '36px',
                  height: '36px',
                  padding: 0,
                  border: '2px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  background: 'transparent',
                  transition: 'transform 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                title="Change Theme"
              >
                 <img 
                    src={THEME_STYLES.find(t => t.id === currentTheme)?.preview || THEME_STYLES[0].preview} 
                    alt="Theme" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                 />
              </button>

              {isThemeModalOpen && (
                <>
                    <div 
                        style={{ position: 'fixed', inset: 0, zIndex: 100, cursor: 'default' }} 
                        onClick={() => setIsThemeModalOpen(false)}
                    />
                    <div style={{
                      position: 'absolute',
                      top: 'calc(100% + 12px)',
                      right: 0,
                      width: '280px',
                      background: 'rgba(20, 20, 30, 0.95)',
                      borderRadius: '14px',
                      padding: '16px',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
                      zIndex: 101,
                      backdropFilter: 'blur(10px)'
                    }}>
                      <div style={{
                        fontSize: '11px',
                        color: '#8f97b7',
                        letterSpacing: '1px',
                        marginBottom: '12px',
                        fontWeight: 600,
                        textTransform: 'uppercase'
                      }}>
                        Globe Theme
                      </div>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(44px, 1fr))',
                        gap: '8px'
                      }}>
                        {THEME_STYLES.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => {
                              onThemeChange(item.id as any);
                              setIsThemeModalOpen(false);
                            }}
                            style={{
                              width: '44px',
                              height: '44px',
                              borderRadius: '12px',
                              border: item.id === currentTheme ? '2px solid #3B82F6' : '1px solid rgba(255, 255, 255, 0.1)',
                              background: 'rgba(255, 255, 255, 0.05)',
                              padding: 0,
                              overflow: 'hidden',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease'
                            }}
                            title={item.label}
                          >
                            <img src={item.preview} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </button>
                        ))}
                      </div>
                    </div>
                </>
              )}
          </div>

          <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setIsAvatarModalOpen(!isAvatarModalOpen)}
                style={{
                  width: '36px',
                  height: '36px',
                  padding: 0,
                  border: '2px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  background: 'transparent',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <img src={avatarUrl} alt="Profile" style={{ width: '100%', height: '100%' }} />
              </button>

              {isAvatarModalOpen && (
                <>
                    <div 
                        style={{ position: 'fixed', inset: 0, zIndex: 100, cursor: 'default' }} 
                        onClick={() => setIsAvatarModalOpen(false)}
                    />
                    <div style={{
                      position: 'absolute',
                      top: 'calc(100% + 12px)',
                      right: 0,
                      width: '280px',
                      background: 'rgba(20, 20, 30, 0.95)',
                      borderRadius: '14px',
                      padding: '16px',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
                      zIndex: 101,
                      backdropFilter: 'blur(10px)'
                    }}>
                      <div style={{
                        fontSize: '11px',
                        color: '#8f97b7',
                        letterSpacing: '1px',
                        marginBottom: '12px',
                        fontWeight: 600,
                        textTransform: 'uppercase'
                      }}>
                        Avatar Style
                      </div>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(44px, 1fr))',
                        gap: '8px'
                      }}>
                        {avatarStyles.map((item) => (
                          <button
                            key={item.style}
                            onClick={() => {
                              onAvatarStyleChange(item.style);
                              setIsAvatarModalOpen(false);
                            }}
                            style={{
                              width: '44px',
                              height: '44px',
                              borderRadius: '12px',
                              border: item.style === avatarStyle ? '2px solid #3B82F6' : '1px solid rgba(255, 255, 255, 0.1)',
                              background: 'rgba(255, 255, 255, 0.05)',
                              padding: 0,
                              overflow: 'hidden',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease'
                            }}
                            title={item.style}
                          >
                            <img src={item.url} alt={item.style} style={{ width: '100%', height: '100%' }} />
                          </button>
                        ))}
                      </div>
                    </div>
                </>
              )}
          </div>
        </div>
      </div>

      <div className="scroll-container" style={{ maxHeight: 'calc(80vh - 100px)', overflowY: 'auto' }}>
        
        {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '16px', alignItems: 'center' }}>
        {/* Referrers */}
        <div style={{ color: '#888', fontSize: '14px', fontWeight: 500 }}>Referrers</div>
        <div className="scroll-container" style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '2px' }}>
          {referrers.map(([ref, count]) => (
            <StatPill 
              key={ref} 
              icon={getReferrerIcon(ref)} 
              label={ref} 
              count={count} 
            />
          ))}
          {referrers.length === 0 && <span style={{ color: '#444', fontSize: '13px' }}>Waiting for data...</span>}
        </div>

        {/* Countries */}
        <div style={{ color: '#888', fontSize: '14px', fontWeight: 500 }}>Countries</div>
        <div className="scroll-container" style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '2px' }}>
          {countries.map(([country, count]) => (
            <StatPill 
              key={country} 
              icon={getCountryFlag(country)} 
              label={country} 
              count={count} 
            />
          ))}
          {countries.length === 0 && <span style={{ color: '#444', fontSize: '13px' }}>Waiting for data...</span>}
        </div>

        {/* Devices */}
        <div style={{ color: '#888', fontSize: '14px', fontWeight: 500 }}>Devices</div>
        <div className="scroll-container" style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '2px' }}>
          {devices.map(([device, count]) => (
            <StatPill 
              key={device} 
              icon={device === 'Mobile' ? <Icons.Mobile /> : <Icons.Desktop />} 
              label={device} 
              count={count} 
            />
          ))}
          {devices.length === 0 && <span style={{ color: '#444', fontSize: '13px' }}>Waiting for data...</span>}
        </div>
      </div>
      </div>
    </div>
  );
};
