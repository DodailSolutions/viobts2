import { BlogItem, PodcastItem, CareerItem, TestimonialItem, LeadItem } from "./types";

export const INITIAL_BLOGS: BlogItem[] = [
  {
    id: "blog-1",
    slug: "measure-analyse-improve-enterprise-philosophy",
    title: "Measure, Analyse, Improve: The VIO Engineering Philosophy",
    excerpt: "Why modern digital transformation fails without rigorous continuous telemetry and how VIO's 3-stage framework guarantees measurable ROI.",
    content: "Enterprise technology initiatives often stumble not because of inferior tooling, but due to lack of empirical measurement. At VIO, our guiding philosophy is rooted in three non-negotiable steps: Measure what matters, Analyse root causalities through un-siloed data, and Improve systems continuously through automated feedback loops. When organizations leap straight into implementation without baseline instrumentation, they risk solving the wrong bottlenecks.",
    authorName: "VIO Architecture Board",
    authorRole: "Principal Architects",
    category: "Architecture & Strategy",
    tags: ["Digital Transformation", "Methodology", "Engineering Culture"],
    readingTime: "6 min read",
    publishedAt: "2026-02-15",
    featuredImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "blog-2",
    slug: "decoupling-monoliths-with-event-driven-microservices",
    title: "Decoupling the Enterprise Monolith: A Zero-Downtime Blueprint",
    excerpt: "How forward-looking enterprises use event-driven microservices and the Strangler Fig pattern to eliminate architectural debt without halting revenue.",
    content: "When systems reach a certain threshold of complexity, monolithic architectures become organizational bottlenecks. Deployment cycles slow from days to quarters, and single failures cascade across unrelated features. Here is our architectural blueprint for decoupling legacy cores using event-driven pub/sub gateways and domain-driven isolation.",
    authorName: "VIO Cloud Practice",
    authorRole: "Cloud Enablement Team",
    category: "Cloud & Microservices",
    tags: ["Microservices", "Kafka", "Cloud Enablement", "Architecture"],
    readingTime: "8 min read",
    publishedAt: "2026-02-28",
    featuredImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "blog-3",
    slug: "governing-generative-ai-in-regulated-environments",
    title: "Governing Generative AI & Agentic Workflows in Regulated Industries",
    excerpt: "A practical guide to deploying machine learning and LLM automation while strictly adhering to HIPAA, SOC2, and state regulatory constraints.",
    content: "Adopting generative AI in banking, healthcare, and government mandates strict isolation, deterministic guardrails, and complete prompt-and-output auditability. We explore architectural patterns that keep sensitive enterprise data sealed inside your virtual private perimeter while unlocking agentic speed.",
    authorName: "AI & Automation Lab",
    authorRole: "RPA & ML Specialists",
    category: "AI & Machine Learning",
    tags: ["AI Governance", "RPA", "HIPAA Compliance", "Enterprise AI"],
    readingTime: "7 min read",
    publishedAt: "2026-03-08",
    featuredImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
  }
];

export const INITIAL_PODCASTS: PodcastItem[] = [
  {
    id: "pod-1",
    title: "Accelerating Enterprise Tech: Scaling the Modern Cloud Pod",
    description: "Discussion on scaling distributed engineering teams, balancing technical debt with delivery velocity, and building modern resilient cloud architectures.",
    guestName: "Senior Enterprise Tech Leader",
    guestCompany: "Fortune 500 Infrastructure",
    hostName: "VIO Tech Perspectives",
    duration: "38 mins",
    youtubeUrl: "https://youtube.com",
    spotifyUrl: "https://spotify.com",
    publishedAt: "2026-02-20"
  },
  {
    id: "pod-2",
    title: "Data Intelligence: Moving from Batch Silos to Real-Time Value",
    description: "Deep dive into Lakehouse architectures, streaming data ingestion, and turning telemetry into executive action.",
    guestName: "Chief Data Strategist",
    guestCompany: "Capital Analytics",
    hostName: "VIO Tech Perspectives",
    duration: "45 mins",
    youtubeUrl: "https://youtube.com",
    spotifyUrl: "https://spotify.com",
    publishedAt: "2026-03-01"
  }
];

export const INITIAL_CAREERS: CareerItem[] = [
  {
    id: "car-1",
    title: "Senior Full-Stack Cloud Architect",
    department: "Cloud Enablement",
    location: "Richmond, VA / Remote",
    employmentType: "Full-Time",
    experienceLevel: "Senior / Principal",
    description: "We are seeking a seasoned Cloud Architect to design and implement next-generation cloud native infrastructures for enterprise and public-sector clients.",
    requirements: [
      "7+ years experience designing distributed cloud architectures (AWS/GCP/Azure)",
      "Strong proficiency in TypeScript, Node.js, Go or Python",
      "Deep expertise in Terraform, Kubernetes, and GitOps CI/CD workflows",
      "Proven track record with high-security, compliance-driven enterprise environments"
    ],
    responsibilities: [
      "Lead architectural roadmaps and technical reviews for tier-1 client projects",
      "Design zero-downtime migration strategies from monolithic cores to microservices",
      "Mentor mid-level and senior engineers within dedicated client delivery pods"
    ],
    benefits: [
      "Comprehensive medical, dental, and vision insurance",
      "401(k) matching program",
      "Flexible remote work policies & home office stipends",
      "Continuous professional certification support (AWS/GCP/Kubernetes)"
    ]
  },
  {
    id: "car-2",
    title: "Principal Big Data & Lakehouse Engineer",
    department: "Data & Analytics",
    location: "Richmond, VA / Hybrid or Remote",
    employmentType: "Full-Time",
    experienceLevel: "Lead / Principal",
    description: "Join VIO's Data & Analytics practice to architect petabyte-scale lakehouse pipelines, streaming data meshes, and enterprise governance solutions.",
    requirements: [
      "6+ years experience with Snowflake, BigQuery, Databricks, or Redshift",
      "Proficiency in SQL, Python, dbt, Apache Spark, and Apache Kafka",
      "Experience with data governance, lineage, and compliance frameworks"
    ],
    responsibilities: [
      "Build real-time streaming and batch ingestion frameworks for enterprise clients",
      "Collaborate with client executives to translate business KPIs into automated semantic layers",
      "Ensure adherence to data privacy, auditability, and SOC2/HIPAA mandates"
    ],
    benefits: [
      "Competitive base salary + performance bonuses",
      "Comprehensive health coverage",
      "Unlimited paid time off (PTO)",
      "Dedicated continuous learning budget"
    ]
  }
];

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test-1",
    clientName: "Executive Director of Technology",
    designation: "Office of Data Governance & Analytics",
    company: "Commonwealth of Virginia",
    quote: "VIO has been instrumental in modernizing our state digital infrastructure. Their woman-owned SWaM certification paired with world-class engineering execution makes them an invaluable partner.",
    rating: 5
  },
  {
    id: "test-2",
    clientName: "Head of Infrastructure Engineering",
    designation: "Brokerage Services",
    company: "DriveWealth",
    quote: "When retail market volatility spikes 10x, failure is not an option. VIO's cloud and API squads engineered a platform that handled our trading spikes with flawless precision.",
    rating: 5
  },
  {
    id: "test-3",
    clientName: "VP of Enterprise Architecture",
    designation: "Risk & Governance Systems",
    company: "Wells Fargo",
    quote: "The rigor VIO brought to our data audit lineage initiative saved our risk department thousands of manual review hours while exceeding regulatory compliance expectations.",
    rating: 5
  }
];

export const INITIAL_LEADS: LeadItem[] = [
  {
    id: "lead-1",
    name: "Marcus Vance",
    email: "m.vance@capitalfintech.io",
    company: "Capital FinTech Partners",
    phone: "+1 (804) 555-0192",
    serviceInterest: "Cloud Enablement & CI/CD Pipelines",
    industryInterest: "Banking & Financial Services",
    budget: "$100k - $250k",
    timeline: "1-3 months",
    message: "Seeking an engineering pod to evaluate our trading API gateway for SOC2 audit preparation and cloud latency reduction.",
    status: "new",
    notes: "High priority fintech prospect. Requested initial consultation call.",
    createdAt: new Date().toISOString()
  },
  {
    id: "lead-2",
    name: "Elena Rostova",
    email: "e.rostova@healthanalytics.org",
    company: "Mid-Atlantic Health Systems",
    phone: "+1 (804) 555-8831",
    serviceInterest: "Big Data & Analytics",
    industryInterest: "Healthcare, Life Sciences & Insurance",
    budget: "$250k+",
    timeline: "Immediate",
    message: "We need Lakehouse migration specialists to aggregate disparate EHR logs into a unified HIPAA data mesh.",
    status: "qualified",
    notes: "Call scheduled for next Tuesday.",
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];
