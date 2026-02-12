import { Globe, Terminal, Code2, Layers } from 'lucide-react';

export function Documentation() {
  return (
    <div className="max-w-7xl mx-auto px-5 py-20 grid grid-cols-1 lg:grid-cols-4 gap-10">
      
      {/* Sidebar Navigation */}
      <div className="lg:col-span-1">
        <div className="sticky top-24 space-y-8">
          <div>
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-500" /> Getting Started
            </h3>
            <ul className="space-y-2 text-sm text-slate-400 border-l border-white/10 ml-2">
              <li><a href="#introduction" className="block pl-4 py-1 border-l border-blue-500 text-blue-400">Introduction</a></li>
              <li><a href="#installation" className="block pl-4 py-1 border-l border-transparent hover:border-slate-600 hover:text-slate-300">Installation</a></li>
              <li><a href="#quick-start" className="block pl-4 py-1 border-l border-transparent hover:border-slate-600 hover:text-slate-300">Quick Start</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-violet-500" /> API Reference
            </h3>
            <ul className="space-y-2 text-sm text-slate-400 border-l border-white/10 ml-2">
              <li><a href="#props" className="block pl-4 py-1 border-l border-transparent hover:border-slate-600 hover:text-slate-300">Props</a></li>
              <li><a href="#config" className="block pl-4 py-1 border-l border-transparent hover:border-slate-600 hover:text-slate-300">Config Object</a></li>
              <li><a href="#events" className="block pl-4 py-1 border-l border-transparent hover:border-slate-600 hover:text-slate-300">Events</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-yellow-500" /> Guides
            </h3>
            <ul className="space-y-2 text-sm text-slate-400 border-l border-white/10 ml-2">
              <li><a href="#themes" className="block pl-4 py-1 border-l border-transparent hover:border-slate-600 hover:text-slate-300">Custom Themes</a></li>
              <li><a href="#performance" className="block pl-4 py-1 border-l border-transparent hover:border-slate-600 hover:text-slate-300">Performance</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3 text-slate-300 space-y-16">
        
        {/* Introduction */}
        <section id="introduction">
          <h1 className="text-4xl font-bold text-white mb-6">Introduction</h1>
          <p className="text-lg leading-relaxed mb-6">
            RealtimeGlobe is a high-performance, React-based 3D globe visualization component. 
            It leverages Three.js and WebGL to render interactive globes that can display real-time data points, 
            arcs, and labels. It's designed to be lightweight, customizable, and easy to integrate.
          </p>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-sm text-blue-200">
            <strong>Note:</strong> This library is currently in Public Beta. API changes may occur.
          </div>
        </section>

        {/* Installation */}
        <section id="installation">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <Terminal className="w-8 h-8 text-slate-500" /> Installation
          </h2>
          <p className="mb-4">Install the package using your preferred package manager:</p>
          
          <div className="bg-[#0b1121] border border-white/10 rounded-xl overflow-hidden mb-6">
             <div className="p-6 font-mono text-sm space-y-4">
               <div>
                 <div className="text-slate-500 mb-2"># Using npm</div>
                 <div><span className="text-blue-400">npm</span> install realtime-globe three @types/three</div>
               </div>
               <div>
                 <div className="text-slate-500 mb-2"># Using pnpm</div>
                 <div><span className="text-blue-400">pnpm</span> add realtime-globe three @types/three</div>
               </div>
               <div>
                 <div className="text-slate-500 mb-2"># Using yarn</div>
                 <div><span className="text-blue-400">yarn</span> add realtime-globe three @types/three</div>
               </div>
             </div>
          </div>
          <p className="text-sm text-slate-500">
            Note: `three` is a peer dependency and must be installed separately if not already present in your project.
          </p>
        </section>

        {/* Quick Start */}
        <section id="quick-start">
          <h2 className="text-3xl font-bold text-white mb-6">Quick Start</h2>
          <p className="mb-6">
            Here's a minimal example to get a globe rendering on your page:
          </p>
          
          <div className="bg-[#0b1121] border border-white/10 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-white/5 border-b border-white/5 text-xs font-mono text-slate-500">
              src/App.tsx
            </div>
            <pre className="p-6 font-mono text-sm overflow-x-auto text-slate-300">
{`import React from 'react';
import { Globe } from 'realtime-globe';
import 'realtime-globe/dist/style.css'; // Don't forget CSS!

const data = [
  { lat: 40.7128, lng: -74.0060, size: 0.5, color: 'red' }, // NYC
  { lat: 51.5074, lng: -0.1278, size: 0.5, color: 'blue' }  // London
];

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Globe 
        points={data}
        config={{
          theme: 'night',
          autoRotate: true
        }}
      />
    </div>
  );
}`}
            </pre>
          </div>
        </section>

        {/* Props */}
        <section id="props">
          <h2 className="text-3xl font-bold text-white mb-6">Props</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white">
                  <th className="py-4 px-2">Prop</th>
                  <th className="py-4 px-2">Type</th>
                  <th className="py-4 px-2">Default</th>
                  <th className="py-4 px-2">Description</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-white/5">
                  <td className="py-4 px-2 font-mono text-blue-400">points</td>
                  <td className="py-4 px-2 font-mono text-violet-400">Point[]</td>
                  <td className="py-4 px-2 font-mono text-slate-500">[]</td>
                  <td className="py-4 px-2">Array of data points to visualize on the globe.</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-4 px-2 font-mono text-blue-400">config</td>
                  <td className="py-4 px-2 font-mono text-violet-400">GlobeConfig</td>
                  <td className="py-4 px-2 font-mono text-slate-500">{}</td>
                  <td className="py-4 px-2">Configuration object for visual customization.</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-4 px-2 font-mono text-blue-400">onPointClick</td>
                  <td className="py-4 px-2 font-mono text-violet-400">(point) =&gt; void</td>
                  <td className="py-4 px-2 font-mono text-slate-500">undefined</td>
                  <td className="py-4 px-2">Callback function triggered when a point is clicked.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Config Object */}
        <section id="config">
          <h2 className="text-3xl font-bold text-white mb-6">Config Object</h2>
          <p className="mb-6">
            The `config` prop accepts an object with the following optional properties:
          </p>
          <pre className="bg-[#0b1121] border border-white/10 rounded-xl p-6 font-mono text-sm text-slate-300">
{`interface GlobeConfig {
  theme?: 'minimal' | 'night' | 'day'; // Default: 'minimal'
  autoRotate?: boolean;               // Default: false
  autoRotateSpeed?: number;           // Default: 1.0
  atmosphere?: boolean;               // Default: true
  atmosphereColor?: string;           // Default: varies by theme
  globeColor?: string;                // Default: varies by theme
  showGraticules?: boolean;           // Default: false
}`}
          </pre>
        </section>

      </div>
    </div>
  );
}
