import { useState } from "react";
import { MessageCircleQuestion, ShoppingBag, Plus, Search, ShieldCheck, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AskQuestionModal } from "@/components/modals/AskQuestionModal";
import { CreateListingModal } from "@/components/modals/CreateListingModal";

export function Header() {
  const location = useLocation();
  const [askQuestionOpen, setAskQuestionOpen] = useState(false);
  const [createListingOpen, setCreateListingOpen] = useState(false);
  
  return (
    <>
      <header className="sticky top-0 z-50 glass-effect border-b border-border/30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
              <MessageCircleQuestion className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-lg sm:text-xl font-semibold tracking-tight max-w-[170px] sm:max-w-none truncate">
              <span className="gradient-text">The Unspoken Exchange</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            <Link to="/">
              <Button 
                variant={location.pathname === "/" ? "secondary" : "ghost"} 
                size="sm"
              >
                Home
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
            <Link to="/dashboard">
              <Button
                variant={location.pathname === "/dashboard" ? "secondary" : "ghost"}
                size="sm"
              >
                <LayoutDashboard className="w-4 h-4 mr-1" />
                Dashboard
              </Button>
            </Link>
          </nav>
          
          <div className="flex items-center gap-2">
            <Link to="/search">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Search className="w-5 h-5" />
              </Button>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="gradient" size="sm">
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline ml-1">Create</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-card border-border">
                <DropdownMenuItem asChild className="cursor-pointer md:hidden">
                  <Link to="/marketplace">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Browse Listings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer md:hidden">
                  <Link to="/dashboard">
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Seller Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer md:hidden">
                  <Link to="/search">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer"
                  onClick={() => setAskQuestionOpen(true)}
                >
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  Ask Community
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer"
                  onClick={() => setCreateListingOpen(true)}
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Create Listing
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <AskQuestionModal open={askQuestionOpen} onOpenChange={setAskQuestionOpen} />
      <CreateListingModal open={createListingOpen} onOpenChange={setCreateListingOpen} />
    </>
  );
}
