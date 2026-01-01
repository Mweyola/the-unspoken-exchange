import { MessageCircleQuestion, ShoppingBag, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-border/30">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
            <MessageCircleQuestion className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-semibold tracking-tight">
            <span className="gradient-text">Unfiltered</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-1">
          <Link to="/">
            <Button 
              variant={location.pathname === "/" ? "secondary" : "ghost"} 
              size="sm"
            >
              Questions
            </Button>
          </Link>
          <Link to="/marketplace">
            <Button 
              variant={location.pathname === "/marketplace" ? "secondary" : "ghost"} 
              size="sm"
            >
              <ShoppingBag className="w-4 h-4 mr-1" />
              Marketplace
            </Button>
          </Link>
        </nav>
        
        <div className="flex items-center gap-2">
          <Link to="/search">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="w-5 h-5" />
            </Button>
          </Link>
          <Button variant="gradient" size="sm">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Ask Freely</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
