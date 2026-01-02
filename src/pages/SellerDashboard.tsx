import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { ListingCard } from "@/components/marketplace/ListingCard";
import { mockListings } from "@/data/mockData";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Phase 1: simple private dashboard view (static data from mock listings)
export default function SellerDashboard() {
  // Treat the first mock seller as the logged-in seller for this mock dashboard.
  const sellerName = mockListings[0]?.seller.name;
  const active = useMemo(
    () => mockListings.filter((l) => l.seller.name === sellerName && l.availability === "in_stock"),
    [sellerName]
  );
  const sold = useMemo(
    () => mockListings.filter((l) => l.seller.name === sellerName && l.availability === "sold"),
    [sellerName]
  );
  const drafts: typeof mockListings = [];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Seller Dashboard</p>
            <h1 className="font-display text-3xl font-semibold">Welcome back, {sellerName}</h1>
            <p className="text-muted-foreground text-sm">
              Manage listings, reservations, messages, and verification.
            </p>
          </div>
          <Link to="/seller/signup">
            <Button variant="outline">Update seller profile</Button>
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">Active</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-semibold">{active.length}</CardContent>
          </Card>
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">Sold</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-semibold">{sold.length}</CardContent>
          </Card>
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">Reservations</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-semibold">0</CardContent>
          </Card>
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">Reviews</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-semibold">
              {mockListings[0]?.seller.reviews ?? 0}
            </CardContent>
          </Card>
        </div>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold">My Listings</h2>
            <Button variant="gradient">Create Listing</Button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge>Active</Badge>
              <span className="text-sm text-muted-foreground">{active.length} items</span>
            </div>
            {active.length === 0 ? (
              <p className="text-sm text-muted-foreground">No active listings.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {active.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline">Sold</Badge>
              <span className="text-sm text-muted-foreground">{sold.length} items</span>
            </div>
            {sold.length === 0 ? (
              <p className="text-sm text-muted-foreground">No sold listings yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sold.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Drafts</Badge>
              <span className="text-sm text-muted-foreground">{drafts.length} items</span>
            </div>
            {drafts.length === 0 ? (
              <p className="text-sm text-muted-foreground">No drafts.</p>
            ) : (
              <p className="text-sm text-muted-foreground">Draft listings will appear here.</p>
            )}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>Messages</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Phase 1 placeholder. Future: inbox, unread counts, filters.
            </CardContent>
          </Card>
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>Reservations</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Phase 1 placeholder. Soft holds will surface here.
            </CardContent>
          </Card>
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Phase 1 placeholder. Show review list and ratings breakdown.
            </CardContent>
          </Card>
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>Profile & Verification</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-1">
              <p>Verification status: Verified Phone, Trusted Seller badge pending.</p>
              <p>Payout preferences: future upgrade.</p>
              <p>Future: shipping labels, storefront, analytics.</p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
