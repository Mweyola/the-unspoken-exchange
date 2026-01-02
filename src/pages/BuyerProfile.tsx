import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

// In Phase 1, reuse the first buyer-like info from context/mock; here we mock a buyer profile.
const mockBuyer = {
  name: "Alex M.",
  city: "Brooklyn, NY",
  memberSince: "2023",
  reliabilityScore: 87,
  reliabilityLabel: "Good",
  phoneVerified: true,
  completedTransactions: 12,
  reviews: [
    { id: "r1", from: "Seller A", rating: 5, text: "Great communication, on time." },
    { id: "r2", from: "Seller B", rating: 4, text: "Prompt pickup, would sell again." },
  ],
  photo:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
};

export default function BuyerProfile() {
  const { slug } = useParams<{ slug: string }>();

  const buyer = useMemo(() => {
    // Phase 1: return mock buyer regardless of slug; slug retained for future real data.
    return mockBuyer;
  }, [slug]);

  const avgRating =
    buyer.reviews.reduce((sum, r) => sum + r.rating, 0) / (buyer.reviews.length || 1);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-10 space-y-8 max-w-5xl">
        <div className="flex items-center gap-4">
          <img
            src={buyer.photo}
            alt={buyer.name}
            className="w-16 h-16 rounded-full object-cover border border-border"
          />
          <div className="space-y-1">
            <h1 className="font-display text-3xl font-semibold">{buyer.name}</h1>
            <p className="text-sm text-muted-foreground">Member since {buyer.memberSince}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{buyer.city}</span>
              <Badge variant="secondary">
                Buyer Reliability: {buyer.reliabilityScore}/100 ({buyer.reliabilityLabel})
              </Badge>
              {buyer.phoneVerified && <Badge variant="outline">Verified Buyer</Badge>}
            </div>
          </div>
        </div>

        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Account summary</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground">Completed transactions</p>
              <p>{buyer.completedTransactions}</p>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="text-foreground">{avgRating.toFixed(1)}</span>
              <span>({buyer.reviews.length} reviews)</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">City only</Badge>
              <span>Exact address, email, phone, ID are hidden.</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardHeader>
            <CardTitle>Reviews from sellers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {buyer.reviews.map((rev) => (
              <div key={rev.id} className="p-3 rounded-lg border border-border/50">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span>{rev.rating}/5</span>
                  <span className="text-muted-foreground">• {rev.from}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{rev.text}</p>
              </div>
            ))}
            {buyer.reviews.length === 0 && (
              <p className="text-sm text-muted-foreground">No reviews yet.</p>
            )}
          </CardContent>
        </Card>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Link to="/marketplace">
            <Button variant="outline">Back to marketplace</Button>
          </Link>
          <p>Email, phone, and ID info stay hidden from sellers.</p>
        </div>
      </main>
    </div>
  );
}
