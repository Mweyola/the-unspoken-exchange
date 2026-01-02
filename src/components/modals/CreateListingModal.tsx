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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ShoppingBag, Loader2 } from "lucide-react";

const priceTypes = ["fixed", "negotiable", "free", "offer"] as const;
type PriceType = (typeof priceTypes)[number];

const listingSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(5, "Title must be at least 5 characters")
      .max(100, "Title must be less than 100 characters"),
    description: z
      .string()
      .trim()
      .min(10, "Please provide more details (at least 10 characters)")
      .max(1000, "Description must be less than 1000 characters"),
    priceType: z.enum(priceTypes),
    price: z.string().trim().optional(),
    category: z.string().min(1, "Please select a category"),
    subcategory: z.string().trim().max(80, "Subcategory must be under 80 characters").optional(),
    locationCity: z
      .string()
      .trim()
      .min(2, "City must be at least 2 characters")
      .max(100, "City must be less than 100 characters"),
    locationZip: z
      .string()
      .trim()
      .min(3, "ZIP must be at least 3 characters")
      .max(10, "ZIP must be less than 10 characters"),
    mapPin: z
      .string()
      .trim()
      .url("Please enter a valid map link")
      .optional()
      .or(z.literal("")),
    availability: z.enum(["in_stock", "sold"]),
    photosText: z
      .string()
      .trim()
      .min(1, "Add at least one photo URL")
      .refine((value) => value.split(/\s+/).filter(Boolean).length <= 10, { message: "Up to 10 photos" })
      .refine((value) => {
        const arr = value.split(/\s+/).filter(Boolean);
        return arr.every((url) => {
          try { new URL(url); return true; } catch { return false; }
        });
      }, { message: "Each photo must be a valid URL" }),
    allowOffers: z.boolean().default(false),
  })
  .superRefine((data, ctx) => {
    if (data.priceType === "fixed" || data.priceType === "negotiable") {
      const num = Number(data.price);
      if (!data.price || Number.isNaN(num) || num <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Price must be a positive number",
          path: ["price"],
        });
      } else if (num > 100000) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Price must be less than $100,000",
          path: ["price"],
        });
      }
    }
  });

type ListingFormData = z.infer<typeof listingSchema>;

const categories = [
  "Furniture",
  "Electronics",
  "Home Decor",
  "Sports",
  "Fashion",
  "Books",
  "Vehicles",
  "Other",
];

interface CreateListingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateListingModal({ open, onOpenChange }: CreateListingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ListingFormData>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      priceType: "fixed",
      category: "",
      subcategory: "",
      locationCity: "",
      locationZip: "",
      mapPin: "",
      availability: "in_stock",
      photosText: "",
      allowOffers: false,
    },
  });

  const selectedCategory = watch("category");
  const priceType = watch("priceType");
  const photosValue = watch("photosText");

  const onSubmit = async (data: ListingFormData) => {
    setIsSubmitting(true);
    const photos = data.photosText.split(/\s+/).filter(Boolean);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Listing created!",
      description: `Your item is live${photos.length ? ` with ${photos.length} photo${photos.length > 1 ? "s" : ""}` : ""}.`,
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
      <DialogContent className="sm:max-w-[550px] bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-primary-foreground" />
            </div>
            Create Listing
          </DialogTitle>
          <DialogDescription>
            List something to sell in the community marketplace.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="listing-title">Item Title</Label>
            <Input
              id="listing-title"
              placeholder="What are you selling?"
              className="bg-background border-border/50"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Price Type</Label>
              <Select
                value={priceType}
                onValueChange={(value) => setValue("priceType", value as PriceType)}
              >
                <SelectTrigger className="bg-background border-border/50">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="fixed">Fixed</SelectItem>
                  <SelectItem value="negotiable">Negotiable</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="offer">Make Offer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                placeholder={priceType === "free" ? "0.00 (disabled for Free)" : "0.00"}
                className="bg-background border-border/50"
                disabled={priceType === "free" || priceType === "offer"}
                {...register("price")}
              />
              {errors.price && (
                <p className="text-sm text-destructive">{errors.price.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={selectedCategory}
                onValueChange={(value) => setValue("category", value)}
              >
                <SelectTrigger className="bg-background border-border/50">
                  <SelectValue placeholder="Select" />
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

            <div className="space-y-2">
              <Label htmlFor="subcategory">Subcategory (optional)</Label>
              <Input
                id="subcategory"
                placeholder="e.g. Phones, Seating, Cycling"
                className="bg-background border-border/50"
                {...register("subcategory")}
              />
              {errors.subcategory && (
                <p className="text-sm text-destructive">{errors.subcategory.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="locationCity">City</Label>
              <Input
                id="locationCity"
                placeholder="City, State"
                className="bg-background border-border/50"
                {...register("locationCity")}
              />
              {errors.locationCity && (
                <p className="text-sm text-destructive">{errors.locationCity.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="locationZip">ZIP / Postal</Label>
              <Input
                id="locationZip"
                placeholder="ZIP"
                className="bg-background border-border/50"
                {...register("locationZip")}
              />
              {errors.locationZip && (
                <p className="text-sm text-destructive">{errors.locationZip.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mapPin">Map pin / link (optional)</Label>
            <Input
              id="mapPin"
              placeholder="https://maps.google.com/?q=..."
              className="bg-background border-border/50"
              {...register("mapPin")}
            />
            {errors.mapPin && (
              <p className="text-sm text-destructive">{errors.mapPin.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your item, condition, and any other relevant details..."
              className="min-h-[100px] bg-background border-border/50 resize-none"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="photos">Photo URLs (one per line, up to 10)</Label>
            <Textarea
              id="photos"
              placeholder="https://.../photo1.jpg&#10;https://.../photo2.jpg"
              className="min-h-[120px] bg-background border-border/50 resize-none"
              {...register("photosText")}
            />
            {errors.photosText && (
              <p className="text-sm text-destructive">{errors.photosText.message as string}</p>
            )}
            {!errors.photosText && photosValue && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {photosValue
                  .split(/\s+/)
                  .filter(Boolean)
                  .slice(0, 3)
                  .map((url, idx) => (
                    <div
                      key={idx}
                      className="relative w-full h-20 rounded-lg overflow-hidden border border-border/50"
                    >
                      <img
                        src={url}
                        alt={`Preview ${idx + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  ))}
              </div>
            )}
            <div className="flex items-center gap-2 pt-2">
              <Input
                id="file-upload"
                type="file"
                accept="image/*"
                multiple
                className="bg-background border-border/50"
                onChange={async (e) => {
                  const files = Array.from(e.target.files || []);
                  if (!files.length) return;
                  setUploading(true);
                  // TODO: integrate HostGator upload endpoint here
                  // For now, we create object URLs as a placeholder.
                  const urls = files.map((file) => URL.createObjectURL(file));
                  const existing = photosValue ? photosValue.split(/\s+/).filter(Boolean) : [];
                  const combined = [...existing, ...urls].slice(0, 10);
                  setValue("photosText", combined.join("\n"));
                  setUploading(false);
                  toast({
                    title: "Photos staged",
                    description: "Images added locally. Replace with HostGator upload URLs in production.",
                  });
                }}
              />
              <Button type="button" variant="outline" disabled>
                {uploading ? "Uploading..." : "Upload to HostGator"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              HostGator integration: replace placeholder upload with a backend endpoint that stores files and returns URLs.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Availability</Label>
              <Select
                value={watch("availability")}
                onValueChange={(value) => setValue("availability", value as "in_stock" | "sold")}
              >
                <SelectTrigger className="bg-background border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="in_stock">In Stock</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Checkbox
                  checked={watch("allowOffers")}
                  onCheckedChange={(checked) => setValue("allowOffers", !!checked)}
                />
                Accept offers / negotiation
              </Label>
              <p className="text-sm text-muted-foreground">
                Let buyers know you are open to offers even for fixed price items.
              </p>
            </div>
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
                  Creating...
                </>
              ) : (
                "Create Listing"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
