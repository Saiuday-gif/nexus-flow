import React, { ReactNode } from 'react';
import './globals.css';
import Sidebar from '../components/shared/Sidebar';
import Navbar from '../components/shared/Navbar';

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    // CRITICAL: Next.js App Router requires <html> and <body> tags in the root layout file
    <html lang="en">
      <body className="bg-[#0d1117] text-white antialiased">
        
        {/* Full screen layout structured container */}
        <div className="flex min-h-screen w-full overflow-x-hidden">
          
          {/* Sidebar Area */}
          <aside className="w-64 min-h-screen bg-[#161b22] border-r border-gray-800 hidden md:block shrink-0">
            <Sidebar />
          </aside>

          {/* Main Content Workspace */}
          <div className="flex-1 flex flex-col min-w-0 relative">
            
            {/* Top Header Navigation */}
            <header className="h-16 border-b border-gray-800 flex items-center px-6 bg-[#0d1117]/90 backdrop-blur sticky top-0 z-50">
              <Navbar />
            </header>

            {/* Dynamic Content Page Body Slot */}
            <main className="grow p-6 md:p-10 max-w-7xl mx-auto w-full box-border">
              {children}
            </main>
            
            {/* Developer Project Footer */}
            <footer className="border-t border-gray-800 p-4 text-center text-sm text-gray-500 bg-[#0d1117]">
              © 2026 NexusFlow Project. Designed with MERN Stack integration.
            </footer>
          </div>

        </div>

      </body>
    </html>
  );
}