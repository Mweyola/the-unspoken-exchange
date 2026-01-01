import { useState, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QuestionCard } from "@/components/questions/QuestionCard";
import { ListingCard } from "@/components/marketplace/ListingCard";
import { mockQuestions, mockListings } from "@/data/mockData";
import { Search as SearchIcon, MessageCircle, ShoppingBag, SlidersHorizontal, X } from "lucide-react";

const questionCategories = ["All", "Dating", "Culture", "Career", "Money", "Relationships", "Health", "Life"];
const listingCategories = ["All", "Furniture", "Electronics", "Home Decor", "Sports", "Fashion"];

type SortOption = "recent" | "popular" | "category";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("questions");
  const [questionCategory, setQuestionCategory] = useState("All");
  const [listingCategory, setListingCategory] = useState("All");
  const [questionSort, setQuestionSort] = useState<SortOption>("recent");
  const [listingSort, setListingSort] = useState<SortOption>("recent");
  const [showFilters, setShowFilters] = useState(true);

  const filteredQuestions = useMemo(() => {
    let results = [...mockQuestions];
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        q => q.title.toLowerCase().includes(query) || q.preview.toLowerCase().includes(query)
      );
    }
    
    // Category filter
    if (questionCategory !== "All") {
      results = results.filter(q => q.category === questionCategory);
    }
    
    // Sort
    switch (questionSort) {
      case "popular":
        results.sort((a, b) => b.upvotes - a.upvotes);
        break;
      case "category":
        results.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case "recent":
      default:
        // Already sorted by recent in mock data
        break;
    }
    
    return results;
  }, [searchQuery, questionCategory, questionSort]);

  const filteredListings = useMemo(() => {
    let results = [...mockListings];
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        l => l.title.toLowerCase().includes(query) || l.category.toLowerCase().includes(query)
      );
    }
    
    // Category filter
    if (listingCategory !== "All") {
      results = results.filter(l => l.category === listingCategory);
    }
    
    // Sort
    switch (listingSort) {
      case "popular":
        results.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
      case "category":
        results.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case "recent":
      default:
        // Already sorted by recent in mock data
        break;
    }
    
    return results;
  }, [searchQuery, listingCategory, listingSort]);

  const clearFilters = () => {
    setSearchQuery("");
    setQuestionCategory("All");
    setListingCategory("All");
    setQuestionSort("recent");
    setListingSort("recent");
  };

  const hasActiveFilters = searchQuery || 
    (activeTab === "questions" && (questionCategory !== "All" || questionSort !== "recent")) ||
    (activeTab === "listings" && (listingCategory !== "All" || listingSort !== "recent"));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            <span className="gradient-text">Search</span> Everything
          </h1>
          <p className="text-muted-foreground">
            Find questions, answers, and marketplace items across the community.
          </p>
        </div>

        {/* Search Input */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search questions and marketplace items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-12 h-14 text-lg bg-card border-border/50 focus:border-primary/50"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setSearchQuery("")}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <TabsList className="grid w-full sm:w-auto grid-cols-2 bg-card/50">
                <TabsTrigger value="questions" className="gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Questions
                  <span className="text-xs text-muted-foreground">({filteredQuestions.length})</span>
                </TabsTrigger>
                <TabsTrigger value="listings" className="gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  Marketplace
                  <span className="text-xs text-muted-foreground">({filteredListings.length})</span>
                </TabsTrigger>
              </TabsList>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {hasActiveFilters && (
                  <span className="w-2 h-2 rounded-full bg-primary" />
                )}
              </Button>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="glass-effect rounded-xl p-4 mb-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row gap-4">
                  {activeTab === "questions" ? (
                    <>
                      <div className="flex-1">
                        <label className="text-sm text-muted-foreground mb-2 block">Category</label>
                        <Select value={questionCategory} onValueChange={setQuestionCategory}>
                          <SelectTrigger className="bg-card">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border">
                            {questionCategories.map((cat) => (
                              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex-1">
                        <label className="text-sm text-muted-foreground mb-2 block">Sort by</label>
                        <Select value={questionSort} onValueChange={(v) => setQuestionSort(v as SortOption)}>
                          <SelectTrigger className="bg-card">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border">
                            <SelectItem value="recent">Most Recent</SelectItem>
                            <SelectItem value="popular">Most Popular</SelectItem>
                            <SelectItem value="category">Category A-Z</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex-1">
                        <label className="text-sm text-muted-foreground mb-2 block">Category</label>
                        <Select value={listingCategory} onValueChange={setListingCategory}>
                          <SelectTrigger className="bg-card">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border">
                            {listingCategories.map((cat) => (
                              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex-1">
                        <label className="text-sm text-muted-foreground mb-2 block">Sort by</label>
                        <Select value={listingSort} onValueChange={(v) => setListingSort(v as SortOption)}>
                          <SelectTrigger className="bg-card">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border">
                            <SelectItem value="recent">Most Recent</SelectItem>
                            <SelectItem value="popular">Featured First</SelectItem>
                            <SelectItem value="category">Category A-Z</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                  {hasActiveFilters && (
                    <div className="flex items-end">
                      <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
                        Clear all
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Results */}
            <TabsContent value="questions" className="mt-0">
              {filteredQuestions.length > 0 ? (
                <div className="space-y-4">
                  {filteredQuestions.map((question) => (
                    <QuestionCard key={question.id} question={question} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No questions found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filters.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="listings" className="mt-0">
              {filteredListings.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredListings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No listings found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filters.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}