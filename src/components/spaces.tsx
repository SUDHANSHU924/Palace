import { motion } from "framer-motion";

const spaces = [
  {
    title: "Main Dining Hall",
    capacity: "Capacity 80 • Private Events",
    description: "The heart of WARGO. A grand, theatrical space bathed in amber light, designed for unforgettable evenings. Heavy velvet drapes and dark wood create an atmosphere of profound intimacy despite the scale.",
    image: "/images/space-main.png"
  },
  {
    title: "Private Dining Room",
    capacity: "Capacity 20 • Intimate Dinners",
    description: "Exclusive and secluded. Ideal for corporate gatherings or milestone celebrations. Our private dining room offers a sanctuary of taste, where dedicated staff anticipate every need before it arises.",
    image: "/images/space-private.png"
  },
  {
    title: "Garden Terrace",
    capacity: "Capacity 50 • Al Fresco",
    description: "An oasis hidden from the city. The garden terrace blends raw nature with refined luxury. Amber string lights canopy the space, creating a magical setting as evening turns to night.",
    image: "/images/space-terrace.png"
  }
];

export function Spaces() {
  return (
    <section id="spaces" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl text-foreground mb-4"
          >
            The Spaces
          </motion.h2>
          <div className="w-12 h-[1px] bg-primary mx-auto"></div>
        </div>

        <div className="flex flex-col gap-24">
          {spaces.map((space, index) => (
            <motion.div 
              key={space.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="flex-1 w-full relative group">
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none"></div>
                <img src={space.image} alt={space.title} className="w-full aspect-[4/3] object-cover" />
              </div>
              <div className="flex-1 space-y-6">
                <h3 className="font-serif text-3xl text-foreground">{space.title}</h3>
                <p className="text-primary font-medium tracking-widest uppercase text-sm">{space.capacity}</p>
                <p className="text-foreground/70 leading-relaxed text-lg">{space.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
