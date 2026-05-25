import { Button } from "@/components/ui/button";
import { BadgeDollarSign, Handshake, SearchCheck, ShieldAlert, ShieldCheck, Sparkles, Store } from "lucide-react";

const categories = [
  { name: "All", icon: Sparkles, active: true },
  { name: "Safety", icon: ShieldCheck },
  { name: "Fair Pricing", icon: BadgeDollarSign },
  { name: "Scam Checks", icon: ShieldAlert },
  { name: "Inspections", icon: SearchCheck },
  { name: "Negotiation", icon: Handshake },
  { name: "Seller Tips", icon: Store },
];

interface CategoryFilterProps {
  selected: string;
  onSelect: (category: string) => void;
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => {
        const Icon = category.icon;
        const isActive = selected === category.name;
        
        return (
          <Button
            key={category.name}
            variant={isActive ? "secondary" : "ghost"}
            size="sm"
            onClick={() => onSelect(category.name)}
            className={`flex-shrink-0 ${isActive ? "bg-primary/20 text-primary border border-primary/30" : ""}`}
          >
            <Icon className="w-4 h-4 mr-1.5" />
            {category.name}
          </Button>
        );
      })}
    </div>
  );
}
