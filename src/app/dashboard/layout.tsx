'use client';

import { useRouter } from 'next/navigation';
import { authApi } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { userApi } from '@/services/api';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile,
  });

  const handleLogout = () => {
    authApi.logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-900">Construction App</span>
            </div>
            <div className="flex items-center gap-4">
              {profile && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Welcome,</span>
                  <span className="text-sm font-medium text-gray-900">{profile.fullName}</span>
                  <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
                    {profile.role}
                  </span>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}