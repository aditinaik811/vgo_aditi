'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/SupabaseClient';

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = async () => {
  setError('');

  // Check if phone number exists in profiles
  const { data: existingProfile, error: profileError } = await supabase
    .from('profiles')
    .select('id')
    .eq('phone', phone)
    .single();

  if (profileError || !existingProfile) {
    setError('Phone number not registered. Please register first.');
    return;
  }

  // If profile exists, send OTP
  const { error } = await supabase.auth.signInWithOtp({ phone });

  if (error) {
    setError(error.message);
  } else {
    setOtpSent(true);
    alert('OTP sent to your phone number.');
  }
};
  const handleVerifyOtp = async () => {
    setError('');
    const { error } = await supabase.auth.verifyOtp({
      phone,
      token: otp,
      type: 'sms',
    });

    if (error) {
      setError('Invalid OTP. Please try again.');
    } else {
      router.push('/dashboard');
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/login/callback`,
      },
    });

    if (error) {
      setError('Google sign-in failed.');
    }
  };

  return (
    <div className="space-y-4 max-w-sm mx-auto mt-10">
      <h2 className="text-xl font-bold">Login</h2>

      <input
        type="tel"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      {!otpSent ? (
        <button onClick={handleSendOtp} className="w-full bg-blue-500 text-white p-2 rounded">
          Send OTP
        </button>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button onClick={handleVerifyOtp} className="w-full bg-green-500 text-white p-2 rounded">
            Verify OTP
          </button>
        </>
      )}

      <button onClick={handleGoogleLogin} className="w-full bg-red-500 text-white p-2 rounded">
        Sign in with Google
      </button>

      {error && <p className="text-red-600">{error}</p>}

      <p className="text-center">
        New user?{' '}
        <a href="/register" className="text-blue-600 underline">
          Register
        </a>
      </p>
    </div>
  );
}
