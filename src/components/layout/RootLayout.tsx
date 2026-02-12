import { Outlet } from '@tanstack/react-router';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function RootLayout() {
  return (
    <div className="min-h-screen bg-[#02040a] text-white font-sans selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden">
      <Navbar />
      <main className="pt-20 min-h-[calc(100vh-300px)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
