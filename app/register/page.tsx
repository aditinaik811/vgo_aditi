'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/SupabaseClient';
import Link from 'next/link';
import PhoneInput from "../../components/PhoneInput";

import './register.css'; // Assuming you have a CSS file for styles

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
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
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
    setOtpLoading(true);

    if (!formData.phone) {
      setError('Please enter your phone number first.');
      setOtpLoading(false);
      return;
    }

    // Phone number validation
    const phoneRegex = /^\+91[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError('Please enter a valid Indian phone number (+91XXXXXXXXXX).');
      setOtpLoading(false);
      return;
    }

    try {
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('phone', formData.phone)
        .single();

      if (existingProfile) {
        setError('Phone number already registered. Please log in.');
        setOtpLoading(false);
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
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setError('');
    setOtpSuccess('');
    setVerifyLoading(true);

    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP.');
      setVerifyLoading(false);
      return;
    }

    try {
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
    } catch (err) {
      setError('An unexpected error occurred during verification.');
      setOtpVerified(false);
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
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
          age: parseInt(formData.age),
          gender: formData.gender,
          category: formData.category,
          city: formData.city,
        },
      ]);

      if (insertError) {
        setError('Error saving profile info. Please try again.');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('An unexpected error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear errors when user starts typing
    if (error) setError('');
  };

  return (
    <div className="register-container" style={{ maxWidth: '480px', margin: '50px auto', padding: '30px', background: 'rgba(15, 15, 15, 0.4)', borderRadius: '20px', border: '2px solid rgba(255, 0, 0, 0.2)' }}>
      <h2 style={{ 
        color: '#ffffff', 
        textAlign: 'center', 
        marginBottom: '30px', 
        fontSize: '32px',
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: '3px',
        textShadow: '0 0 20px rgba(255, 0, 0, 0.8), 0 0 40px rgba(255, 0, 0, 0.4)',
        background: 'linear-gradient(135deg, #ffffff 0%, #ff6666 50%, #ffffff 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        position: 'relative'
      }}>Register</h2>
      
      <form onSubmit={handleRegister} className="space-y-2" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <input
          type="text"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={(e) => handleInputChange('full_name', e.target.value)}
          required
          minLength={2}
          maxLength={50}
        />

        <PhoneInput
          value={formData.phone}
          onChange={(val) => handleInputChange('phone', val)}
          disabled={otpLoading || loading}
        />

        <button
          type="button"
          onClick={handleSendOTP}
          disabled={!formData.phone || otpLoading}
          className={otpLoading ? 'loading' : ''}
        >
          {otpLoading ? 'Sending OTP...' : 'Send OTP to Phone'}
        </button>

        {otpSent && (
          <div className="otp-section">
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                setOtp(value);
                if (error) setError('');
              }}
              required
              maxLength={6}
              pattern="\d{6}"
            />
            <button
              type="button"
              onClick={handleVerifyOTP}
              disabled={!otp || otp.length !== 6 || verifyLoading}
              className={verifyLoading ? 'loading' : ''}
            >
              {verifyLoading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </div>
        )}

        <select
          value={formData.age}
          onChange={(e) => handleInputChange('age', e.target.value)}
          required
        >
          <option value="">Select Age</option>
          {Array.from({ length: 48 }, (_, i) => i + 13).map((age) => (
            <option key={age} value={age}>
              {age} years old
            </option>
          ))}
        </select>

        <select
          value={formData.gender}
          onChange={(e) => handleInputChange('gender', e.target.value)}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <select
          value={formData.category}
          onChange={(e) => handleInputChange('category', e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="Student">Student</option>
          <option value="Employee">Employee</option>
          <option value="Employer">Employer</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          placeholder="City"
          value={formData.city}
          onChange={(e) => handleInputChange('city', e.target.value)}
          required
          minLength={2}
          maxLength={50}
        />

        <button 
          type="submit" 
          disabled={!isFormComplete || loading}
          className={loading ? 'loading' : ''}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>

        {error && (
          <p className="error">{error}</p>
        )}
        
        {otpSuccess && (
          <p className="success">{otpSuccess}</p>
        )}
      </form>

      <p style={{ marginTop: '20px', textAlign: 'center', color: 'rgba(255, 255, 255, 0.8)' }}>
        Already have an account?{' '}
        <Link
          href="/login"
          style={{ color: '#ff6666', textDecoration: 'underline' }}
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}