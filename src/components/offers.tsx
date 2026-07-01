import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function Offers() {
  const [isVisible, setIsVisible] = useState(true);
  
  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 right-6 left-6 md:left-auto md:w-[400px] z-40 bg-accent text-accent-foreground shadow-2xl border border-accent-foreground/10 p-6 flex items-start gap-4"
        >
          <div className="flex-1">
            <h4 className="font-serif text-xl mb-2">Early Booking Privilege</h4>
            <p className="text-sm opacity-90 mb-4">
              Reserve your table 2 weeks in advance and receive a complimentary signature aperitif for your party.
            </p>
            <button 
              onClick={() => {
                document.getElementById("reservation")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-xs font-bold uppercase tracking-widest border-b border-accent-foreground pb-1 hover:opacity-70 transition-opacity"
            >
              Book Now
            </button>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="shrink-0 p-1 hover:bg-accent-foreground/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
