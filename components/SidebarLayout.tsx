"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import {
  FiUser,
  FiCreditCard,
  FiRefreshCw,
  FiLogOut,
  FiMenu,
  FiX,
  FiShoppingBag,
  FiMessageCircle,
  FiUsers,
} from "react-icons/fi";

type SidebarLayoutProps = {
  children: ReactNode;
};

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    // Add Supabase logout logic here
    router.push("/login");
  };

  const navItems = [

    { label: "My Wallet", icon: <FiCreditCard />, path: "/dashboard/wallet" },
    { label: "Purchase History", icon: <FiShoppingBag />, path: "/dashboard/purchase-history" },
    { label: "Feedback", icon: <FiMessageCircle />, path: "/dashboard/feedback" },
    { label: "Referral", icon: <FiUsers />, path: "/dashboard/referral" },
  ];

  const handleNavClick = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 overflow-hidden">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-black/50 backdrop-blur-sm border border-red-500/30 text-white p-3 rounded-xl hover:bg-red-500/20 transition-all duration-300"
      >
        {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-40 w-80 
        bg-black/50 backdrop-blur-xl border-r border-red-500/20 
        transform transition-transform duration-300 ease-in-out
        ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }
      `}
      >
        <div className="p-8 h-full flex flex-col overflow-hidden">
          {/* Logo/Brand */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-white bg-clip-text text-transparent">
                VGo
              </h2>
            </div>
            <p className="text-gray-400 text-sm">Manage your account</p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2 flex-1 overflow-hidden">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.path)}
                className="group flex items-center gap-4 text-gray-300 hover:text-white bg-transparent hover:bg-red-500/10 border border-transparent hover:border-red-500/30 rounded-xl p-4 transition-all duration-300 text-left transform hover:scale-105"
              >
                <div className="text-xl text-red-400 group-hover:text-red-300 transition-colors">
                  {item.icon}
                </div>
                <span className="font-medium">{item.label}</span>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg
                    className="w-4 h-4 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            ))}
          </nav>

          {/* User Profile Section */}
          <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center">
                <FiUser className="text-white" size={20} />
              </div>
              <div>
                <p className="text-white font-medium">Username</p>
                <p className="text-gray-400 text-sm"></p>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="group flex items-center gap-4 text-red-400 hover:text-red-300 bg-transparent hover:bg-red-500/10 border border-red-500/30 hover:border-red-500/50 rounded-xl p-4 mt-4 transition-all duration-300 text-left transform hover:scale-105"
          >
            <FiLogOut className="text-xl group-hover:rotate-12 transition-transform" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 overflow-hidden">
        <div className="lg:hidden h-20"></div>
        {/* Spacer for mobile menu button */}
        {children}
      </main>
    </div>
  );
};

export default SidebarLayout;
