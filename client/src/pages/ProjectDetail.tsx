import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github, Loader2 } from "lucide-react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

interface ProjectDetailProps {
  params: {
    id: string;
  };
}

export default function ProjectDetail({ params }: ProjectDetailProps) {
  const [, navigate] = useLocation();
  const projectId = parseInt(params?.id || "1", 10);

  // Fetch project from database
  const { data: project, isLoading, error } = trpc.portfolio.getProjectById.useQuery({ id: projectId });
  const { data: allProjects = [] } = trpc.portfolio.getFeaturedProjects.useQuery({ limit: 3 });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={48} />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
          <div className="container flex items-center justify-between h-16">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Portfolio</span>
            </button>
            <Button className="btn-primary">Get In Touch</Button>
          </div>
        </nav>

        <div className="pt-32 pb-12 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
            <Button className="btn-primary" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const technologies = project.technologies ? (typeof project.technologies === 'string' ? JSON.parse(project.technologies) : project.technologies) : [];
  const results = project.results ? (typeof project.results === 'string' ? JSON.parse(project.results) : project.results) : [];
  const tags = project.tags ? (typeof project.tags === 'string' ? JSON.parse(project.tags) : project.tags) : [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="container flex items-center justify-between h-16">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 hover:text-accent transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Portfolio</span>
          </button>
          <Button className="btn-primary">Get In Touch</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-12">
        <div className="container">
          <div className="mb-8 animate-fade-in-up">
            <span className="inline-block px-4 py-2 bg-accent/10 rounded-full text-accent font-semibold text-sm mb-4">
              {project.category}
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{project.title}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">{project.description}</p>
          </div>
        </div>
      </section>

      {/* Project Image */}
      <section className="py-8">
        <div className="container">
          <div className="relative overflow-hidden rounded-2xl h-96 md:h-screen bg-card">
            {project.imageUrl && (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-12">
              {/* Challenge */}
              {project.challenge && (
                <div className="animate-fade-in-up">
                  <h2 className="text-3xl font-bold mb-4">The Challenge</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">{project.challenge}</p>
                </div>
              )}

              {/* Solution */}
              {project.solution && (
                <div className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                  <h2 className="text-3xl font-bold mb-4">Our Solution</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">{project.solution}</p>
                </div>
              )}

              {/* Results */}
              {results.length > 0 && (
                <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                  <h2 className="text-3xl font-bold mb-6">Results</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.map((result: string, idx: number) => (
                      <div key={idx} className="p-4 bg-card rounded-lg border border-border">
                        <p className="text-lg font-semibold text-accent">{result}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies */}
              {technologies.length > 0 && (
                <div className="animate-fade-in-up" style={{ animationDelay: "300ms" }}>
                  <h2 className="text-3xl font-bold mb-6">Technologies Used</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {technologies.map((tech: any, idx: number) => {
                      const techName = typeof tech === 'string' ? tech : tech.name;
                      const techIcon = typeof tech === 'object' ? tech.icon : '⚙️';
                      return (
                        <div
                          key={idx}
                          className="p-4 bg-card rounded-lg border border-border text-center hover:border-accent smooth-transition"
                        >
                          <div className="text-3xl mb-2">{techIcon}</div>
                          <p className="font-semibold">{techName}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project Info Card */}
              <div className="sticky top-24 space-y-6">
                <div className="p-6 bg-card rounded-xl border border-border">
                  <h3 className="text-lg font-bold mb-6">Project Details</h3>
                  <div className="space-y-4">
                    {project.timeline && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Timeline</p>
                        <p className="font-semibold">{project.timeline}</p>
                      </div>
                    )}
                    {project.budget && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Budget</p>
                        <p className="font-semibold">{project.budget}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Category</p>
                      <p className="font-semibold">{project.category}</p>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                {tags.length > 0 && (
                  <div className="p-6 bg-card rounded-xl border border-border">
                    <h3 className="text-lg font-bold mb-4">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="space-y-3">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full btn-primary flex items-center justify-center gap-2">
                        <ExternalLink size={18} />
                        View Live Project
                      </Button>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full btn-secondary flex items-center justify-center gap-2">
                        <Github size={18} />
                        View Source Code
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {allProjects.length > 0 && (
        <section className="section-padding bg-card">
          <div className="container">
            <h2 className="text-4xl font-bold mb-12">Other Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {allProjects.filter((p) => p.id !== project.id).slice(0, 3).map((proj) => (
                <div
                  key={proj.id}
                  className="card-hover group cursor-pointer"
                  onClick={() => navigate(`/projects/${proj.id}`)}
                >
                  <div className="relative overflow-hidden rounded-xl mb-4 h-48 bg-background">
                    {proj.imageUrl && (
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-sm rounded-full font-medium mb-2">
                    {proj.category}
                  </span>
                  <h3 className="text-xl font-bold">{proj.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-padding bg-accent text-accent-foreground">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Let's collaborate and create something amazing together.
          </p>
          <a href="mailto:hello@example.com">
            <Button className="bg-accent-foreground text-accent hover:bg-accent-foreground/90">
              Get In Touch
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-card">
        <div className="container text-center text-muted-foreground text-sm">
          <p>&copy; 2026 Premium Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
