import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const galleryItems = [
  { id: 1, category: "Ambiance", src: "/images/gallery-1.png", span: "col-span-1 md:col-span-2 row-span-2" },
  { id: 2, category: "Dining", src: "/images/menu-1.png", span: "col-span-1 row-span-1" },
  { id: 3, category: "Dining", src: "/images/menu-2.png", span: "col-span-1 row-span-1" },
  { id: 4, category: "Kitchen", src: "/images/chef.png", span: "col-span-1 md:col-span-2 row-span-1 md:row-span-2" },
  { id: 5, category: "Events", src: "/images/space-private.png", span: "col-span-1 md:col-span-2 row-span-1" },
  { id: 6, category: "Dining", src: "/images/menu-3.png", span: "col-span-1 row-span-1" },
  { id: 7, category: "Ambiance", src: "/images/space-terrace.png", span: "col-span-1 row-span-1 md:row-span-2" },
  { id: 8, category: "Kitchen", src: "/images/menu-4.png", span: "col-span-1 row-span-1" },
];

const categories = ["All", "Ambiance", "Dining", "Kitchen", "Events"];

export function Gallery() {
  const [filter, setFilter] = useState("All");
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const filteredItems = filter === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl text-foreground mb-4"
          >
            Gallery
          </motion.h2>
          <div className="w-12 h-[1px] bg-primary mx-auto mb-12"></div>

          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 uppercase tracking-widest text-sm transition-all duration-300 ${
                  filter === cat 
                    ? "border-b-2 border-primary text-primary" 
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={item.id}
                className={`${filter === "All" ? item.span : "col-span-1 row-span-1 md:col-span-2 md:row-span-2"} relative group overflow-hidden cursor-pointer bg-card`}
                onClick={() => setSelectedImg(item.src)}
              >
                <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                  <span className="text-primary tracking-widest uppercase text-sm">{item.category}</span>
                </div>
                <img 
                  src={item.src} 
                  alt={`WARGO ${item.category}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <Dialog open={!!selectedImg} onOpenChange={() => setSelectedImg(null)}>
          <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-transparent border-none shadow-none [&>button]:text-white">
            {selectedImg && (
              <img 
                src={selectedImg} 
                alt="Enlarged gallery image" 
                className="w-full h-full object-contain"
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
