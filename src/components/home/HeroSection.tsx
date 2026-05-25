import { useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircleQuestion, ShieldCheck, ShoppingBag, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateListingModal } from "@/components/modals/CreateListingModal";
import { AskQuestionModal } from "@/components/modals/AskQuestionModal";

export function HeroSection() {
  const [createListingOpen, setCreateListingOpen] = useState(false);
  const [askQuestionOpen, setAskQuestionOpen] = useState(false);

  return (
    <>
      <section className="relative py-14 md:py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6 animate-fade-in">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Built by Viridian Network LLC</span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-semibold mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Serious Buyers. Trusted Sellers.{" "}
            <span className="gradient-text">Clear Communication.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            A communication-first marketplace designed to reduce ghosting, lowballing, and wasted time through structured buyer intent.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button asChild variant="gradient" size="lg" className="w-full sm:w-auto">
              <Link to="/marketplace">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Browse Listings
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={() => setCreateListingOpen(true)}>
              <Store className="w-5 h-5 mr-2" />
              Sell an Item
            </Button>
            <Button variant="glass" size="lg" className="w-full sm:w-auto" onClick={() => setAskQuestionOpen(true)}>
              <MessageCircleQuestion className="w-5 h-5 mr-2" />
              Ask the Community
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-10 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="glass-effect rounded-lg px-4 py-3">
              <span className="block text-2xl font-bold gradient-text">Intent</span>
              Structured buyer readiness
            </div>
            <div className="glass-effect rounded-lg px-4 py-3">
              <span className="block text-2xl font-bold gradient-text">Trust</span>
              Seller clarity and safety notes
            </div>
            <div className="glass-effect rounded-lg px-4 py-3">
              <span className="block text-2xl font-bold gradient-text">Signal</span>
              Community pricing and scam checks
            </div>
          </div>
          </div>
        </div>
      </section>

      <CreateListingModal open={createListingOpen} onOpenChange={setCreateListingOpen} />
      <AskQuestionModal open={askQuestionOpen} onOpenChange={setAskQuestionOpen} />
    </>
  );
}
