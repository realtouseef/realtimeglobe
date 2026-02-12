import { Link } from '@tanstack/react-router';
import { Globe as GlobeIcon, Github } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#02040a]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-violet-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
            <GlobeIcon className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">RealtimeGlobe</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" hash="features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Features</Link>
          <Link to="/" hash="themes" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Themes</Link>
          <Link to="/docs" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Docs</Link>
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
          <button className="bg-white text-black hover:bg-slate-200 px-4 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
