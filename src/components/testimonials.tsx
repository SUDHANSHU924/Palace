import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Eleanor Vance",
    rating: 5,
    quote: "A transformative dining experience. The attention to detail is staggering. The amber light, the heavy silverware, the flawless service — WARGO isn't just a meal, it's an event."
  },
  {
    id: 2,
    name: "Marcus Thorne",
    rating: 5,
    quote: "The private dining room provided the perfect backdrop for our executive retreat. Discreet, luxurious, and culinary perfection from start to finish."
  },
  {
    id: 3,
    name: "Sophia Lin",
    rating: 5,
    quote: "I've dined around the world, but the atmosphere here is singularly captivating. You feel like you've discovered a secret club where the food matches the magnificent setting."
  }
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="py-32 bg-card relative overflow-hidden border-y border-border">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-primary/30"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div 
          className="max-w-4xl mx-auto text-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex justify-center mb-8">
            <svg className="w-12 h-12 text-primary/40" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          <div className="h-[200px] md:h-[160px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <p className="font-serif text-2xl md:text-3xl lg:text-4xl leading-relaxed text-foreground mb-8 italic">
                  "{testimonials[current].quote}"
                </p>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex text-primary">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm font-medium tracking-widest uppercase text-foreground/70">{testimonials[current].name}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  current === idx ? "bg-primary w-6" : "bg-border hover:bg-primary/50"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
