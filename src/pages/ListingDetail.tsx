import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BadgeCheck, Clock, MapPin, MessageCircle, ShieldCheck, UserCheck } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BuyerInquiryForm } from "@/components/marketplace/BuyerInquiryForm";
import { mockListings } from "@/data/mockData";

export default function ListingDetail() {
  const { id } = useParams();
  const listing = mockListings.find((item) => item.id === id);

  if (!listing) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-display text-3xl font-semibold mb-3">Listing not found</h1>
          <p className="text-muted-foreground mb-6">This item may have been removed or sold.</p>
          <Button asChild variant="outline">
            <Link to="/marketplace">Back to Marketplace</Link>
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/marketplace">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to listings
          </Link>
        </Button>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
          <section className="space-y-6">
            <div className="glass-effect rounded-xl overflow-hidden">
              <div className="aspect-[4/3] md:aspect-[16/10]">
                <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-5 md:p-6 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="bg-secondary/60">{listing.category}</Badge>
                  <Badge className="bg-primary/20 text-primary border-primary/30">{listing.condition}</Badge>
                </div>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                  <div>
                    <h1 className="font-display text-3xl md:text-4xl font-semibold">{listing.title}</h1>
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{listing.location}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{listing.timeAgo}</span>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-primary">${listing.price}</p>
                </div>
                <p className="text-muted-foreground leading-relaxed">{listing.description}</p>
              </div>
            </div>

            <div className="glass-effect rounded-xl p-5 md:p-6">
              <h2 className="font-display text-2xl font-semibold mb-4">Safety Notes</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {listing.safetyNotes.map((note) => (
                  <div key={note} className="flex gap-3 rounded-lg bg-background/50 border border-border/50 p-4 text-sm text-muted-foreground">
                    <ShieldCheck className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-effect rounded-xl p-5 md:p-6">
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle className="w-5 h-5 text-primary" />
                <h2 className="font-display text-2xl font-semibold">Community Discussion</h2>
              </div>
              <p className="text-muted-foreground">
                Community pricing checks, scam warnings, inspection advice, and negotiation feedback will appear here in a later backend version.
              </p>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="glass-effect rounded-xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-semibold">{listing.sellerName}</h2>
                  <p className="text-sm text-muted-foreground">{listing.sellerSince}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-5">
                <div className="rounded-lg bg-background/50 border border-border/50 p-3">
                  <p className="text-xs text-muted-foreground">Trust score</p>
                  <p className="text-2xl font-bold text-primary">{listing.sellerTrustScore}%</p>
                </div>
                <div className="rounded-lg bg-background/50 border border-border/50 p-3">
                  <p className="text-xs text-muted-foreground">Response</p>
                  <p className="text-sm font-medium">{listing.sellerResponseTime}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-primary">
                <BadgeCheck className="w-4 h-4" />
                {listing.sellerTrustBadge}
              </div>
            </div>

            <BuyerInquiryForm listing={listing} />
          </aside>
        </div>
      </main>
    </div>
  );
}
