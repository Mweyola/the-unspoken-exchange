import { MapPin, Clock, Heart, Tag, MessageCircle, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Listing } from "@/data/mockData";
import { Button } from "@/components/ui/button";

interface ListingCardProps {
  listing: Listing;
  onContact?: (listing: Listing) => void;
}

export function ListingCard({ listing, onContact }: ListingCardProps) {
  const primaryPhoto =
    listing.photos?.[0] ||
    "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=1200&q=80";

  const priceLabel = (() => {
    switch (listing.priceType) {
      case "free":
        return "Free";
      case "offer":
        return "Make Offer";
      case "negotiable":
        return listing.price ? `$${listing.price} • Negotiable` : "Negotiable";
      case "fixed":
      default:
        return listing.price ? `$${listing.price}` : "Price on request";
    }
  })();

  return (
    <article className="group glass-effect rounded-xl overflow-hidden hover-lift cursor-pointer">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={primaryPhoto}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

        {listing.isFeatured && (
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
            Featured
          </Badge>
        )}

        <button className="absolute top-3 right-3 p-2 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-colors">
          <Heart className="w-4 h-4 text-foreground" />
        </button>

        <div className="absolute bottom-3 left-3">
          <span className="text-lg font-semibold text-foreground bg-background/70 rounded-full px-3 py-1">
            {priceLabel}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
          {listing.title}
        </h3>

        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="outline" className="text-xs">
            {listing.category}
          </Badge>
          {listing.subcategory && (
            <Badge variant="secondary" className="text-xs">
              {listing.subcategory}
            </Badge>
          )}
          <Badge
            className={`text-xs ${
              listing.availability === "sold"
                ? "bg-destructive/20 text-destructive border-destructive/40"
                : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
            }`}
          >
            {listing.availability === "sold" ? "Sold" : "In Stock"}
          </Badge>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {listing.mapPin ? (
              <a
                href={listing.mapPin}
                className="hover:text-foreground underline-offset-2 hover:underline"
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                rel="noreferrer"
              >
                {listing.locationCity} {listing.locationZip && `• ${listing.locationZip}`}
              </a>
            ) : (
              <>
                {listing.locationCity} {listing.locationZip && `• ${listing.locationZip}`}
              </>
            )}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {listing.timeAgo}
          </span>
        </div>

        {listing.priceType !== "free" && listing.priceType !== "offer" && listing.price && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Tag className="w-3.5 h-3.5" />
            {listing.priceType === "negotiable" ? "Open to offers" : "Fixed price"}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{listing.seller.name}</span>
          <span>•</span>
          <span>Member since {listing.seller.memberSince}</span>
          <span>•</span>
          <span>{listing.seller.activeListings} active</span>
          <span>•</span>
          <span>{listing.seller.completedTransactions} completed</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1 text-foreground">
            <Star className="w-3.5 h-3.5 fill-primary text-primary" />
            {listing.seller.rating.toFixed(1)}
          </span>
          <span>({listing.seller.reviews} reviews)</span>
          <span>•</span>
          <span>{listing.seller.avgResponse}</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="secondary">
            Seller Reliability: {listing.seller.reliabilityScore}/100
            {listing.seller.reliabilityLabel ? ` (${listing.seller.reliabilityLabel})` : ""}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {listing.seller.badges.map((badge) => (
            <Badge key={badge} variant="outline" className="text-[11px]">
              {badge}
            </Badge>
          ))}
        </div>

        {onContact && (
          <div className="pt-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-2"
              onClick={(e) => {
                e.stopPropagation();
                onContact(listing);
              }}
            >
              <MessageCircle className="w-4 h-4" />
              Message Seller
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}
