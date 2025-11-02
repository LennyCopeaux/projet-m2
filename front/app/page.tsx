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
            <UserProfile />
          ) : (
            <div className="absolute top-6 right-6 flex gap-3">
              <Link
                href="/login"
                className="px-5 py-2.5 border border-black/20 text-black hover:bg-black/5 transition-colors rounded-lg text-sm"
              >
                Connexion
              </Link>
              <Link
                href="/register"
                className="px-5 py-2.5 bg-black text-white hover:bg-black/90 transition-colors rounded-lg text-sm"
              >
                Inscription
              </Link>
            </div>
          )}
        </>
      )}
      <AddBookButton />
    </div>
  );
}
