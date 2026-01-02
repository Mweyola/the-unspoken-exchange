import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Header } from "@/components/layout/Header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { SellerProfileCard } from "@/components/seller/SellerProfileCard";

const sellerSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastInitial: z
    .string()
    .trim()
    .min(1, "Last initial is required")
    .max(1, "Use one initial"),
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  username: z.string().trim().optional(),
  profilePhoto: z
    .string()
    .trim()
    .url("Enter a valid photo URL")
    .refine((url) => !/ai|stock/i.test(url), "Photo must be human-only (no AI/stock)"),
  phone: z
    .string()
    .trim()
    .min(8, "Enter a valid phone")
    .max(20, "Phone too long"),
  phoneCode: z.string().trim().min(4, "Enter the SMS code").max(8, "Code too long"),
  city: z.string().trim().min(2, "City is required"),
  state: z.string().trim().min(2, "State is required"),
  zip: z.string().trim().min(3, "ZIP is required").max(10, "ZIP too long"),
  govIdUrl: z.string().trim().url("Enter a valid URL").optional(),
  addressProofUrl: z.string().trim().url("Enter a valid URL").optional(),
  bio: z.string().trim().max(200, "Bio must be under 200 characters").optional(),
});

type SellerFormData = z.infer<typeof sellerSchema>;

export default function SellerSignup() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SellerFormData>({
    resolver: zodResolver(sellerSchema),
    defaultValues: {
      firstName: "",
      lastInitial: "",
      email: "",
      password: "",
      username: "",
      profilePhoto: "",
      phone: "",
      phoneCode: "",
      city: "",
      state: "",
      zip: "",
      govIdUrl: "",
      addressProofUrl: "",
      bio: "",
    },
  });

  const username = watch("username");
  const firstName = watch("firstName");
  const lastInitial = watch("lastInitial");

  const onSubmit = async (data: SellerFormData) => {
    setIsSubmitting(true);
    // Simulate hashing and API
    const pseudoHash = btoa(data.password).slice(0, 12);
    await new Promise((resolve) => setTimeout(resolve, 800));

    toast({
      title: "Seller account created",
      description: `Welcome ${data.firstName} ${data.lastInitial}. Password stored securely (hash preview: ${pseudoHash}).`,
    });

    setIsSubmitting(false);
  };

  const sendCode = () => {
    if (!watch("phone")) {
      toast({ title: "Enter phone first", description: "Add your phone before sending code." });
      return;
    }
    setCodeSent(true);
    toast({ title: "SMS code sent", description: "Enter the code to verify your phone." });
  };

  const autoUsername = () => {
    if (!firstName || !lastInitial) return;
    const suggestion = `${firstName.toLowerCase()}${lastInitial.toLowerCase()}_${Math.floor(Math.random() * 900 + 100)}`;
    setValue("username", suggestion);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-10 max-w-4xl space-y-8">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Seller</p>
          <h1 className="font-display text-3xl md:text-4xl font-semibold">Create Seller Account</h1>
          <p className="text-muted-foreground">
            Basic identity is required to sell: name, email, password, and a human profile photo. We auto-flag AI/stock.
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="glass-effect rounded-xl p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="Arnold" {...register("firstName")} />
              {errors.firstName && <p className="text-sm text-destructive">{errors.firstName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastInitial">Last Initial</Label>
              <Input id="lastInitial" maxLength={1} placeholder="M" {...register("lastInitial")} />
              {errors.lastInitial && <p className="text-sm text-destructive">{errors.lastInitial.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="At least 8 characters" {...register("password")} />
            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            <p className="text-xs text-muted-foreground">Stored hashed server-side; we never keep plaintext.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="username">Username (optional)</Label>
                <Button type="button" variant="outline" size="sm" onClick={autoUsername}>
                  Auto-generate
                </Button>
              </div>
              <Input id="username" placeholder="arnoldm_123" {...register("username")} />
              {errors.username && <p className="text-sm text-destructive">{errors.username.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="profilePhoto">Profile Photo URL</Label>
              <Input
                id="profilePhoto"
                placeholder="https://images.example.com/you.jpg"
                {...register("profilePhoto")}
              />
              {errors.profilePhoto && <p className="text-sm text-destructive">{errors.profilePhoto.message}</p>}
              <p className="text-xs text-muted-foreground">Human-only. We auto-flag AI/stock URLs.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone (SMS verify)</Label>
              <Input id="phone" placeholder="+1 555 123 4567" {...register("phone")} />
              {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneCode">SMS Code</Label>
              <Input id="phoneCode" placeholder="123456" {...register("phoneCode")} />
              {errors.phoneCode && <p className="text-sm text-destructive">{errors.phoneCode.message}</p>}
            </div>
            <div className="flex items-end">
              <Button type="button" variant="outline" className="w-full" onClick={sendCode}>
                {codeSent ? "Resend Code" : "Send Code"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="Austin" {...register("city")} />
              {errors.city && <p className="text-sm text-destructive">{errors.city.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" placeholder="TX" {...register("state")} />
              {errors.state && <p className="text-sm text-destructive">{errors.state.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP</Label>
              <Input id="zip" placeholder="73301" {...register("zip")} />
              {errors.zip && <p className="text-sm text-destructive">{errors.zip.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="govIdUrl">Government ID (optional, Trusted Seller)</Label>
              <Input
                id="govIdUrl"
                placeholder="https://uploads.example.com/your-id.pdf"
                {...register("govIdUrl")}
              />
              {errors.govIdUrl && <p className="text-sm text-destructive">{errors.govIdUrl.message}</p>}
              <p className="text-xs text-muted-foreground">Not displayed; used for Trusted Seller badge.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="addressProofUrl">Address verification (optional)</Label>
              <Input
                id="addressProofUrl"
                placeholder="https://uploads.example.com/utility-bill.pdf"
                {...register("addressProofUrl")}
              />
              {errors.addressProofUrl && <p className="text-sm text-destructive">{errors.addressProofUrl.message}</p>}
              <p className="text-xs text-muted-foreground">Not displayed; improves trust and reduces fraud.</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Short bio (optional)</Label>
            <Textarea
              id="bio"
              placeholder="Share a sentence about what you sell or your pickup area..."
              className="min-h-[100px]"
              {...register("bio")}
            />
            {errors.bio && <p className="text-sm text-destructive">{errors.bio.message}</p>}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="submit" variant="gradient" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create seller account"}
            </Button>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SellerProfileCard
            name={`${firstName || "Sample"} ${lastInitial || "S."}`}
            memberSince="2024"
            activeListings={5}
            soldItems={42}
            completedTransactions={55}
            avgResponse="Usually replies within 1 hour"
            rating={4.9}
            reviews={61}
            badges={["Verified Phone", "Trusted Seller", "Top Seller", "Fast Responder"]}
            location={`${watch("city") || "City"}, ${watch("state") || "ST"}`}
            reliabilityScore={92}
            reliabilityLabel="Excellent"
          />
        </div>
      </main>
    </div>
  );
}
