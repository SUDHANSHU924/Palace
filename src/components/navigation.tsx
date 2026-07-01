import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border/50" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl font-bold tracking-widest text-primary">
          WARGO
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "Spaces", id: "spaces" },
            { label: "Menu", id: "menu" },
            { label: "Gallery", id: "gallery" },
            { label: "Chef", id: "chef" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-sm font-medium tracking-widest uppercase text-foreground/80 hover:text-primary transition-colors"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("reservation")}
            className="px-6 py-2 bg-primary text-primary-foreground text-sm font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors"
          >
            Reserve
          </button>
        </nav>
      </div>
    </motion.header>
  );
}
