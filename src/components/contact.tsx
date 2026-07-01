export function Contact() {
  return (
    <section className="bg-card border-t border-border">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center">
          <h2 className="font-serif text-4xl text-foreground mb-12">Contact & Location</h2>
          
          <div className="space-y-12">
            <div>
              <h4 className="text-primary font-medium tracking-widest uppercase text-sm mb-3">Address</h4>
              <p className="text-foreground/80 text-lg">1200 Amber Light Ave.<br/>Metropolis, NY 10001</p>
              <a href="#" className="inline-block mt-3 text-sm text-foreground/50 uppercase tracking-widest border-b border-foreground/30 hover:text-primary hover:border-primary transition-colors">
                Get Directions
              </a>
            </div>
            
            <div>
              <h4 className="text-primary font-medium tracking-widest uppercase text-sm mb-3">Hours</h4>
              <ul className="text-foreground/80 text-lg space-y-2">
                <li className="flex justify-between max-w-[300px]">
                  <span>Mon - Thu</span>
                  <span>5:30 PM - 11:00 PM</span>
                </li>
                <li className="flex justify-between max-w-[300px]">
                  <span>Fri - Sat</span>
                  <span>5:00 PM - 12:00 AM</span>
                </li>
                <li className="flex justify-between max-w-[300px] text-foreground/50">
                  <span>Sunday</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-primary font-medium tracking-widest uppercase text-sm mb-3">Inquiries</h4>
              <p className="text-foreground/80 text-lg mb-1">+1 (555) 234-5678</p>
              <p className="text-foreground/80 text-lg">reservations@palacehouse.co</p>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 h-[400px] md:h-auto bg-muted relative grayscale contrast-125 opacity-80 mix-blend-luminosity">
          <div className="absolute inset-0 bg-background/20 z-10 pointer-events-none"></div>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1689255555555!5m2!1sen!2s" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="filter grayscale contrast-125 brightness-75"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
