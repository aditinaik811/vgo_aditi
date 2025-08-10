'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/SupabaseClient';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    age: '',
    gender: '',
    category: '',
    city: '',
  });

  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSuccess, setOtpSuccess] = useState('');

  const isFormComplete =
    formData.full_name &&
    formData.phone &&
    formData.age &&
    formData.gender &&
    formData.category &&
    formData.city &&
    otpVerified;

  const handleSendOTP = async () => {
    setError('');
    setOtpSuccess('');
    setOtpVerified(false);

    if (!formData.phone) {
      setError('Please enter your phone number first.');
      return;
    }

    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('phone', formData.phone)
      .single();

    if (existingProfile) {
      setError('Phone number already registered. Please log in.');
      return;
    }

    const { error: otpError } = await supabase.auth.signInWithOtp({
      phone: formData.phone,
    });

    if (otpError) {
      setError(otpError.message);
    } else {
      setOtpSent(true);
      setOtpSuccess('OTP sent successfully to your phone.');
    }
  };

  const handleVerifyOTP = async () => {
    setError('');
    setOtpSuccess('');

    const { data, error: verifyError } = await supabase.auth.verifyOtp({
      phone: formData.phone,
      token: otp,
      type: 'sms',
    });

    if (verifyError) {
      setError('Invalid OTP. Please try again.');
      setOtpVerified(false);
    } else {
      setOtpVerified(true);
      setOtpSuccess('OTP verified successfully!');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const {
      data: { user },
      error: sessionError,
    } = await supabase.auth.getUser();

    if (!user || sessionError) {
      setError('User session invalid. Please verify OTP again.');
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase.from('profiles').insert([
      {
        id: user.id,
        full_name: formData.full_name,
        phone: formData.phone,
        age: formData.age,
        gender: formData.gender,
        category: formData.category,
        city: formData.city,
      },
    ]);

    if (insertError) {
      setError('Error saving profile info.');
    } else {
      router.push('/dashboard');
    }

    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleRegister} className="space-y-2">
        <input
          type="text"
          placeholder="Full Name"
          onChange={(e) =>
            setFormData({ ...formData, full_name: e.target.value })
          }
          required
        />

        <input
          type="text"
          placeholder="Phone (+91...)"
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />

        <button
          type="button"
          onClick={handleSendOTP}
          disabled={!formData.phone}
        >
          Send OTP to phone
        </button>

        {otpSent && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={handleVerifyOTP}
              disabled={!otp}
            >
              Verify OTP
            </button>
          </>
        )}

        <select
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          required
        >
          <option value="">Select Age</option>
          {Array.from({ length: 48 }, (_, i) => i + 13).map((age) => (
            <option key={age} value={age}>
              {age}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <select
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          required
        >
          <option value="">Select Category</option>
          <option value="Student">Student</option>
          <option value="Employee">Employee</option>
          <option value="Employer">Employer</option>
          <option value="Racer">Racer</option>
          <option value="Mechanic">Mechanic</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          placeholder="City"
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          required
        />

        <button type="submit" disabled={!isFormComplete || loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {otpSuccess && <p style={{ color: 'green' }}>{otpSuccess}</p>}
      </form>

      <p style={{ marginTop: 20 }}>
        Already have an account?{' '}
        <Link
          href="/login"
          style={{ color: 'blue', textDecoration: 'underline' }}
        >
          Login
        </Link>
      </p>
    </div>
  );
}

