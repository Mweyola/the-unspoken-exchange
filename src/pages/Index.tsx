import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, ShoppingBag } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { QuestionCard } from "@/components/questions/QuestionCard";
import { CategoryFilter } from "@/components/questions/CategoryFilter";
import { ListingCard } from "@/components/marketplace/ListingCard";
import { Button } from "@/components/ui/button";
import { mockQuestions, mockListings } from "@/data/mockData";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const filteredQuestions = selectedCategory === "All" 
    ? mockQuestions 
    : mockQuestions.filter(q => q.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      
      <main className="container mx-auto px-4 pb-16">
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl md:text-3xl font-semibold">
              Marketplace Intelligence
            </h2>
          </div>
          
          <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
          
          <div className="mt-6 space-y-4">
            {filteredQuestions.slice(0, 5).map((question, index) => (
              <div 
                key={question.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <QuestionCard question={question} />
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/search">
                Explore Community Threads
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
        
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold mb-2">
                Community Marketplace
              </h2>
              <p className="text-muted-foreground">Browse listings with seller trust signals and structured buyer intent.</p>
            </div>
            <Link to="/marketplace">
              <Button variant="ghost">
                <ShoppingBag className="w-4 h-4 mr-2" />
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockListings.slice(0, 3).map((listing, index) => (
              <div 
                key={listing.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ListingCard listing={listing} />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 glass-effect rounded-xl p-6 md:p-8">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold">Marketplace Safety</h2>
              <p className="text-muted-foreground">Simple habits that reduce wasted trips and risky exchanges.</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
            <div className="rounded-lg bg-background/50 border border-border/50 p-4">Meet in public places with good lighting and people nearby.</div>
            <div className="rounded-lg bg-background/50 border border-border/50 p-4">Verify item condition before sending payment or leaving the meetup.</div>
            <div className="rounded-lg bg-background/50 border border-border/50 p-4">Avoid suspicious payment links, overpayment requests, and rushed off-platform deals.</div>
            <div className="rounded-lg bg-background/50 border border-border/50 p-4">Confirm time, location, payment method, and transportation before traveling.</div>
          </div>
        </section>
      </main>
      
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; 2024 Unfilteredqa. Built by Viridian Network LLC.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/search" className="hover:text-foreground transition-colors">Community Guidelines</Link>
              <Link to="/dashboard" className="hover:text-foreground transition-colors">Seller Dashboard</Link>
              <Link to="/marketplace" className="hover:text-foreground transition-colors">Marketplace</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
