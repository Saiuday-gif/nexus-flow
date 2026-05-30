'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Interface for type safety of contact messages fetched from MongoDB
interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('adminToken');
      
      // Redirect to login if token is missing
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/admin/contacts', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();

        if (data.success) {
          setMessages(data.data);
        } else {
          setError(data.message);
          localStorage.removeItem('adminToken');
          router.push('/login');
        }
      } catch  {
        setError('Failed to fetch dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  // Handle user logout and clear local token cache
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0d1117] text-white">
        <p className="text-xl font-medium animate-pulse">Loading secure dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      
      {/* Top Navbar Section with active routing endpoints */}
      <nav className="border-b border-[#30363d] bg-[#161b22] px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Logo Branding - Clicking redirects to homepage */}
          <div 
            onClick={() => router.push('/')} 
            className="text-xl font-bold tracking-wider text-blue-500 cursor-pointer hover:opacity-80 transition"
          >
            NexusFlow <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20 ml-1">Admin</span>
          </div>
          
          {/* Functional Navigation Menu Links */}
          <div className="flex items-center gap-6 text-sm font-medium text-gray-300">
            
            {/* Navigates to main website index landing root page */}
            <button 
              onClick={() => router.push('/')} 
              className="hover:text-white transition cursor-pointer"
            >
              Home
            </button>

            {/* Triggers route change and scrolls down to the features landing section */}
            <button 
              onClick={() => router.push('/#features')} 
              className="hover:text-white transition cursor-pointer"
            >
              Features
            </button>

            {/* Redirects to home page and targets the interactive contact form block */}
            <button 
              onClick={() => router.push('/#contact')} 
              className="hover:text-white transition cursor-pointer"
            >
              Contact
            </button>

            {/* Action button pointing towards getting started workflows */}
            <button 
              onClick={() => router.push('/#get-started')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer"
            >
              Get Started
            </button>
            
            {/* Visual separating line container */}
            <div className="h-4 w-1px bg-[#30363d] hidden sm:block"></div>
            
            {/* Secure Admin session termination endpoint trigger */}
            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-500 transition text-xs border border-red-500/30 px-3 py-1.5 rounded-lg bg-red-500/5 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Layout Content Wrapper */}
      <div className="max-w-6xl mx-auto p-6 mt-4">
        <div className="pb-5 mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-400 text-sm mt-1">Manage incoming client inquiries dynamically from MongoDB Atlas</p>
        </div>

        {/* Dynamic metrics card containing live aggregate database count metrics */}
        <div className="mb-6 rounded-xl bg-[#161b22] p-5 border border-[#30363d] w-full sm:w-64">
          <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Total Inquiries</p>
          <p className="text-4xl font-bold mt-1 text-blue-500">{messages.length}</p>
        </div>

        {error && <div className="p-4 bg-red-900/30 text-red-400 border border-red-500/20 rounded-lg mb-6">{error}</div>}

        {/* Real-time sync data rendering table grid */}
        <div className="overflow-x-auto rounded-xl border border-[#30363d] bg-[#161b22]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#30363d] bg-[#1f242c] text-sm font-semibold text-gray-300">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Message Submission</th>
                <th className="p-4">Date Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#30363d] text-sm text-gray-300">
              {messages.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">No submission records found in Atlas.</td>
                </tr>
              ) : (
                messages.map((msg) => (
                  <tr key={msg._id} className="hover:bg-[#1f242c]/50 transition">
                    <td className="p-4 font-semibold text-white">{msg.name}</td>
                    <td className="p-4 text-blue-400">{msg.email}</td>
                    <td className="p-4 text-gray-300 max-w-xs truncate sm:max-w-none sm:whitespace-normal">{msg.message}</td>
                    <td className="p-4 text-gray-400 text-xs">
                      {new Date(msg.createdAt).toLocaleString('en-IN', { timeZone: 'IST' })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
          