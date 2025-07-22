'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/SupabaseClient'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleRedirect = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()

      if (error || !user) {
        console.error('User fetch error:', error)
        return
      }

      // Check if profile already exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (!existingProfile) {
        // Insert into profiles table
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            email: user.email,
            // Add default values if needed (e.g., name: user.user_metadata.full_name)
          })

        if (insertError) {
          console.error('Failed to insert profile:', insertError)
        }
      }

      // ✅ Navigate to dashboard
      router.push('/dashboard')
    }

    handleRedirect()
  }, [router])

  return <p>Redirecting...</p>
}
