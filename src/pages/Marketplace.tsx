import { useState } from "react";
import { Search, RotateCcw, Plus } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { ListingCard } from "@/components/marketplace/ListingCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockListings } from "@/data/mockData";
import { CreateListingModal } from "@/components/modals/CreateListingModal";

const categories = ["All", "Electronics", "Furniture", "Fashion", "Sports", "Home Decor", "Vehicles", "Other"];

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [createListingOpen, setCreateListingOpen] = useState(false);
  
  const filteredListings = mockListings.filter(listing => {
    const matchesCategory = selectedCategory === "All" || listing.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      listing.title.toLowerCase().includes(query) ||
      listing.category.toLowerCase().includes(query) ||
      listing.location.toLowerCase().includes(query) ||
      listing.sellerTrustBadge.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const hasActiveFilters = selectedCategory !== "All" || searchQuery.length > 0;

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2">
            Serious Buyer <span className="gradient-text">Marketplace</span>
          </h1>
          <p className="text-muted-foreground">
            Find trusted sellers, review safety notes, and send inquiry details that sellers can act on.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search listings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
              disabled={!hasActiveFilters}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button variant="gradient" onClick={() => setCreateListingOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Sell Item
            </Button>
          </div>
        </div>
        
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
          {categories.map((category) => (
            <Badge
              key={category}
              variant="outline"
              className={`cursor-pointer px-4 py-2 text-sm transition-colors ${
                selectedCategory === category
                  ? "bg-primary/20 text-primary border-primary/30"
                  : "hover:bg-secondary"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
        
        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-6">
          {filteredListings.length} listings found
        </p>
        
        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredListings.map((listing, index) => (
            <div 
              key={listing.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <ListingCard listing={listing} />
            </div>
          ))}
        </div>
        
        {filteredListings.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">No listings found matching your criteria</p>
            <Button variant="outline" onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}>
              Clear Filters
            </Button>
          </div>
        )}
        
      </main>
      <CreateListingModal open={createListingOpen} onOpenChange={setCreateListingOpen} />
    </div>
  );
};

export default Marketplace;
