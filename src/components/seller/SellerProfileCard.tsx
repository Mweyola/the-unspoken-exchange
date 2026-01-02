import { Star, MapPin, BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SellerProfileCardProps {
  name: string;
  memberSince: string;
  activeListings: number;
  soldItems: number;
  completedTransactions: number;
  avgResponse: string;
  rating: number;
  reviews: number;
  badges: string[];
  location?: string;
  reliabilityScore?: number;
  reliabilityLabel?: string;
}

export const SellerProfileCard = ({
  name,
  memberSince,
  activeListings,
  soldItems,
  completedTransactions,
  avgResponse,
  rating,
  reviews,
  badges,
  location,
  reliabilityScore,
  reliabilityLabel,
}: SellerProfileCardProps) => (
  <Card className="glass-effect border-border">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <BadgeCheck className="w-5 h-5 text-primary" />
        {name}
        <Badge variant="secondary">Member since {memberSince}</Badge>
      </CardTitle>
      <p className="text-sm text-muted-foreground">Seller stats and trust signals</p>
    </CardHeader>
    <CardContent className="space-y-2 text-sm text-muted-foreground">
      {location && (
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
      )}
      {reliabilityScore !== undefined && (
        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            Seller Reliability: {reliabilityScore}/100
            {reliabilityLabel ? ` (${reliabilityLabel})` : ""}
          </Badge>
        </div>
      )}
      <div className="flex flex-wrap gap-3">
        <span>{activeListings} active listings</span>
        <span>•</span>
        <span>{soldItems} sold</span>
        <span>•</span>
        <span>{completedTransactions} completed</span>
      </div>
      <div className="flex items-center gap-2">
        <Star className="w-4 h-4 fill-primary text-primary" />
        <span className="text-foreground">{rating.toFixed(1)}</span>
        <span>({reviews} reviews)</span>
        <span>•</span>
        <span>{avgResponse}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {badges.map((badge) => (
          <Badge key={badge} variant="outline" className="text-[11px]">
            {badge}
          </Badge>
        ))}
      </div>
    </CardContent>
  </Card>
);
