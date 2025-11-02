'use client';

import AddBookButton from './components/AddBookButton';
import UserProfile from './components/UserProfile';
import Link from 'next/link';
import { useAuth } from './contexts/AuthContext';

export default function Home() {
  const { user, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-8">
      {!isLoading && (
        <>
          {user ? (
            <>
              <UserProfile />
              <AddBookButton />
            </>
          ) : (
            <>
              <div className="absolute top-6 right-6 flex gap-3">
                <Link
                  href="/login"
                  className="px-5 py-2.5 border border-[#aa3030]/30 text-[#aa3030] hover:bg-[#aa3030]/5 transition-colors rounded-lg text-sm font-medium"
                >
                  Connexion
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-2.5 bg-[#aa3030] text-white hover:bg-[#8a2525] transition-colors rounded-lg text-sm font-medium"
                >
                  Inscription
                </Link>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
