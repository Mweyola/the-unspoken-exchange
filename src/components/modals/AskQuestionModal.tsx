import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { MessageCircleQuestion, Loader2 } from "lucide-react";

const questionSchema = z.object({
  title: z
    .string()
    .trim()
    .min(10, "Title must be at least 10 characters")
    .max(200, "Title must be less than 200 characters"),
  details: z
    .string()
    .trim()
    .min(20, "Please provide more details (at least 20 characters)")
    .max(2000, "Details must be less than 2000 characters"),
  category: z.string().min(1, "Please select a category"),
});

type QuestionFormData = z.infer<typeof questionSchema>;

const categories = [
  "Safety",
  "Fair Pricing",
  "Scam Checks",
  "Inspections",
  "Negotiation",
  "Seller Tips",
];

interface AskQuestionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AskQuestionModal({ open, onOpenChange }: AskQuestionModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: "",
      details: "",
      category: "",
    },
  });

  const selectedCategory = watch("category");

  const onSubmit = async (data: QuestionFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Community question posted",
      description: "Your marketplace intelligence thread is ready for replies.",
    });
    
    reset();
    onOpenChange(false);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[550px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <MessageCircleQuestion className="w-5 h-5 text-primary-foreground" />
            </div>
            Ask the Community
          </DialogTitle>
          <DialogDescription>
            Get practical advice on pricing, safety, scams, inspections, or negotiation.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-2">
          <div className="space-y-2">
            <Label htmlFor="title">Marketplace Question</Label>
            <Input
              id="title"
              placeholder="What should buyers or sellers know?"
              className="bg-background border-border/50"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="details">More Details</Label>
            <Textarea
              id="details"
              placeholder="Share listing details, price, condition, red flags, or negotiation context..."
              className="min-h-[120px] bg-background border-border/50 resize-none"
              {...register("details")}
            />
            {errors.details && (
              <p className="text-sm text-destructive">{errors.details.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              value={selectedCategory}
              onValueChange={(value) => setValue("category", value)}
            >
              <SelectTrigger className="bg-background border-border/50">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-destructive">{errors.category.message}</p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="gradient"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Posting...
                </>
              ) : (
                "Post Community Question"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
