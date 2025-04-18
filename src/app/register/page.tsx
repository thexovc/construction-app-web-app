'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authApi } from '@/services/api';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    role: 'BUYER', // default role
  });

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      toast.success('Registration successful!');
      router.push(`/dashboard/${data.user.role.toLowerCase()}`);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Registration failed');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Choose your role and start using our platform
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: 'BUYER' })}
            className={`p-4 cursor-pointer rounded-lg border ${formData.role === 'BUYER'
              ? 'border-blue-500 bg-blue-50 text-gray-700'
              : 'border-gray-200 text-gray-400'
              }`}
          >
            <h3 className="font-semibold">Buyer</h3>
            <p className="text-sm text-gray-500">Purchase materials</p>
          </button>

          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: 'VENDOR' })}
            className={`p-4 cursor-pointer rounded-lg border ${formData.role === 'VENDOR'
              ? 'border-blue-500 bg-blue-50 text-gray-700'
              : 'border-gray-200 text-gray-400'
              }`}
          >
            <h3 className="font-semibold">Vendor</h3>
            <p className="text-sm text-gray-500">Sell materials</p>
          </button>

          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: 'RIDER' })}
            className={`p-4 cursor-pointer rounded-lg border ${formData.role === 'RIDER'
              ? 'border-blue-500 bg-blue-50 text-gray-700'
              : 'border-gray-200 text-gray-400'
              }`}
          >
            <h3 className="font-semibold">Rider</h3>
            <p className="text-sm text-gray-500">Deliver materials</p>
          </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={registerMutation.isPending}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {registerMutation.isPending ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
