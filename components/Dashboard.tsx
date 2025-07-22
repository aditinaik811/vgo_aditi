"use client";

import { useEffect, useState } from "react";
import {supabase} from '../lib/SupabaseClient'
import { useRouter } from "next/navigation";

const DashboardComponent = () => {

  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (data?.user) {
        setUser(data.user);
      } else {
        router.push("/login"); // redirect to login if not logged in
      }
    };

    getUser();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h1>
      {user && (
        <p className="text-lg">Logged in as: {user.email}</p>
      )}
    </div>
  );
};

export default DashboardComponent;
