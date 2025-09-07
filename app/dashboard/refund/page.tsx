"use client";

import {
  FiRefreshCw,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiCreditCard,
  FiMail,
} from "react-icons/fi";

export default function RefundPolicyPage() {
  const policyItems = [
    {
      title: "30-Day Refund Window",
      description: "Request refunds within 30 days of purchase for most items.",
      icon: <FiClock />,
      color: "green",
    },
    {
      title: "Eligible Items",
      description:
        "Physical products, unused digital credits, and premium subscriptions.",
      icon: <FiCheckCircle />,
      color: "blue",
    },
    {
      title: "Non-Refundable Items",
      description:
        "Downloaded digital content, used game codes, and gift cards.",
      icon: <FiXCircle />,
      color: "red",
    },
    {
      title: "Processing Time",
      description:
        "Refunds processed within 3-5 business days to original payment method.",
      icon: <FiRefreshCw />,
      color: "purple",
    },
  ];

  const refundSteps = [
    {
      step: 1,
      title: "Request Refund",
      description:
        "Go to Purchase History and click 'Request Refund' on eligible orders.",
    },
    {
      step: 2,
      title: "Provide Reason",
      description:
        "Select refund reason and provide additional details if required.",
    },
    {
      step: 3,
      title: "Review Process",
      description: "Our team reviews your request within 24-48 hours.",
    },
    {
      step: 4,
      title: "Refund Issued",
      description:
        "Approved refunds are processed to your original payment method.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center">
              <FiRefreshCw className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-white bg-clip-text text-transparent">
                Refund Policy
              </h1>
              <p className="text-gray-400 mt-1">
                Learn about our refund terms and process
              </p>
            </div>
          </div>
        </div>

        {/* Policy Overview */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {policyItems.map((item, index) => (
            <div
              key={index}
              className="bg-black/50 backdrop-blur-sm border border-red-500/20 rounded-xl p-6 hover:border-red-500/40 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="text-2xl text-red-400">{item.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Refund Process */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            How to Request a Refund
          </h2>
          <div className="space-y-4">
            {refundSteps.map((step, index) => (
              <div
                key={index}
                className="bg-black/50 backdrop-blur-sm border border-red-500/20 rounded-xl p-6 flex items-start gap-4"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <FiAlertCircle className="text-yellow-400 text-xl flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Important Notes
              </h3>
              <ul className="text-gray-300 space-y-2">
                <li>
                  • Refunds are processed to the original payment method only
                </li>
                <li>
                  • Digital items must be unused and not downloaded to be
                  eligible
                </li>
                <li>
                  • Partial refunds may apply for used subscription periods
                </li>
                <li>
                  • All refund requests are subject to review and approval
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          <button className="bg-gradient-to-r from-red-500 to-red-700 text-white p-4 rounded-xl font-medium hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
            <FiCreditCard />
            View Purchase History
          </button>
          <button className="bg-black/50 backdrop-blur-sm border border-red-500/20 text-white p-4 rounded-xl font-medium hover:border-red-500/40 transition-all duration-300 flex items-center justify-center gap-2">
            <FiMail />
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
