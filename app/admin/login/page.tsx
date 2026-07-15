'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin/upload';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await signIn('credentials', {
        username,
        password,
        redirect: false,
        callbackUrl,
      });

      if (res?.error) {
        setError('Invalid credentials. Please try again.');
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 items-center justify-center -mt-20 px-6">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      
      <div className="w-full max-w-md bg-white border border-outline-variant/30 rounded-3xl p-8 md:p-10 shadow-xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex w-16 h-16 bg-primary/5 rounded-full items-center justify-center text-primary mb-4 shadow-inner">
            <span className="material-symbols-outlined text-3xl">admin_panel_settings</span>
          </div>
          <h2 className="font-headline-md text-headline-md text-on-surface">Admin Portal</h2>
          <p className="text-sm text-outline mt-2">Sign in to manage services, blog posts, and partners</p>
        </div>

        {error && (
          <div className="bg-error-container/10 border border-error/20 text-error p-4 rounded-xl text-xs font-semibold mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined text-lg">error</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-outline uppercase tracking-wider block">Username</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant/70 text-lg">
                person
              </span>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. admin"
                className="w-full bg-slate-50 border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-outline uppercase tracking-wider block">Password</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant/70 text-lg">
                lock
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/95 text-on-primary font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-8"
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined text-lg animate-spin">sync</span>
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-lg">login</span>
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-outline-variant/20 text-center text-2xs text-outline">
          <p>Shifa Global Care - Protected Administrator Area</p>
        </div>
      </div>
    </div>
  );
}
