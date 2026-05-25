export type MarketplaceTopic = {
  id: string;
  title: string;
  preview: string;
  category: string;
  answers: number;
  upvotes: number;
  views: number;
  timeAgo: string;
  isHot?: boolean;
};

export type Listing = {
  id: string;
  title: string;
  price: number;
  image: string;
  location: string;
  timeAgo: string;
  category: string;
  description: string;
  condition: string;
  sellerName: string;
  sellerSince: string;
  sellerTrustBadge: string;
  sellerTrustScore: number;
  sellerResponseTime: string;
  safetyNotes: string[];
  isFeatured?: boolean;
};

export type BuyerInquiry = {
  id: string;
  listingId: string;
  listingTitle: string;
  buyerName: string;
  intentLevel: "High" | "Medium" | "Low";
  readyWithin24Hours: boolean;
  offerType: "Listed price" | "Offer";
  offerAmount: number;
  hasTransportation: boolean;
  preferredMeetupTime: string;
  paymentMethod: string;
  message: string;
  submittedAt: string;
};

export const mockQuestions: MarketplaceTopic[] = [
  {
    id: "1",
    title: "How do I tell if a used iPhone listing is priced fairly?",
    preview: "Compare storage size, battery health, carrier lock status, visible damage, and recent sold prices before making an offer.",
    category: "Fair Pricing",
    answers: 28,
    upvotes: 214,
    views: 1189,
    timeAgo: "1h ago",
    isHot: true,
  },
  {
    id: "2",
    title: "What are red flags when a buyer wants to pay outside the agreed method?",
    preview: "Community members discuss suspicious payment links, overpayment scams, fake confirmations, and how to keep payment terms clear.",
    category: "Scam Checks",
    answers: 41,
    upvotes: 302,
    views: 1840,
    timeAgo: "3h ago",
    isHot: true,
  },
  {
    id: "3",
    title: "What should I inspect before buying a used mountain bike?",
    preview: "Check frame cracks, brakes, chain wear, fork condition, wheel trueness, serial number, and whether the seller can explain maintenance history.",
    category: "Inspections",
    answers: 17,
    upvotes: 146,
    views: 776,
    timeAgo: "5h ago",
  },
  {
    id: "4",
    title: "How low is too low when negotiating on a local marketplace item?",
    preview: "A practical thread on respectful offers, market comps, bundling, pickup speed, and when sellers should ignore low-effort messages.",
    category: "Negotiation",
    answers: 52,
    upvotes: 389,
    views: 2260,
    timeAgo: "8h ago",
  },
  {
    id: "5",
    title: "Where should first-time buyers and sellers meet safely?",
    preview: "People share police exchange zones, bank lobbies, well-lit public lots, and simple steps to confirm plans before traveling.",
    category: "Safety",
    answers: 36,
    upvotes: 275,
    views: 1594,
    timeAgo: "12h ago",
  },
  {
    id: "6",
    title: "How can sellers filter serious buyers without sounding rude?",
    preview: "Use direct availability windows, accepted payment methods, firm pricing language, and structured questions before sharing your address.",
    category: "Seller Tips",
    answers: 23,
    upvotes: 198,
    views: 990,
    timeAgo: "1d ago",
  },
];

export const mockListings: Listing[] = [
  {
    id: "1",
    title: "Vintage Mid-Century Modern Armchair",
    price: 450,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    location: "Brooklyn, NY",
    timeAgo: "2h ago",
    category: "Furniture",
    description: "Solid wood frame with original lines and newly cleaned upholstery. Best for a buyer who can inspect and pick up this week.",
    condition: "Very good, light fabric wear",
    sellerName: "Nadia R.",
    sellerSince: "Seller since 2023",
    sellerTrustBadge: "Verified Communicator",
    sellerTrustScore: 94,
    sellerResponseTime: "Usually replies in 20 minutes",
    safetyNotes: ["Inspect fabric seams and frame stability.", "Bring help for pickup.", "Meet in the building lobby before moving the item."],
    isFeatured: true,
  },
  {
    id: "2",
    title: "iPhone 14 Pro - Excellent Condition",
    price: 699,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80",
    location: "Manhattan, NY",
    timeAgo: "5h ago",
    category: "Electronics",
    description: "Unlocked iPhone 14 Pro with 256GB storage, clean IMEI, original box, and charging cable. Battery health listed at 91%.",
    condition: "Excellent, minor case marks",
    sellerName: "Marcus T.",
    sellerSince: "Seller since 2022",
    sellerTrustBadge: "Fast Responder",
    sellerTrustScore: 91,
    sellerResponseTime: "Usually replies in 10 minutes",
    safetyNotes: ["Verify IMEI and carrier unlock before payment.", "Check Face ID, cameras, speakers, and battery health.", "Meet inside a carrier store or public exchange area."],
  },
  {
    id: "3",
    title: "Handmade Ceramic Vase Set",
    price: 85,
    image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800&q=80",
    location: "Queens, NY",
    timeAgo: "8h ago",
    category: "Home Decor",
    description: "Three-piece handmade ceramic vase set. No chips or cracks. Seller can wrap for transport if pickup time is confirmed.",
    condition: "Like new",
    sellerName: "Elena P.",
    sellerSince: "Seller since 2024",
    sellerTrustBadge: "Clear Pickup Terms",
    sellerTrustScore: 88,
    sellerResponseTime: "Usually replies within 1 hour",
    safetyNotes: ["Inspect for hairline cracks in natural light.", "Confirm packing materials before traveling.", "Use a payment method both parties agree to in advance."],
  },
  {
    id: "4",
    title: "Mountain Bike - Giant Talon 2",
    price: 520,
    image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800&q=80",
    location: "Jersey City, NJ",
    timeAgo: "1d ago",
    category: "Sports",
    description: "Giant Talon 2 hardtail mountain bike. Recently tuned, hydraulic brakes, medium frame. Test ride available in a public park.",
    condition: "Good, trail wear on frame",
    sellerName: "Andre L.",
    sellerSince: "Seller since 2021",
    sellerTrustBadge: "Inspection Friendly",
    sellerTrustScore: 96,
    sellerResponseTime: "Usually replies in 15 minutes",
    safetyNotes: ["Check brakes, shifting, suspension, and wheel alignment.", "Ask for serial number if needed.", "Test ride only in a public area."],
    isFeatured: true,
  },
  {
    id: "5",
    title: "Vintage Record Player + Vinyl Collection",
    price: 350,
    image: "https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?w=800&q=80",
    location: "Hoboken, NJ",
    timeAgo: "1d ago",
    category: "Electronics",
    description: "Working vintage record player bundled with 40 records. Buyer can test playback at pickup before payment.",
    condition: "Good, tested working",
    sellerName: "Priya S.",
    sellerSince: "Seller since 2022",
    sellerTrustBadge: "Test Before Pay",
    sellerTrustScore: 89,
    sellerResponseTime: "Usually replies within 45 minutes",
    safetyNotes: ["Test turntable speed and speakers.", "Inspect record condition before agreeing on final price.", "Avoid shipping requests for this listing."],
  },
  {
    id: "6",
    title: "Designer Leather Messenger Bag",
    price: 180,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    location: "Brooklyn, NY",
    timeAgo: "2d ago",
    category: "Fashion",
    description: "Full-grain leather messenger bag with laptop sleeve. Receipt available. Price is firm for same-day pickup.",
    condition: "Very good",
    sellerName: "Cole W.",
    sellerSince: "Seller since 2023",
    sellerTrustBadge: "Price Clarity",
    sellerTrustScore: 86,
    sellerResponseTime: "Usually replies within 2 hours",
    safetyNotes: ["Inspect stitching, zipper, and strap hardware.", "Ask for receipt photo if authenticity matters.", "Confirm pickup time before traveling."],
  },
];

export const mockBuyerInquiries: BuyerInquiry[] = [
  {
    id: "inq-1",
    listingId: "2",
    listingTitle: "iPhone 14 Pro - Excellent Condition",
    buyerName: "Jordan M.",
    intentLevel: "High",
    readyWithin24Hours: true,
    offerType: "Listed price",
    offerAmount: 699,
    hasTransportation: true,
    preferredMeetupTime: "Today after 6:00 PM",
    paymentMethod: "Cash",
    message: "I can meet at the carrier store and check IMEI before paying.",
    submittedAt: "18 minutes ago",
  },
  {
    id: "inq-2",
    listingId: "4",
    listingTitle: "Mountain Bike - Giant Talon 2",
    buyerName: "Samira K.",
    intentLevel: "Medium",
    readyWithin24Hours: false,
    offerType: "Offer",
    offerAmount: 480,
    hasTransportation: true,
    preferredMeetupTime: "Tomorrow morning",
    paymentMethod: "Zelle after inspection",
    message: "Interested if brakes and shifting are smooth during a quick test ride.",
    submittedAt: "1 hour ago",
  },
  {
    id: "inq-3",
    listingId: "1",
    listingTitle: "Vintage Mid-Century Modern Armchair",
    buyerName: "Devon A.",
    intentLevel: "Low",
    readyWithin24Hours: false,
    offerType: "Offer",
    offerAmount: 325,
    hasTransportation: false,
    preferredMeetupTime: "Not sure yet",
    paymentMethod: "Cash",
    message: "Still comparing chairs but wanted to ask whether delivery is possible.",
    submittedAt: "3 hours ago",
  },
];
