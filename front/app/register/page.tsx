'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    setIsLoading(true);
    // TODO: Implémenter la logique d'inscription
    console.log('Inscription:', { firstName, lastName, email, password });
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link
            href="/"
            className="text-sm text-black/60 hover:text-black transition-colors"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-normal text-black mb-2">Inscription</h1>
          <p className="text-sm text-black/60">Créez votre compte</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm text-black/70 mb-2">
                Prénom
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-black/20 bg-white text-black placeholder-black/40 focus:outline-none focus:border-black rounded-lg"
                placeholder="Prénom"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm text-black/70 mb-2">
                Nom
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-black/20 bg-white text-black placeholder-black/40 focus:outline-none focus:border-black rounded-lg"
                placeholder="Nom"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-black/70 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-black/20 bg-white text-black placeholder-black/40 focus:outline-none focus:border-black rounded-lg"
              placeholder="votre@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-black/70 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-black/20 bg-white text-black placeholder-black/40 focus:outline-none focus:border-black rounded-lg"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm text-black/70 mb-2">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-black/20 bg-white text-black placeholder-black/40 focus:outline-none focus:border-black rounded-lg"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 bg-black text-white hover:bg-black/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-lg font-medium"
          >
            {isLoading ? 'Inscription...' : "S'inscrire"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-black/60">
            Déjà un compte ?{' '}
            <Link href="/login" className="text-black underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

