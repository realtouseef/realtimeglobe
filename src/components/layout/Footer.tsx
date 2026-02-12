import { Link } from '@tanstack/react-router';
import { Globe as GlobeIcon, Twitter, Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#02040a] pt-20 pb-10 px-5 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mb-20">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
              <GlobeIcon className="w-3 h-3 text-white" />
            </div>
            <span className="font-bold text-white">RealtimeGlobe</span>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed">
            The most performant and customizable 3D globe component for React applications.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4 text-white">Product</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link to="/" hash="features" className="hover:text-blue-400 transition-colors">Features</Link></li>
            <li><Link to="/" hash="themes" className="hover:text-blue-400 transition-colors">Themes</Link></li>
            <li><Link to="/docs" className="hover:text-blue-400 transition-colors">Documentation</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4 text-white">Legal</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
            <li><Link to="/license" className="hover:text-blue-400 transition-colors">License</Link></li>
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
  );
}
