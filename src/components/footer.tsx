import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-background py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <Link href="/" className="font-serif text-3xl font-bold tracking-widest text-foreground">
              Restaurant
            </Link>
            <p className="text-foreground/40 text-sm mt-2 uppercase tracking-widest">Luxury Boutique Dining</p>
          </div>
          
          <div className="flex gap-8 text-sm uppercase tracking-widest text-foreground/60">
            <a href="#" className="hover:text-primary transition-colors">Instagram</a>
            <a href="#" className="hover:text-primary transition-colors">Press</a>
            <a href="#" className="hover:text-primary transition-colors">Careers</a>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-foreground/40 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Restaurant. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
