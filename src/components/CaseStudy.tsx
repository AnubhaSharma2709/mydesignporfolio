import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  Target, 
  TrendingUp, 
  Star,
  PlayCircle,
  ExternalLink,
  Quote,
  ChevronRight,
  ArrowUpRight,
  BarChart3,
  Eye,
  Zap,
  Award,
  MousePointer
} from "lucide-react";

interface CaseStudyProps {
  projectId: number;
  onClose: () => void;
}

export default function CaseStudy({ projectId, onClose }: CaseStudyProps) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(progress);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  const projectData = {
    1: {
      title: "Fintech Mobile App",
      subtitle: "Redesigning digital banking for Gen Z",
      hero: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=600&fit=crop",
      duration: "8 months",
      team: "Product Designer, UX Researcher, 3 Engineers, Product Manager",
      platform: "iOS & Android",
      role: "Lead UX Designer",
      year: "2024",
      client: "FinanceApp Inc.",
      impact: {
        engagement: "340%",
        support: "60%",
        rating: "4.8/5"
      }
    }
  }[projectId] || {};

  const navigationItems = [
    { id: "overview", label: "Overview" },
    { id: "challenge", label: "Challenge" },
    { id: "process", label: "Process" },
    { id: "solution", label: "Solution" },
    { id: "results", label: "Results" }
  ];

  const processSteps = [
    {
      phase: "Research",
      duration: "2 weeks",
      activities: ["User interviews", "Competitive analysis", "Market research"],
      icon: Eye
    },
    {
      phase: "Define",
      duration: "1 week",
      activities: ["Problem definition", "User personas", "Journey mapping"],
      icon: Target
    },
    {
      phase: "Ideate",
      duration: "2 weeks",
      activities: ["Brainstorming", "Sketching", "Concept validation"],
      icon: Zap
    },
    {
      phase: "Prototype",
      duration: "3 weeks",
      activities: ["Wireframing", "Prototyping", "User testing"],
      icon: MousePointer
    }
  ];

  const keyMetrics = [
    { 
      label: "User Engagement", 
      value: "+340%", 
      description: "Increase in daily active users",
      color: "text-green-500"
    },
    { 
      label: "Support Tickets", 
      value: "-60%", 
      description: "Reduction in customer support requests",
      color: "text-blue-500"
    },
    { 
      label: "App Rating", 
      value: "4.8/5", 
      description: "Average rating on app stores",
      color: "text-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Custom Cursor */}
      <div 
        className="fixed w-3 h-3 bg-primary rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-150 ease-out"
        style={{ 
          left: mousePosition.x - 6, 
          top: mousePosition.y - 6,
          transform: 'translate3d(0, 0, 0)'
        }}
      />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-0.5 bg-muted/20 z-50">
        <div 
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button 
              variant="ghost" 
              onClick={onClose}
              className="flex items-center gap-2 hover:bg-muted/50"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Work</span>
            </Button>
            
            <div className="hidden md:flex items-center gap-6">
              {navigationItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`text-sm font-medium transition-colors relative ${
                    activeSection === item.id 
                      ? 'text-primary' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-primary rounded-full" />
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 to-transparent" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                Case Study
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-medium leading-tight">
                {projectData.title}
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {projectData.subtitle}
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <Clock className="w-5 h-5 mx-auto mb-2 text-primary" />
                <div className="text-sm font-medium">{projectData.duration}</div>
                <div className="text-xs text-muted-foreground">Duration</div>
              </div>
              <div className="text-center">
                <Users className="w-5 h-5 mx-auto mb-2 text-primary" />
                <div className="text-sm font-medium">{projectData.role}</div>
                <div className="text-xs text-muted-foreground">My Role</div>
              </div>
              <div className="text-center">
                <Target className="w-5 h-5 mx-auto mb-2 text-primary" />
                <div className="text-sm font-medium">{projectData.platform}</div>
                <div className="text-xs text-muted-foreground">Platform</div>
              </div>
              <div className="text-center">
                <TrendingUp className="w-5 h-5 mx-auto mb-2 text-primary" />
                <div className="text-sm font-medium">{projectData.year}</div>
                <div className="text-xs text-muted-foreground">Year</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="px-6 lg:px-8 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl">
            <ImageWithFallback 
              src={projectData.hero}
              alt={projectData.title}
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="py-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="p-6 hover-lift">
              <CardContent className="p-0 text-center space-y-4">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center mx-auto">
                  <Target className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="font-medium">Challenge</h3>
                <p className="text-sm text-muted-foreground">
                  Young users found traditional banking apps complex and unintuitive, leading to low engagement.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6 hover-lift">
              <CardContent className="p-0 text-center space-y-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mx-auto">
                  <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-medium">Solution</h3>
                <p className="text-sm text-muted-foreground">
                  Redesigned the entire mobile experience with Gen Z preferences and behaviors in mind.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6 hover-lift">
              <CardContent className="p-0 text-center space-y-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center mx-auto">
                  <BarChart3 className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-medium">Impact</h3>
                <p className="text-sm text-muted-foreground">
                  340% increase in user engagement and 60% reduction in support tickets.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-medium mb-6">My Role & Responsibilities</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-medium mb-4">Primary Responsibilities</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">Led user research and analysis with 50+ Gen Z participants</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">Designed end-to-end user flows and interface components</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">Created interactive prototypes and conducted usability testing</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-4">Key Contributions</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">Established design system and component library</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">Collaborated with engineering team on implementation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">Presented findings to stakeholders and executives</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-16 px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-medium mb-4">Design Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A structured approach combining user research, iterative design, and continuous validation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div key={step.phase} className="relative">
                <Card className="p-6 hover-lift">
                  <CardContent className="p-0 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                        <step.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-xs text-muted-foreground">{step.duration}</span>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">{step.phase}</h3>
                      <ul className="space-y-1">
                        {step.activities.map((activity, i) => (
                          <li key={i} className="text-xs text-muted-foreground">
                            • {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-6 -right-3 w-6 h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-medium mb-4">Results & Impact</h2>
            <p className="text-muted-foreground">
              The redesigned app exceeded all success metrics and received overwhelming positive feedback.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {keyMetrics.map((metric, index) => (
              <Card key={index} className="p-6 text-center hover-lift">
                <CardContent className="p-0 space-y-3">
                  <div className={`text-3xl font-medium ${metric.color}`}>
                    {metric.value}
                  </div>
                  <div className="font-medium">{metric.label}</div>
                  <div className="text-sm text-muted-foreground">
                    {metric.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="p-8">
            <CardContent className="p-0 space-y-6">
              <div className="flex items-center gap-3">
                <Quote className="w-5 h-5 text-primary" />
                <h3 className="font-medium">User Feedback</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b17c?w=100&h=100&fit=crop&crop=face" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">Sarah M., 22</div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    "Finally, a banking app that actually makes sense! The interface is so intuitive, I can do everything I need without getting confused."
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">Jake D., 19</div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    "Love the clean design and how fast everything is. This is how all banking apps should be designed!"
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-medium mb-4">Want to Learn More?</h2>
              <p className="text-muted-foreground">
                Dive deeper into this project or explore other case studies.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="group">
                <PlayCircle className="w-4 h-4 mr-2" />
                View Interactive Prototype
                <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
              <Button variant="outline" onClick={onClose}>
                Back to All Work
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Next Project Preview */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl font-medium mb-2">Next Project</h2>
          </div>
          
          <Card className="overflow-hidden hover-lift cursor-pointer group">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop"
                  alt="Healthcare Dashboard"
                  className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8 flex flex-col justify-center space-y-4">
                <Badge variant="secondary" className="w-fit">Web App</Badge>
                <h3 className="text-xl font-medium">Healthcare Dashboard</h3>
                <p className="text-muted-foreground">
                  Streamlining complex medical data visualization for healthcare professionals.
                </p>
                <div className="flex items-center text-primary font-medium group">
                  <span>View Case Study</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}