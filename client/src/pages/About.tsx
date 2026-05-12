import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Mail, Linkedin, ExternalLink } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect } from "react";

export default function About() {
  const [, navigate] = useLocation();

  useEffect(() => {
    // Update document title and meta description for SEO
    document.title = "About Sayad Md Bayezid Hosan | VISUALCRAFT";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Learn about Sayad Md Bayezid Hosan, the creative force behind VISUALCRAFT. Expert in UI/UX design and web development.");
    }
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur border-b border-border z-50">
        <div className="container flex items-center justify-between h-16">
          <div className="text-2xl font-bold text-accent cursor-pointer" onClick={() => navigate("/")}>VISUALCRAFT</div>
          <div className="hidden md:flex gap-8">
            <a href="/#projects" className="text-foreground hover:text-accent transition-colors">Projects</a>
            <a href="/#services" className="text-foreground hover:text-accent transition-colors">Services</a>
            <a href="/#contact" className="text-foreground hover:text-accent transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left - Image */}
            <div className="relative group">
              <div className="absolute -inset-4 border-2 dashed border-accent opacity-20 group-hover:opacity-40 transition-opacity rounded-lg" />
              <div className="relative overflow-hidden rounded-lg bg-card aspect-[4/5]">
                <img 
                  src="https://i.postimg.cc/K1t60mG8/image.png" 
                  alt="Sayad Md Bayezid Hosan" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/10 rounded-lg -z-10" />
            </div>

            {/* Right - Content */}
            <div>
              <div className="inline-block mb-6 px-4 py-2 bg-card border border-border">
                <span className="text-accent font-bold text-sm uppercase tracking-wider">The Designer & Developer</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                Sayad Md <span className="text-accent">Bayezid Hosan</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                I am a passionate digital craftsman specializing in creating high-end, premium digital experiences. With a focus on meticulous visual design and robust development, I help startups and founders transform their visions into reality.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                My approach combines strategic thinking with creative execution, ensuring that every project not only looks stunning but also delivers exceptional performance and user satisfaction.
              </p>

              <div className="flex gap-4 flex-wrap mb-12">
                <div className="flex flex-col">
                  <span className="text-accent font-bold text-2xl">42+</span>
                  <span className="text-sm text-muted-foreground">Projects Done</span>
                </div>
                <div className="w-px h-12 bg-border mx-4" />
                <div className="flex flex-col">
                  <span className="text-accent font-bold text-2xl">100%</span>
                  <span className="text-sm text-muted-foreground">Satisfaction</span>
                </div>
                <div className="w-px h-12 bg-border mx-4" />
                <div className="flex flex-col">
                  <span className="text-accent font-bold text-2xl">24/7</span>
                  <span className="text-sm text-muted-foreground">Support</span>
                </div>
              </div>

              <div className="flex gap-4 flex-wrap">
                <a href="https://calendly.com" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-accent text-black hover:bg-transparent hover:text-accent border-2 border-accent font-bold px-8 py-6 h-auto uppercase tracking-widest">
                    <Calendar className="mr-2" size={20} />
                    Book a Call
                  </Button>
                </a>
                <a href="mailto:cwb.agency@outlook.com">
                  <Button variant="outline" className="border-2 border-border hover:border-accent hover:text-accent font-bold px-8 py-6 h-auto uppercase tracking-widest">
                    <Mail className="mr-2" size={20} />
                    Contact Me
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Social Section */}
      <section className="py-20 bg-card border-y border-border">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-12">Connect With Me On</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <a href="https://www.linkedin.com/in/sayadbayezid" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
              <Linkedin size={24} />
              <span className="font-bold">LinkedIn</span>
            </a>
            <a href="https://youtube.com/@cwbayezid" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
              <ExternalLink size={24} />
              <span className="font-bold">YouTube</span>
            </a>
            <a href="https://www.instagram.com/freelancer_bayezid0" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
              <ExternalLink size={24} />
              <span className="font-bold">Instagram</span>
            </a>
            <a href="https://www.behance.net/syedbayxed" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
              <ExternalLink size={24} />
              <span className="font-bold">Behance</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t border-border">
        <div className="container text-center">
          <p className="text-muted-foreground text-sm">
            &copy; 2026 VISUALCRAFT. All rights reserved. Crafted by Sayad Md Bayezid Hosan.
          </p>
        </div>
      </footer>
    </div>
  );
}
