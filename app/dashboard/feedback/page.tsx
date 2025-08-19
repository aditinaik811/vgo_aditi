"use client";

import { useState } from "react";
import { FiSend, FiCheckCircle, FiMessageSquare } from "react-icons/fi";

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setIsSubmitting(true);
    // simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFeedback("");
    }, 3000);
  };

  // ✅ Success state
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 flex items-center justify-center p-6">
        <div className="bg-black/50 backdrop-blur-sm border border-red-500/20 rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Thank You!</h2>
          <p className="text-gray-300">Your feedback has been submitted successfully.</p>
        </div>
      </div>
    );
  }

  // ✅ Feedback form
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center">
              <FiMessageSquare className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-white bg-clip-text text-transparent">
                Share Your Feedback
              </h1>
              <p className="text-gray-400 mt-1">We'd love to hear your thoughts and suggestions</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-black/50 backdrop-blur-sm border border-red-500/20 rounded-xl p-8 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="feedback"
                className="block text-gray-300 text-sm font-medium mb-2"
              >
                <FiMessageSquare className="inline mr-2" />
                Your Feedback
              </label>
              <textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us what you think..."
                rows={8}
                className="w-full bg-black/50 border border-red-500/20 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 resize-none transition-all duration-300"
                required
              />
              <p className="text-gray-500 text-xs mt-2">
                Share your experience, suggestions, or any issues you encountered
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !feedback.trim()}
              className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting Feedback...
                </>
              ) : (
                <>
                  <FiSend className="w-4 h-4 mr-2" />
                  Submit Feedback
                </>
              )}
            </button>
          </form>

          {/* Additional Info */}
          <div className="mt-8 p-4 bg-gray-800/30 rounded-lg border border-gray-700/30">
            <h3 className="text-white font-medium mb-2">Why we collect feedback</h3>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>• Improve our services and user experience</li>
              <li>• Identify and fix issues quickly</li>
              <li>• Understand what features matter most to you</li>
              <li>• Build a better product together</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}