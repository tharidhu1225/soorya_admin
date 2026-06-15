import React from "react";
import { FaLock, FaExclamationTriangle } from "react-icons/fa";

export default function BlockPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-black to-red-900 flex items-center justify-center p-6">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-red-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Card */}
      <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-10 max-w-lg w-full text-center">
        {/* Lock Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-600 p-5 rounded-full shadow-lg shadow-red-500/40">
            <FaLock className="text-white text-4xl" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">
          Account Access Restricted
        </h1>

        <p className="text-gray-300 leading-relaxed mb-4">
          Payment verification is currently pending. Access to the system has
          been temporarily restricted until the required payment has been
          completed and confirmed.
        </p>

        <p className="text-gray-400 text-sm mb-8">
          ගෙවීම (Payment) සම්පූර්ණ කර තහවුරු කරන තුරු පද්ධතියේ සියලුම
          සේවාවන් සහ පහසුකම් තාවකාලිකව අක්‍රිය කර ඇත.
        </p>

        {/* Warning Box */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 mb-8">
          <div className="flex items-center justify-center gap-2 text-red-300 mb-2">
            <FaExclamationTriangle className="text-lg" />
            <span className="font-semibold">Payment Required</span>
          </div>

          <p className="text-gray-300 text-sm">
            Please complete the outstanding payment to restore full access to
            your account.
          </p>
        </div>

        {/* Button */}
        <button
          onClick={() => window.location.reload()}
          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-red-900/50"
        >
          Check Payment Status
        </button>

        <p className="text-xs text-gray-500 mt-6">
          If you believe this restriction was applied incorrectly, please
          contact the administrator.
        </p>
      </div>
    </div>
  );
}