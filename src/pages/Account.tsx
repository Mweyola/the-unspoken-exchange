import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/context/UserContext";
import { CheckCircle2, ShieldCheck, UserCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const tiers = [
  {
    level: 1,
    title: "Basic Account",
    description: "Email + password, username. Can browse and message.",
    benefits: ["Browse and message", "No posting listings yet (spam reduction)"],
    icon: UserCheck,
  },
  {
    level: 2,
    title: "Verified Account",
    description: "Required to sell. Phone verification + profile photo + first name & last initial.",
    benefits: ["Can post listings", "Shows phone verified badge", "Profile photo + name initial"],
    icon: CheckCircle2,
  },
  {
    level: 3,
    title: "Trusted Seller Badge",
    description: "Government ID upload (optional). Manual or automated approval.",
    benefits: ["Trusted seller badge", "Higher buyer confidence", "Optional ID verification rewarded"],
    icon: ShieldCheck,
  },
];

export default function Account() {
  const { user, setLevel, updateUser, reservation, markReservation, adjustBuyerReliability } = useUser();
  const { toast } = useToast();

  const setVerified = () => {
    setLevel(2);
    updateUser({
      phoneVerified: true,
      photoUploaded: true,
      firstName: "Alex",
      lastInitial: "K",
      reliabilityScore: Math.min(100, user.reliabilityScore + 15 + 15 + 20), // phone + pickup time + consistency bump
    });
    toast({
      title: "Upgraded to Verified",
      description: "You can now post listings and show phone verification.",
    });
  };

  const setTrusted = () => {
    setLevel(3);
    updateUser({
      phoneVerified: true,
      photoUploaded: true,
      idVerified: true,
      firstName: "Alex",
      lastInitial: "K",
      reliabilityScore: 100,
    });
    toast({
      title: "Trusted Seller badge applied",
      description: "ID verification recorded. Badge will display once approved.",
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-10 max-w-5xl space-y-8">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Account</p>
          <h1 className="font-display text-3xl md:text-4xl font-semibold">Account Levels</h1>
          <p className="text-muted-foreground">
            Progress through verification to unlock selling, increase trust, and earn the Trusted Seller badge.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            const active = user.level >= tier.level;
            const isCurrent = user.level === tier.level;
            return (
              <Card key={tier.level} className={active ? "border-primary/40" : ""}>
                <CardHeader className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-primary" />
                    <Badge variant={active ? "default" : "outline"}>
                      Level {tier.level}
                    </Badge>
                  </div>
                  <CardTitle className="font-semibold">{tier.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{tier.description}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="text-sm text-muted-foreground space-y-2">
                    {tier.benefits.map((benefit) => (
                      <li key={benefit}>• {benefit}</li>
                    ))}
                  </ul>
                  {tier.level === 2 && (
                    <Button
                      variant={active ? "secondary" : "gradient"}
                      className="w-full"
                      onClick={setVerified}
                    >
                      {active ? "Verified" : "Upgrade to Verified"}
                    </Button>
                  )}
                  {tier.level === 3 && (
                    <Button
                      variant={active ? "secondary" : "outline"}
                      className="w-full"
                      onClick={setTrusted}
                    >
                      {active ? "Trusted Seller Enabled" : "Apply Trusted Seller Badge"}
                    </Button>
                  )}
                  {isCurrent && (
                    <p className="text-xs text-primary font-medium">
                      Current level
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <section className="glass-effect rounded-xl p-6 space-y-2">
          <h2 className="font-display text-xl font-semibold">Your status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
            <p><strong>Level:</strong> {user.level}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Phone verified:</strong> {user.phoneVerified ? "Yes" : "No"}</p>
            <p><strong>Profile photo:</strong> {user.photoUploaded ? "Uploaded" : "Not uploaded"}</p>
            <p><strong>ID verified:</strong> {user.idVerified ? "Yes (trusted)" : "Not provided"}</p>
          </div>
        </section>

        <section className="glass-effect rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold">Buyer Reliability Score</h2>
            <Badge variant="secondary">{user.reliabilityScore}/100</Badge>
          </div>
          <Progress value={user.reliabilityScore} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground mb-1">Points earned</p>
              <ul className="space-y-1">
                <li>+20 Completed pickups</li>
                <li>+10 Fast responses</li>
                <li>+15 Choosing a pickup time</li>
                <li>+15 Staying consistent with commitments</li>
                <li>+15 Verified phone</li>
                <li>+25 ID verified</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Deductions</p>
              <ul className="space-y-1">
                <li>−10 No-show</li>
                <li>−5 Ghosting after showing interest</li>
                <li>−10 Canceling last-minute without reason</li>
                <li>−1 Expired soft reservation (missed window)</li>
                <li>−25 Two+ no-shows in 30 days</li>
              </ul>
            </div>
          </div>
          <Separator />
          <p className="text-sm text-muted-foreground">
            Reliability Score gamifies trust. Serious buyers keep a high score by picking times, following through, and verifying.
          </p>
        </section>

        <section className="glass-effect rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold">Buyer Reliability Score</h2>
            <Badge variant="secondary">
              {user.buyerReliabilityScore}/100 {user.buyerReliabilityLabel ? `(${user.buyerReliabilityLabel})` : ""}
            </Badge>
          </div>
          <Progress value={user.buyerReliabilityScore} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground mb-1">Points up</p>
              <ul className="space-y-1">
                <li>+10 Completing a purchase</li>
                <li>+5 Responding quickly</li>
                <li>+5 Showing up on time</li>
                <li>+5 Good review from seller</li>
                <li>+5 Phone verification</li>
                <li>+10 ID verification</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Points down</p>
              <ul className="space-y-1">
                <li>−10 No-shows</li>
                <li>−5 Ghosting after reservation</li>
                <li>−5 Repeated “Is this available?” spamming</li>
                <li>−10 Reported by sellers</li>
                <li>−15 Suspicious/scam messages</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            <Button size="sm" variant="outline" onClick={() => adjustBuyerReliability(10)}>Sim: purchase +10</Button>
            <Button size="sm" variant="outline" onClick={() => adjustBuyerReliability(5)}>Sim: fast response +5</Button>
            <Button size="sm" variant="outline" onClick={() => adjustBuyerReliability(-10)}>Sim: no-show −10</Button>
          </div>
        </section>

        <section className="glass-effect rounded-xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold">Buyer Account Summary</h2>
            <Badge variant="outline">Private</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground">Core identity</p>
              <ul className="space-y-1">
                <li>Required: first name, last initial, email, password</li>
                <li>Profile photo: {user.photoUploaded ? "Added" : "Recommended"}</li>
                <li>Phone verification: {user.phoneVerified ? "Verified" : "Optional (earns Verified Buyer)"}</li>
                <li>ID verification: {user.idVerified ? "Trusted Buyer" : "Optional"}</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-foreground">What sellers see</p>
              <ul className="space-y-1">
                <li>Reliability score, city, account age</li>
                <li>Profile pic, badges, reviews</li>
                <li>Hidden: email, phone, full address, ID</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Soft reservations and priority messaging are available to verified buyers.</p>
        </section>

        <section className="glass-effect rounded-xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold">Buyer Activity Log</h2>
            <Badge variant="outline">Private</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground">Reservations</p>
              <ul className="space-y-1">
                <li>Pending: 0</li>
                <li>Past: 0</li>
                <li>Completed: 0</li>
                <li>Canceled/No-shows: 0</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-foreground">Messages & Reviews</p>
              <ul className="space-y-1">
                <li>Messages sent: 0</li>
                <li>Ratings received: 0</li>
                <li>Reliability breakdown visible above</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            This private log keeps you in control and helps resolve disputes. (Hook to real data later.)
          </p>
        </section>

        <section className="glass-effect rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold">Soft Reservation Status</h2>
            {reservation ? (
              <Badge>{reservation.status === "pending" ? "Active hold" : reservation.status}</Badge>
            ) : (
              <Badge variant="outline">No reservation</Badge>
            )}
          </div>
          {reservation ? (
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><strong>Listing:</strong> {reservation.listingTitle}</p>
              <p><strong>Intent:</strong> {reservation.intent}</p>
              {reservation.timeWindow && <p><strong>Time window:</strong> {reservation.timeWindow}</p>}
              {reservation.pickupDate && <p><strong>Pickup date:</strong> {reservation.pickupDate}</p>}
              <p><strong>Hold:</strong> {reservation.holdHours} hours</p>
              <div className="flex flex-wrap gap-2 pt-2">
                <Button size="sm" variant="gradient" onClick={() => markReservation("completed")}>
                  Mark completed (+5)
                </Button>
                <Button size="sm" variant="outline" onClick={() => markReservation("expired")}>
                  Mark expired (−1)
                </Button>
                <Button size="sm" variant="destructive" onClick={() => markReservation("no_show")}>
                  Mark no-show (−10)
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Use these to simulate good/bad buyer flows. Reliability adjusts automatically.
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No holds requested yet. Request a 12-hour hold in the intent flow.</p>
          )}
        </section>
      </main>
    </div>
  );
}
