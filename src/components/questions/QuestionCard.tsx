import { MessageCircle, ArrowUp, Eye, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MarketplaceTopic } from "@/data/mockData";

interface QuestionCardProps {
  question: MarketplaceTopic;
}

const categoryColors: Record<string, string> = {
  Safety: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Fair Pricing": "bg-green-500/20 text-green-400 border-green-500/30",
  "Scam Checks": "bg-red-500/20 text-red-400 border-red-500/30",
  Inspections: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Negotiation: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "Seller Tips": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
};

export function QuestionCard({ question }: QuestionCardProps) {
  return (
    <article className="group glass-effect rounded-xl p-5 hover-lift cursor-pointer">
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center gap-1 pt-1">
          <button className="p-1.5 rounded-lg hover:bg-primary/20 transition-colors group/vote" aria-label="Upvote thread">
            <ArrowUp className="w-5 h-5 text-muted-foreground group-hover/vote:text-primary transition-colors" />
          </button>
          <span className="text-sm font-medium text-foreground">{question.upvotes}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Badge
              variant="outline"
              className={`text-xs ${categoryColors[question.category] || "bg-secondary text-secondary-foreground"}`}
            >
              {question.category}
            </Badge>
            {question.isHot && (
              <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                Active Thread
              </Badge>
            )}
          </div>

          <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {question.title}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {question.preview}
          </p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5" />
              {question.answers} replies
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {question.views}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {question.timeAgo}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
