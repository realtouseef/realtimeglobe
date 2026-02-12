import React from 'react';
import { GlobeDemo } from './GlobeDemo';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#02040a] text-white font-sans overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="flex flex-col md:flex-row justify-between items-center py-5 px-5 md:px-10 max-w-7xl mx-auto z-10 relative gap-5 md:gap-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-500 rounded-lg flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
          <span className="text-xl font-bold -tracking-wide">realtime-globe</span>
        </div>
        <div className="flex gap-5 w-full md:w-auto justify-center md:justify-start text-sm md:text-base flex-wrap">
          <a href="#features" className="text-slate-400 no-underline text-[0.95rem] hover:text-white transition-colors">Features</a>
          <a href="#docs" className="text-slate-400 no-underline text-[0.95rem] hover:text-white transition-colors">Documentation</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white no-underline font-medium">GitHub</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto py-16 px-5 min-h-[600px] flex flex-col items-center text-center">
        <div className="z-10 mb-16 max-w-4xl w-full">
          <div className="inline-block px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-5">
            v0.1.0 is now available
          </div>
          <h1 className="text-[2.5rem] md:text-[3.5rem] leading-[1.1] font-extrabold mb-6 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Visualize your data in <br/>
            <span className="text-blue-500">Realtime 3D</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-xl mx-auto">
            A high-performance, interactive globe component for React. 
            Visualize traffic, users, and events with beautiful, customizable themes.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center w-full px-5 md:px-0">
            <button className="bg-blue-500 text-white border-none py-3 px-6 rounded-lg text-base font-semibold cursor-pointer hover:bg-blue-600 transition-colors w-full md:w-auto flex justify-center">
              Get Started
            </button>
            <button className="bg-white/5 text-white border border-white/10 py-3 px-6 rounded-lg text-base font-medium cursor-pointer flex items-center justify-center gap-2 hover:bg-white/10 transition-colors w-full md:w-auto">
              <span>npm install realtime-globe</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="h-[400px] md:h-[700px] w-full relative rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden bg-white/2">
          {/* We wrap the demo to ensure it fits nicely */}
          <GlobeDemo />
          
          {/* Overlay to prevent accidental scroll trap if needed, though GlobeDemo handles events well */}
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-24 px-5 bg-gradient-to-b from-[#02040a] to-[#0b1121]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[2.5rem] font-bold text-center mb-16">
            Everything you need
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <section className="py-24 px-5 border-t border-white/5">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-[2rem] font-bold mb-5">Simple to integrate</h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              Just import the Globe component and pass your data. We handle the complex 3D rendering and interactions.
            </p>
            <ul className="list-none p-0 text-slate-200 flex flex-col gap-4">
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 text-xs">✓</div>
                TypeScript Ready
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 text-xs">✓</div>
                Auto-rotation & Atmosphere
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 text-xs">✓</div>
                Responsive Design
              </li>
            </ul>
          </div>
          
          <div className="bg-[#0f172a] rounded-2xl p-6 border border-white/10 shadow-xl font-mono text-sm">
            <div className="flex gap-2 mb-5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <pre className="m-0 overflow-x-auto text-slate-200">
              <span className="text-[#c678dd]">import</span> {'{'} Globe {'}'} <span className="text-[#c678dd]">from</span> <span className="text-[#98c379]">'realtime-globe'</span>;{'\n\n'}
              <span className="text-[#c678dd]">function</span> <span className="text-[#61afef]">App</span>() {'{'}{'\n'}
              {'  '}<span className="text-[#c678dd]">return</span> ({'\n'}
              {'    '}<span className="text-[#e06c75]">&lt;Globe</span>{'\n'}
              {'      '}<span className="text-[#d19a66]">points</span>={'{'}myPoints{'}'}{'\n'}
              {'      '}<span className="text-[#d19a66]">config</span>={'{'}{'{'}{'\n'}
              {'        '}theme: <span className="text-[#98c379]">'dark'</span>,{'\n'}
              {'        '}autoRotate: <span className="text-[#d19a66]">true</span>{'\n'}
              {'      '}{'}'}{'}'}{'\n'}
              {'    '}<span className="text-[#e06c75]">/&gt;</span>{'\n'}
              {'  '});{'\n'}
              {'}'}
            </pre>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-5 border-t border-white/5 text-center text-slate-500">
        <p>© {new Date().getFullYear()} Realtime Globe. Open Source MIT License.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white/5 border border-white/5 rounded-2xl p-8 hover:scale-105 transition-transform cursor-default">
      <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-5 text-blue-500">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}
