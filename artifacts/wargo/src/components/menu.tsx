import { useState } from "react";
import { useGetMenu } from "@workspace/api-client-react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export function Menu() {
  const { data: menuData, isLoading, error } = useGetMenu();
  const [activeCategory, setActiveCategory] = useState<string>("appetizers");
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const fallbackImages: Record<string, string> = {
    appetizers: "/images/menu-1.png",
    mains: "/images/menu-2.png",
    desserts: "/images/menu-3.png",
    drinks: "/images/menu-4.png",
  };

  return (
    <section id="menu" className="py-24 bg-card border-y border-border">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl text-foreground mb-4"
          >
            The Menu
          </motion.h2>
          <div className="w-12 h-[1px] bg-primary mx-auto mb-12"></div>

          {menuData && (
            <div className="flex flex-wrap justify-center gap-4">
              {menuData.sections.map((section) => (
                <button
                  key={section.category}
                  onClick={() => setActiveCategory(section.category)}
                  className={`px-6 py-2 uppercase tracking-widest text-sm transition-all duration-300 ${
                    activeCategory === section.category 
                      ? "border-b-2 border-primary text-primary" 
                      : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  {section.category}
                </button>
              ))}
            </div>
          )}
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-6 items-center p-4">
                <Skeleton className="w-24 h-24 bg-muted" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-6 w-1/2 bg-muted" />
                  <Skeleton className="h-4 w-full bg-muted" />
                  <Skeleton className="h-4 w-1/4 bg-muted" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-12 text-destructive">
            <p>Failed to load the menu. Please try again later.</p>
          </div>
        )}

        {menuData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {menuData.sections
                .find((s) => s.category === activeCategory)
                ?.items.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="group cursor-pointer flex gap-6 items-start p-4 hover:bg-background transition-colors duration-300"
                    onClick={() => setSelectedItem({ ...item, fallbackImage: fallbackImages[activeCategory] })}
                  >
                    <div className="w-24 h-24 shrink-0 overflow-hidden relative">
                      <div className="absolute inset-0 bg-primary/20 mix-blend-multiply group-hover:bg-transparent transition-colors z-10" />
                      <img 
                        src={item.image || fallbackImages[activeCategory] || "/images/menu-1.png"} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline mb-2 border-b border-border/50 pb-2">
                        <h4 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors">{item.name}</h4>
                        <span className="text-primary font-medium">${item.price}</span>
                      </div>
                      <p className="text-sm text-foreground/60 line-clamp-2 mb-3">{item.description}</p>
                      <div className="flex gap-2">
                        {item.tags?.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-[10px] uppercase tracking-wider border-border text-foreground/50">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        )}

        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="bg-card border-border sm:max-w-[600px] p-0 overflow-hidden">
            {selectedItem && (
              <div className="flex flex-col md:flex-row h-full">
                <div className="w-full md:w-2/5 h-64 md:h-auto">
                  <img 
                    src={selectedItem.image || selectedItem.fallbackImage} 
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full md:w-3/5 p-8 flex flex-col justify-center">
                  <DialogHeader className="mb-6 text-left">
                    <div className="flex justify-between items-baseline mb-2">
                      <DialogTitle className="font-serif text-2xl text-primary">{selectedItem.name}</DialogTitle>
                      <span className="text-xl text-foreground">${selectedItem.price}</span>
                    </div>
                    <div className="flex gap-2 mt-2 mb-4">
                      {selectedItem.tags?.map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="text-[10px] bg-secondary text-secondary-foreground uppercase">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <DialogDescription className="text-foreground/80 text-base leading-relaxed">
                      {selectedItem.description}
                    </DialogDescription>
                  </DialogHeader>
                  
                  {(selectedItem.calories || selectedItem.allergens) && (
                    <div className="mt-4 pt-4 border-t border-border/50 text-sm text-foreground/50 space-y-1">
                      {selectedItem.calories && <p>Calories: {selectedItem.calories} kcal</p>}
                      {selectedItem.allergens && <p>Allergens: {selectedItem.allergens}</p>}
                    </div>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

      </div>
    </section>
  );
}
