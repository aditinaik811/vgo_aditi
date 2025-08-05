"use client";

import { JSX, useState } from "react";
import {
  FiSearch,
  FiChevronDown,
  FiChevronUp,
  FiHelpCircle,
  FiCreditCard,
  FiUser,
  FiShield,
  FiTruck,
  FiRefreshCw,
} from "react-icons/fi";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

interface FAQCategory {
  name: string;
  icon: JSX.Element;
  color: string;
}

export default function FAQsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const categories: FAQCategory[] = [
    { name: "All", icon: <FiHelpCircle />, color: "red" },
    { name: "Account", icon: <FiUser />, color: "blue" },
    { name: "Payment", icon: <FiCreditCard />, color: "green" },
    { name: "Security", icon: <FiShield />, color: "yellow" },
    { name: "Orders", icon: <FiTruck />, color: "purple" },
    { name: "Refunds", icon: <FiRefreshCw />, color: "orange" },
  ];

  const faqs: FAQ[] = [
    {
      id: 1,
      question: "How do I create an account?",
      answer: "To create an account, click on the 'Sign Up' button on the homepage. Fill in your email, create a strong password, and verify your email address. Once verified, you can start using all VGo features.",
      category: "Account",
    },
    {
      id: 2,
      question: "How can I reset my password?",
      answer: "Click on 'Forgot Password' on the login page. Enter your email address, and we'll send you a password reset link. Follow the instructions in the email to create a new password.",
      category: "Account",
    },
    {
      id: 3,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers. All payments are processed securely through encrypted channels.",
      category: "Payment",
    },
    {
      id: 4,
      question: "Is my payment information secure?",
      answer: "Yes, absolutely. We use industry-standard SSL encryption and PCI DSS compliance to protect your payment information. We never store your complete card details on our servers.",
      category: "Security",
    },
    {
      id: 5,
      question: "How do I add money to my wallet?",
      answer: "Go to 'My Wallet' in your dashboard, click 'Add Funds', select your preferred payment method, enter the amount, and confirm the transaction. Funds are usually added instantly.",
      category: "Payment",
    },
    {
      id: 6,
      question: "Can I cancel my order?",
      answer: "Orders can be cancelled within 1 hour of placement if they haven't been processed yet. Go to 'Purchase History', find your order, and click 'Cancel' if the option is available.",
      category: "Orders",
    },
    {
      id: 7,
      question: "How long do refunds take to process?",
      answer: "Refunds typically take 3-5 business days to appear in your original payment method. Wallet refunds are processed instantly. You'll receive an email confirmation once the refund is initiated.",
      category: "Refunds",
    },
    {
      id: 8,
      question: "How do I update my profile information?",
      answer: "Navigate to 'Account Details' in your dashboard. Click 'Edit Profile', make your changes, and save. Some changes may require email verification for security purposes.",
      category: "Account",
    },
    {
      id: 9,
      question: "What should I do if I suspect unauthorized access?",
      answer: "Immediately change your password, enable 2FA if not already active, and contact our support team. Check your account activity in the Security section and report any suspicious transactions.",
      category: "Security",
    },
  ];

  const toggleExpanded = (id: number) => {
    setExpandedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center">
              <FiHelpCircle className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-white bg-clip-text text-transparent">
                Frequently Asked Questions
              </h1>
              <p className="text-gray-400 mt-1">Find answers to common questions about VGo</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/50 backdrop-blur-sm border border-red-500/20 text-white placeholder-gray-400 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 transform hover:scale-105
                  ${
                    selectedCategory === category.name
                      ? "bg-red-500/20 border-red-500/50 text-red-300"
                      : "bg-black/30 border-gray-600/30 text-gray-400 hover:bg-gray-800/50 hover:border-gray-500/50"
                  }
                `}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <FiHelpCircle className="text-gray-500 text-6xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No FAQs Found</h3>
              <p className="text-gray-500">Try adjusting your search terms or category filter.</p>
            </div>
          ) : (
            filteredFAQs.map((faq) => (
              <div
                key={faq.id}
                className="bg-black/50 backdrop-blur-sm border border-red-500/20 rounded-xl overflow-hidden transition-all duration-300 hover:border-red-500/40"
              >
                <button
                  onClick={() => toggleExpanded(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-red-500/5 transition-colors duration-300"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-3 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">{faq.question}</h3>
                      <span className="text-sm text-red-400 font-medium">
                        {faq.category}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    {expandedItems.includes(faq.id) ? (
                      <FiChevronUp className="text-red-400 text-xl transition-transform duration-300" />
                    ) : (
                      <FiChevronDown className="text-red-400 text-xl transition-transform duration-300" />
                    )}
                  </div>
                </button>
                
                {expandedItems.includes(faq.id) && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-red-500/10 pt-4">
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Contact Support */}
        <div className="mt-12 bg-gradient-to-r from-red-500/10 to-red-700/10 border border-red-500/20 rounded-xl p-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Still have questions?</h3>
            <p className="text-gray-400 mb-4">Can't find what you're looking for? Our support team is here to help.</p>
            <button className="bg-gradient-to-r from-red-500 to-red-700 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}