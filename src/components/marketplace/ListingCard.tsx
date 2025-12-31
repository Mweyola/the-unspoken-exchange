import { MapPin, Clock, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ListingCardProps {
  listing: {
    id: string;
    title: string;
    price: number;
    image: string;
    location: string;
    timeAgo: string;
    category: string;
    isFeatured?: boolean;
  };
}

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <article className="group glass-effect rounded-xl overflow-hidden hover-lift cursor-pointer">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={listing.image} 
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
          <span className="text-2xl font-bold text-foreground">${listing.price}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {listing.title}
        </h3>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {listing.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {listing.timeAgo}
          </span>
        </div>
      </div>
    </article>
  );
}
