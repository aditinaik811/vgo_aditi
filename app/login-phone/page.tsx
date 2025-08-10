'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/SupabaseClient';

export default function PhoneLoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = async () => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('phone', phone)
      .single();

    if (!profile) {
      router.push('/register');
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      phone,
    });

    if (error) {
      setError(error.message);
    } else {
      setOtpSent(true);
    }
  };

  const handleVerifyOtp = async () => {
    const { error } = await supabase.auth.verifyOtp({
      phone,
      token: otp,
      type: 'sms',
    });

    if (error) {
      setError(error.message);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="space-y-2">
      <input type="text" placeholder="Enter Phone (+91...)" onChange={(e) => setPhone(e.target.value)} required />
      {!otpSent && <button onClick={handleSendOtp}>Send OTP</button>}
      {otpSent && (
        <>
          <input type="text" placeholder="Enter OTP" onChange={(e) => setOtp(e.target.value)} required />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
} 

