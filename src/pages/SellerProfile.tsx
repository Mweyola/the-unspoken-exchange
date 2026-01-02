import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { SellerProfileCard } from "@/components/seller/SellerProfileCard";
import { ListingCard } from "@/components/marketplace/ListingCard";
import { mockListings } from "@/data/mockData";
import { Button } from "@/components/ui/button";

const placeholderPhoto =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80";

const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "");

export default function SellerProfile() {
  const { slug } = useParams<{ slug: string }>();

  const sellerListings = useMemo(() => {
    if (!slug) return [];
    return mockListings.filter((listing) => slugify(listing.seller.name) === slug);
  }, [slug]);

  const seller = sellerListings[0]?.seller;

  const currentListings = sellerListings.filter((l) => l.availability === "in_stock");
  const pastListings = sellerListings.filter((l) => l.availability === "sold");

  if (!seller) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-12 max-w-4xl text-center space-y-4">
          <h1 className="font-display text-3xl font-semibold">Seller not found</h1>
          <p className="text-muted-foreground">This seller may not exist or has no listings yet.</p>
          <Link to="/marketplace">
            <Button variant="gradient">Back to marketplace</Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-10 space-y-8">
        <div className="flex items-center gap-4">
          <img
            src={placeholderPhoto}
            alt={seller.name}
            className="w-16 h-16 rounded-full object-cover border border-border"
          />
          <div className="space-y-1">
            <h1 className="font-display text-3xl font-semibold">{seller.name}</h1>
            <p className="text-sm text-muted-foreground">
              Public seller profile • City only (no full address shown)
            </p>
          </div>
        </div>

        <SellerProfileCard
          name={seller.name}
          memberSince={seller.memberSince}
          activeListings={seller.activeListings}
          soldItems={seller.soldItems}
          completedTransactions={seller.completedTransactions}
          avgResponse={seller.avgResponse}
          rating={seller.rating}
          reviews={seller.reviews}
          badges={[...seller.badges, "Verified Seller"]}
          location={sellerListings[0]?.locationCity}
          reliabilityScore={seller.reliabilityScore}
          reliabilityLabel={seller.reliabilityLabel}
        />

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold">Current Listings</h2>
            <p className="text-sm text-muted-foreground">{currentListings.length} active</p>
          </div>
          {currentListings.length === 0 ? (
            <p className="text-muted-foreground">No active listings.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold">Past Listings</h2>
            <p className="text-sm text-muted-foreground">{pastListings.length} sold</p>
          </div>
          {pastListings.length === 0 ? (
            <p className="text-muted-foreground">No past listings.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pastListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </section>

        <div className="text-sm text-muted-foreground">
          <p>Hidden from buyers: email, phone, full address, government ID.</p>
        </div>
      </main>
    </div>
  );
}
