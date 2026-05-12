import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { Loader2, Plus, Edit2, Trash2, LogOut } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useState } from "react";

export default function AdminDashboard() {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<"projects" | "services" | "testimonials">("projects");

  // Fetch portfolio data
  const { data: projects = [], isLoading: projectsLoading } = trpc.portfolio.getAllProjects.useQuery();
  const { data: services = [], isLoading: servicesLoading } = trpc.portfolio.getAllServices.useQuery();
  const { data: testimonials = [], isLoading: testimonialsLoading } = trpc.portfolio.getAllTestimonials.useQuery();

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={48} />
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-8">You need admin privileges to access this page.</p>
          <Button className="btn-primary" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <nav className="border-b border-border bg-card">
        <div className="container flex items-center justify-between h-16">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome, {user?.name}</p>
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
              activeTab === "projects"
                ? "border-accent text-accent"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
              activeTab === "services"
                ? "border-accent text-accent"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Services ({services.length})
          </button>
          <button
            onClick={() => setActiveTab("testimonials")}
            className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
              activeTab === "testimonials"
                ? "border-accent text-accent"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Testimonials ({testimonials.length})
          </button>
        </div>

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Projects</h2>
              <Button className="btn-primary flex items-center gap-2">
                <Plus size={18} />
                Add Project
              </Button>
            </div>

            {projectsLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="animate-spin text-accent" size={32} />
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-lg border border-border">
                <p className="text-muted-foreground mb-4">No projects yet</p>
                <Button className="btn-primary flex items-center gap-2 mx-auto">
                  <Plus size={18} />
                  Create First Project
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold">Title</th>
                      <th className="text-left py-3 px-4 font-semibold">Category</th>
                      <th className="text-left py-3 px-4 font-semibold">Featured</th>
                      <th className="text-left py-3 px-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project) => (
                      <tr key={project.id} className="border-b border-border hover:bg-card transition-colors">
                        <td className="py-3 px-4">{project.title}</td>
                        <td className="py-3 px-4">{project.category}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-sm ${project.featured ? "bg-accent/20 text-accent" : "bg-muted/20 text-muted-foreground"}`}>
                            {project.featured ? "Yes" : "No"}
                          </span>
                        </td>
                        <td className="py-3 px-4 flex gap-2">
                          <Button size="sm" variant="outline" className="flex items-center gap-1">
                            <Edit2 size={16} />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" className="flex items-center gap-1 text-destructive">
                            <Trash2 size={16} />
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Services Tab */}
        {activeTab === "services" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Services</h2>
              <Button className="btn-primary flex items-center gap-2">
                <Plus size={18} />
                Add Service
              </Button>
            </div>

            {servicesLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="animate-spin text-accent" size={32} />
              </div>
            ) : services.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-lg border border-border">
                <p className="text-muted-foreground mb-4">No services yet</p>
                <Button className="btn-primary flex items-center gap-2 mx-auto">
                  <Plus size={18} />
                  Create First Service
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service) => (
                  <div key={service.id} className="p-6 bg-card rounded-lg border border-border">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold">{service.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                      </div>
                      <span className="text-2xl">{service.icon || "✨"}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <Edit2 size={16} />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="flex items-center gap-1 text-destructive">
                        <Trash2 size={16} />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === "testimonials" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Testimonials</h2>
              <Button className="btn-primary flex items-center gap-2">
                <Plus size={18} />
                Add Testimonial
              </Button>
            </div>

            {testimonialsLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="animate-spin text-accent" size={32} />
              </div>
            ) : testimonials.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-lg border border-border">
                <p className="text-muted-foreground mb-4">No testimonials yet</p>
                <Button className="btn-primary flex items-center gap-2 mx-auto">
                  <Plus size={18} />
                  Add First Testimonial
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="p-6 bg-card rounded-lg border border-border">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-sm ${testimonial.featured ? "bg-accent/20 text-accent" : "bg-muted/20 text-muted-foreground"}`}>
                        {testimonial.featured ? "Featured" : ""}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <Edit2 size={16} />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="flex items-center gap-1 text-destructive">
                        <Trash2 size={16} />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
