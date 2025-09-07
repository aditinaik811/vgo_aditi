"use client";

import { useState } from "react";
import {
  FiDownload,
  FiShoppingBag,
  FiCalendar,
  FiClock,
  FiFileText,
  FiFilter,
  FiSearch,
} from "react-icons/fi";

interface Purchase {
  id: string;
  title: string;
  amount: string;
  date: string;
  time: string;
  category: string;
  status: "completed" | "pending" | "refunded";
  items: number;
}

export default function PurchaseHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const purchases: Purchase[] = [
    // {
    //   id: "VGO-2025-001",
    //   title: "Gold Membership Subscription",
    //   amount: "₹4999",
    //   date: "2 Sep 2025",
    //   time: "2:30 PM",
    //   category: "Subscription",
    //   status: "completed",
    //   items: 1,
    // },
    // {
    //   id: "VGO-2025-002",
    //   title: "Solo Karting Session",
    //   amount: "₹500",
    //   date: "12 Aug 2024",
    //   time: "11:45 AM",
    //   category: "Entertainment",
    //   status: "completed",
    //   items: 1,
    // },
    // {
    //   id: "VGO-2025-003",
    //   title: "Duo Karting Session",
    //   amount: "₹799",
    //   date: "8 Aug 2024",
    //   time: "4:20 PM",
    //   category: "Entertainment",
    //   status: "completed",
    //   items: 1,
    // },
    // {
    //   id: "VGO-2024-004",
    //   title: "Solo Karting Session",
    //   amount: "₹500",
    //   date: "5 Aug 2024",
    //   time: "9:15 AM",
    //   category: "Entertainment",
    //   status: "pending",
    //   items: 1,
    // },
    // {
    //   id: "VGO-2024-005",
    //   title: "Family Karting Pack",
    //   amount: "₹1299",
    //   date: "2 Aug 2024",
    //   time: "6:30 PM",
    //   category: "Family",
    //   status: "refunded",
    //   items: 1,
    // },
  ];

  const downloadReceipt = (purchase: Purchase) => {
    // Create a simple text receipt (in real app, this would be a PDF)
    const receiptContent = `
=====================================
           PURCHASE RECEIPT
=====================================

Transaction ID: ${purchase.id}
Date: ${purchase.date}
Time: ${purchase.time}

-------------------------------------
Item: ${purchase.title}
Category: ${purchase.category}
Quantity: ${purchase.items}
Amount: ${purchase.amount}
Status: ${purchase.status.toUpperCase()}
-------------------------------------

Thank you for your purchase!

Support: support@company.com
Website: www.company.com

=====================================
    `;

    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt-${purchase.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-400 bg-green-900/20 border-green-700";
      case "pending":
        return "text-yellow-400 bg-yellow-900/20 border-yellow-700";
      case "refunded":
        return "text-red-400 bg-red-900/20 border-red-700";
      default:
        return "text-gray-400 bg-gray-900/20 border-gray-700";
    }
  };

  const filteredPurchases = purchases.filter((purchase) => {
    const matchesSearch = purchase.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || purchase.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalSpent = purchases
    .filter((p) => p.status === "completed")
    .reduce((total, purchase) => {
      return total + parseInt(purchase.amount.replace(/[₹,]/g, ""));
    }, 0);

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Purchase History
          </h1>
          <p className="text-red-200">
            View and download receipts for all your purchases
          </p>
        </div>

        {/* Stats Card */}
        <div className="bg-red-900/30 rounded-xl shadow-lg p-6 mb-8 border border-red-800 text-white">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-600">
                <FiShoppingBag className="w-8 h-8 text-red-400" />
              </div>
              <p className="text-red-200 text-sm mb-1">Total Purchases</p>
              <p className="text-2xl font-bold">{purchases.length}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-600">
                <FiFileText className="w-8 h-8 text-red-400" />
              </div>
              <p className="text-red-200 text-sm mb-1">Total Spent</p>
              <p className="text-2xl font-bold">
                ₹{totalSpent.toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-600">
                <FiDownload className="w-8 h-8 text-red-400" />
              </div>
              <p className="text-red-200 text-sm mb-1">Available Receipts</p>
              <p className="text-2xl font-bold">{purchases.length}</p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-red-900/30 rounded-xl shadow-lg p-6 mb-8 border border-red-800">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search purchases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black/30 border border-red-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="relative">
              <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-black/30 border border-red-700 rounded-lg pl-10 pr-8 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>
        </div>

        {/* Purchase List */}
        <div className="bg-red-900/30 rounded-xl shadow-lg p-6 border border-red-800 text-white">
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <FiShoppingBag className="w-6 h-6 mr-2 text-red-400" />
            Purchase History
          </h3>

          <div className="space-y-4">
            {filteredPurchases.map((purchase) => (
              <div
                key={purchase.id}
                className="bg-black/30 rounded-lg border border-red-700 p-6 hover:bg-black/50 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Purchase Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-1">
                          {purchase.title}
                        </h4>
                        <p className="text-red-300 text-sm font-mono">
                          {purchase.id}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                          purchase.status
                        )}`}
                      >
                        {purchase.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-red-200">
                      <div className="flex items-center">
                        <FiCalendar className="w-4 h-4 mr-1" />
                        {purchase.date}
                      </div>
                      <div className="flex items-center">
                        <FiClock className="w-4 h-4 mr-1" />
                        {purchase.time}
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                        {purchase.category}
                      </div>
                      <div>
                        {purchase.items} item{purchase.items > 1 ? "s" : ""}
                      </div>
                    </div>
                  </div>

                  {/* Amount and Download */}
                  <div className="flex items-center justify-between lg:justify-end gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white">
                        {purchase.amount}
                      </p>
                    </div>
                    <button
                      onClick={() => downloadReceipt(purchase)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <FiDownload className="w-4 h-4" />
                      <span className="hidden sm:inline">Download</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPurchases.length === 0 && (
            <div className="text-center py-12">
              <FiShoppingBag className="w-16 h-16 text-red-400 mx-auto mb-4 opacity-50" />
              <p className="text-red-200 text-lg">No purchases found</p>
              <p className="text-red-300 text-sm">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="bg-red-900/30 rounded-xl shadow-lg p-6 border border-red-800 text-white mt-8">
          <h3 className="text-lg font-bold mb-3">Need Help?</h3>
          <p className="text-red-200 text-sm mb-4">
            If you have any questions about your go karting sessions or need
            assistance with tickets, please contact our support team.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:support@company.com"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Contact Support
            </a>
            <a
              href="#"
              className="bg-black/30 hover:bg-black/50 text-white px-4 py-2 rounded-lg border border-red-700 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              View FAQ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
