import { GlobeDemo } from '../components/GlobeDemo';
import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';

export function FullScreenDemo() {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Back Button */}
      <Link 
        to="/" 
        className="absolute top-5 left-5 z-50 flex items-center gap-2 px-4 py-2 bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/10 rounded-full text-white text-sm font-medium transition-all hover:scale-105"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <GlobeDemo theme="earth-night" />
    </div>
  );
}
