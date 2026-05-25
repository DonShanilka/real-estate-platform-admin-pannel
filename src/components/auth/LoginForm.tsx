'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/src/hooks/useAppDispatch';
import { loginSuccess, setLoading, authFailure } from '@/src/redux/features/auth/authSlice';
import { authApi } from '@/src/lib/api/authApi';

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const dispatch = useAppDispatch();
  const router = useRouter();

useEffect(() => {
  const token = localStorage.getItem('access_token');
  if (token) {
    router.push('/dashboard');
  }
}, [router]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');
    dispatch(setLoading(true));

    try {
      const res = await authApi.login(formData);
      
      localStorage.setItem('access_token', res.access_token);
      
      dispatch(loginSuccess(res.access_token));

      router.push('/dashboard');
    } catch (err: any) {
      const message = err.response?.data?.detail || 'Invalid credentials';
      setError(message);
      dispatch(authFailure(message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="text-sm font-medium text-gray-700">Email Address</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-1 w-full px-5 py-3.5 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500"
          placeholder="admin@realestate.com"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Password</label>
        <div className="relative mt-1">
          <input
            type={showPassword ? "text" : "password"}
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-5 py-3.5 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <button
        type="submit"
        className="w-full py-4 bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-700 hover:to-amber-600 text-white font-semibold rounded-2xl transition-all duration-200 text-lg shadow-lg shadow-rose-500/30"
      >
        Sign In
      </button>

      <p className="text-center text-sm text-gray-500">
        Don't have an account?{' '}
        <a href="/auth/register" className="text-amber-600 hover:underline font-medium">
          Register here
        </a>
      </p>
    </form>
  );
}