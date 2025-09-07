"use client";

import { useState } from "react";
import {
  FiCopy,
  FiUsers,
  FiGift,
  FiMail,
  FiLink,
  FiCheck,
} from "react-icons/fi";

export default function ReferralPage() {
  const [referralCode] = useState("REF-XK9P2M");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const stats = [
    { icon: FiUsers, label: "Total Referrals", value: "8" },
    { icon: FiGift, label: "Rewards Earned", value: "₹1,200" },
  ];

  const recentReferrals = [
    { name: "Arya Bhat", reward: "₹150", date: "2 days ago" },
    { name: "Anush", reward: "₹150", date: "1 week ago" },
    { name: "Aditi", reward: "₹150", date: "2 weeks ago" },
  ];

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Referral Dashboard
          </h1>
          <p className="text-red-200">Share your code and earn rewards</p>
        </div>

        {/* Main Referral Card */}
        <div className="bg-red-900/30 rounded-xl shadow-lg p-8 mb-8 border border-red-800 text-white">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiGift className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your Referral Code</h2>
            <p className="text-red-200 mb-6">
              Share this code with friends and earn rewards for each successful
              referral
            </p>

            {/* Referral Code Display */}
            <div className="bg-black/30 rounded-lg p-4 mb-6 border border-red-700">
              <div className="flex items-center justify-center space-x-4">
                <span className="text-2xl font-mono font-bold text-white tracking-wider">
                  {referralCode}
                </span>
                <button
                  onClick={copyToClipboard}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {copied ? (
                    <>
                      <FiCheck className="w-4 h-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <FiCopy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex justify-center space-x-4">
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center space-x-2">
                <FiMail className="w-4 h-4" />
                <span>Share via Email</span>
              </button>
              <button className="bg-black/30 hover:bg-black/50 text-white px-6 py-2 rounded-lg border border-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center space-x-2">
                <FiLink className="w-4 h-4" />
                <span>Generate Link</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-red-900/30 rounded-xl shadow-lg p-6 border border-red-800 text-white"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-200 text-sm mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-red-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Referrals */}
        <div className="bg-red-900/30 rounded-xl shadow-lg p-6 border border-red-800 text-white mb-8">
          <h3 className="text-xl font-bold mb-4">Recent Referrals</h3>
          <div className="space-y-4">
            {recentReferrals.map((referral, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-red-700"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-red-600/20 rounded-full flex items-center justify-center border border-red-600">
                    <span className="text-red-400 font-semibold">
                      {referral.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{referral.name}</p>
                    <p className="text-red-200 text-sm">{referral.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">{referral.reward}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How it Works */}
        <div className="bg-red-900/30 rounded-xl shadow-lg p-6 border border-red-800 text-white">
          <h3 className="text-xl font-bold mb-4">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-red-600">
                <span className="text-red-400 font-bold">1</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Share Your Code</h4>
              <p className="text-red-200 text-sm">
                Send your unique referral code to friends and family
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-red-600">
                <span className="text-red-400 font-bold">2</span>
              </div>
              <h4 className="text-white font-semibold mb-2">They Sign Up</h4>
              <p className="text-red-200 text-sm">
                Your referrals use your code during registration
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-red-600">
                <span className="text-red-400 font-bold">3</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Earn Rewards</h4>
              <p className="text-red-200 text-sm">
                Get ₹150 for each successful referral completion
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
