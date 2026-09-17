export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  eyebrow: string;
  subtitle: string;
  description: string;
  icon: string;
  businessOutcome: string;
  capabilities: string[];
  technologies: string[];
  faqs: { question: string; answer: string }[];
  orderIndex: number;
}

export interface IndustryItem {
  id: string;
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  keyChallenges: string[];
  transformationTrends: string[];
  capabilities: string[];
  orderIndex: number;
}

export interface CaseStudyItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  technologies: string[];
  results: string[];
  metrics: { label: string; value: string }[];
  testimonial?: { quote: string; author: string; role: string };
  imageUrl: string;
  orderIndex: number;
}

export interface BlogItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  authorName: string;
  authorRole: string;
  category: string;
  tags: string[];
  readingTime: string;
  publishedAt: string;
  featuredImage: string;
}

export interface PodcastItem {
  id: string;
  title: string;
  description: string;
  guestName: string;
  guestCompany: string;
  guestPhoto?: string;
  hostName: string;
  duration: string;
  audioUrl?: string;
  youtubeUrl?: string;
  spotifyUrl?: string;
  publishedAt: string;
}

export interface CareerItem {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  experienceLevel: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  designation: string;
  company: string;
  quote: string;
  rating: number;
}

export interface LeadItem {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceInterest?: string;
  industryInterest?: string;
  budget?: string;
  timeline?: string;
  message: string;
  status: "new" | "contacted" | "qualified" | "proposal" | "won" | "lost";
  notes?: string;
  createdAt: string;
}

export interface PageSectionItem {
  id: string;
  pageId: string;
  componentType: string;
  orderIndex: number;
  isVisible: boolean;
  props: Record<string, any>;
}

export interface PageItem {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  status: "draft" | "published" | "scheduled" | "archived";
  updatedAt: string;
}
