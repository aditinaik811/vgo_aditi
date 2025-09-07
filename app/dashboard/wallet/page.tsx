"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/SupabaseClient";
import { useRouter } from "next/navigation";
import {
  FiUser,
  FiDollarSign,
  FiTrendingUp,
  FiGift,
  FiCreditCard,
  FiArrowUpRight,
  FiArrowDownLeft,
  FiRefreshCw,
  FiHelpCircle,
  FiShield,
  FiStar,
  FiUsers,
  FiAward,
  FiZap,
} from "react-icons/fi";

interface UserProfile {
  id: string;
  email: string;
  wallet_balance: number;
  total_earned: number;
  referral_count: number;
  membership_tier: string;
}

interface Transaction {
  id: number;
  type: string;
  amount: number;
  description: string;
  date: string;
  status: string;
}

interface EarningMethod {
  id: number;
  title: string;
  description: string;
  reward: string;
  icon: any;
  category: string;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export default function WalletPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [earningMethods, setEarningMethods] = useState<EarningMethod[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "earn" | "help">(
    "overview"
  );
  const router = useRouter();

  useEffect(() => {
    fetchUserData();
    loadEarningMethods();
    loadFAQs();
    loadTransactions();
  }, []);

  const fetchUserData = async () => {
    try {
      const {
        data: { user: authUser },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !authUser) {
        router.push("/login");
        return;
      }

      // Fetch actual user profile data from Supabase
      // const { data: profileData, error: profileError } = await supabase
      //   .from('profiles')
      //   .select('*')
      //   .eq('id', authUser.id)
      //   .single();

      // if (profileError) throw profileError;

      // For now, use basic user data until profile implementation
      const userProfile: UserProfile = {
        id: authUser.id,
        email: authUser.email || "",
        wallet_balance: 0,
        total_earned: 0,
        referral_count: 0,
        membership_tier: "Bronze",
      };

      setUser(userProfile);
    } catch (error) {
      console.error("Error fetching user data:", error);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const loadTransactions = async () => {
    try {
      // Fetch actual transactions from Supabase
      // const { data, error } = await supabase
      //   .from('transactions')
      //   .select('*')
      //   .eq('user_id', user?.id)
      //   .order('created_at', { ascending: false })
      //   .limit(10);
      
      // if (error) throw error;
      // setTransactions(data || []);
      
      // For now, set empty array until actual implementation
      setTransactions([]);
    } catch (error) {
      console.error("Error loading transactions:", error);
      setTransactions([]);
    }
  };

  const loadEarningMethods = () => {
    const methods: EarningMethod[] = [
      {
        id: 1,
        title: "Complete Surveys",
        description: "Earn money by sharing your opinions through surveys",
        reward: "₹10-50 per survey",
        icon: FiUsers,
        category: "surveys",
      },
      {
        id: 2,
        title: "Daily Check-in",
        description: "Login daily to earn bonus points and rewards",
        reward: "₹5-25 daily",
        icon: FiStar,
        category: "daily",
      },
      {
        id: 3,
        title: "Refer Friends",
        description:
          "Invite friends and earn when they join and complete tasks",
        reward: "₹100 per referral",
        icon: FiGift,
        category: "referral",
      },
      {
        id: 4,
        title: "Complete Tasks",
        description: "Finish simple tasks and micro-jobs to earn rewards",
        reward: "₹15-100 per task",
        icon: FiAward,
        category: "tasks",
      },
      {
        id: 5,
        title: "Watch Videos",
        description: "Earn points by watching promotional videos",
        reward: "₹2-10 per video",
        icon: FiZap,
        category: "videos",
      },
      {
        id: 6,
        title: "Premium Membership",
        description:
          "Upgrade to premium for exclusive high-paying opportunities",
        reward: "Up to 3x earnings",
        icon: FiShield,
        category: "premium",
      },
    ];
    setEarningMethods(methods);
  };

  const loadFAQs = () => {
    const walletFAQs: FAQ[] = [
      {
        id: 1,
        question: "How do I withdraw money from my wallet?",
        answer:
          "You can withdraw money once you reach a minimum balance of ₹100. Go to the withdraw section, select your payment method (bank transfer, UPI, or digital wallet), and follow the instructions.",
        category: "withdrawal",
      },
      {
        id: 2,
        question: "When will I receive my withdrawal?",
        answer:
          "Withdrawals typically process within 2-5 business days. UPI and digital wallet transfers are usually faster (1-2 days), while bank transfers may take 3-5 days.",
        category: "withdrawal",
      },
      {
        id: 3,
        question: "Is there a minimum withdrawal amount?",
        answer:
          "Yes, the minimum withdrawal amount is ₹100. This helps us minimize transaction fees and ensures cost-effective transfers.",
        category: "withdrawal",
      },
      {
        id: 4,
        question: "How can I earn more money?",
        answer:
          "You can increase your earnings by: completing daily surveys, maintaining daily login streaks, referring friends, participating in special promotions, and upgrading to premium membership for exclusive opportunities.",
        category: "earning",
      },
      {
        id: 5,
        question: "What is the referral program?",
        answer:
          "Earn ₹100 for each friend you refer who completes their first survey. Plus, you'll get 10% of their earnings for the first month. There's no limit to how many friends you can refer!",
        category: "earning",
      },
      {
        id: 6,
        question: "Is my wallet secure?",
        answer:
          "Yes, your wallet is protected with bank-level security. We use encryption for all transactions, and your personal information is never shared with third parties.",
        category: "security",
      },
    ];
    setFaqs(walletFAQs);
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Gold":
        return "text-yellow-400";
      case "Silver":
        return "text-gray-300";
      case "Bronze":
        return "text-orange-400";
      default:
        return "text-red-400";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center">
              <FiDollarSign className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-white bg-clip-text text-transparent">
                My Wallet
              </h1>

              <p className="text-gray-400 mt-1">Manage your earnings and track your progress</p>

              <p className="text-gray-400 mt-1">
                Manage your earnings and track your progress
              </p>

            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { key: "overview", label: "Overview", icon: FiDollarSign },
              { key: "earn", label: "How to Earn", icon: FiTrendingUp },
              { key: "help", label: "Help & FAQ", icon: FiHelpCircle },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === key
                    ? "bg-gradient-to-r from-red-500 to-red-700 text-white shadow-lg shadow-red-500/25 transform scale-105"
                    : "text-gray-300 hover:text-white hover:bg-black/50 backdrop-blur-sm border border-red-500/20"
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Balance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-black/50 backdrop-blur-sm border border-red-500/20 rounded-xl shadow-lg p-6 hover:shadow-red-500/10 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-red-500 to-red-700 rounded-lg">
                    <FiDollarSign className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm text-gray-400">Current Balance</span>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-white">
                    ₹{user?.wallet_balance?.toFixed(2)}
                  </p>
                  <p className="text-sm text-green-400">
                    Available for withdrawal
                  </p>
                </div>
              </div>

              <div className="bg-black/50 backdrop-blur-sm border border-red-500/20 rounded-xl shadow-lg p-6 hover:shadow-red-500/10 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-green-700 rounded-lg">
                    <FiTrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm text-gray-400">Total Earned</span>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-white">
                    ₹{user?.total_earned?.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-400">All time earnings</p>
                </div>
              </div>

              <div className="bg-black/50 backdrop-blur-sm border border-red-500/20 rounded-xl shadow-lg p-6 hover:shadow-red-500/10 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg">
                    <FiUsers className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm text-gray-400">Referrals</span>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-white">
                    {user?.referral_count}
                  </p>
                  <p className="text-sm text-gray-400">Friends referred</p>
                </div>
              </div>

              <div className="bg-black/50 backdrop-blur-sm border border-red-500/20 rounded-xl shadow-lg p-6 hover:shadow-red-500/10 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-lg">
                    <FiAward className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm text-gray-400">Membership</span>
                </div>
                <div className="space-y-1">
                  <p
                    className={`text-2xl font-bold ${getTierColor(
                      user?.membership_tier || ""
                    )}`}
                  >
                    {user?.membership_tier}
                  </p>
                  <p className="text-sm text-gray-400">Current tier</p>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-black/50 backdrop-blur-sm border border-red-500/20 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">
                  Recent Transactions
                </h2>
                <button 
                  className="flex items-center text-red-400 hover:text-red-300 font-medium transition-colors hover:scale-105 transform duration-200"
                  onClick={() => {
                    loadTransactions();
                    // Add refresh functionality here
                  }}
                >
                  <FiRefreshCw className="w-4 h-4 mr-1" />
                  Refresh
                </button>
              </div>
              <div className="space-y-4">
                {transactions.length > 0 ? (
                  transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-red-500/10 hover:border-red-500/20 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-2 rounded-lg ${
                            transaction.type === "credit"
                              ? "bg-gradient-to-br from-green-500 to-green-700"
                              : "bg-gradient-to-br from-red-500 to-red-700"
                          }`}
                        >
                          {transaction.type === "credit" ? (
                            <FiArrowDownLeft className="w-4 h-4 text-white" />
                          ) : (
                            <FiArrowUpRight className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-white">
                            {transaction.description}
                          </p>
                          <p className="text-sm text-gray-400">
                            {transaction.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-semibold ${
                            transaction.type === "credit"
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {transaction.type === "credit" ? "+" : ""}₹
                          {Math.abs(transaction.amount).toFixed(2)}
                        </p>
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs ${
                            transaction.status === "completed"
                              ? "bg-green-600/20 text-green-400 border border-green-500/20"
                              : transaction.status === "processing"
                              ? "bg-yellow-600/20 text-yellow-400 border border-yellow-500/20"
                              : "bg-gray-600/20 text-gray-400 border border-gray-500/20"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <FiDollarSign className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">No transactions yet</p>
                    <p className="text-gray-500 text-sm">Start earning to see your transaction history</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* How to Earn Tab */}
        {activeTab === "earn" && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-red-500 to-red-700 rounded-xl p-8 text-white shadow-lg shadow-red-500/25">
              <h2 className="text-2xl font-bold mb-4">Start Earning Today!</h2>
              <p className="text-red-100 mb-6">
                Multiple ways to earn money and grow your wallet balance
              </p>
              <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-medium hover:bg-red-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Get Started
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {earningMethods.map((method) => {
                const IconComponent = method.icon;
                return (
                  <div
                    key={method.id}
                    className="bg-black/50 backdrop-blur-sm border border-red-500/20 rounded-xl shadow-lg p-6 hover:shadow-red-500/10 hover:border-red-500/30 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-gradient-to-br from-red-500 to-red-700 rounded-lg mr-4">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">
                          {method.title}
                        </h3>
                        <p className="text-sm text-green-400 font-medium">
                          {method.reward}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4">{method.description}</p>
                    <button 
                      className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white py-3 px-4 rounded-lg hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105"
                      onClick={() => {
                        // Implement actual earning method logic here
                        console.log(`Starting ${method.title}`);
                      }}
                    >
                      Start Earning
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Help & FAQ Tab */}
        {activeTab === "help" && (
          <div className="space-y-8">
            <div className="bg-black/50 backdrop-blur-sm border border-red-500/20 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="border-b border-red-500/20 pb-6 last:border-b-0"
                  >
                    <h3 className="font-semibold text-white mb-3 flex items-start">
                      <FiHelpCircle className="w-5 h-5 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                      {faq.question}
                    </h3>
                    <p className="text-gray-300 ml-7">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-gradient-to-r from-red-500/20 to-red-700/20 backdrop-blur-sm rounded-xl p-6 border border-red-500/30">
              <div className="flex items-center mb-4">
                <FiHelpCircle className="w-6 h-6 text-red-400 mr-3" />
                <h3 className="text-lg font-semibold text-white">
                  Need More Help?
                </h3>
              </div>
              <p className="text-gray-300 mb-4">
                Can't find what you're looking for? Our support team is here to
                help you 24/7.
              </p>
              <button 
                className="bg-gradient-to-r from-red-500 to-red-700 text-white px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105"
                onClick={() => {
                  // Implement contact support functionality
                  console.log("Contact support clicked");
                }}
              >
                Contact Support
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
