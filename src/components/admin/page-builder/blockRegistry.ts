import {
  LayoutTemplate,
  Megaphone,
  BarChart3,
  Building2,
  MessageSquareQuote,
  Briefcase,
  Grid3x3,
  Workflow,
  Target,
  Factory,
  Columns2,
  HelpCircle,
  FileText,
  Box,
  type LucideIcon,
} from "lucide-react";
import { DEFAULT_CLIENT_LOGOS, DEFAULT_CLIENT_TESTIMONIALS } from "@/lib/data";

export type BlockCategory = "hero" | "features" | "proof" | "content";

export interface BlockMeta {
  type: string;
  label: string;
  category: BlockCategory;
  description: string;
  icon: LucideIcon;
}

export const BLOCK_CATEGORIES: { id: BlockCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "hero", label: "Headers & CTAs" },
  { id: "features", label: "Capabilities" },
  { id: "proof", label: "Social proof" },
  { id: "content", label: "Content" },
];

export const AVAILABLE_BLOCKS: BlockMeta[] = [
  { type: "HeroBanner", label: "Hero banner", category: "hero", description: "Headline, supporting copy and call-to-action buttons.", icon: LayoutTemplate },
  { type: "CTABanner", label: "Call to action", category: "hero", description: "Consultation booking banner with one or two buttons.", icon: Megaphone },
  { type: "StatsCounter", label: "Stats", category: "proof", description: "Key metrics with labels and short descriptions.", icon: BarChart3 },
  { type: "MeetOurClients", label: "Clients & testimonials", category: "proof", description: "Client logo wall with executive testimonial cards.", icon: Building2 },
  { type: "TestimonialsSlider", label: "Testimonials", category: "proof", description: "Rotating client quotes.", icon: MessageSquareQuote },
  { type: "CaseStudyShowcase", label: "Case studies", category: "proof", description: "Featured case studies from the CMS.", icon: Briefcase },
  { type: "CapabilitiesGrid", label: "Capabilities grid", category: "features", description: "The six core service pillars.", icon: Grid3x3 },
  { type: "Methodology", label: "Methodology", category: "features", description: "Measure → Analyse → Improve process.", icon: Workflow },
  { type: "BusinessProblems", label: "Business problems", category: "features", description: "Problem and solution cards.", icon: Target },
  { type: "IndustryExplorer", label: "Industries", category: "features", description: "Sector-specific challenges and solutions.", icon: Factory },
  { type: "SplitImageText", label: "Image + text", category: "content", description: "Two-column story with image and bullet points.", icon: Columns2 },
  { type: "AccordionFAQ", label: "FAQ", category: "content", description: "Expandable questions and answers.", icon: HelpCircle },
  { type: "RichTextContent", label: "Rich text", category: "content", description: "Free-form formatted HTML content.", icon: FileText },
];

export function getBlockMeta(type: string): BlockMeta {
  return (
    AVAILABLE_BLOCKS.find((b) => b.type === type) || {
      type,
      label: type.replace(/([a-z])([A-Z])/g, "$1 $2"),
      category: "content",
      description: "Custom block",
      icon: Box,
    }
  );
}

export function getSectionSummary(props: Record<string, any>): string {
  return props.heading || props.headline || props.eyebrow || "";
}

export function getDefaultPropsForBlock(type: string, pageTitle: string): Record<string, any> {
  switch (type) {
    case "HeroBanner":
      return {
        eyebrow: "WE ARE YOUR TECHNOLOGY PARTNER",
        headline: pageTitle || "The technology accelerator for your business",
        highlightText: "business",
        subheading: "Cutting-edge technology solutions to deliver excellence applying best practices, scalable architecture, and expert talent.",
        badge: "VA-SWaM Certified • Richmond, Virginia • 10+ Years Track Record",
        primaryCtaText: "Book a Consultation",
        primaryCtaLink: "https://calendly.com/viobts/consultation",
        secondaryCtaText: "Explore Capabilities",
        secondaryCtaLink: "/services",
        imageSrc: "/images/hero-graphic.png",
      };
    case "StatsCounter":
      return {
        eyebrow: "PROVEN TRACK RECORD",
        heading: "Enterprise Scale with Verified Impact",
        stats: [
          { label: "Years of Excellence", value: "10+", description: "Founder-led engineering track record" },
          { label: "Enterprise & State Clients", value: "50+", description: "Tier-1 banks, federal & state agencies" },
          { label: "VA-SWaM Certified", value: "100%", description: "Woman-owned business enterprise" },
          { label: "Client Satisfaction", value: "99.8%", description: "Measurable business outcomes delivered" },
        ],
      };
    case "MeetOurClients":
      return {
        logos: DEFAULT_CLIENT_LOGOS,
        testimonials: DEFAULT_CLIENT_TESTIMONIALS,
      };
    case "BusinessProblems":
      return {
        eyebrow: "SOLVING HIGH-FRICTION CHALLENGES",
        heading: "Transforming Critical Enterprise Bottlenecks",
        subheading: "How VIO bridges fragmented architectures into unified, resilient production systems.",
      };
    case "CapabilitiesGrid":
      return {
        eyebrow: "OUR 6 CORE CAPABILITY PILLARS",
        heading: "Comprehensive Enterprise Architecture & Engineering",
        subheading: "From scalable AI and cloud modernization to dedicated technical squads, VIO engineers high-performance platforms.",
        ctaText: "Explore All Services",
        ctaLink: "/services",
      };
    case "Methodology":
      return {
        eyebrow: "OUR CORE DELIVERY FORMULA",
        heading: "Measure → Analyse → Improve",
        subheading: "Every engagement follows our 3-stage visual architecture methodology, ensuring measurable ROI and technical excellence.",
      };
    case "CaseStudyShowcase":
      return {
        eyebrow: "CLIENT PROOFS & CASE HISTORIES",
        heading: "Trusted by Government Agencies & Global Leaders",
        subheading: "Proven architectural transformations delivered for Virginia ODGA, USAID, DriveWealth, Advance Auto Parts, and Wells Fargo.",
        ctaText: "Explore All Case Studies",
        ctaLink: "/case-studies",
      };
    case "IndustryExplorer":
      return {
        eyebrow: "DEEP DOMAIN MASTERY",
        heading: "Tailored Solutions Across Regulated Industries",
        subheading: "Proven architecture patterns delivering compliance, security, and velocity.",
      };
    case "TestimonialsSlider":
      return {
        eyebrow: "WHAT LEADERS SAY ABOUT VIO",
        heading: "Verified Feedback from Enterprise Stakeholders",
      };
    case "CTABanner":
      return {
        eyebrow: "READY TO ACCELERATE WHAT'S NEXT?",
        heading: "Let's turn technology into measurable business impact.",
        subheading: "Schedule a complimentary consultation with our principal architects to explore how VIO can accelerate your digital roadmap.",
        primaryCtaText: "Book a Call",
        primaryCtaLink: "https://calendly.com/viobts/consultation",
        secondaryCtaText: "Talk to VIO",
        secondaryCtaLink: "/contact",
      };
    case "SplitImageText":
      return {
        eyebrow: "STRATEGIC EXECUTION",
        heading: "Engineered for Velocity and Resilience",
        description: "We deploy principal architect-led squads that embed directly into your technical operations, establishing automated quality gates and high-throughput delivery rhythms.",
        bullets: [
          "Direct leadership access with 100% executive accountability",
          "Automated telemetry and real-time observability pipelines",
          "Hardened NIST 800-53 and SOC2 security compliance controls",
        ],
        imagePosition: "right",
        imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
        ctaText: "Discover Our Approach",
        ctaLink: "/who-we-are",
      };
    case "AccordionFAQ":
      return {
        eyebrow: "FREQUENTLY ASKED QUESTIONS",
        heading: "Frequently Asked Questions",
        subheading: "Clear answers about workforce engagement, security compliance, and technology methodologies.",
        faqs: [
          {
            question: "What is VIO's VA-SWaM certification and what does it mean for contracts?",
            answer: "VIO is a certified woman-owned Small, Women-owned, and Minority-owned (SWaM) business headquartered in Richmond, Virginia. This allows state, federal, and prime enterprise contractors to fulfill mandatory diversity tier-1 and tier-2 vendor goals while partnering with an elite engineering firm.",
          },
          {
            question: "How does VIO integrate into our existing technical workflows?",
            answer: "We offer both dedicated technical squads and specialized pods that integrate natively into your Jira, Slack, CI/CD, and Git repositories. We adhere to your security guardrails and agile sprint rhythms.",
          },
        ],
      };
    case "RichTextContent":
      return {
        eyebrow: "DOCUMENTATION & OVERVIEW",
        heading: pageTitle || "Overview",
        content: "<p>Welcome to this dynamic CMS section. You can format text, add paragraphs, embed lists, or format custom HTML directly in this modular container.</p>",
      };
    default:
      return {
        eyebrow: "DYNAMIC BLOCK",
        heading: `Custom ${type}`,
        subheading: "Configurable section rendered by VIO Visual CMS.",
      };
  }
}
