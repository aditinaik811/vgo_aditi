'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/SupabaseClient';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      router.push('/dashboard');
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ display: 'block', margin: '1rem 0', width: '100%' }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ display: 'block', margin: '1rem 0', width: '100%' }}
        />

        <button type="submit" style={{ width: '100%', marginBottom: '1rem' }}>
          Login
        </button>
      </form>

      <button onClick={handleGoogleLogin} style={{ width: '100%' }}>
        Sign in with Google
      </button>

      {errorMsg && (
        <p style={{ color: 'red', marginTop: '1rem' }}>{errorMsg}</p>
      )}
    </div>
  );
}
