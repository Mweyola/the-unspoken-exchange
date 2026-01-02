import { useState } from "react";
import { Search, SlidersHorizontal, Plus } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { ListingCard } from "@/components/marketplace/ListingCard";
import { CreateListingModal } from "@/components/modals/CreateListingModal";
import { MessageSellerModal } from "@/components/modals/MessageSellerModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockListings } from "@/data/mockData";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const categories = ["All", "Electronics", "Furniture", "Fashion", "Sports", "Home Decor", "Vehicles", "Other"];

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageListingTitle, setMessageListingTitle] = useState("");
  const { user } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const filteredListings = mockListings.filter(listing => {
    const matchesCategory = selectedCategory === "All" || listing.category === selectedCategory;
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreate = () => {
    if (user.level < 2) {
      toast({
        title: "Verified account required",
        description: "Verify your phone and profile photo to post listings. Go to Account to upgrade.",
      });
      navigate("/account");
      return;
    }
    setCreateOpen(true);
  };

  const handleMessage = (title: string) => {
    setMessageListingTitle(title);
    setMessageOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero */}
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2">
            Community <span className="gradient-text">Marketplace</span>
          </h1>
          <p className="text-muted-foreground">
            Buy and sell with trusted community members
          </p>
        </div>
        
        {/* Search and Filters */}
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
            <Button variant="outline">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button variant="gradient" onClick={handleCreate}>
              <Plus className="w-4 h-4 mr-2" />
              Sell Item
            </Button>
            <Link to="/seller/signup">
              <Button variant="outline">
                Become a Seller
              </Button>
            </Link>
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
              <ListingCard
                listing={listing}
                onContact={() => handleMessage(listing.title)}
              />
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
        
        {/* Load More */}
        {filteredListings.length > 0 && (
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              Load More Listings
            </Button>
          </div>
        )}
      </main>
      <CreateListingModal open={createOpen} onOpenChange={setCreateOpen} />
      <MessageSellerModal
        open={messageOpen}
        onOpenChange={setMessageOpen}
        listingTitle={messageListingTitle}
      />
    </div>
  );
};

export default Marketplace;
