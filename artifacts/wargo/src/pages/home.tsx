import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { Spaces } from "@/components/spaces";
import { Menu } from "@/components/menu";
import { Reservation } from "@/components/reservation";
import { Gallery } from "@/components/gallery";
import { Testimonials } from "@/components/testimonials";
import { ChefStory } from "@/components/chef";
import { Offers } from "@/components/offers";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navigation />
      <main>
        <Hero />
        <Spaces />
        <Menu />
        <Reservation />
        <Gallery />
        <Testimonials />
        <ChefStory />
        <Contact />
      </main>
      <Footer />
      <Offers />
    </div>
  );
}
