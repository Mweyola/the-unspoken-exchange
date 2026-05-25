import { useEffect, useMemo, useState } from "react";
import { BadgeCheck, CalendarClock, DollarSign, MessageSquare, Plus, ShieldCheck, Truck } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreateListingModal } from "@/components/modals/CreateListingModal";
import { BuyerInquiry, mockBuyerInquiries, mockListings } from "@/data/mockData";

const intentStyles = {
  High: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Low: "bg-muted text-muted-foreground border-border",
};

export default function Dashboard() {
  const [createListingOpen, setCreateListingOpen] = useState(false);
  const [storedInquiries, setStoredInquiries] = useState<BuyerInquiry[]>([]);
  const myListings = mockListings.slice(0, 3);
  const inquiries = useMemo(() => [...storedInquiries, ...mockBuyerInquiries], [storedInquiries]);

  useEffect(() => {
    const loadStoredInquiries = () => setStoredInquiries(readStoredInquiries());
    loadStoredInquiries();
    window.addEventListener("storage", loadStoredInquiries);
    window.addEventListener("unspoken-inquiries-updated", loadStoredInquiries);

    return () => {
      window.removeEventListener("storage", loadStoredInquiries);
      window.removeEventListener("unspoken-inquiries-updated", loadStoredInquiries);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2">Seller Dashboard</h1>
          <p className="text-muted-foreground">
            Review buyer readiness, offers, transportation, and meetup details before deciding who to answer first.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="glass-effect rounded-xl p-5">
            <p className="text-sm text-muted-foreground">Active listings</p>
            <p className="text-3xl font-bold mt-2">{myListings.length}</p>
          </div>
          <div className="glass-effect rounded-xl p-5">
            <p className="text-sm text-muted-foreground">Buyer inquiries</p>
            <p className="text-3xl font-bold mt-2">{inquiries.length}</p>
          </div>
          <div className="glass-effect rounded-xl p-5">
            <p className="text-sm text-muted-foreground">High-intent buyers</p>
            <p className="text-3xl font-bold mt-2">
              {inquiries.filter((inquiry) => inquiry.intentLevel === "High").length}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8">
          <section className="glass-effect rounded-xl p-5">
            <div className="flex items-center justify-between gap-3 mb-5">
              <h2 className="font-display text-2xl font-semibold">My Listings</h2>
              <Button variant="outline" size="sm" onClick={() => setCreateListingOpen(true)}>
                <Plus className="w-4 h-4 mr-1" />
                Add Listing
              </Button>
            </div>
            <div className="space-y-4">
              {myListings.map((listing) => (
                <div key={listing.id} className="flex gap-3 rounded-lg bg-background/50 border border-border/50 p-3">
                  <img src={listing.image} alt={listing.title} className="w-20 h-20 rounded-md object-cover" />
                  <div className="min-w-0">
                    <h3 className="font-medium line-clamp-1">{listing.title}</h3>
                    <p className="text-sm text-muted-foreground">${listing.price} - {listing.location}</p>
                    <div className="flex items-center gap-1.5 text-xs text-primary mt-2">
                      <BadgeCheck className="w-3.5 h-3.5" />
                      {listing.sellerTrustBadge}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="glass-effect rounded-xl p-5">
            <div className="flex items-center gap-2 mb-5">
              <MessageSquare className="w-5 h-5 text-primary" />
              <h2 className="font-display text-2xl font-semibold">Buyer Inquiries</h2>
            </div>

            <div className="space-y-4">
              {inquiries.length === 0 && (
                <div className="rounded-lg bg-background/50 border border-border/50 p-6 text-center">
                  <p className="font-medium mb-1">No buyer inquiries yet</p>
                  <p className="text-sm text-muted-foreground">Submitted inquiry forms will appear here for seller review.</p>
                </div>
              )}

              {inquiries.map((inquiry) => (
                <article key={inquiry.id} className="rounded-lg bg-background/50 border border-border/50 p-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-semibold">{inquiry.buyerName}</h3>
                      <p className="text-sm text-muted-foreground">{inquiry.listingTitle}</p>
                      <p className="text-xs text-muted-foreground mt-1">{inquiry.submittedAt}</p>
                    </div>
                    <Badge variant="outline" className={intentStyles[inquiry.intentLevel]}>
                      {inquiry.intentLevel} intent
                    </Badge>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm mb-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                      {inquiry.readyWithin24Hours ? "Ready within 24h" : "Not ready within 24h"}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <DollarSign className="w-4 h-4 text-primary" />
                      {inquiry.offerType}: ${inquiry.offerAmount}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Truck className="w-4 h-4 text-primary" />
                      {inquiry.hasTransportation ? "Has transportation" : "Needs transportation"}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CalendarClock className="w-4 h-4 text-primary" />
                      {inquiry.preferredMeetupTime}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground border-t border-border/50 pt-3">
                    {inquiry.message}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
      <CreateListingModal open={createListingOpen} onOpenChange={setCreateListingOpen} />
    </div>
  );
}

function readStoredInquiries(): BuyerInquiry[] {
  try {
    const parsed = JSON.parse(localStorage.getItem("unspoken-exchange-inquiries") || "[]");
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map((inquiry) => {
      const readyWithin24Hours = inquiry.readyWithin24Hours === true || inquiry.readyWithin24Hours === "yes";
      const hasTransportation = inquiry.hasTransportation === true || inquiry.hasTransportation === "yes";
      const offerAmount = Number(inquiry.offerAmount) || 0;
      const listing = mockListings.find((item) => item.id === inquiry.listingId);
      const listingPrice = listing?.price || offerAmount;
      const intentLevel: BuyerInquiry["intentLevel"] =
        readyWithin24Hours && hasTransportation && offerAmount >= listingPrice * 0.9
          ? "High"
          : readyWithin24Hours || hasTransportation
            ? "Medium"
            : "Low";

      return {
        id: String(inquiry.id || `stored-${Date.now()}`),
        listingId: String(inquiry.listingId || ""),
        listingTitle: String(inquiry.listingTitle || "Marketplace listing"),
        buyerName: String(inquiry.buyerName || "Local test buyer"),
        intentLevel,
        readyWithin24Hours,
        offerType: inquiry.offerType === "listed-price" ? "Listed price" : "Offer",
        offerAmount,
        hasTransportation,
        preferredMeetupTime: String(inquiry.preferredMeetupTime || "Not provided"),
        paymentMethod: String(inquiry.paymentMethod || "Not provided"),
        message: String(inquiry.message || "No message provided."),
        submittedAt: formatStoredDate(inquiry.submittedAt),
      };
    });
  } catch {
    return [];
  }
}

function formatStoredDate(value: unknown) {
  if (typeof value !== "string") {
    return "Just now";
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Just now" : date.toLocaleString();
}
