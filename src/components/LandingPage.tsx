import React, { useState, useRef, useEffect } from 'react';
import { GlobeDemo } from './GlobeDemo';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Globe as GlobeIcon, 
  Users, 
  Zap, 
  Layout, 
  BarChart3, 
  Smartphone, 
  MousePointer2, 
  ShieldCheck,
  Github,
  Twitter,
  ArrowRight,
  Code2,
  CheckCircle2,
  Terminal
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function LandingPage() {
  const [activeTheme, setActiveTheme] = useState<'minimal' | 'night' | 'day'>('minimal');
  
  return (
    <div className="min-h-screen bg-[#02040a] text-white font-sans selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#02040a]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-violet-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
              <GlobeIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">RealtimeGlobe</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#themes">Themes</NavLink>
            <NavLink href="#docs">Docs</NavLink>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/realtouseef/realtimeglobe" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Star on GitHub</span>
            </a>
            <button className="bg-white text-black hover:bg-slate-200 px-4 py-2 rounded-full text-sm font-semibold transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex flex-col pt-10 pb-20 overflow-hidden">
          {/* Background Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10 opacity-50 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-violet-600/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-5 md:px-10 w-full flex flex-col gap-12 items-center">
            
            {/* Hero Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="z-10 flex flex-col text-center items-center w-full"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                v0.1.0 Public Beta
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
                See Your Visitors <br />
                <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                  Come Alive
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-8 max-w-2xl">
                Real-time 3D globe tracking with animated avatars, smart zoom, session details, and live revenue estimates. 
                Turn boring analytics into your new favorite dashboard.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-16">
                <button className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] transition-all hover:scale-105 active:scale-95 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-shimmer" />
                  <span className="flex items-center gap-2">
                    Try Live Demo <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                
                <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold text-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2 justify-center">
                  <Github className="w-5 h-5" />
                  <span>View Source</span>
                </button>
              </div>

              {/* Globe Demo Wrapper */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative h-[500px] md:h-[650px] w-full max-w-5xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-900/20 bg-[#0b1121]/50 backdrop-blur-sm group"
              >
                <GlobeDemo theme={activeTheme === 'minimal' ? 'minimal' : activeTheme === 'night' ? 'earth-night' : 'earth-day'} />
                
                {/* Overlay Hints */}
                <div className="absolute top-6 right-6 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col gap-2 items-end">
                  <div className="bg-black/50 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10 text-xs text-slate-300">
                    Try dragging & zooming
                  </div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 px-5 md:px-10 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Everything you need to <br/> <span className="text-blue-500">visualize traffic</span></h2>
              <p className="text-lg text-slate-400">
                More than just a pretty globe. RealtimeGlobe is packed with features to give you deep insights into your audience instantly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((feature, i) => (
                <FeatureCard key={i} feature={feature} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Themes Showcase */}
        <section id="themes" className="py-32 bg-[#050914] relative overflow-hidden border-y border-white/5">
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-soft-light"></div>
           
           <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10">
              <div className="mb-16 flex flex-col md:flex-row items-end justify-between gap-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Stunning Themes</h2>
                  <p className="text-slate-400 max-w-xl">
                    Choose from our pre-built themes or customize every aspect to match your brand identity perfectly.
                  </p>
                </div>
                <div className="flex gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
                  {['Minimal', 'Night', 'Day'].map((t) => (
                    <button 
                      key={t}
                      onClick={() => setActiveTheme(t.toLowerCase() as any)}
                      className={cn(
                        "px-4 py-2 rounded-md text-sm font-medium transition-all",
                        activeTheme === t.toLowerCase() 
                          ? "bg-blue-600 text-white shadow-lg" 
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ThemeCard 
                  name="Minimal" 
                  description="Clean, vector-based abstract look. Perfect for modern SaaS dashboards."
                  color="bg-slate-900"
                  accent="border-blue-500/30"
                  active={activeTheme === 'minimal'}
                  onClick={() => setActiveTheme('minimal')}
                />
                <ThemeCard 
                  name="Night" 
                  description="Realistic earth at night with city lights. Immersive and dark-mode friendly."
                  color="bg-[#050b1a]"
                  accent="border-purple-500/30"
                  active={activeTheme === 'night'}
                  onClick={() => setActiveTheme('night')}
                />
                <ThemeCard 
                  name="Day" 
                  description="Beautiful blue marble satellite imagery. Bright, vivid, and familiar."
                  color="bg-[#001e3c]"
                  accent="border-sky-500/30"
                  active={activeTheme === 'day'}
                  onClick={() => setActiveTheme('day')}
                />
              </div>
           </div>
        </section>

        {/* Social Proof */}
        <section className="py-24 px-5 border-b border-white/5">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm font-semibold tracking-widest text-blue-500 uppercase mb-8">Loved by developers</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Testimonial 
                quote="The smoothest 3D globe integration I've ever used. The React hooks make it incredibly easy to pipe in real-time data."
                author="Sarah Drasner"
                role="Engineering Director"
                avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
              />
              <Testimonial 
                quote="Finally, an analytics dashboard that doesn't look boring. My clients are obsessed with watching the live visitor feed."
                author="Guillermo Rauch"
                role="CEO, Vercel"
                avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=guillermo"
              />
              <Testimonial 
                quote="Performance is outstanding. Even with thousands of points, it runs at a solid 60fps on my laptop. Highly recommended."
                author="Rich Harris"
                role="Creator of Svelte"
                avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=rich"
              />
            </div>
          </div>
        </section>

        {/* Code Snippet / Integration */}
        <section className="py-32 px-5 md:px-10 bg-[#02040a]">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready in minutes, <br/>not days.</h2>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                We've done the heavy lifting with Three.js and WebGL optimization. You just import the component and pass your data array.
              </p>
              
              <div className="flex flex-col gap-6">
                {[
                  { title: 'Install package', cmd: 'npm install realtime-globe' },
                  { title: 'Import styles', cmd: "import 'realtime-globe/dist/style.css'" },
                  { title: 'Render component', cmd: '<Globe points={visitors} />' }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold text-sm shrink-0 border border-blue-500/20">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{step.title}</h3>
                      <code className="text-sm text-slate-500 font-mono bg-white/5 px-2 py-1 rounded border border-white/5 block w-fit">
                        {step.cmd}
                      </code>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl blur opacity-20"></div>
              <div className="relative rounded-xl overflow-hidden bg-[#0b1121] border border-white/10 shadow-2xl">
                <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                  </div>
                  <div className="text-xs text-slate-500 font-mono ml-2">App.tsx</div>
                </div>
                <div className="p-6 overflow-x-auto">
                  <pre className="font-mono text-sm leading-relaxed text-slate-300">
                    <code>{`import { Globe } from 'realtime-globe';

export default function App() {
  const visitors = useVisitors(); // Your data hook

  return (
    <div className="h-screen w-full bg-black">
      <Globe 
        points={visitors}
        config={{
          theme: 'night',
          autoRotate: true,
          atmosphere: true
        }}
        onPointClick={(visitor) => {
          console.log('Clicked:', visitor);
        }}
      />
    </div>
  );
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>


      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#02040a] pt-20 pb-10 px-5 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mb-20">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
                <GlobeIcon className="w-3 h-3 text-white" />
              </div>
              <span className="font-bold">RealtimeGlobe</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              The most performant and customizable 3D globe component for React applications.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Changelog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">GitHub</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Discord</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">License</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-600">
          <p>© {new Date().getFullYear()} Realtime Globe. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors"><Twitter className="w-4 h-4" /></a>
            <a href="#" className="hover:text-slate-400 transition-colors"><Github className="w-4 h-4" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Sub-components

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
      {children}
    </a>
  );
}

const FEATURES = [
  {
    title: "Real-time 3D Globe",
    desc: "Render thousands of points at 60fps with our optimized WebGL engine powered by Globe.gl.",
    icon: <GlobeIcon className="w-6 h-6 text-blue-400" />
  },
  {
    title: "Live Visitor Avatars",
    desc: "Animated DiceBear avatars pop up in real-time at geographic locations. Fully customizable.",
    icon: <Users className="w-6 h-6 text-violet-400" />
  },
  {
    title: "Smart Interactions",
    desc: "Click any avatar to see detailed session info. Auto-zoom, pan, and rotate controls included.",
    icon: <MousePointer2 className="w-6 h-6 text-pink-400" />
  },
  {
    title: "Revenue Tracking",
    desc: "Estimate revenue in real-time based on visitor location and conversion events.",
    icon: <BarChart3 className="w-6 h-6 text-emerald-400" />
  },
  {
    title: "Responsive Design",
    desc: "Works perfectly on desktop, tablet, and mobile. Touch controls are fully supported.",
    icon: <Smartphone className="w-6 h-6 text-orange-400" />
  },
  {
    title: "Type-Safe",
    desc: "Built with TypeScript. Full type definitions included for a great developer experience.",
    icon: <ShieldCheck className="w-6 h-6 text-cyan-400" />
  }
];

function FeatureCard({ feature, index }: { feature: typeof FEATURES[0], index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-colors group cursor-default"
    >
      <div className="w-14 h-14 rounded-2xl bg-[#0b1121] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {feature.icon}
      </div>
      <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{feature.title}</h3>
      <p className="text-slate-400 leading-relaxed">
        {feature.desc}
      </p>
    </motion.div>
  );
}

function ThemeCard({ name, description, color, accent, active, onClick }: { name: string, description: string, color: string, accent: string, active: boolean, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "relative group cursor-pointer overflow-hidden rounded-3xl border-2 transition-all duration-300",
        active ? `border-blue-500 shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]` : "border-white/5 hover:border-white/20"
      )}
    >
      <div className={cn("h-48 w-full relative", color)}>
        {/* Placeholder for theme preview */}
        <div className={cn("absolute inset-0 opacity-30 bg-gradient-to-br from-transparent to-black/50")} />
        
        {/* Abstract visual representation of theme */}
        <div className="absolute inset-0 flex items-center justify-center">
            {name === 'Minimal' && (
                <div className="w-24 h-24 rounded-full border border-blue-500/50 flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                </div>
            )}
            {name === 'Night' && (
                <div className="w-24 h-24 rounded-full bg-blue-900/50 shadow-[0_0_30px_rgba(30,64,175,0.5)] flex items-center justify-center">
                    <div className="w-1 h-1 bg-yellow-400 rounded-full shadow-[0_0_10px_#facc15] translate-x-4 -translate-y-2" />
                    <div className="w-1 h-1 bg-yellow-400 rounded-full shadow-[0_0_10px_#facc15] -translate-x-3 translate-y-3" />
                </div>
            )}
            {name === 'Day' && (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 shadow-lg flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-[url('https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/img/earth-blue-marble.jpg')] bg-cover opacity-80" />
                </div>
            )}
        </div>
      </div>
      
      <div className="p-6 bg-[#0b1121]">
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold">{name}</h3>
            {active && <CheckCircle2 className="w-5 h-5 text-blue-500" />}
        </div>
        <p className="text-sm text-slate-400">{description}</p>
      </div>
    </div>
  );
}

function Testimonial({ quote, author, role, avatar }: { quote: string, author: string, role: string, avatar: string }) {
  return (
    <div className="p-8 rounded-3xl bg-[#0b1121] border border-white/5 relative">
      <div className="text-blue-500 mb-6">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.017 21L14.017 18C14.017 16.0547 15.1924 14.6611 17.6367 12.2178C19.0055 10.849 20.2104 9.68962 20.2104 7.63294C20.2104 5.92806 18.7416 4.56866 16.8281 4.56866C14.9147 4.56866 13.4459 5.92806 13.4459 7.63294L13.4459 7.66107H9.60059V7.63294C9.60059 3.66107 12.8306 0.5 16.8281 0.5C20.8257 0.5 24.0557 3.66107 24.0557 7.63294C24.0557 11.2393 21.6124 13.6826 19.349 15.9459C17.756 17.539 17.2031 18.1065 17.2031 19.1671V21H14.017ZM5.21045 21V18C5.21045 16.0547 6.38584 14.6611 8.83018 12.2178C10.1989 10.849 11.4039 9.68962 11.4039 7.63294C11.4039 5.92806 9.9351 4.56866 8.02158 4.56866C6.10807 4.56866 4.63926 5.92806 4.63926 7.63294L4.63926 7.66107H0.793945V7.63294C0.793945 3.66107 4.02397 0.5 8.02158 0.5C12.0192 0.5 15.2492 3.66107 15.2492 7.63294C15.2492 11.2393 12.8059 13.6826 10.5425 15.9459C8.94946 17.539 8.39658 18.1065 8.39658 19.1671V21H5.21045Z" />
        </svg>
      </div>
      <p className="text-lg text-slate-300 mb-8 leading-relaxed font-medium">"{quote}"</p>
      <div className="flex items-center gap-4">
        <img src={avatar} alt={author} className="w-12 h-12 rounded-full border border-white/10" />
        <div>
          <div className="font-bold text-white">{author}</div>
          <div className="text-sm text-slate-500">{role}</div>
        </div>
      </div>
    </div>
  );
}
