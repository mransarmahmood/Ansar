"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

export function FloatingActions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* WhatsApp floating button */}
      <a
        href={`https://wa.me/${site.contact.whatsapp}?text=Hello%20Ansar%2C%20I%27d%20like%20to%20discuss%20a%20project`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group fixed bottom-6 right-6 z-30 h-14 w-14 rounded-full bg-[#25D366] text-white shadow-xl flex items-center justify-center hover:scale-105 hover:shadow-[0_12px_28px_-6px_rgba(37,211,102,.6)] transition-all"
      >
        <MessageCircle size={22} />
        <span className="pointer-events-none absolute right-full mr-3 bg-[var(--navy)] text-white text-sm font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
          Chat with Ansar
        </span>
      </a>

      {/* Back to top */}
      <AnimatePresence>
        {visible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{ type: "spring", damping: 18, stiffness: 260 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="fixed bottom-24 right-6 z-30 h-12 w-12 rounded-full bg-[var(--navy)] text-white shadow-lg flex items-center justify-center hover:bg-[var(--navy-mid)] hover:scale-105 transition-all"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
