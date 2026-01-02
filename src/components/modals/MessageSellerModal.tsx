import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/context/UserContext";

type IntentOption = "today" | "later" | "info" | "browsing";

interface MessageSellerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listingTitle: string;
}

const intentOptions: { key: IntentOption; title: string; description: string }[] = [
  { key: "today", title: "Ready to buy — pickup today", description: "Pick a window today. Boosts trust in the inbox." },
  { key: "later", title: "Want to buy — pickup tomorrow or later", description: "Choose a date and optionally request a 12h hold." },
  { key: "info", title: "Need more info before deciding", description: "Ask questions; marked as browsing. No reservation." },
  { key: "browsing", title: "Just browsing (no commitment)", description: "Only send 'Is this still available?' Low-priority tag." },
];

export function MessageSellerModal({ open, onOpenChange, listingTitle }: MessageSellerModalProps) {
  const [intent, setIntent] = useState<IntentOption | null>(null);
  const [timeWindow, setTimeWindow] = useState("");
  const [laterDate, setLaterDate] = useState("");
  const [reserveLater, setReserveLater] = useState(false);
  const [reserveToday, setReserveToday] = useState(false);
  const [question, setQuestion] = useState("");
  const { toast } = useToast();
  const { user, setReservation } = useUser();

  const scamPhrases = ["gift card", "wire transfer", "code", "verification code", "prepay", "bitcoin", "crypto"];

  const scanForScam = (text: string) => {
    const lower = text.toLowerCase();
    return scamPhrases.find((p) => lower.includes(p));
  };

  const canReserve = user.phoneVerified;

  const reset = () => {
    setIntent(null);
    setTimeWindow("");
    setLaterDate("");
    setReserveLater(false);
    setReserveToday(false);
    setQuestion("");
  };

  const close = () => {
    reset();
    onOpenChange(false);
  };

  const handleSend = () => {
    let payload = "";
    if (intent === "today") {
      if (!timeWindow) {
        toast({ title: "Select a time window", description: "Choose a pickup window for today." });
        return;
      }
      payload = `Ready today. Window: ${timeWindow}. Soft reserve: ${reserveToday ? "Requested" : "No"}. Mark as Likely Serious.`;
    } else if (intent === "later") {
      if (!laterDate) {
        toast({ title: "Select a date", description: "Pick a date for pickup tomorrow or later." });
        return;
      }
      payload = `Ready later. Date: ${laterDate}. Reserve 12h: ${reserveLater ? "Yes" : "No"}.`;
    } else if (intent === "info") {
      if (!question.trim()) {
        toast({ title: "Add a question", description: "Ask what you need to know before deciding." });
        return;
      }
      payload = `Browsing — Not Committed. Question: ${question.trim()}`;
    } else if (intent === "browsing") {
      payload = "Just browsing: Is this still available?";
    } else {
      toast({ title: "Pick an intent", description: "Choose one option to continue." });
      return;
    }

    if (!canReserve && ((intent === "today" && reserveToday) || (intent === "later" && reserveLater))) {
      toast({
        title: "Verify phone to reserve",
        description: "Soft reservations are for verified buyers. Complete phone verification first.",
        variant: "destructive",
      });
      return;
    }

    if ((intent === "today" && reserveToday) || (intent === "later" && reserveLater)) {
      setReservation({
        listingTitle,
        holdHours: 12,
        intent,
        timeWindow: intent === "today" ? timeWindow : undefined,
        pickupDate: intent === "later" ? laterDate : undefined,
        status: "pending",
      });
    } else {
      setReservation(undefined);
    }

    const scamHit = scanForScam(question || payload);

    toast({
      title: "Message sent",
      description: `Intent recorded for "${listingTitle}". (${payload})`,
    });

    if (scamHit) {
      toast({
        title: "Safety warning",
        description: `We detected a risky phrase (“${scamHit}”). Avoid sharing codes, paying off-platform, or sending deposits.`,
        variant: "destructive",
      });
    }

    if ((intent === "today" && reserveToday) || (intent === "later" && reserveLater)) {
      toast({
        title: "Soft reservation requested",
        description: "Seller can accept or cancel. If you miss the window, 1 point could be deducted.",
      });
    }

    close();
  };

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="sm:max-w-[620px] bg-card border-border">
        <DialogHeader>
          <DialogTitle>Message seller</DialogTitle>
          <DialogDescription>
            Pick your intent before messaging about "{listingTitle}". Serious buyers get priority.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="secondary">Buyer Reliability: {user.buyerReliabilityScore}/100</Badge>
            <p className="text-xs text-muted-foreground">Soft holds can expire and reduce reliability.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {intentOptions.map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => setIntent(opt.key)}
                className={`text-left rounded-xl border p-3 transition-colors ${
                  intent === opt.key ? "border-primary bg-primary/10" : "border-border hover:border-primary/40"
                }`}
              >
                <div className="font-semibold">{opt.title}</div>
                <p className="text-sm text-muted-foreground">{opt.description}</p>
                {opt.key === "today" && (
                  <Badge className="mt-2 bg-emerald-500/15 text-emerald-400 border-emerald-500/30">Likely Serious</Badge>
                )}
                {opt.key === "browsing" && (
                  <Badge className="mt-2 bg-amber-500/15 text-amber-400 border-amber-500/30">Just Browsing</Badge>
                )}
              </button>
            ))}
          </div>

          {intent === "today" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Pickup window (today)</Label>
                <Badge variant="secondary">{user.reliabilityScore}/100</Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {["Today 9-12", "Today 12-3", "Today 3-7"].map((slot) => (
                  <Button
                    key={slot}
                    variant={timeWindow === slot ? "gradient" : "outline"}
                    onClick={() => setTimeWindow(slot)}
                  >
                    {slot}
                  </Button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={reserveToday}
                  onCheckedChange={(c) => setReserveToday(!!c)}
                  disabled={!canReserve}
                />
                <Label>Request 12-hour hold (soft reservation)</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Marks you as Likely Serious. If you miss the window, the hold can expire and may reduce reliability.
                { !canReserve && " Verify your phone to request holds."}
              </p>
            </div>
          )}

          {intent === "later" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="later-date">Pickup date</Label>
                  <Badge variant="secondary">{user.reliabilityScore}/100</Badge>
                </div>
                <Input
                  id="later-date"
                  type="date"
                  value={laterDate}
                  onChange={(e) => setLaterDate(e.target.value)}
                  className="bg-background border-border/60"
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Checkbox
                    checked={reserveLater}
                    onCheckedChange={(c) => setReserveLater(!!c)}
                    disabled={!canReserve}
                  />
                  Request 12-hour hold
                </Label>
                <p className="text-sm text-muted-foreground">
                  Seller can accept or decline holds. If you miss the pickup window, the hold can expire and hurt reliability.
                  { !canReserve && " Verify your phone to request holds."}
                </p>
              </div>
            </div>
          )}

          {intent === "info" && (
            <div className="space-y-2">
              <Label htmlFor="info-question">What do you need to know?</Label>
              <Textarea
                id="info-question"
                placeholder="Ask about condition, specs, delivery, etc."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="min-h-[120px] bg-background border-border/60"
              />
              <p className="text-sm text-muted-foreground">Marked as Browsing — Not Committed. No reservation.</p>
            </div>
          )}

          {intent === "browsing" && (
            <div className="space-y-1">
              <Label>Preset message</Label>
              <Input value="Is this still available?" disabled />
              <p className="text-sm text-muted-foreground">Low-priority tag: Just Browsing.</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 border border-border/50 rounded-lg p-3 bg-background/60">
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">Safety tools</p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => toast({ title: "Seller reported", description: "We’ll review this seller for safety issues." })}>
                  Report seller
                </Button>
                <Button variant="outline" size="sm" onClick={() => toast({ title: "Seller blocked", description: "You won’t see this seller’s messages." })}>
                  Block seller
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Email/phone stay hidden during messaging.</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">Meetup tips</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Meet at a public place (police lobby, busy café).</li>
                <li>• Bring a friend; share your meetup plan.</li>
                <li>• Avoid off-platform payments or sharing codes.</li>
              </ul>
              <p className="text-xs text-muted-foreground">Suggested safe spots: police station lobby, bank lobby, well-lit café.</p>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={close}>Cancel</Button>
            <Button variant="gradient" onClick={handleSend}>Send message</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
