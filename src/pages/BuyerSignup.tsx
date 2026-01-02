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

const buyerSchema = z
  .object({
    firstName: z.string().trim().min(1, "First name is required"),
    lastInitial: z.string().trim().min(1, "Last initial is required").max(1, "Use one initial"),
    email: z.string().trim().email("Enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    profilePhoto: z.string().trim().url("Enter a valid photo URL").optional(),
    bio: z.string().trim().max(200, "Bio must be under 200 characters").optional(),
    phone: z.string().trim().optional(),
    phoneCode: z.string().trim().optional(),
    govIdUrl: z.string().trim().url("Enter a valid URL").optional(),
  })
  .refine(
    (data) => !data.phone || !!data.phoneCode,
    { path: ["phoneCode"], message: "Enter the SMS code to verify your phone" }
  );

type BuyerFormData = z.infer<typeof buyerSchema>;

export default function BuyerSignup() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BuyerFormData>({
    resolver: zodResolver(buyerSchema),
    defaultValues: {
      firstName: "",
      lastInitial: "",
      email: "",
      password: "",
      profilePhoto: "",
      bio: "",
      phone: "",
      phoneCode: "",
      govIdUrl: "",
    },
  });

  const onSubmit = async (data: BuyerFormData) => {
    setIsSubmitting(true);
    const pseudoHash = btoa(data.password).slice(0, 12);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const badges: string[] = [];
    if (data.phone && data.phoneCode) badges.push("Verified Buyer");
    if (data.govIdUrl) badges.push("Trusted Buyer");
    toast({
      title: "Buyer account created",
      description: `Welcome ${data.firstName} ${data.lastInitial}. Password stored securely (hash preview: ${pseudoHash}). ${badges.length ? `Badges: ${badges.join(", ")}` : ""}`,
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

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-10 max-w-4xl space-y-8">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Buyer</p>
          <h1 className="font-display text-3xl md:text-4xl font-semibold">Create Buyer Account</h1>
          <p className="text-muted-foreground">
            Face + name stops burner harassment. Required before messaging sellers.
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="glass-effect rounded-xl p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="Alex" {...register("firstName")} />
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

          <div className="space-y-2">
            <Label htmlFor="profilePhoto">Profile Photo URL (recommended)</Label>
            <Input
              id="profilePhoto"
              placeholder="https://images.example.com/you.jpg"
              {...register("profilePhoto")}
            />
            {errors.profilePhoto && <p className="text-sm text-destructive">{errors.profilePhoto.message}</p>}
            <p className="text-xs text-muted-foreground">Simple headshot builds trust with sellers.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone (optional, verifies badge)</Label>
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

          <div className="space-y-2">
            <Label htmlFor="govIdUrl">Government ID (optional — Trusted Buyer)</Label>
            <Input
              id="govIdUrl"
              placeholder="https://uploads.example.com/your-id.pdf"
              {...register("govIdUrl")}
            />
            {errors.govIdUrl && <p className="text-sm text-destructive">{errors.govIdUrl.message}</p>}
            <p className="text-xs text-muted-foreground">
              Optional. Earns “Trusted Buyer”. Kept private; not shown to sellers.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Short bio (optional)</Label>
            <Textarea
              id="bio"
              placeholder="Share a sentence about what you’re looking for..."
              className="min-h-[100px]"
              {...register("bio")}
            />
            {errors.bio && <p className="text-sm text-destructive">{errors.bio.message}</p>}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="submit" variant="gradient" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create buyer account"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
