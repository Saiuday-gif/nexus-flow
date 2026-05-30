'use client'; // Required for using hook in Next.js app router

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname(); // Gets the current URL path

  // Helper function to check if the link is active and apply specific styles
  const getLinkClass = (path: string) => {
    const baseClass = "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all";
    const activeClass = "bg-blue-600/10 text-blue-400 font-semibold";
    const inactiveClass = "text-gray-300 hover:bg-gray-800 hover:text-white";
    
    return `${baseClass} ${pathname === path ? activeClass : inactiveClass}`;
  };

  return (
    <div className="flex flex-col h-full p-5">
      <div className="mb-8">
        <h2 className="text-xl font-bold tracking-wider text-blue-500">NexusFlow</h2>
        <span className="text-xs text-gray-500">Quick access</span>
      </div>

      <nav className="flex-1 space-y-2">
        <Link href="/" className={getLinkClass('/')}>
          Home
        </Link>
        <Link href="/projects" className={getLinkClass('/projects')}>
          Projects
        </Link>
        <Link href="/teams" className={getLinkClass('/teams')}>
          Teams
        </Link>
        <Link href="/settings" className={getLinkClass('/settings')}>
          Settings
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;