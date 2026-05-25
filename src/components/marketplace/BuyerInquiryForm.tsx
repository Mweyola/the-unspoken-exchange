import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Listing } from "@/data/mockData";

interface BuyerInquiryFormProps {
  listing: Listing;
}

export function BuyerInquiryForm({ listing }: BuyerInquiryFormProps) {
  const { toast } = useToast();
  const [readyWithin24Hours, setReadyWithin24Hours] = useState("");
  const [offerType, setOfferType] = useState("");
  const [offerAmount, setOfferAmount] = useState(String(listing.price));
  const [hasTransportation, setHasTransportation] = useState("");
  const [preferredMeetupTime, setPreferredMeetupTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!readyWithin24Hours || !offerType || !hasTransportation || !paymentMethod) {
      toast({
        title: "Complete the inquiry details",
        description: "Readiness, offer type, transportation, and payment method are required.",
        variant: "destructive",
      });
      return;
    }

    const inquiry = {
      id: crypto.randomUUID?.() || `inquiry-${Date.now()}`,
      listingId: listing.id,
      listingTitle: listing.title,
      buyerName: "Local test buyer",
      readyWithin24Hours,
      offerType,
      offerAmount: Number(offerAmount),
      hasTransportation,
      preferredMeetupTime,
      paymentMethod,
      message,
      submittedAt: new Date().toISOString(),
    };

    const existing = safeReadInquiries();
    localStorage.setItem("unspoken-exchange-inquiries", JSON.stringify([inquiry, ...existing]));
    window.dispatchEvent(new Event("unspoken-inquiries-updated"));

    toast({
      title: "Serious buyer inquiry sent",
      description: "Your inquiry now appears in the seller dashboard for MVP testing.",
    });

    setReadyWithin24Hours("");
    setOfferType("");
    setOfferAmount(String(listing.price));
    setHasTransportation("");
    setPreferredMeetupTime("");
    setPaymentMethod("");
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="glass-effect rounded-xl p-5 space-y-4">
      <div>
        <h2 className="font-display text-2xl font-semibold">Serious Buyer Inquiry</h2>
        <p className="text-sm text-muted-foreground">Give the seller enough detail to decide whether this is worth their time.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Ready to buy within 24 hours?</Label>
          <Select value={readyWithin24Hours} onValueChange={setReadyWithin24Hours}>
            <SelectTrigger className="bg-background border-border/50">
              <SelectValue placeholder="Select readiness" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Listed price or offer?</Label>
          <Select value={offerType} onValueChange={setOfferType}>
            <SelectTrigger className="bg-background border-border/50">
              <SelectValue placeholder="Select offer type" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="listed-price">Listed price</SelectItem>
              <SelectItem value="offer">Making an offer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="offerAmount">Offer amount</Label>
          <Input
            id="offerAmount"
            type="number"
            min="1"
            value={offerAmount}
            onChange={(event) => setOfferAmount(event.target.value)}
            className="bg-background border-border/50"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Do you have transportation?</Label>
          <Select value={hasTransportation} onValueChange={setHasTransportation}>
            <SelectTrigger className="bg-background border-border/50">
              <SelectValue placeholder="Select transportation" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
              <SelectItem value="arranging">Arranging it</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="meetupTime">Preferred meetup time</Label>
          <Input
            id="meetupTime"
            value={preferredMeetupTime}
            onChange={(event) => setPreferredMeetupTime(event.target.value)}
            placeholder="Today after 6 PM"
            className="bg-background border-border/50"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Payment method</Label>
          <Select value={paymentMethod} onValueChange={setPaymentMethod}>
            <SelectTrigger className="bg-background border-border/50">
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="cash">Cash</SelectItem>
              <SelectItem value="zelle">Zelle after inspection</SelectItem>
              <SelectItem value="venmo">Venmo after inspection</SelectItem>
              <SelectItem value="other">Other agreed method</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message to seller</Label>
        <Textarea
          id="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Share inspection questions, pickup details, or why your inquiry is serious."
          className="min-h-[110px] bg-background border-border/50 resize-none"
          required
        />
      </div>

      <Button type="submit" variant="gradient" className="w-full">
        <Send className="w-4 h-4 mr-2" />
        Send Inquiry
      </Button>
    </form>
  );
}

function safeReadInquiries() {
  try {
    const parsed = JSON.parse(localStorage.getItem("unspoken-exchange-inquiries") || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
