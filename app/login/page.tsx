'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/SupabaseClient';
import './login.css';
import PhoneInput from "../../components/PhoneInput"; 

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    setError('');
    setLoading(true);

    // Check if phone number exists in profiles
    const { data: existingProfile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('phone', phone)
      .single();

    if (profileError || !existingProfile) {
      setError('Phone number not registered. Please register first.');
      setLoading(false);
      return;
    }

    // If profile exists, send OTP
    const { error } = await supabase.auth.signInWithOtp({ phone });

    if (error) {
      setError(error.message);
    } else {
      setOtpSent(true);
    }
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    setError('');
    setLoading(true);
    
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
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/login/callback`,
      },
    });

    if (error) {
      setError('Google sign-in failed.');
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      
      <form className="login-form" onSubmit={(e) => e.preventDefault()}>
        {/* ✅ PhoneInput (dropdown smaller, input wider) */}
        <PhoneInput
          value={phone}
          onChange={setPhone}
          disabled={loading}
        />

        {!otpSent ? (
          <button 
            type="button"
            onClick={handleSendOtp} 
            disabled={loading || !phone}
            className={loading ? 'loading' : ''}
          >
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        ) : (
          <div className="otp-section">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              disabled={loading}
            />
            <button 
              type="submit"
              onClick={handleVerifyOtp} 
              disabled={loading || !otp}
              className={loading ? 'loading' : ''}
            >
              {loading ? 'Verifying...' : 'Verify & Login'}
            </button>
          </div>
        )}

        <button 
          type="button"
          onClick={handleGoogleLogin} 
          disabled={loading}
          className="google-btn"
        >
          {loading ? 'Signing in...' : 'Sign in with Google'}
        </button>

        {error && <div className="login-error">{error}</div>}
        {otpSent && !error && <div className="success">OTP sent to your phone number!</div>}
      </form>

      <p style={{ marginTop: '20px', textAlign: 'center', color: 'rgba(255, 255, 255, 0.8)', padding: '20px' }}>
        New user?{' '}
        <a href="/register" style={{ 
          color: '#ff6666', 
          textDecoration: 'underline',
          textShadow: '0 0 10px rgba(255, 0, 0, 0.5)',
          transition: 'all 0.3s ease'
        }}>
          Register
        </a>
      </p>
    </div>
  );
}
