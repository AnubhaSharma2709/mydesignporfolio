import { useState, useEffect, useRef } from "react";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { 
  ArrowRight, 
  ArrowUpRight,
  Mail, 
  Linkedin, 
  Github, 
  Download,
  Star,
  MousePointer,
  Sparkles,
  ArrowDown,
  Play,
  ExternalLink,
  ChevronRight,
  Menu,
  X
} from "lucide-react";

export default function App() {
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Loading animation
    const timer = setTimeout(() => setIsLoading(false), 2000);

    // Mouse tracking for custom cursor
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Scroll progress tracking
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );

    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const featuredProjects = [
    {
      id: 1,
      title: "Fintech Mobile App",
      subtitle: "Redesigning digital banking for Gen Z",
      description: "A comprehensive mobile banking experience that increased user engagement by 340% and reduced customer support tickets by 60%.",
      year: "2024",
      category: "Mobile App",
      tags: ["UX Research", "Mobile Design", "Fintech"],
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
      results: ["340% increase in user engagement", "60% reduction in support tickets", "4.8/5 App Store rating"],
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      title: "Healthcare Dashboard",
      subtitle: "Streamlining patient data visualization",
      description: "An intuitive dashboard that helps healthcare professionals make faster, more informed decisions with complex medical data.",
      year: "2023",
      category: "Web App",
      tags: ["Data Visualization", "Healthcare", "Enterprise"],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
      results: ["45% faster decision making", "10,000+ daily active users", "99.9% uptime achieved"],
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: 3,
      title: "E-commerce Platform",
      subtitle: "Optimizing conversion through UX",
      description: "A complete e-commerce redesign that resulted in significant improvements in conversion rates and user satisfaction.",
      year: "2023",
      category: "Web Platform",
      tags: ["E-commerce", "Conversion Optimization", "UX Research"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      results: ["32% increase in conversion", "$2.4M additional revenue", "2.3x faster checkout"],
      color: "from-orange-500 to-red-600"
    }
  ];

  const navItems = [
    { name: "Work", href: "#work" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
        <div className="text-center space-y-4">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <p className="text-sm text-black">Loading Portfolio</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className="fixed w-4 h-4 bg-primary rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-150 ease-out"
        style={{ 
          left: mousePosition.x - 8, 
          top: mousePosition.y - 8,
          transform: 'translate3d(0, 0, 0)'
        }}
      />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-0.5 bg-muted/20 z-50">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-primary-foreground">AS</span>
              </div>
              <span className="font-medium text-sm text-black">Alex Smith</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href.slice(1))}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === item.href.slice(1) ? 'text-primary' : 'text-black'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <Button size="sm" variant="outline" className="text-sm text-black">
                <Download className="w-3 h-3 mr-2" />
                Resume
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-black"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-background border-t border-border/50">
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    scrollToSection(item.href.slice(1));
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-sm font-medium text-black hover:text-primary"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section 
        id="hero" 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="text-xs px-3 py-1 text-black">
                UX Designer & Design Strategist
              </Badge>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium leading-tight tracking-tight text-black">
                I design digital experiences that{' '}
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  solve real problems
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-black max-w-2xl mx-auto leading-relaxed">
                Currently designing at TechCorp, previously at Stripe and Airbnb. 
                Passionate about creating inclusive experiences that drive measurable business impact.
              </p>
            </div>

            <div className="flex items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="group"
                onClick={() => scrollToSection('work')}
              >
                View Selected Work
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="text-black">
                <Mail className="w-4 h-4 mr-2" />
                Get in Touch
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-black/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-black/30 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section id="work" className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium mb-4 text-black">Selected Work</h2>
            <p className="text-lg text-black max-w-2xl mx-auto">
              A collection of projects that showcase strategic thinking, user-centered design, and measurable impact.
            </p>
          </div>

          <div className="space-y-32">
            {featuredProjects.map((project, index) => (
              <div 
                key={project.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                {/* Project Image */}
                <div className={`relative group ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="relative overflow-hidden rounded-2xl bg-muted/50">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button size="sm" className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <Play className="w-4 h-4 mr-2" />
                        View Case Study
                      </Button>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-background rounded-full shadow-lg flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                    <span className="text-sm font-medium text-primary">{project.year}</span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="text-xs text-black">
                        {project.category}
                      </Badge>
                      <span className="text-sm text-black">•</span>
                      <span className="text-sm text-black">{project.year}</span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-medium text-black">
                      {project.title}
                    </h3>
                    
                    <p className="text-lg text-black">
                      {project.subtitle}
                    </p>
                    
                    <p className="text-black leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs text-black">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-sm uppercase tracking-wider text-black">
                      Key Results
                    </h4>
                    <ul className="space-y-2">
                      {project.results.map((result, i) => (
                        <li key={i} className="flex items-center text-sm text-black">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button variant="outline" className="group text-black">
                    View Case Study
                    <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-medium text-black">
                About Me
              </h2>
              
              <div className="space-y-4 text-black leading-relaxed">
                <p>
                  I'm a Senior UX Designer with 8+ years of experience creating digital experiences 
                  that solve real user problems while driving business growth. My approach combines 
                  user research, strategic thinking, and design craftsmanship.
                </p>
                
                <p>
                  Currently, I'm designing at TechCorp, where I lead the design of our flagship product 
                  used by millions of users worldwide. Previously, I've worked at Stripe and Airbnb, 
                  where I helped shape products that define how we interact with technology.
                </p>
                
                <p>
                  I believe great design happens at the intersection of user needs, business goals, 
                  and technical possibilities. I'm passionate about creating inclusive experiences 
                  that work for everyone.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face"
                  alt="Alex Smith"
                  className="w-full h-[400px] object-cover rounded-2xl"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3 text-black">Experience</h3>
                  <div className="space-y-2 text-sm text-black">
                    <div>Senior UX Designer • TechCorp • 2022 - Present</div>
                    <div>Product Designer • Stripe • 2020 - 2022</div>
                    <div>UX Designer • Airbnb • 2018 - 2020</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3 text-black">Recognition</h3>
                  <div className="space-y-2 text-sm text-black">
                    <div>• Design Award Winner 2024</div>
                    <div>• Featured in Design Weekly</div>
                    <div>• Speaker at UX Conference 2023</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-medium text-black">
                Let's Work Together
              </h2>
              <p className="text-lg text-black max-w-2xl mx-auto">
                I'm always interested in discussing new opportunities, challenging projects, 
                or just connecting with fellow designers and builders.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="group">
                <Mail className="w-4 h-4 mr-2" />
                alex.smith@email.com
                <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="text-black">
                Schedule a Call
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 pt-8">
              <Button variant="ghost" size="sm" className="text-black">
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
              <Button variant="ghost" size="sm" className="text-black">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
              <Button variant="ghost" size="sm" className="text-black">
                <Download className="w-4 h-4 mr-2" />
                Resume
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-primary-foreground">AS</span>
              </div>
              <span className="text-sm text-black">© 2025 Alex Smith. All rights reserved.</span>
            </div>
            <div className="text-sm text-black">
              Designed & built with attention to detail
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}