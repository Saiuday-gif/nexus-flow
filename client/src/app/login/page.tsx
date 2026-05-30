'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        router.push('/dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch {
      setError('Failed to connect to the backend server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0d1117] px-4">
      <div className="w-full max-w-md rounded-xl bg-[#161b22] p-8 shadow-2xl border border-[#30363d]">
        <h2 className="text-center text-3xl font-bold text-white mb-2">Admin Portal</h2>
        <p className="text-center text-gray-400 text-sm mb-6">Sign in to access NexusFlow Dashboard</p>
        
        {error && (
          <div className="mb-4 rounded-lg bg-red-900/50 border border-red-500 p-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg bg-[#0d1117] border border-[#30363d] px-4 py-2.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              placeholder="admin@nexusflow.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-[#0d1117] border border-[#30363d] px-4 py-2.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:bg-blue-800"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}