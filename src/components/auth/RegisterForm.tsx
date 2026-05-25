'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/src/lib/api/authApi';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    role: 'ADMIN' as const,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await authApi.register(formData);
      setSuccess('Registration successful! Redirecting to login...');
      
      // Auto navigate to login after success
      setTimeout(() => {
        router.push('/auth/login');
      }, 1800);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          required
          value={formData.full_name}
          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
          className="mt-1 w-full px-5 py-3.5 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-amber-500"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Email Address</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-1 w-full px-5 py-3.5 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-amber-500"
          placeholder="admin@realestate.com"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          required
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="mt-1 w-full px-5 py-3.5 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-amber-500"
          placeholder="Create strong password"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">{success}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-700 hover:to-amber-600 disabled:opacity-70 text-white font-semibold rounded-2xl transition-all duration-200 text-lg shadow-lg shadow-rose-500/30"
      >
        {loading ? 'Creating Account...' : 'Create Admin Account'}
      </button>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{' '}
        <a href="/auth/login" className="text-amber-600 hover:underline font-medium">
          Login here
        </a>
      </p>
    </form>
  );
}