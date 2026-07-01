import { motion } from "framer-motion";

export function ChefStory() {
  return (
    <section id="chef" className="py-0 bg-background">
      <div className="flex flex-col md:flex-row min-h-[80vh]">
        <div className="w-full md:w-1/2 relative h-[50vh] md:h-auto overflow-hidden">
          <motion.img 
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            src="/images/chef.png" 
            alt="Executive chef at Restaurant" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-background via-background/20 to-transparent md:w-1/2 md:right-0 md:left-auto"></div>
        </div>
        
        <div className="w-full md:w-1/2 flex items-center p-8 md:p-16 lg:p-24 bg-background">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl"
          >
            <h4 className="text-primary font-medium tracking-widest uppercase text-sm mb-4">The Philosophy</h4>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-8">Crafting Memories, Not Just Meals</h2>
            
            <div className="space-y-6 text-foreground/70 text-lg leading-relaxed">
              <p>
                "At Restaurant, we believe that luxury is not about excess, but about extreme intention. Every ingredient is chosen for a reason. Every technique is applied with purpose."
              </p>
              <p>
                "The amber light, the heavy linens, the acoustics of the room — these are all ingredients in our recipe for a perfect evening. We aren't just feeding people; we are transporting them."
              </p>
            </div>
            
            <div className="mt-12 pt-8 border-t border-border">
              <p className="font-serif text-2xl text-foreground">Julian Vance</p>
              <p className="text-sm tracking-widest uppercase text-foreground/50 mt-1">Executive Chef</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
