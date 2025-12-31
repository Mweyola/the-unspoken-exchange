import { Shield, Users, MessageCircleQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6 animate-fade-in">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">100% Anonymous • No Judgment</span>
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl font-semibold mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Ask what you've{" "}
            <span className="gradient-text">always wondered</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            A safe space for the questions you're too afraid to ask. From dating to culture, 
            money to relationships — get real answers from real people, anonymously.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button variant="gradient" size="lg">
              <MessageCircleQuestion className="w-5 h-5 mr-2" />
              Ask Your Question
            </Button>
            <Button variant="outline" size="lg">
              <Users className="w-5 h-5 mr-2" />
              Browse Questions
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-8 mt-12 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold gradient-text">12K+</span>
              <span>Questions Asked</span>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold gradient-text">48K+</span>
              <span>Answers Given</span>
            </div>
            <div className="w-px h-8 bg-border hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-2xl font-bold gradient-text">99%</span>
              <span>Anonymous</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
