'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/SupabaseClient';

export default function GoogleCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;

      if (user) {
        const { id, email, user_metadata } = user;
        const full_name = user_metadata.full_name || user_metadata.name || 'No Name';

        // Check if profile exists
        const { data: existingProfile, error: fetchError } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', id)
          .single();

        // Insert if not found
        if (!existingProfile) {
          await supabase.from('profiles').insert([
            {
              id,
              email,
              full_name,
            },
          ]);
        }

        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    };

    handleCallback();
  }, [router]);

  return <p>Signing in with Google...</p>;
}  
