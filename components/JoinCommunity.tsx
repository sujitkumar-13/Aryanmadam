"use client";

import { useState, FormEvent } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ShoppingBag, Heart, CheckCircle, XCircle, Loader2, Sparkles } from "lucide-react";
import ThreeDCard from "@/components/ThreeDCard";

export default function JoinCommunity() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Reset messages
    setMessage("");
    setMessageType("");
    setLoading(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessageType("success");
        setMessage(data.message || "Successfully subscribed!");
        setEmail(""); // Clear input on success
        setIsSubscribed(true); // Mark as subscribed
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setMessage("");
          setMessageType("");
        }, 5000);
      } else {
        setMessageType("error");
        setMessage(data.error || "Failed to subscribe. Please try again.");
        
        // Hide error message after 5 seconds
        setTimeout(() => {
          setMessage("");
          setMessageType("");
        }, 5000);
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setMessageType("error");
      setMessage("Something went wrong. Please try again later.");
      
      // Hide error message after 5 seconds
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleShopClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    if (pathname === '/shop') {
      // Already on shop page, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigate to shop page
      router.push('/shop');
    }
  };

  return (
    <section className="pt-8 pb-28 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <ThreeDCard>
          <motion.div
            className="max-w-4xl mx-auto text-center bg-[rgb(44_95_124)] p-16 rounded-3xl border border-[#e6cfa7]/40 relative overflow-hidden"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>

            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="relative"
            >
              <Heart className="mx-auto mb-6 text-white" size={48} />
            </motion.div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Join Our Creative Community
            </h2>

            {/* Description */}
            <p className="text-white/90 mb-10 text-lg">
              Subscribe to get exclusive offers, craft tips, and creative inspiration!
            </p>

            <AnimatePresence mode="wait">
              {!isSubscribed ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Email Subscription Form */}
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                      className="px-6 py-4 rounded-lg border-2 border-white/20 flex-1 max-w-md
                      bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60
                      focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent
                      disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    />

                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-4 bg-[#E76F51] text-white rounded-lg font-semibold
                      hover:bg-[#d65a3d] transition-all inline-flex items-center justify-center
                      disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px]
                      shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 animate-spin" size={20} />
                          Subscribing...
                        </>
                      ) : (
                        <>
                          <Mail className="mr-2" size={20} />
                          Subscribe
                        </>
                      )}
                    </button>
                  </form>

                  {/* Privacy Note */}
                  <p className="text-white/50 text-sm">
                    We respect your privacy. Unsubscribe anytime.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="py-8"
                >
                  {/* Success State */}
                  <div className="mb-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 border-4 border-green-500/30 mb-4"
                    >
                      <CheckCircle className="text-green-400" size={40} />
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2">
                      🎉 Welcome to Our Community!
                    </h3>
                    <p className="text-white/80 text-lg">
                      Thank you for subscribing. Check your inbox for exclusive content!
                    </p>
                  </div>

                  {/* CTA Button */}
                  <a
                    href="/shop"
                    onClick={handleShopClick}
                    className="inline-flex items-center px-8 py-4 bg-[#E76F51] text-white rounded-lg font-semibold
                    hover:bg-[#d65a3d] transition-all shadow-lg hover:shadow-xl 
                    transform hover:scale-105 gap-2"
                  >
                    <ShoppingBag size={20} />
                    Start Shopping
                    <Sparkles size={18} className="animate-pulse" />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Status Messages (for errors) */}
            <AnimatePresence>
              {message && messageType === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 p-4 rounded-lg flex items-center justify-center gap-2 bg-red-500/20 text-white border border-red-500/30"
                >
                  <XCircle size={20} />
                  <span className="font-medium">{message}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </ThreeDCard>
      </div>
    </section>
  );
}