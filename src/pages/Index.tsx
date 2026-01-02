import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";
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
        {/* Questions Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl md:text-3xl font-semibold">
              Trending Questions
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
            <Button variant="outline" size="lg">
              View All Questions
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </section>
        
        {/* Marketplace Preview */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold mb-2">
                Community Marketplace
              </h2>
              <p className="text-muted-foreground">Buy and sell within our community</p>
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
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Unfiltered. A safe space for honest questions.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="/guidelines" className="hover:text-foreground transition-colors">Community Guidelines</a>
              <a href="/privacy" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
