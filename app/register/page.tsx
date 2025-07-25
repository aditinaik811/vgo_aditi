// 'use client'

// import './register.css'
// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { supabase } from '@/lib/SupabaseClient'

// export default function RegisterPage() {
//   const router = useRouter()

//   const [form, setForm] = useState({
//     fullName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     age: '',
//     gender: '',
//     category: '',
//     city: ''
//   })

//   const [error, setError] = useState('')
//   const [loading, setLoading] = useState(false)

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setForm(prev => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError('')
//     setLoading(true)

//     if (form.password !== form.confirmPassword) {
//       setError('Passwords do not match')
//       setLoading(false)
//       return
//     }

//     const { data, error: signUpError } = await supabase.auth.signUp({
//       email: form.email,
//       password: form.password
//     })

//     if (signUpError) {
//       setError(signUpError.message)
//       setLoading(false)
//       return
//     }

//     const user = data.user
//     if (user) {
//       const { error: profileError } = await supabase
//         .from('profiles')
//         .insert({
//           id: user.id,
//           email: form.email,
//           full_name: form.fullName,
//           age: parseInt(form.age),
//           gender: form.gender,
//           category: form.category,
//           city: form.city
//         })

//       if (profileError) {
//         setError(profileError.message)
//         setLoading(false)
//         return
//       }
//     }

//     router.push('/dashboard')
//     setLoading(false)
//   }

//   const handleGoogleSignIn = async () => {
//     await supabase.auth.signInWithOAuth({
//       provider: 'google',
//       options: {
//         redirectTo: `${location.origin}/auth/callback` // handles post-login logic
//       }
//     })
//   }

//   return (
//     <div className="register-container">
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit} className="register-form">
//         <input type="text" name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required />
//         <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
//         <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
//         <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required />

//         <select name="age" value={form.age} onChange={handleChange} required>
//           <option value="">Select Age</option>
//           {Array.from({ length: 91 }, (_, i) => (
//             <option key={i + 10} value={i + 10}>{i + 10}</option>
//           ))}
//         </select>

//         <div className="gender-group">
//           <label><input type="radio" name="gender" value="Male" onChange={handleChange} required /> Male</label>
//           <label><input type="radio" name="gender" value="Female" onChange={handleChange} required /> Female</label>
//           <label><input type="radio" name="gender" value="Other" onChange={handleChange} required /> Other</label>
//         </div>

//         <select name="category" value={form.category} onChange={handleChange} required>
//           <option value="">Select Category</option>
//           <option value="Student">Student</option>
//           <option value="Employee">Employee</option>
//           <option value="Employer">Employer</option>
//         </select>

//         <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} required />

//         {error && <p className="error">{error}</p>}

//         <button type="submit" disabled={loading}>
//           {loading ? 'Registering...' : 'Register'}
//         </button>

//         <p>or</p>

//         <button type="button" className="google-btn" onClick={handleGoogleSignIn}>
//           Sign in with Google
//         </button>
//       </form>
//     </div>
//   )
// }




'use client'

import './register.css'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/SupabaseClient'

export default function RegisterPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    category: '',
    city: '',
    phone: '',
    otp: ''
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSendOTP = async () => {
    setError('')
    if (!form.phone.startsWith('+')) {
      setError('Phone number must include country code (e.g., +91XXXXXXXXXX)')
      return
    }

    const { error } = await supabase.auth.signInWithOtp({ phone: form.phone })

    if (error) {
      setError('Failed to send OTP: ' + error.message)
    } else {
      setOtpSent(true)
      alert('OTP sent to ' + form.phone)
    }
  }

  const handleVerifyOTP = async () => {
    setError('')
    const { data, error } = await supabase.auth.verifyOtp({
      phone: form.phone,
      token: form.otp,
      type: 'sms'
    })

    if (error) {
      setError('OTP verification failed: ' + error.message)
    } else {
      setOtpVerified(true)
      alert('Phone number verified successfully!')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!otpVerified) {
      setError('Please verify your phone number via OTP before submitting.')
      setLoading(false)
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    // Sign up with email/password
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    const user = data.user
    if (user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          email: form.email,
          full_name: form.fullName,
          age: parseInt(form.age),
          gender: form.gender,
          category: form.category,
          city: form.city,
          phone: form.phone
        })

      if (profileError) {
        setError(profileError.message)
        setLoading(false)
        return
      }
    }

    setLoading(false)
    router.push('/dashboard')
  }

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`
      }
    })
  }

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input type="text" name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required />

        <select name="age" value={form.age} onChange={handleChange} required>
          <option value="">Select Age</option>
          {Array.from({ length: 91 }, (_, i) => (
            <option key={i + 10} value={i + 10}>{i + 10}</option>
          ))}
        </select>

        <div className="gender-group">
          <label><input type="radio" name="gender" value="Male" onChange={handleChange} required /> Male</label>
          <label><input type="radio" name="gender" value="Female" onChange={handleChange} required /> Female</label>
          <label><input type="radio" name="gender" value="Other" onChange={handleChange} required /> Other</label>
        </div>

        <select name="category" value={form.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="Student">Student</option>
          <option value="Employee">Employee</option>
          <option value="Employer">Employer</option>
        </select>

        <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} required />

        <input type="tel" name="phone" placeholder="Phone Number (e.g. +919999999999)" value={form.phone} onChange={handleChange} required />

        <button type="button" onClick={handleSendOTP} disabled={otpSent}>
          {otpSent ? 'OTP Sent' : 'Send OTP'}
        </button>

        {otpSent && (
          <>
            <input type="text" name="otp" placeholder="Enter OTP" value={form.otp} onChange={handleChange} required />
            <button type="button" onClick={handleVerifyOTP} disabled={otpVerified}>
              {otpVerified ? 'Verified' : 'Verify OTP'}
            </button>
          </>
        )}

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading || !otpVerified}>
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p>or</p>

        <button type="button" className="google-btn" onClick={handleGoogleSignIn}>
          Sign in with Google
        </button>
      </form>
    </div>
  )
}