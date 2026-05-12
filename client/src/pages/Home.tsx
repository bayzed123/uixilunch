import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Github, Linkedin, Mail, Star, Loader2 } from "lucide-react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

export default function Home() {
  const [, navigate] = useLocation();

  // Fetch projects from database
  const { data: projects = [], isLoading: projectsLoading } = trpc.portfolio.getFeaturedProjects.useQuery({ limit: 4 });
  const { data: services = [], isLoading: servicesLoading } = trpc.portfolio.getAllServices.useQuery();
  const { data: testimonials = [], isLoading: testimonialsLoading } = trpc.portfolio.getFeaturedTestimonials.useQuery({ limit: 3 });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="container flex items-center justify-between h-16">
          <div className="text-2xl font-bold gradient-text">Portfolio</div>
          <div className="hidden md:flex gap-8">
            <a href="#projects" className="hover:text-accent transition-colors">
              Projects
            </a>
            <a href="#services" className="hover:text-accent transition-colors">
              Services
            </a>
            <a href="#contact" className="hover:text-accent transition-colors">
              Contact
            </a>
          </div>
          <Button className="btn-primary">Get In Touch</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 section-padding">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-block mb-6 px-4 py-2 bg-accent/10 rounded-full">
                <span className="text-accent font-semibold text-sm">Welcome to my portfolio</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Crafting Digital Experiences That Matter
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                I create beautiful, high-performing digital products that help businesses grow. From concept to launch, I deliver premium solutions tailored to your needs.
              </p>
              <div className="flex gap-4">
                <Button className="btn-primary flex items-center gap-2">
                  View My Work
                  <ArrowRight size={18} />
                </Button>
                <Button className="btn-secondary">Download CV</Button>
              </div>
            </div>
            <div className="animate-fade-in hidden md:block">
              <div className="relative w-full aspect-square bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl">✨</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50+", label: "Projects Completed" },
              { number: "40+", label: "Happy Clients" },
              { number: "5+", label: "Years Experience" },
              { number: "100%", label: "Client Satisfaction" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.number}</div>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-padding">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Recent Projects</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A selection of recent projects showcasing my expertise in design and development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                    className="card-hover group cursor-pointer"
                    onClick={() => navigate(`/projects/${project.id}`)}
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="relative overflow-hidden rounded-xl mb-6 h-64 bg-card">
                      {project.imageUrl && (
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                    <div className="space-y-3">
                      <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-sm rounded-full font-medium">
                        {project.category}
                      </span>
                      <h3 className="text-2xl font-bold">{project.title}</h3>
                      <p className="text-muted-foreground">{project.description}</p>
                      <div className="flex gap-2 pt-4">
                        {tags.slice(0, 3).map((tag: string) => (
                          <span key={tag} className="text-xs px-2 py-1 bg-border rounded text-muted-foreground">
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
            <Button className="btn-primary flex items-center gap-2 mx-auto">
              View All Projects
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding bg-card">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What I Offer</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions tailored to bring your vision to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  className="p-8 bg-background rounded-xl border border-border hover:border-accent smooth-transition"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="text-4xl mb-4">{service.icon || '✨'}</div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Client Testimonials</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              What my clients say about working with me
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <div key={testimonial.id} className="p-8 bg-card rounded-xl border border-border">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="section-padding bg-accent text-accent-foreground">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Let's collaborate and create something amazing together. Get in touch today!
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="mailto:hello@example.com">
              <Button className="bg-accent-foreground text-accent hover:bg-accent-foreground/90">
                <Mail size={18} className="mr-2" />
                Send Me an Email
              </Button>
            </a>
            <a href="https://calendly.com" target="_blank" rel="noopener noreferrer">
              <Button className="bg-accent-foreground/20 text-accent-foreground border border-accent-foreground/30 hover:bg-accent-foreground/30">
                <ExternalLink size={18} className="mr-2" />
                Schedule a Call
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-card">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Portfolio</h3>
              <p className="text-muted-foreground text-sm">
                Creating premium digital experiences for forward-thinking brands.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#projects" className="hover:text-foreground transition-colors">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-foreground transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-foreground transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Web Development</li>
                <li>UI/UX Design</li>
                <li>Branding</li>
                <li>Mobile Apps</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow</h4>
              <div className="flex gap-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Github size={20} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="mailto:hello@example.com" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2026 Premium Portfolio. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
