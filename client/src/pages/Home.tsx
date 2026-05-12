import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Github, Linkedin, Mail, Star, Loader2, Menu, X } from "lucide-react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useState, useEffect } from "react";

export default function Home() {
  const [, navigate] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Fetch portfolio data
  const { data: projects = [], isLoading: projectsLoading } = trpc.portfolio.getFeaturedProjects.useQuery({ limit: 6 });
  const { data: services = [], isLoading: servicesLoading } = trpc.portfolio.getAllServices.useQuery();
  const { data: testimonials = [], isLoading: testimonialsLoading } = trpc.portfolio.getFeaturedTestimonials.useQuery({ limit: 3 });

  // Track mouse position for magnetic effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur border-b border-border z-50">
        <div className="container flex items-center justify-between h-16">
          <div className="text-2xl font-bold text-accent">PORTFOLIO</div>
          <div className="hidden md:flex gap-8">
            <a href="#projects" className="text-foreground hover:text-accent transition-colors">
              Projects
            </a>
            <a href="#services" className="text-foreground hover:text-accent transition-colors">
              Services
            </a>
            <a href="#contact" className="text-foreground hover:text-accent transition-colors">
              Contact
            </a>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-accent"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-card border-t border-border p-4 flex flex-col gap-4">
            <a href="#projects" className="text-foreground hover:text-accent transition-colors">
              Projects
            </a>
            <a href="#services" className="text-foreground hover:text-accent transition-colors">
              Services
            </a>
            <a href="#contact" className="text-foreground hover:text-accent transition-colors">
              Contact
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-fade-in-up">
              <div className="inline-block mb-6 px-4 py-2 bg-card border border-border">
                <span className="text-accent font-bold text-sm uppercase tracking-wider">42+ Projects Delivered</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Meticulous Digital <span className="text-accent">Visual</span> Craftsmanship
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-md">
                Premium UI/UX and web design that transforms visions into high-performing digital experiences.
              </p>
              <div className="flex gap-4 flex-wrap">
                <button className="btn-primary">
                  Explore Recent Works
                </button>
                <button className="btn-outline-accent">
                  Quick Chat - WhatsApp
                </button>
              </div>
            </div>

            {/* Right - Floating Element */}
            <div className="relative h-96 md:h-full hidden md:block">
              <div className="absolute inset-0 border-2 dashed border-accent opacity-20 rounded-lg animate-float" />
              <div className="absolute top-10 right-10 w-32 h-32 border-2 dashed border-red-500 rounded-lg opacity-30" />
              <div className="absolute bottom-20 left-10 w-24 h-24 bg-accent/10 rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "42+", label: "Startups & Founders" },
              { number: "65+", label: "5-Star Projects" },
              { number: "100%", label: "Client Satisfaction" },
              { number: "24/7", label: "Support Available" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center stagger-item">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{stat.number}</div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding">
        <div className="container">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in-up">
            What we do <span className="text-accent">exceptionally.</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-16 max-w-2xl animate-fade-in-up">
            End-to-end digital craftsmanship — from brand strategy to pixel-perfect shipped products.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicesLoading ? (
              <div className="col-span-full flex justify-center py-12">
                <Loader2 className="animate-spin text-accent" size={32} />
              </div>
            ) : services.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">Services will be displayed here.</p>
              </div>
            ) : (
              services.map((service, idx) => (
                <div
                  key={service.id}
                  className="border-2 dashed border-accent p-8 hover:border-red-500 transition-all duration-300 relative stagger-item group cursor-pointer"
                >
                  <div className="absolute -top-3 -left-3 w-6 h-6 bg-accent text-black flex items-center justify-center font-bold text-xs group-hover:bg-red-500 transition-colors">
                    {idx + 1}
                  </div>
                  <div className="text-4xl mb-4">{service.icon || "✨"}</div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-padding bg-card">
        <div className="container">
          <h2 className="text-5xl md:text-6xl font-bold mb-16 animate-fade-in-up">
            Some of our <span className="text-accent">recent projects</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectsLoading ? (
              <div className="col-span-full flex justify-center py-12">
                <Loader2 className="animate-spin text-accent" size={32} />
              </div>
            ) : projects.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No projects available yet. Check back soon!</p>
              </div>
            ) : (
              projects.map((project, idx) => {
                const tags = project.tags ? (typeof project.tags === 'string' ? JSON.parse(project.tags) : project.tags) : [];
                return (
                  <div
                    key={project.id}
                    className="border-2 dashed border-accent hover:border-red-500 transition-all duration-300 overflow-hidden group cursor-pointer relative stagger-item"
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    <div className="absolute -top-3 -left-3 w-6 h-6 bg-accent text-black flex items-center justify-center font-bold text-xs z-10 group-hover:bg-red-500 transition-colors">
                      {idx + 1}
                    </div>
                    <div className="relative overflow-hidden h-64 bg-background">
                      {project.imageUrl && (
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                    </div>
                    <div className="p-6 bg-background">
                      <span className="inline-block px-3 py-1 bg-accent text-black text-xs font-bold rounded mb-3 uppercase tracking-wider">
                        {project.category}
                      </span>
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                      <div className="flex gap-2 flex-wrap">
                        {tags.slice(0, 3).map((tag: string) => (
                          <span key={tag} className="text-xs px-2 py-1 bg-card border border-border rounded text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="text-center mt-12">
            <button className="btn-primary">
              View All Projects
              <ArrowRight className="inline ml-2" size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding">
        <div className="container">
          <h2 className="text-5xl md:text-6xl font-bold mb-16 animate-fade-in-up">
            How we can work <span className="text-accent">together</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: 1, title: "Brief", desc: "Share your project vision and goals" },
              { step: 2, title: "Questions", desc: "We ask targeted questions to understand" },
              { step: 3, title: "Quote", desc: "Clear pricing and timeline provided" },
              { step: 4, title: "Get Started", desc: "Jump into the project with weekly updates" },
            ].map((item, idx) => (
              <div key={idx} className="border-2 dashed border-accent p-6 hover:border-red-500 transition-all duration-300 relative stagger-item">
                <div className="absolute -top-3 -left-3 w-6 h-6 bg-accent text-black flex items-center justify-center font-bold text-xs">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-card">
        <div className="container">
          <h2 className="text-5xl md:text-6xl font-bold mb-16 animate-fade-in-up">
            Real result, Real stories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonialsLoading ? (
              <div className="col-span-full flex justify-center py-12">
                <Loader2 className="animate-spin text-accent" size={32} />
              </div>
            ) : testimonials.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">Testimonials will be displayed here.</p>
              </div>
            ) : (
              testimonials.map((testimonial, idx) => (
                <div key={testimonial.id} className="border-2 dashed border-accent p-6 hover:border-red-500 transition-all duration-300 relative stagger-item">
                  <div className="absolute -top-3 -left-3 w-6 h-6 bg-accent text-black flex items-center justify-center font-bold text-xs">
                    ★
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <div className="container">
          <h2 className="text-5xl md:text-6xl font-bold mb-16 animate-fade-in-up">
            Frequently Asked <span className="text-accent">Questions</span>
          </h2>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: "How do I get started with your services?", a: "Simply reach out with your project brief and we'll schedule a call to discuss your vision and requirements." },
              { q: "What's your typical project timeline?", a: "Most projects take 4-12 weeks depending on scope. We'll provide exact timelines in your custom quote." },
              { q: "Do you offer revisions?", a: "Yes! We include unlimited revisions until you're completely satisfied with the final deliverables." },
              { q: "Can you help with both design and development?", a: "Absolutely. We offer end-to-end services from design to development and deployment." },
            ].map((item, idx) => (
              <details key={idx} className="border-2 dashed border-accent p-6 hover:border-red-500 transition-all duration-300 cursor-pointer group">
                <summary className="font-bold text-lg flex items-center justify-between">
                  {item.q}
                  <span className="text-accent group-open:rotate-180 transition-transform">+</span>
                </summary>
                <p className="text-muted-foreground mt-4">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="section-padding bg-accent text-black">
        <div className="container text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Ready to Start a <span className="text-black">Project?</span>
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Let's collaborate and create something exceptional together.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="mailto:hello@example.com">
              <button className="px-8 py-3 bg-black text-accent border-2 border-black font-bold hover:bg-transparent transition-all duration-300 uppercase tracking-wider">
                <Mail className="inline mr-2" size={18} />
                Send Email
              </button>
            </a>
            <a href="https://calendly.com" target="_blank" rel="noopener noreferrer">
              <button className="px-8 py-3 bg-transparent text-black border-2 border-black font-bold hover:bg-black hover:text-accent transition-all duration-300 uppercase tracking-wider">
                <ExternalLink className="inline mr-2" size={18} />
                Book a Call
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-card">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-accent">PORTFOLIO</h3>
              <p className="text-muted-foreground text-sm">
                Premium digital craftsmanship for global brands.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#projects" className="hover:text-accent transition-colors">Projects</a></li>
                <li><a href="#services" className="hover:text-accent transition-colors">Services</a></li>
                <li><a href="#contact" className="hover:text-accent transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>UI/UX Design</li>
                <li>Web Development</li>
                <li>Branding</li>
                <li>Mobile Apps</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow</h4>
              <div className="flex gap-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                  <Github size={20} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="mailto:hello@example.com" className="text-muted-foreground hover:text-accent transition-colors">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2026 Premium Portfolio. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
