import React from 'react';
import { GlobeDemo } from './GlobeDemo';

export function LandingPage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#02040a',
      color: '#ffffff',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      overflowX: 'hidden'
    }}>
      {/* Styles for Responsiveness */}
      <style>{`
        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 40px;
          max-width: 1200px;
          margin: 0 auto;
          z-index: 10;
          position: relative;
        }
        .nav-links {
          display: flex;
          gap: 20px;
        }
        .hero-title {
          font-size: 3.5rem;
          line-height: 1.1;
          font-weight: 800;
          margin-bottom: 24px;
          background: linear-gradient(to right, #fff, #94a3b8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
        }
        .code-section-grid {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        .globe-container {
          height: 700px;
          width: 100%;
          position: relative;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
          background: rgba(255, 255, 255, 0.02);
        }

        @media (max-width: 768px) {
          .nav-container {
            flex-direction: column;
            gap: 20px;
            padding: 20px;
          }
          .nav-links {
            width: 100%;
            justify-content: center;
            font-size: 0.9rem;
            flex-wrap: wrap;
          }
          .hero-title {
            font-size: 2.5rem;
          }
          .hero-buttons {
            flex-direction: column;
            width: 100%;
            padding: 0 20px;
          }
          .hero-buttons button {
            width: 100%;
            justify-content: center;
          }
          .code-section-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .globe-container {
            height: 400px;
            border-radius: 16px;
          }
          .section-padding {
            padding: 60px 20px !important;
          }
        }
      `}</style>

      {/* Navigation */}
      <nav className="nav-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', 
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em' }}>realtime-globe</span>
        </div>
        <div className="nav-links">
          <a href="#features" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.2s' }}>Features</a>
          <a href="#docs" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.2s' }}>Documentation</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>GitHub</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '60px 20px',
        minHeight: '600px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <div style={{ zIndex: 10, marginBottom: '60px', maxWidth: '800px' }}>
          <div style={{ 
            display: 'inline-block', 
            padding: '6px 12px', 
            borderRadius: '20px', 
            background: 'rgba(59, 130, 246, 0.1)', 
            border: '1px solid rgba(59, 130, 246, 0.2)',
            color: '#60A5FA',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '20px'
          }}>
            v0.1.0 is now available
          </div>
          <h1 style={{
            fontSize: '3.5rem',
            lineHeight: 1.1,
            fontWeight: 800,
            marginBottom: '24px',
            background: 'linear-gradient(to right, #fff, #94a3b8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Visualize your data in <br/>
            <span style={{ color: '#3B82F6', WebkitTextFillColor: '#3B82F6' }}>Realtime 3D</span>
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: '#94a3b8',
            lineHeight: 1.6,
            marginBottom: '32px',
            maxWidth: '600px',
            margin: '0 auto 32px auto'
          }}>
            A high-performance, interactive globe component for React. 
            Visualize traffic, users, and events with beautiful, customizable themes.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button style={{
              background: '#3B82F6',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}>
              Get Started
            </button>
            <button style={{
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>npm install realtime-globe</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </div>
        </div>

        <div style={{ 
          height: '700px', 
          width: '100%', 
          position: 'relative',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          overflow: 'hidden',
          background: 'rgba(255, 255, 255, 0.02)'
        }}>
          {/* We wrap the demo to ensure it fits nicely */}
          <GlobeDemo />
          
          {/* Overlay to prevent accidental scroll trap if needed, though GlobeDemo handles events well */}
        </div>
      </header>

      {/* Features Section */}
      <section id="features" style={{
        padding: '100px 20px',
        background: 'linear-gradient(to bottom, #02040a, #0b1121)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, textAlign: 'center', marginBottom: '60px' }}>
            Everything you need
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <FeatureCard 
              title="High Performance" 
              description="Built on Three.js and Globe.gl, rendering thousands of points at 60fps with ease."
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>}
            />
            <FeatureCard 
              title="React Hooks" 
              description="Simple API with useGlobe and useRealtimeData hooks to manage state effortlessly."
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>}
            />
            <FeatureCard 
              title="Custom Themes" 
              description="Switch between minimal, day, and night modes. Fully customizable colors and markers."
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>}
            />
          </div>
        </div>
      </section>

      {/* Code Section */}
      <section style={{ padding: '100px 20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '20px' }}>Simple to integrate</h2>
            <p style={{ color: '#94a3b8', lineHeight: 1.6, marginBottom: '30px' }}>
              Just import the Globe component and pass your data. We handle the complex 3D rendering and interactions.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, color: '#e2e8f0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6' }}>✓</div>
                TypeScript Ready
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6' }}>✓</div>
                Auto-rotation & Atmosphere
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6' }}>✓</div>
                Responsive Design
              </li>
            </ul>
          </div>
          
          <div style={{ 
            background: '#0f172a', 
            borderRadius: '16px', 
            padding: '24px', 
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#eab308' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e' }}></div>
            </div>
            <pre style={{ margin: 0, overflowX: 'auto', color: '#e2e8f0' }}>
              <span style={{ color: '#c678dd' }}>import</span> {'{'} Globe {'}'} <span style={{ color: '#c678dd' }}>from</span> <span style={{ color: '#98c379' }}>'realtime-globe'</span>;{'\n\n'}
              <span style={{ color: '#c678dd' }}>function</span> <span style={{ color: '#61afef' }}>App</span>() {'{'}{'\n'}
              {'  '}<span style={{ color: '#c678dd' }}>return</span> ({'\n'}
              {'    '}<span style={{ color: '#e06c75' }}>&lt;Globe</span>{'\n'}
              {'      '}<span style={{ color: '#d19a66' }}>points</span>={'{'}myPoints{'}'}{'\n'}
              {'      '}<span style={{ color: '#d19a66' }}>config</span>={'{'}{'{'}{'\n'}
              {'        '}theme: <span style={{ color: '#98c379' }}>'dark'</span>,{'\n'}
              {'        '}autoRotate: <span style={{ color: '#d19a66' }}>true</span>{'\n'}
              {'      '}{'}'}{'}'}{'\n'}
              {'    '}<span style={{ color: '#e06c75' }}>/&gt;</span>{'\n'}
              {'  '});{'\n'}
              {'}'}
            </pre>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        padding: '60px 20px', 
        borderTop: '1px solid rgba(255,255,255,0.05)',
        textAlign: 'center',
        color: '#64748b'
      }}>
        <p>© {new Date().getFullYear()} Realtime Globe. Open Source MIT License.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) {
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      borderRadius: '16px',
      padding: '30px',
      transition: 'transform 0.2s',
      cursor: 'default'
    }}>
      <div style={{ 
        width: '48px', 
        height: '48px', 
        background: 'rgba(59, 130, 246, 0.1)', 
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
        color: '#3B82F6'
      }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '12px', color: 'white' }}>{title}</h3>
      <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>{description}</p>
    </div>
  );
}
