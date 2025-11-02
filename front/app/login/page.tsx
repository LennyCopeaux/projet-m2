'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { login, saveToken } from '../services/auth';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login: setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await login({ email, password });
      saveToken(response.token);
      setUser(response.user);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la connexion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link
            href="/"
            className="text-sm text-[#060202]/60 hover:text-[#aa3030] transition-colors"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-normal text-[#060202] mb-2">Connexion</h1>
          <p className="text-sm text-[#060202]/60">Accédez à votre compte</p>
        </div>

        {error && (
          <div className="mb-5 p-4 border border-red-300 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm text-[#060202]/70 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-[#060202]/20 bg-white text-[#060202] placeholder-[#060202]/40 focus:outline-none focus:border-[#aa3030] rounded-lg"
              placeholder="john.doe@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-[#060202]/70 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-[#060202]/20 bg-white text-[#060202] placeholder-[#060202]/40 focus:outline-none focus:border-[#aa3030] rounded-lg"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 bg-[#aa3030] text-white hover:bg-[#8a2525] disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-lg font-medium"
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-[#060202]/60">
            Pas encore de compte ?{' '}
            <Link href="/register" className="text-[#aa3030] hover:text-[#8a2525] underline transition-colors">
              S&apos;inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

