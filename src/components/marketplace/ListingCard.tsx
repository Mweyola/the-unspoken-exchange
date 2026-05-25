import { Link } from "react-router-dom";
import { BadgeCheck, MapPin, MessageCircleQuestion, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Listing } from "@/data/mockData";

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <article className="group glass-effect rounded-xl overflow-hidden hover-lift">
      <Link to={`/listing/${listing.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={listing.image}
            alt={listing.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/85 to-transparent" />

          {listing.isFeatured && (
            <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
              Featured
            </Badge>
          )}

          <div className="absolute bottom-3 left-3">
            <span className="text-2xl font-bold text-foreground">${listing.price}</span>
          </div>
        </div>
      </Link>

      <div className="p-4 space-y-4">
        <div>
          <div className="flex items-center justify-between gap-3 mb-2">
            <Badge variant="outline" className="bg-secondary/60 text-secondary-foreground">
              {listing.category}
            </Badge>
            <span className="text-xs text-muted-foreground">{listing.timeAgo}</span>
          </div>

          <Link to={`/listing/${listing.id}`}>
            <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {listing.title}
            </h3>
          </Link>
        </div>

        <div className="space-y-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            {listing.location}
          </span>
          <span className="flex items-center gap-1.5 text-primary">
            <BadgeCheck className="w-3.5 h-3.5" />
            {listing.sellerTrustBadge} · {listing.sellerTrustScore}% trust
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          <Button asChild variant="gradient" size="sm">
            <Link to={`/listing/${listing.id}`}>
              <ShieldCheck className="w-4 h-4 mr-1" />
              Serious Buyer Inquiry
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to="/search">
              <MessageCircleQuestion className="w-4 h-4 mr-1" />
              Ask Community
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
