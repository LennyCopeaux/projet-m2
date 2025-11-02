'use client';

import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function UserProfile() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) return null;

  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="absolute top-6 right-6 flex items-center gap-3">
      <div className="flex items-center gap-3 px-4 py-2 border border-black/20 rounded-lg bg-white">
        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-medium">
          {initials}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-black">
            {user.firstName} {user.lastName}
          </span>
          <span className="text-xs text-black/60">{user.email}</span>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="px-4 py-2 border border-black/20 text-black hover:bg-black/5 transition-colors rounded-lg text-sm"
      >
        Déconnexion
      </button>
    </div>
  );
}

