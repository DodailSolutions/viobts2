import { PageItem, PageSectionItem } from "./types";
import { DEFAULT_CLIENT_LOGOS, DEFAULT_CLIENT_TESTIMONIALS } from "./client-logos-data";

export const INITIAL_PAGES: PageItem[] = [
  {
    id: "pg-home",
    slug: "home",
    title: "Home",
    metaTitle: "VIO | The Technology Accelerator for Your Business",
    metaDescription: "Richmond, VA-based woman-owned enterprise technology consulting partner. Specializing in Technology Workforce, Big Data, Open-source, Cloud Enablement, APIs, and AI/ML.",
    status: "published",
    updatedAt: new Date().toISOString()
  },
  {
    id: "pg-services",
    slug: "services",
    title: "Services",
    metaTitle: "Enterprise Technology Services & Capabilities | VIO",
    metaDescription: "Explore VIO's 6 core technology pillars: Technology Workforce, Big Data & Analytics, Open-source Integration, Cloud Enablement, API & Microservices, RPA, ML & AI.",
    status: "published",
    updatedAt: new Date().toISOString()
  },
  {
    id: "pg-industries",
    slug: "industries",
    title: "Industries",
    metaTitle: "Industry Solutions & Transformation | VIO",
    metaDescription: "Tailored enterprise technology solutions for Banking, Healthcare, Government, Manufacturing, Energy, and Communication.",
    status: "published",
    updatedAt: new Date().toISOString()
  },
  {
    id: "pg-who-we-are",
    slug: "who-we-are",
    title: "Who We Are",
    metaTitle: "Who We Are | 10+ Years of Enterprise Excellence | VIO",
    metaDescription: "Founder-led, woman-owned VA-SWaM certified technology accelerator headquartered in Richmond, Virginia with a 10+ year track record.",
    status: "published",
    updatedAt: new Date().toISOString()
  },
  {
    id: "pg-case-studies",
    slug: "case-studies",
    title: "Case Studies",
    metaTitle: "Enterprise Case Studies & Client Proof | VIO",
    metaDescription: "Discover how VIO accelerates business outcomes for Virginia State Agencies (ODGA), USAID, DriveWealth, Advance Auto Parts, and Wells Fargo.",
    status: "published",
    updatedAt: new Date().toISOString()
  }
];

export const INITIAL_HOMEPAGE_SECTIONS: PageSectionItem[] = [
  {
    id: "sec-hero",
    pageId: "pg-home",
    componentType: "HeroBanner",
    orderIndex: 0,
    isVisible: true,
    props: {
      eyebrow: "WE ARE YOUR TECHNOLOGY PARTNER",
      headline: "The technology accelerator for your business",
      highlightText: "business",
      subheading: "Cutting-Edge Technology Solutions To Deliver Excellence Applying Best Practices, Scalable AI, Data Solutions And Expert Talent. Measure → Analyse → Improve.",
      badge: "VA-SWaM Certified • Richmond, Virginia • 10+ Years Track Record",
      primaryCtaText: "Book a Call",
      primaryCtaLink: "/contact",
      secondaryCtaText: "Explore Capabilities",
      secondaryCtaLink: "/services",
      imageSrc: "/images/hero-graphic.png"
    }
  },
  {
    id: "sec-stats",
    pageId: "pg-home",
    componentType: "StatsCounter",
    orderIndex: 1,
    isVisible: true,
    props: {
      eyebrow: "PROVEN TRACK RECORD",
      heading: "Enterprise Scale with Verified Impact",
      stats: [
        { label: "Years of Excellence", value: "10+", description: "Founder-led engineering track record" },
        { label: "Public & Enterprise Clients", value: "50+", description: "Tier-1 banks, state agencies & global firms" },
        { label: "VA-SWaM Certified", value: "100%", description: "Woman-owned business enterprise" },
        { label: "Client Satisfaction", value: "99.8%", description: "Measurable business outcomes delivered" }
      ]
    }
  },
  {
    id: "sec-clients",
    pageId: "pg-home",
    componentType: "MeetOurClients",
    orderIndex: 2,
    isVisible: true,
    props: {
      eyebrow: "PROVEN ENTERPRISE PARTNERSHIPS",
      heading: "Meet Our Clients!",
      subheading: "Powering mission-critical digital transformations for Virginia state agencies, USAID, tier-1 FinTech brokerages, and Fortune 500 enterprises.",
      logos: DEFAULT_CLIENT_LOGOS,
      testimonials: DEFAULT_CLIENT_TESTIMONIALS
    }
  },
  {
    id: "sec-problems",
    pageId: "pg-home",
    componentType: "BusinessProblems",
    orderIndex: 3,
    isVisible: true,
    props: {
      eyebrow: "SOLVING REAL PAIN POINTS",
      heading: "Technology shouldn't slow your business down.",
      subheading: "Most enterprises struggle with fragmented tools, talent shortages, and unclear ROI. We turn friction into competitive advantage.",
      cards: [
        {
          quote: "I wish these tools worked together.",
          resolution: "We engineer unified API ecosystems and automated pipelines that synchronize your tech stack in real time."
        },
        {
          quote: "I wish we had a custom tool for this.",
          resolution: "We architect bespoke microservices and internal platforms tailored precisely to your operational workflows."
        },
        {
          quote: "Would a custom system be worth the investment?",
          resolution: "We apply our Measure → Analyse → Improve framework to prove quantifiable ROI before full-scale deployment."
        },
        {
          quote: "How can I get ROI from technology efficiency?",
          resolution: "We automate manual friction points and eliminate redundant licensing costs, compounding efficiency gains."
        },
        {
          quote: "I need a bigger IT team.",
          resolution: "We deploy pre-vetted, high-velocity engineering pods that integrate seamlessly into your ongoing sprints."
        }
      ],
      ctaText: "WE'RE YOUR TECHNOLOGY PARTNER FOR THAT.",
      ctaLink: "/contact"
    }
  },
  {
    id: "sec-capabilities",
    pageId: "pg-home",
    componentType: "CapabilitiesGrid",
    orderIndex: 3,
    isVisible: true,
    props: {
      eyebrow: "OUR 6 CORE PILLARS",
      heading: "Comprehensive Capabilities Built Around Your Goals",
      subheading: "From elite technical workforce augmentation to autonomous AI and multi-cloud resilience.",
      ctaText: "View All Capabilities",
      ctaLink: "/services"
    }
  },
  {
    id: "sec-methodology",
    pageId: "pg-home",
    componentType: "Methodology",
    orderIndex: 4,
    isVisible: true,
    props: {
      eyebrow: "VIO CORE PHILOSOPHY",
      heading: "Measure → Analyse → Improve",
      subheading: "A proven, repeatable cycle that transforms complex challenges into quantifiable business impact.",
      stages: [
        {
          step: "01",
          title: "MEASURE",
          tagline: "Understand performance through meaningful metrics.",
          description: "We audit your existing systems, telemetry, and delivery pipelines to establish empirical baselines and identify hidden friction points."
        },
        {
          step: "02",
          title: "ANALYSE",
          tagline: "Turn data into actionable insights.",
          description: "Our senior architects dissect system bottlenecks, architectural debt, and operational data silos to formulate precise intervention plans."
        },
        {
          step: "03",
          title: "IMPROVE",
          tagline: "Continuously optimize performance and outcomes.",
          description: "We deploy hardened microservices, automated pipelines, and intelligent workflows, iterating continuously to maximize enterprise velocity."
        }
      ]
    }
  },
  {
    id: "sec-casestudies",
    pageId: "pg-home",
    componentType: "CaseStudyShowcase",
    orderIndex: 5,
    isVisible: true,
    props: {
      eyebrow: "CLIENT PROOFS & CASE HISTORIES",
      heading: "Trusted by Government Agencies & Global Leaders",
      subheading: "Real-world transformations delivered for ODGA, USAID, DriveWealth, Advance Auto Parts, and Wells Fargo.",
      ctaText: "Explore All Case Studies",
      ctaLink: "/case-studies"
    }
  },
  {
    id: "sec-industries",
    pageId: "pg-home",
    componentType: "IndustryExplorer",
    orderIndex: 6,
    isVisible: true,
    props: {
      eyebrow: "SECTOR EXPERTISE",
      heading: "Tailored for the Most Demanding Industries",
      subheading: "Deep domain compliance and architectural excellence across finance, public sector, healthcare, manufacturing, utilities, and media.",
      ctaText: "Discover Industry Solutions",
      ctaLink: "/industries"
    }
  },
  {
    id: "sec-testimonials",
    pageId: "pg-home",
    componentType: "TestimonialsSlider",
    orderIndex: 7,
    isVisible: true,
    props: {
      eyebrow: "CLIENT PERSPECTIVES",
      heading: "What Leaders Say About VIO",
      subheading: "Direct feedback from executive directors, engineering heads, and enterprise enterprise architects."
    }
  },
  {
    id: "sec-cta",
    pageId: "pg-home",
    componentType: "CTABanner",
    orderIndex: 8,
    isVisible: true,
    props: {
      eyebrow: "READY TO ACCELERATE WHAT'S NEXT?",
      heading: "Let's turn technology into measurable business impact.",
      subheading: "Schedule a complimentary consultation with our principal architects to explore how VIO can accelerate your digital roadmap.",
      primaryCtaText: "Book a Call",
      primaryCtaLink: "/contact",
      secondaryCtaText: "Talk to VIO",
      secondaryCtaLink: "/contact"
    }
  }
];
