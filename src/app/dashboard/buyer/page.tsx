'use client';

import { useRouter } from 'next/navigation';
import { userApi } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

export default function BuyerDashboard() {
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile,
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">Loading Buyer Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Buyer Dashboard</h2>
        <p className="text-gray-600">Welcome to your buyer dashboard. Here you can manage your orders and browse materials.</p>
      </div>
      {/* Add more dashboard content here */}
    </div>
  );
}
