"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setError("Invalid password");
        setLoading(false);
        return;
      }

      router.push("/admin/shop");
      router.refresh();
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[rgb(44_95_124)] via-[rgb(44_95_124)] to-[rgb(44_95_124)] px-4 font-serif">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-[#e6cfa7]/40"
      >
        <div className="text-center mb-8">
          <span className="inline-block mb-4 px-5 py-1 border border-[#e6cfa7]/60 rounded-full text-xs tracking-widest text-[rgb(44_95_124)]">
            ADMIN ACCESS
          </span>
          <h2 className="text-3xl font-bold text-[rgb(44_95_124)]">
            Enter Admin Password
          </h2>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="password"
            required
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 
            focus:ring-2 focus:ring-[rgb(44_95_124)] outline-none
            text-black placeholder:text-black/50"
            autoFocus
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[rgb(44_95_124)] text-white font-semibold hover:opacity-90 disabled:opacity-50 transition"
          >
            {loading ? "Verifying..." : "Access Admin Panel"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}