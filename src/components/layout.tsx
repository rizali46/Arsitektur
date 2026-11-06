import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Terminal } from 'lucide-react';

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#F4F4F0] flex flex-col">
      
      {/* 1. PERSISTENT NAVIGATION BAR (Stays locked at the top of every page) */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-6 lg:px-12 py-4 bg-[#050505]/90 backdrop-blur-md border-b border-[#27272A]">
        <Link 
          to="/" 
          className="font-display text-lg font-bold tracking-tight text-[#F4F4F0] flex items-center gap-2"
        >
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span>KRONOS ATELIER</span>
        </Link>

        <nav className="flex items-center gap-8 text-sm text-[#A1A1AA]">
          <Link to="/" className="hover:text-[#F4F4F0] transition-colors">Home</Link>
          <Link to="/about" className="hover:text-[#F4F4F0] transition-colors">About Me</Link>
        </nav>
      </header>

      {/* 2. DYNAMIC CONTENT WINDOW (<Outlet /> renders whatever page route is active) */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* 3. PERSISTENT FOOTER (Stays locked at the bottom of every page) */}
      <footer className="border-t border-[#27272A] py-8 px-6 lg:px-12 text-xs text-[#71717A] text-center">
        <p>© {new Date().getFullYear()} — Built with React, Vite, and Tailwind CSS.</p>
      </footer>

    </div>
  );
}