"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/SupabaseClient";
import { useRouter } from "next/navigation";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiMapPin,
  FiGlobe,
  FiEdit3,
  FiSave,
  FiX,
  FiCamera,
} from "react-icons/fi";

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  date_of_birth: string;
  address: string;
  city: string;
  country: string;
  age?: string;
  gender?: string;
  category?: string;
  created_at: string;
  avatar_url?: string;
}

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState<Partial<UserProfile>>({});
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (data?.user) {
          setUser(data.user);
          // Mock profile — replace with Supabase query
          const mockProfile: UserProfile = {
            id: data.user.id,
            email: data.user.email || "",
            full_name: "",
            phone: "",
            date_of_birth: "",
            address: "",
            city: "",
            country: "",
            age: "",
            gender: "",
            category: "",
            created_at: "",
            avatar_url: "",
          };
          setProfile(mockProfile);
          setEditForm(mockProfile);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [router]);

  const handleEdit = () => {
    setEditing(true);
    setEditForm(profile || {});
  };

  const handleCancel = () => {
    setEditing(false);
    setEditForm(profile || {});
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // TODO: Update with Supabase query
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setProfile({ ...profile, ...editForm } as UserProfile);
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center">
              <FiUser className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-white bg-clip-text text-transparent">
                Account Details
              </h1>
              <p className="text-gray-400 mt-1">
                Manage your personal information
              </p>
            </div>
          </div>

          {!editing ? (
            <button
              onClick={handleEdit}
              className="bg-gradient-to-r from-red-500 to-red-700 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <FiEdit3 />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-all duration-300 flex items-center gap-2"
              >
                <FiX />
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 disabled:opacity-50"
              >
                <FiSave />
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </div>

        {/* Profile Picture */}
        <div className="bg-black/50 backdrop-blur-sm border border-red-500/20 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt="Avatar"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <FiUser className="text-white text-3xl" />
                )}
              </div>
              {editing && (
                <button className="absolute bottom-0 right-0 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors">
                  <FiCamera size={16} />
                </button>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {profile?.full_name || "User"}
              </h2>
              <p className="text-gray-400">{profile?.email}</p>
              <p className="text-gray-500 text-sm mt-1">
                Member since{" "}
                {new Date(profile?.created_at || "").toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-black/50 backdrop-blur-sm border border-red-500/20 rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-white mb-6">
            Personal Information
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Full Name
              </label>
              {editing ? (
                <input
                  type="text"
                  value={editForm.full_name || ""}
                  onChange={(e) =>
                    handleInputChange("full_name", e.target.value)
                  }
                  className="w-full bg-black/50 border border-red-500/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                />
              ) : (
                <p className="text-white bg-gray-800/50 rounded-lg px-4 py-3">
                  {profile?.full_name || "Not provided"}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Email Address
              </label>
              <p className="text-white bg-gray-800/50 rounded-lg px-4 py-3">
                {profile?.email}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Email cannot be changed
              </p>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Phone Number
              </label>
              {editing ? (
                <input
                  type="tel"
                  value={editForm.phone || ""}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full bg-black/50 border border-red-500/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                />
              ) : (
                <p className="text-white bg-gray-800/50 rounded-lg px-4 py-3">
                  {profile?.phone || "Not provided"}
                </p>
              )}
            </div>

            {/* Age */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Age
              </label>
              {editing ? (
                <input
                  type="number"
                  value={editForm.age || ""}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  className="w-full bg-black/50 border border-red-500/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                />
              ) : (
                <p className="text-white bg-gray-800/50 rounded-lg px-4 py-3">
                  {profile?.age || "Not provided"}
                </p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Gender
              </label>
              {editing ? (
                <select
                  value={editForm.gender || ""}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="w-full bg-black/50 border border-red-500/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p className="text-white bg-gray-800/50 rounded-lg px-4 py-3">
                  {profile?.gender || "Not provided"}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Category
              </label>
              {editing ? (
                <select
                  value={editForm.category || ""}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  className="w-full bg-black/50 border border-red-500/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                >
                  <option value="">Select Category</option>
                  <option value="Student">Student</option>
                  <option value="Employee">Employee</option>
                  <option value="Employer">Employer</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p className="text-white bg-gray-800/50 rounded-lg px-4 py-3">
                  {profile?.category || "Not provided"}
                </p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Date of Birth
              </label>
              {editing ? (
                <input
                  type="date"
                  value={editForm.date_of_birth || ""}
                  onChange={(e) =>
                    handleInputChange("date_of_birth", e.target.value)
                  }
                  className="w-full bg-black/50 border border-red-500/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                />
              ) : (
                <p className="text-white bg-gray-800/50 rounded-lg px-4 py-3">
                  {profile?.date_of_birth
                    ? new Date(profile.date_of_birth).toLocaleDateString()
                    : "Not provided"}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Address
              </label>
              {editing ? (
                <input
                  type="text"
                  value={editForm.address || ""}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="w-full bg-black/50 border border-red-500/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                />
              ) : (
                <p className="text-white bg-gray-800/50 rounded-lg px-4 py-3">
                  {profile?.address || "Not provided"}
                </p>
              )}
            </div>

            {/* City */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                City
              </label>
              {editing ? (
                <input
                  type="text"
                  value={editForm.city || ""}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="w-full bg-black/50 border border-red-500/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                />
              ) : (
                <p className="text-white bg-gray-800/50 rounded-lg px-4 py-3">
                  {profile?.city || "Not provided"}
                </p>
              )}
            </div>

            {/* Country */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Country
              </label>
              {editing ? (
                <input
                  type="text"
                  value={editForm.country || ""}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  className="w-full bg-black/50 border border-red-500/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                />
              ) : (
                <p className="text-white bg-gray-800/50 rounded-lg px-4 py-3">
                  {profile?.country || "Not provided"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
