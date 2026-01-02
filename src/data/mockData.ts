export const mockQuestions = [
  {
    id: "1",
    title: "Is it weird that I've never been in a relationship at 28?",
    preview: "I see all my friends getting married and having kids, and I'm still here wondering if there's something wrong with me. I've dated, but nothing ever stuck...",
    category: "Dating",
    answers: 47,
    upvotes: 234,
    views: 1289,
    timeAgo: "2h ago",
    isHot: true,
  },
  {
    id: "2", 
    title: "Why do people from different cultures have such different concepts of personal space?",
    preview: "I recently moved to a new country and I notice people stand much closer when talking. Is this cultural or am I overthinking it?",
    category: "Culture",
    answers: 32,
    upvotes: 156,
    views: 892,
    timeAgo: "4h ago",
  },
  {
    id: "3",
    title: "How much money should I really have saved by 30?",
    preview: "I keep seeing these articles saying I should have 1x my salary saved, but that seems impossible with student loans and rent. What's realistic?",
    category: "Money",
    answers: 89,
    upvotes: 412,
    views: 3421,
    timeAgo: "6h ago",
    isHot: true,
  },
  {
    id: "4",
    title: "Is it normal to not want kids even though everyone expects you to?",
    preview: "My family keeps asking when I'm having children. I genuinely don't want them, but I feel guilty about it. Does anyone else feel this way?",
    category: "Life",
    answers: 124,
    upvotes: 567,
    views: 4532,
    timeAgo: "8h ago",
  },
  {
    id: "5",
    title: "How do I tell my parents I'm changing careers without disappointing them?",
    preview: "They sacrificed so much for my education and now I want to leave my stable job to pursue something completely different...",
    category: "Career",
    answers: 56,
    upvotes: 289,
    views: 2134,
    timeAgo: "12h ago",
  },
  {
    id: "6",
    title: "Why do I feel lonely even when I'm surrounded by people?",
    preview: "I have friends, a good social life, but sometimes I feel like no one really knows me. Is this depression or just being human?",
    category: "Health",
    answers: 78,
    upvotes: 445,
    views: 3876,
    timeAgo: "1d ago",
    isHot: true,
  },
  {
    id: "7",
    title: "Is it okay to cut off family members who are toxic?",
    preview: "My parents are emotionally draining and every interaction leaves me feeling terrible. But they're my parents...",
    category: "Relationships",
    answers: 91,
    upvotes: 523,
    views: 4123,
    timeAgo: "1d ago",
  },
  {
    id: "8",
    title: "How do you deal with imposter syndrome at work?",
    preview: "I just got promoted but I feel like I don't deserve it and everyone will find out I'm a fraud. How do successful people deal with this?",
    category: "Career",
    answers: 67,
    upvotes: 378,
    views: 2876,
    timeAgo: "2d ago",
  },
];

export type Answer = {
  id: string;
  author: string;
  timeAgo: string;
  upvotes: number;
  content: string;
};

export const mockAnswers: Record<string, Answer[]> = {
  "1": [
    {
      id: "a1",
      author: "AnonTherapist",
      timeAgo: "1h ago",
      upvotes: 64,
      content: "It is not weird. Relationship timelines are not milestones. Focus on values, not age. Therapy helps unpack the 'something wrong with me' feeling.",
    },
    {
      id: "a2",
      author: "LateBloomer",
      timeAgo: "30m ago",
      upvotes: 28,
      content: "I did not date seriously until 31. Took pressure off, joined hobby groups, and things clicked when I was not desperate to fit a timeline.",
    },
  ],
  "2": [
    {
      id: "a3",
      author: "CrossCulture",
      timeAgo: "2h ago",
      upvotes: 41,
      content: "Yes, it is cultural. Some regions prefer closer distance; others value more space. Ask locals what is normal and mirror their cues.",
    },
  ],
  "3": [
    {
      id: "a4",
      author: "MoneyCoach",
      timeAgo: "4h ago",
      upvotes: 52,
      content: "Benchmarks are guidelines. Aim for emergency fund first (3-6 months expenses). Saving anything consistent matters more than hitting 1x exactly.",
    },
  ],
  "4": [
    {
      id: "a5",
      author: "Childfree35",
      timeAgo: "5h ago",
      upvotes: 61,
      content: "Plenty of people do not want kids. You are allowed to choose. Boundaries + concise responses help with repeated questions.",
    },
  ],
  "5": [
    {
      id: "a6",
      author: "CareerSwitch",
      timeAgo: "8h ago",
      upvotes: 33,
      content: "Lead with your why and your plan. Show you have a runway, budget, and milestones. They may still worry, but you have done your homework.",
    },
  ],
  "6": [
    {
      id: "a7",
      author: "PsychStudent",
      timeAgo: "1d ago",
      upvotes: 47,
      content: "Loneliness around people can be about lack of emotional intimacy. Consider opening up to one trusted person and exploring therapy if it persists.",
    },
  ],
  "7": [
    {
      id: "a8",
      author: "Boundaries101",
      timeAgo: "1d ago",
      upvotes: 72,
      content: "It can be okay. You can choose limited or no contact to protect your mental health. You do not owe access to people who consistently harm you.",
    },
  ],
  "8": [
    {
      id: "a9",
      author: "MentorMike",
      timeAgo: "2d ago",
      upvotes: 54,
      content: "List your wins, ask for feedback, and pair with someone you trust for reality checks. Imposter feelings shrink when you measure outcomes.",
    },
  ],
};

export type Listing = {
  id: string;
  title: string;
  description?: string;
  price?: number;
  priceType: "fixed" | "negotiable" | "free" | "offer";
  photos: string[];
  locationCity: string;
  locationZip: string;
  mapPin?: string;
  timeAgo: string;
  category: string;
  subcategory?: string;
  availability: "in_stock" | "sold";
  isFeatured?: boolean;
  seller: {
    name: string;
    memberSince: string;
    activeListings: number;
    soldItems: number;
    completedTransactions: number;
    avgResponse: string;
    rating: number;
    reviews: number;
    badges: string[];
    reliabilityScore: number;
    reliabilityLabel?: string;
  };
};

export const mockListings: Listing[] = [
  {
    id: "1",
    title: "Vintage Mid-Century Modern Armchair",
    description: "Walnut frame, charcoal upholstery, minor wear on legs. Smoke-free home.",
    price: 450,
    priceType: "negotiable",
    photos: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=1200&q=80",
    ],
    locationCity: "Brooklyn, NY",
    locationZip: "11211",
    mapPin: "https://maps.google.com/?q=Brooklyn+NY+11211",
    timeAgo: "2h ago",
    category: "Furniture",
    subcategory: "Seating",
    availability: "in_stock",
    isFeatured: true,
    seller: {
      name: "Elena R.",
      memberSince: "2022",
      activeListings: 5,
      soldItems: 42,
    completedTransactions: 55,
    avgResponse: "Usually replies within 1 hour",
    rating: 4.9,
    reviews: 61,
    badges: ["Verified Phone", "Trusted Seller", "Top Seller", "Fast Responder"],
    reliabilityScore: 92,
    reliabilityLabel: "Excellent",
  },
  },
  {
    id: "2",
    title: "iPhone 14 Pro - Excellent Condition",
    description: "128GB, Deep Purple, battery health 94%. Comes with box and cable.",
    price: 699,
    priceType: "fixed",
    photos: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=1200&q=80",
      "https://images.unsplash.com/photo-1480694313141-fce5e697ee25?w=1200&q=80",
    ],
    locationCity: "Manhattan, NY",
    locationZip: "10001",
    mapPin: "https://maps.google.com/?q=Manhattan+NY+10001",
    timeAgo: "5h ago",
    category: "Electronics",
    subcategory: "Phones",
    availability: "in_stock",
    seller: {
      name: "Marcus L.",
      memberSince: "2023",
      activeListings: 3,
      soldItems: 18,
    completedTransactions: 20,
    avgResponse: "Replies within 2 hours",
    rating: 4.7,
    reviews: 24,
    badges: ["Verified Phone", "Fast Responder"],
    reliabilityScore: 88,
    reliabilityLabel: "Great",
  },
  },
  {
    id: "3",
    title: "Handmade Ceramic Vase Set",
    description: "Set of 3, matte white finish, watertight and dishwasher safe.",
    price: 85,
    priceType: "fixed",
    photos: [
      "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=1200&q=80",
    ],
    locationCity: "Queens, NY",
    locationZip: "11101",
    mapPin: "https://maps.google.com/?q=Queens+NY+11101",
    timeAgo: "8h ago",
    category: "Home Decor",
    subcategory: "Vases",
    availability: "in_stock",
    seller: {
      name: "Ana P.",
      memberSince: "2021",
      activeListings: 4,
      soldItems: 30,
    completedTransactions: 34,
    avgResponse: "Usually replies within 1 hour",
    rating: 4.8,
    reviews: 40,
    badges: ["Verified Phone", "Trusted Seller", "Fast Responder"],
    reliabilityScore: 90,
    reliabilityLabel: "Excellent",
  },
  },
  {
    id: "4",
    title: "Mountain Bike - Giant Talon 2",
    description: "Medium frame, hydraulic disc brakes, recently tuned. Local pickup only.",
    price: 520,
    priceType: "offer",
    photos: [
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=1200&q=80",
    ],
    locationCity: "Jersey City, NJ",
    locationZip: "07302",
    mapPin: "https://maps.google.com/?q=Jersey+City+NJ+07302",
    timeAgo: "1d ago",
    category: "Sports",
    subcategory: "Cycling",
    availability: "in_stock",
    isFeatured: true,
    seller: {
      name: "Devon K.",
      memberSince: "2020",
      activeListings: 2,
      soldItems: 64,
    completedTransactions: 70,
    avgResponse: "Replies within 3 hours",
    rating: 4.6,
    reviews: 88,
    badges: ["Verified Phone", "Top Seller"],
    reliabilityScore: 85,
    reliabilityLabel: "Good",
  },
  },
  {
    id: "5",
    title: "Vintage Record Player + Vinyl Collection",
    description: "Turntable + 20 classic rock vinyls. Player needs new stylus.",
    price: 350,
    priceType: "negotiable",
    photos: [
      "https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?w=1200&q=80",
    ],
    locationCity: "Hoboken, NJ",
    locationZip: "07030",
    mapPin: "https://maps.google.com/?q=Hoboken+NJ+07030",
    timeAgo: "1d ago",
    category: "Electronics",
    subcategory: "Audio",
    availability: "in_stock",
    seller: {
      name: "Priya T.",
      memberSince: "2022",
      activeListings: 6,
      soldItems: 51,
      completedTransactions: 59,
      avgResponse: "Usually replies within 1 hour",
      rating: 4.9,
      reviews: 72,
      badges: ["Verified Phone", "Trusted Seller", "Top Seller", "Fast Responder"],
      reliabilityScore: 94,
      reliabilityLabel: "Excellent",
    },
  },
  {
    id: "6",
    title: "Designer Leather Messenger Bag",
    description: "Full-grain leather, fits 14\" laptop. Minor scratch on flap.",
    price: 180,
    priceType: "free",
    photos: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&q=80",
    ],
    locationCity: "Brooklyn, NY",
    locationZip: "11238",
    mapPin: "https://maps.google.com/?q=Brooklyn+NY+11238",
    timeAgo: "2d ago",
    category: "Fashion",
    subcategory: "Bags",
    availability: "sold",
    seller: {
      name: "Luis M.",
      memberSince: "2023",
      activeListings: 1,
      soldItems: 9,
      completedTransactions: 11,
      avgResponse: "Replies within 1 day",
      rating: 4.3,
      reviews: 12,
      badges: ["Verified Phone"],
      reliabilityScore: 78,
      reliabilityLabel: "Fair",
    },
  },
];
