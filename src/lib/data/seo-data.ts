import { PageSEOConfig, SiteSEOSettings, RedirectItem, SEOCheckItem, PageItem } from "./types";

export const INITIAL_SITE_SEO_SETTINGS: SiteSEOSettings = {
  siteName: "VIO Business & Technology Solutions",
  titleSeparator: "|",
  siteUrl: "https://www.viobts.com",
  defaultOgImage: "/images/og-preview.png",
  twitterHandle: "@viobts",
  googleSearchConsoleVerification: "google-site-verification=vio_gsc_98a72b831fae8812",
  bingWebmasterVerification: "msvalidate.01=BING_VERIF_83921098234",
  robotsTxtContent: `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/admin
Disallow: /tmp/

# Crawl Delay & Rate
Crawl-delay: 1

# XML Sitemaps
Sitemap: https://www.viobts.com/sitemap.xml
`,
  xmlSitemapEnabled: true,
};

export const INITIAL_PAGE_SEO_CONFIGS: PageSEOConfig[] = [
  {
    pageId: "pg-home",
    focusKeyphrase: "technology accelerator partner",
    secondaryKeywords: [
      "enterprise cloud modernization",
      "richmond va tech consulting",
      "data lakehouse architecture",
      "certified woman-owned IT partner"
    ],
    seoTitle: "VIO | The Enterprise Technology Accelerator Partner",
    slug: "home",
    metaDescription: "Richmond, VA-based woman-owned enterprise technology accelerator partner. Delivering elite Technology Workforce, Cloud, Big Data, Open-source, and AI/ML architectures.",
    canonicalUrl: "https://www.viobts.com/",
    robotsIndex: "index",
    robotsFollow: "follow",
    ogTitle: "VIO | Enterprise Technology Accelerator Partner",
    ogDescription: "Accelerating modern enterprise business outcomes with battle-tested cloud, lakehouse, and technology workforce solutions.",
    ogImage: "/images/og-preview.png",
    twitterTitle: "VIO | Enterprise Technology Partner",
    twitterDescription: "Richmond, VA-based woman-owned technology accelerator partner.",
    twitterImage: "/images/og-preview.png",
    schemaType: "Organization",
    contentSnippet: "We are your enterprise technology accelerator partner. Headquartered in Richmond, Virginia, VIO bridges modern engineering capability with empirical client delivery across cloud enablement, APIs, and AI/ML.",
  },
  {
    pageId: "pg-services",
    focusKeyphrase: "enterprise technology services",
    secondaryKeywords: [
      "technology workforce solutions",
      "big data lakehouse engineering",
      "cloud enablement AWS Azure",
      "api microservices architecture"
    ],
    seoTitle: "Enterprise Technology Services & 6 Pillars | VIO",
    slug: "services",
    metaDescription: "Explore VIO's 6 core enterprise technology services: Workforce Solutions, Big Data Lakehouse, Open-source Integration, Cloud Enablement, API Microservices, and AI/ML.",
    canonicalUrl: "https://www.viobts.com/services",
    robotsIndex: "index",
    robotsFollow: "follow",
    ogTitle: "Enterprise Technology Services & Capabilities | VIO",
    ogDescription: "Deep dive into VIO's 6 core engineering pillars designed for scalable government and Fortune 500 modernisation.",
    ogImage: "/images/og-preview.png",
    twitterTitle: "Enterprise Technology Services | VIO",
    twitterDescription: "Explore VIO's 6 core pillars of modern enterprise technology.",
    twitterImage: "/images/og-preview.png",
    schemaType: "Service",
    contentSnippet: "VIO delivers battle-tested enterprise technology services across 6 dedicated capability pillars: Technology Workforce, Big Data and Analytics, Open-source Integration, Cloud Enablement, APIs and Microservices, and AI/ML.",
  },
  {
    pageId: "pg-industries",
    focusKeyphrase: "industry technology solutions",
    secondaryKeywords: [
      "banking cloud compliance",
      "healthcare hipaa data platform",
      "state government it modernization",
      "fintech architecture"
    ],
    seoTitle: "Industry Technology Solutions & Modernization | VIO",
    slug: "industries",
    metaDescription: "Tailored industry technology solutions for Banking, Healthcare, Government, Manufacturing, and Telecom with empirical compliance and high throughput.",
    canonicalUrl: "https://www.viobts.com/industries",
    robotsIndex: "index",
    robotsFollow: "follow",
    ogTitle: "Industry Technology Solutions | VIO",
    ogDescription: "Domain-specific modernization architectures designed for regulated financial, healthcare, and state agency environments.",
    ogImage: "/images/og-preview.png",
    twitterTitle: "Industry Technology Solutions | VIO",
    twitterDescription: "Specialized engineering architectures for regulated enterprise industries.",
    twitterImage: "/images/og-preview.png",
    schemaType: "WebPage",
    contentSnippet: "VIO engineers mission-critical industry technology solutions tailored for the compliance, resilience, and scale requirements of banking, public sector, and healthcare leaders.",
  },
  {
    pageId: "pg-who-we-are",
    focusKeyphrase: "woman-owned technology accelerator",
    secondaryKeywords: [
      "richmond va tech leader",
      "va-swam certified technology company",
      "enterprise consulting track record",
      "public sector IT partner"
    ],
    seoTitle: "Who We Are | Woman-Owned Technology Accelerator | VIO",
    slug: "who-we-are",
    metaDescription: "Founder-led, woman-owned VA-SWaM certified technology accelerator headquartered in Richmond, Virginia with 10+ years of high-consequence enterprise track record.",
    canonicalUrl: "https://www.viobts.com/who-we-are",
    robotsIndex: "index",
    robotsFollow: "follow",
    ogTitle: "Who We Are | 10+ Years of Enterprise Excellence | VIO",
    ogDescription: "VA-SWaM certified enterprise consulting accelerator with a 10+ year track record serving state and commercial giants.",
    ogImage: "/images/og-preview.png",
    twitterTitle: "Who We Are | VIO",
    twitterDescription: "Founder-led, woman-owned VA-SWaM certified technology accelerator.",
    twitterImage: "/images/og-preview.png",
    schemaType: "Organization",
    contentSnippet: "Founded in Richmond, Virginia, VIO is a certified woman-owned technology accelerator. Over the last decade, we have partnered with federal, state, and commercial clients to execute complex cloud migrations.",
  },
  {
    pageId: "pg-our-mission",
    focusKeyphrase: "smartest techniques in the business",
    secondaryKeywords: [
      "enterprise it staffing and consulting",
      "specialized data intelligence",
      "client-first technology partner",
      "diverse tech talent"
    ],
    seoTitle: "Our Mission | Provide the Smartest Techniques in the Business | VIO",
    slug: "our-mission",
    metaDescription: "At VIO, we don’t just provide IT staffing and consulting—we transform industries with the right talent, cutting-edge insights, and results-driven strategies.",
    canonicalUrl: "https://www.viobts.com/our-mission",
    robotsIndex: "index",
    robotsFollow: "follow",
    ogTitle: "Our Mission | VIO Business & Technology Solutions",
    ogDescription: "Transforming industries with specialized data intelligence, agile innovation, and people-first culture.",
    ogImage: "/images/og-preview.png",
    twitterTitle: "Our Mission | VIO",
    twitterDescription: "Provide the smartest techniques in the business through specialized data intelligence.",
    twitterImage: "/images/og-preview.png",
    schemaType: "AboutPage",
    contentSnippet: "At VIO, we don’t just provide IT staffing and consulting—we transform industries with the right talent, cutting-edge insights, and results-driven strategies.",
  },
  {
    pageId: "pg-vision",
    focusKeyphrase: "innovation drives progress",
    secondaryKeywords: [
      "unbounded enterprise potential",
      "sustainable technology ecosystem",
      "agentic AI roadmap",
      "future of data intelligence"
    ],
    seoTitle: "Our Vision | Make a Future Where Innovation Drives Progress | VIO",
    slug: "vision",
    metaDescription: "At VIO, we envision a future where innovation drives progress, transforms industries, and creates boundless opportunities for businesses and individuals alike.",
    canonicalUrl: "https://www.viobts.com/vision",
    robotsIndex: "index",
    robotsFollow: "follow",
    ogTitle: "Our Vision | VIO Business & Technology Solutions",
    ogDescription: "Building an ecosystem where businesses are free from limitations to explore their true potential.",
    ogImage: "/images/og-preview.png",
    twitterTitle: "Our Vision | VIO",
    twitterDescription: "Make a future where innovation drives progress.",
    twitterImage: "/images/og-preview.png",
    schemaType: "AboutPage",
    contentSnippet: "At VIO, we envision a future where innovation drives progress, transforms industries, and creates boundless opportunities for businesses and individuals alike.",
  },
  {
    pageId: "pg-case-studies",
    focusKeyphrase: "enterprise case studies proof",
    secondaryKeywords: [
      "virginia odga govcloud case study",
      "drivewealth scaling client proof",
      "wells fargo compliance modernization",
      "empirical cloud ROI"
    ],
    seoTitle: "Enterprise Case Studies & Empirical Proof | VIO",
    slug: "case-studies",
    metaDescription: "Explore verified enterprise case studies proof: Virginia ODGA GovCloud Modernization, DriveWealth fintech scaling, and Wells Fargo automated compliance.",
    canonicalUrl: "https://www.viobts.com/case-studies",
    robotsIndex: "index",
    robotsFollow: "follow",
    ogTitle: "Enterprise Case Studies & Verified Client Proof | VIO",
    ogDescription: "Empirical proof of 99.999% uptime, 42% cloud cost reduction, and zero-loss migrations for Virginia ODGA and Fortune 500s.",
    ogImage: "/images/og-preview.png",
    twitterTitle: "Enterprise Case Studies | VIO",
    twitterDescription: "Verified cloud modernization outcomes and client impact metrics.",
    twitterImage: "/images/og-preview.png",
    schemaType: "Article",
    contentSnippet: "Our enterprise case studies proof highlights empirical outcomes: 42% AWS infrastructure cost reduction for ODGA, 10x throughput for DriveWealth, and automated compliance pipelines.",
  },
];

export const INITIAL_REDIRECTS: RedirectItem[] = [
  {
    id: "red-1",
    sourceUrl: "/consulting",
    targetUrl: "/services",
    type: 301,
    hits: 342,
    createdAt: "2024-01-10T12:00:00.000Z",
  },
  {
    id: "red-2",
    sourceUrl: "/careers/apply",
    targetUrl: "/careers",
    type: 301,
    hits: 189,
    createdAt: "2024-02-15T09:30:00.000Z",
  },
  {
    id: "red-3",
    sourceUrl: "/team",
    targetUrl: "/who-we-are",
    type: 301,
    hits: 512,
    createdAt: "2024-03-01T14:20:00.000Z",
  },
  {
    id: "red-4",
    sourceUrl: "/govsolutions",
    targetUrl: "/services",
    type: 302,
    hits: 94,
    createdAt: "2024-04-12T16:45:00.000Z",
  },
];

// VIO Enterprise SEO & Content Intelligence Engine
export interface SecondaryKeywordCheck {
  keyword: string;
  foundInTitle: boolean;
  foundInDesc: boolean;
  foundInContent: boolean;
  density: number;
  status: "good" | "warning" | "error";
}

export interface SEOAnalysisResult {
  seoScore: number; // 0 - 100
  readabilityScore: number; // 0 - 100
  technicalScore: number; // 0 - 100
  compositeScore: number; // 0 - 100 (Overall Rank Readiness)
  seoStatus: "good" | "ok" | "bad";
  readabilityStatus: "good" | "ok" | "bad";
  technicalStatus: "good" | "ok" | "bad";
  seoChecks: SEOCheckItem[];
  readabilityChecks: SEOCheckItem[];
  technicalChecks: SEOCheckItem[];
  secondaryChecks: SecondaryKeywordCheck[];
  readingTimeMinutes: number;
  gradeLevel: string;
  wordCount: number;
  sentenceCount: number;
}

// AI Metadata Suggestion Interface
export interface AIMetadataSuggestion {
  seoTitle: string;
  metaDescription: string;
  secondaryKeywords: string[];
  ogTitle: string;
  ogDescription: string;
  focusKeyphrase: string;
  rationale: string;
}

/**
 * Intelligent AI Metadata Copilot
 * Generates optimal search metadata, SERP snippets, and LSI keywords
 */
export function generateAIMetadata(
  pageTitle: string,
  focusKeyphrase: string,
  contentSnippet: string,
  slug?: string
): AIMetadataSuggestion {
  const cleanTitle = pageTitle.replace(/\s*\|\s*VIO.*$/i, "").trim();
  const kw = focusKeyphrase.trim() || cleanTitle.toLowerCase();
  const baseTopic = cleanTitle || "Enterprise Technology";

  // Derive secondary LSI keywords based on topic
  const lsiCandidates: Record<string, string[]> = {
    home: [
      "enterprise cloud modernization",
      "richmond va tech accelerator",
      "data lakehouse solutions",
      "certified woman-owned IT partner",
      "scalable microservices engineering"
    ],
    services: [
      "technology workforce solutions",
      "cloud enablement architecture",
      "big data analytics lakehouse",
      "enterprise API integration",
      "AI ML enterprise pipelines"
    ],
    industries: [
      "banking cloud compliance",
      "fintech scalability engineering",
      "healthcare data governance",
      "state government IT modernization",
      "telecom microservices"
    ],
    "who-we-are": [
      "richmond va technology partner",
      "va-swam certified technology company",
      "10+ years enterprise consulting",
      "woman-owned technology leadership",
      "client delivery proof"
    ],
    "case-studies": [
      "virginia odga govcloud case study",
      "drivewealth fintech scaling proof",
      "wells fargo automated compliance",
      "99.999% uptime enterprise migrations",
      "cloud cost reduction roi"
    ]
  };

  const key = (slug || "home").toLowerCase().replace(/[^a-z0-9-]/g, "");
  const defaultSecondaries = lsiCandidates[key] || [
    `${kw} solutions`,
    `enterprise ${kw}`,
    "cloud architecture modernization",
    "scalable engineering delivery",
    "VIO technology accelerators"
  ];

  // Generate high-CTR SEO Title (around 52-60 chars)
  let suggestedTitle = `${cleanTitle} | Enterprise ${kw.charAt(0).toUpperCase() + kw.slice(1)} | VIO`;
  if (suggestedTitle.length > 62) {
    suggestedTitle = `${cleanTitle} | ${kw.charAt(0).toUpperCase() + kw.slice(1)} | VIO`;
  }
  if (suggestedTitle.length > 65) {
    suggestedTitle = `${cleanTitle} - Enterprise Solutions | VIO`;
  }

  // Generate high-CTR Meta Description (140-158 characters)
  let suggestedDesc = `Accelerate outcomes with VIO's ${kw}. Empowering modern enterprises with battle-tested cloud, lakehouse & engineering excellence from Richmond, VA.`;
  if (suggestedDesc.length > 160) {
    suggestedDesc = suggestedDesc.slice(0, 157) + "...";
  }

  return {
    focusKeyphrase: kw,
    seoTitle: suggestedTitle,
    metaDescription: suggestedDesc,
    secondaryKeywords: defaultSecondaries.slice(0, 4),
    ogTitle: `${cleanTitle} | VIO Enterprise Technology`,
    ogDescription: suggestedDesc,
    rationale: `AI Copilot optimized title for primary intent "${kw}" with high click-through structure, front-loaded branding, and a 155-character meta description tailored for enterprise decision-makers.`
  };
}

/**
 * Enterprise Content & SEO Intelligence Diagnostics
 */
export function analyzeContentSEO(config: PageSEOConfig): SEOAnalysisResult {
  const seoChecks: SEOCheckItem[] = [];
  const readabilityChecks: SEOCheckItem[] = [];
  const technicalChecks: SEOCheckItem[] = [];
  const secondaryChecks: SecondaryKeywordCheck[] = [];

  const keyphrase = config.focusKeyphrase.trim().toLowerCase();
  const title = config.seoTitle || "";
  const desc = config.metaDescription || "";
  const slug = config.slug || "";
  const content = config.contentSnippet || "";
  const secondaryKeywords = config.secondaryKeywords || [];

  // Helper: check keyphrase words
  const keyphraseWords = keyphrase ? keyphrase.split(/\s+/).filter(Boolean) : [];
  const hasKeyphrase = keyphraseWords.length > 0;

  // --- 1. PRIMARY SEO CRITERIA ---

  // 1.1 Focus Keyphrase Presence
  if (!hasKeyphrase) {
    seoChecks.push({
      id: "keyphrase-set",
      title: "Focus Keyphrase",
      status: "error",
      message: "No focus keyphrase configured. Define a primary target query to benchmark search relevancy.",
    });
  } else {
    seoChecks.push({
      id: "keyphrase-set",
      title: "Focus Keyphrase",
      status: "good",
      message: `Focus keyphrase is active: "${config.focusKeyphrase}".`,
    });

    // 1.2 Keyphrase in SEO Title
    const titleLower = title.toLowerCase();
    if (titleLower.includes(keyphrase)) {
      const position = titleLower.indexOf(keyphrase);
      if (position <= 10) {
        seoChecks.push({
          id: "keyphrase-in-title",
          title: "Keyphrase in Title",
          status: "good",
          message: "The focus keyphrase appears at the beginning of the title tag. Optimal prominence!",
        });
      } else {
        seoChecks.push({
          id: "keyphrase-in-title",
          title: "Keyphrase in Title",
          status: "good",
          message: "The focus keyphrase appears in the SEO title tag.",
        });
      }
    } else {
      const partialMatch = keyphraseWords.every((w) => titleLower.includes(w));
      if (partialMatch) {
        seoChecks.push({
          id: "keyphrase-in-title",
          title: "Keyphrase in Title",
          status: "warning",
          message: "Keyphrase terms are distributed in the title, but not as an exact phrase sequence.",
        });
      } else {
        seoChecks.push({
          id: "keyphrase-in-title",
          title: "Keyphrase in Title",
          status: "error",
          message: "The focus keyphrase is missing from the title tag. Add it to improve SERP rankings.",
        });
      }
    }

    // 1.3 Keyphrase in Meta Description
    const descLower = desc.toLowerCase();
    if (descLower.includes(keyphrase)) {
      seoChecks.push({
        id: "keyphrase-in-desc",
        title: "Keyphrase in Meta Description",
        status: "good",
        message: "Keyphrase matches in meta description. Search engines will bold these terms for users.",
      });
    } else {
      seoChecks.push({
        id: "keyphrase-in-desc",
        title: "Keyphrase in Meta Description",
        status: "warning",
        message: "The primary keyphrase is not in the meta description. Include it to improve organic CTR.",
      });
    }

    // 1.4 Keyphrase in URL Slug
    const slugLower = slug.toLowerCase().replace(/[^a-z0-9]/g, " ");
    if (slugLower.includes(keyphrase.replace(/[^a-z0-9]/g, " "))) {
      seoChecks.push({
        id: "keyphrase-in-slug",
        title: "Keyphrase in URL Slug",
        status: "good",
        message: "Keyphrase confirmed in URL permalink slug. High clarity for search engines and users.",
      });
    } else {
      seoChecks.push({
        id: "keyphrase-in-slug",
        title: "Keyphrase in URL Slug",
        status: "warning",
        message: "The keyphrase does not match the URL slug. Where possible, include core keywords in URLs.",
      });
    }

    // 1.5 Keyphrase in Introductory Content
    const contentLower = content.toLowerCase();
    if (contentLower.includes(keyphrase)) {
      seoChecks.push({
        id: "keyphrase-in-intro",
        title: "Keyphrase in Introduction",
        status: "good",
        message: "Primary keyphrase detected in the introductory copy. Topic intent is immediately clear.",
      });
    } else {
      seoChecks.push({
        id: "keyphrase-in-intro",
        title: "Keyphrase in Introduction",
        status: "warning",
        message: "The focus keyphrase is absent in the opening paragraph. Establish topic relevance early.",
      });
    }

    // 1.6 Keyphrase Density
    const words = content.split(/\s+/).filter(Boolean).length;
    if (words > 20) {
      const occurrences = (contentLower.match(new RegExp(keyphrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "g")) || []).length;
      const density = (occurrences / words) * 100;
      if (density >= 0.5 && density <= 3.0) {
        seoChecks.push({
          id: "keyphrase-density",
          title: "Keyphrase Density",
          status: "good",
          message: `Keyphrase density is ${density.toFixed(1)}% (${occurrences} occurrences). Optimal semantic frequency.`,
        });
      } else if (density > 3.0) {
        seoChecks.push({
          id: "keyphrase-density",
          title: "Keyphrase Density",
          status: "warning",
          message: `Keyphrase density is ${density.toFixed(1)}%, which is heavy. Avoid repetitive phrase stuffing.`,
        });
      } else {
        seoChecks.push({
          id: "keyphrase-density",
          title: "Keyphrase Density",
          status: "warning",
          message: `Keyphrase found ${occurrences} time(s). Recommended to naturally include 1-2 more mentions in body copy.`,
        });
      }
    }
  }

  // 1.7 SEO Title Width (Characters & Pixel Approximation)
  const titleLen = title.length;
  if (titleLen >= 40 && titleLen <= 65) {
    seoChecks.push({
      id: "title-length",
      title: "Title Tag Length",
      status: "good",
      message: `SEO title width is ${titleLen} characters. Perfect sweet-spot for Google desktop & mobile viewports.`,
    });
  } else if (titleLen > 65) {
    seoChecks.push({
      id: "title-length",
      title: "Title Tag Length",
      status: "warning",
      message: `SEO title is ${titleLen} characters (exceeds 65). Search engines may truncate it with an ellipsis (...).`,
    });
  } else if (titleLen > 0) {
    seoChecks.push({
      id: "title-length",
      title: "Title Tag Length",
      status: "warning",
      message: `SEO title is ${titleLen} characters (under 40). Expand it with high-value enterprise qualifiers.`,
    });
  } else {
    seoChecks.push({
      id: "title-length",
      title: "Title Tag Length",
      status: "error",
      message: "SEO title is blank. Specify a title tag to index on search results.",
    });
  }

  // 1.8 Meta Description Length
  const descLen = desc.length;
  if (descLen >= 120 && descLen <= 165) {
    seoChecks.push({
      id: "desc-length",
      title: "Meta Snippet Length",
      status: "good",
      message: `Meta description is ${descLen} characters. Optimal length to avoid snippet truncation.`,
    });
  } else if (descLen > 165) {
    seoChecks.push({
      id: "desc-length",
      title: "Meta Snippet Length",
      status: "warning",
      message: `Meta description is ${descLen} characters (over 165). Search engines may cut off the trailing sentences.`,
    });
  } else if (descLen >= 40) {
    seoChecks.push({
      id: "desc-length",
      title: "Meta Snippet Length",
      status: "warning",
      message: `Meta description is ${descLen} characters (under 120). Add an enterprise call-to-action to raise CTR.`,
    });
  } else {
    seoChecks.push({
      id: "desc-length",
      title: "Meta Snippet Length",
      status: "error",
      message: "Meta description is missing. Google will auto-generate an unoptimized excerpt from the page.",
    });
  }

  // 1.9 Canonical URL Integrity
  if (config.canonicalUrl && config.canonicalUrl.startsWith("https://")) {
    seoChecks.push({
      id: "canonical-url",
      title: "Canonical URL",
      status: "good",
      message: `Canonical link specified correctly with secure HTTPS protocol: ${config.canonicalUrl}`,
    });
  } else {
    seoChecks.push({
      id: "canonical-url",
      title: "Canonical URL",
      status: "warning",
      message: "Canonical URL is missing or does not use HTTPS. Define canonical tags to prevent duplicate content flags.",
    });
  }

  // --- 2. EDITORIAL READABILITY CRITERIA ---
  const textWords = content.split(/\s+/).filter(Boolean);
  const wordCount = textWords.length;
  const sentences = content.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const sentenceCount = Math.max(1, sentences.length);
  const avgWordsPerSentence = wordCount / sentenceCount;

  // Reading time (average 200 words per minute)
  const readingTimeMinutes = Math.max(1, Math.round(wordCount / 200));

  // 2.1 Content Depth & Word Count
  if (wordCount >= 250) {
    readabilityChecks.push({
      id: "word-count",
      title: "Content Volume & Depth",
      status: "good",
      message: `Content snippet contains ${wordCount} words. Satisfies comprehensive editorial standards.`,
    });
  } else if (wordCount >= 40) {
    readabilityChecks.push({
      id: "word-count",
      title: "Content Volume & Depth",
      status: "warning",
      message: `Content snippet contains ${wordCount} words. We recommend at least 250 words for strong ranking authority.`,
    });
  } else {
    readabilityChecks.push({
      id: "word-count",
      title: "Content Volume & Depth",
      status: "error",
      message: "Content snippet is too thin (<40 words). Provide more in-depth service and value propositions.",
    });
  }

  // 2.2 Flesch Reading Ease Score
  const estimatedSyllables = content
    .toLowerCase()
    .split(/\s+/)
    .reduce((acc, word) => {
      const matches = word.match(/[aeiouy]{1,2}/g);
      return acc + (matches ? Math.max(1, matches.length) : 1);
    }, 0);

  const fleschScore = Math.max(
    10,
    Math.min(
      100,
      Math.round(206.835 - 1.015 * avgWordsPerSentence - 84.6 * (estimatedSyllables / Math.max(1, wordCount)))
    )
  );

  let gradeLevel = "Conversational Business";
  if (fleschScore >= 70) {
    gradeLevel = "High Accessibility (7th-8th Grade)";
  } else if (fleschScore >= 55) {
    gradeLevel = "Executive Business (10th-12th Grade)";
  } else if (fleschScore >= 40) {
    gradeLevel = "Technical & Whitepaper (Undergraduate)";
  } else {
    gradeLevel = "Specialized Enterprise (Graduate / Specialized)";
  }

  if (fleschScore >= 55) {
    readabilityChecks.push({
      id: "flesch-ease",
      title: "Flesch Reading Ease",
      status: "good",
      message: `Reading ease is ${fleschScore}/100 (${gradeLevel}). Engaging, polished, and effortless for enterprise stakeholders.`,
    });
  } else if (fleschScore >= 40) {
    readabilityChecks.push({
      id: "flesch-ease",
      title: "Flesch Reading Ease",
      status: "good",
      message: `Reading ease is ${fleschScore}/100 (${gradeLevel}). Appropriate for technical B2B decision-makers.`,
    });
  } else {
    readabilityChecks.push({
      id: "flesch-ease",
      title: "Flesch Reading Ease",
      status: "warning",
      message: `Reading ease is ${fleschScore}/100. Text is syntactically complex; break down multi-clause sentences.`,
    });
  }

  // 2.3 Sentence Length Distribution
  const longSentences = sentences.filter((s) => s.split(/\s+/).filter(Boolean).length > 22);
  const longSentencePct = Math.round((longSentences.length / sentenceCount) * 100);
  if (longSentencePct <= 25) {
    readabilityChecks.push({
      id: "sentence-length",
      title: "Sentence Rhythm & Length",
      status: "good",
      message: `${100 - longSentencePct}% of sentences have 22 words or fewer. Fluid cadence for executive skimmers.`,
    });
  } else {
    readabilityChecks.push({
      id: "sentence-length",
      title: "Sentence Rhythm & Length",
      status: "warning",
      message: `${longSentencePct}% of sentences exceed 22 words. Shorten compound sentences for punchier delivery.`,
    });
  }

  // 2.4 Transition Words & Cohesion
  const transitionWords = [
    "however", "furthermore", "therefore", "in addition", "moreover",
    "consequently", "as a result", "specifically", "for example", "across",
    "delivering", "accelerating", "empowering", "proven", "consistently"
  ];
  const hasTransitions = transitionWords.some((tw) => content.toLowerCase().includes(tw));
  if (hasTransitions) {
    readabilityChecks.push({
      id: "transition-words",
      title: "Editorial Transitions",
      status: "good",
      message: "Cohesive connective phrases detected. Seamless logical progression throughout.",
    });
  } else {
    readabilityChecks.push({
      id: "transition-words",
      title: "Editorial Transitions",
      status: "warning",
      message: "Few transition terms found. Insert bridging connectors (e.g. 'furthermore', 'specifically') to bind paragraphs.",
    });
  }

  // --- 3. TECHNICAL & SCHEMA AUDIT ---

  // 3.1 Search Indexability & Crawl Directives
  if (config.robotsIndex === "index" && config.robotsFollow === "follow") {
    technicalChecks.push({
      id: "tech-robots",
      title: "Crawl & Index Directives",
      status: "good",
      message: "Directives set to 'index, follow'. Search crawlers are instructed to discover and rank this URL.",
    });
  } else {
    technicalChecks.push({
      id: "tech-robots",
      title: "Crawl & Index Directives",
      status: "warning",
      message: `Directive is '${config.robotsIndex}, ${config.robotsFollow}'. Check if noindex is intentionally configured.`,
    });
  }

  // 3.2 Schema.org Structured Data
  if (config.schemaType) {
    technicalChecks.push({
      id: "tech-schema",
      title: "Schema.org Rich Snippets",
      status: "good",
      message: `Semantic entity '${config.schemaType}' mapped for Google Knowledge Graph and Rich Results validation.`,
    });
  } else {
    technicalChecks.push({
      id: "tech-schema",
      title: "Schema.org Rich Snippets",
      status: "warning",
      message: "No Schema entity assigned. Assigning WebPage, Service, or Organization enables rich snippets in SERPs.",
    });
  }

  // 3.3 OpenGraph & Social Cards
  if (config.ogTitle && config.ogDescription && config.ogImage) {
    technicalChecks.push({
      id: "tech-og",
      title: "OpenGraph & Social Graph",
      status: "good",
      message: "Complete OpenGraph image, title, and description tags configured for LinkedIn and Twitter sharing.",
    });
  } else {
    technicalChecks.push({
      id: "tech-og",
      title: "OpenGraph & Social Graph",
      status: "warning",
      message: "Incomplete OpenGraph properties. Ensure og:image, og:title, and og:description are provided.",
    });
  }

  // 3.4 Permalinks & Clean URLs
  const cleanSlug = !/[A-Z\s_]/.test(slug) && slug.length > 0;
  if (cleanSlug) {
    technicalChecks.push({
      id: "tech-slug",
      title: "Clean URL Permalinks",
      status: "good",
      message: "URL slug adheres strictly to modern web standards (lowercase, hyphen-delimited, zero special chars).",
    });
  } else {
    technicalChecks.push({
      id: "tech-slug",
      title: "Clean URL Permalinks",
      status: "warning",
      message: "URL slug contains capital letters, underscores, or spaces. Use lowercase hyphenated permalinks.",
    });
  }

  // --- 4. SECONDARY & LSI KEYPHRASE AUDITING ---
  const contentLower = content.toLowerCase();
  const titleLower = title.toLowerCase();
  const descLower = desc.toLowerCase();

  for (const sk of secondaryKeywords) {
    const term = sk.trim().toLowerCase();
    if (!term) continue;

    const inTitle = titleLower.includes(term);
    const inDesc = descLower.includes(term);
    const inContent = contentLower.includes(term);

    const occurrences = (contentLower.match(new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "g")) || []).length;
    const density = wordCount > 0 ? (occurrences / wordCount) * 100 : 0;

    let status: "good" | "warning" | "error" = "warning";
    if (inContent || inTitle || inDesc) {
      status = "good";
    } else {
      status = "error";
    }

    secondaryChecks.push({
      keyword: sk,
      foundInTitle: inTitle,
      foundInDesc: inDesc,
      foundInContent: inContent,
      density: parseFloat(density.toFixed(2)),
      status,
    });
  }

  // --- 5. COMPUTE SCORES ---
  const countChecks = (arr: SEOCheckItem[]) => {
    const good = arr.filter((c) => c.status === "good").length;
    const warn = arr.filter((c) => c.status === "warning").length;
    return Math.min(100, Math.round(((good * 1.0 + warn * 0.45) / Math.max(1, arr.length)) * 100));
  };

  const seoScore = countChecks(seoChecks);
  const readabilityScore = countChecks(readabilityChecks);
  const technicalScore = countChecks(technicalChecks);

  // Composite Rank Readiness: Weighted 50% SEO, 25% Readability, 25% Technical
  const compositeScore = Math.round(seoScore * 0.5 + readabilityScore * 0.25 + technicalScore * 0.25);

  return {
    seoScore,
    readabilityScore,
    technicalScore,
    compositeScore,
    seoStatus: seoScore >= 80 ? "good" : seoScore >= 55 ? "ok" : "bad",
    readabilityStatus: readabilityScore >= 75 ? "good" : readabilityScore >= 50 ? "ok" : "bad",
    technicalStatus: technicalScore >= 75 ? "good" : technicalScore >= 50 ? "ok" : "bad",
    seoChecks,
    readabilityChecks,
    technicalChecks,
    secondaryChecks,
    readingTimeMinutes,
    gradeLevel,
    wordCount,
    sentenceCount,
  };
}

// Generate Valid Schema.org JSON-LD
export function generateSchemaJsonLd(config: PageSEOConfig, siteSettings: SiteSEOSettings): string {
  const baseUri = siteSettings.siteUrl.replace(/\/+$/, "");
  const pageUrl = `${baseUri}/${config.slug === "home" ? "" : config.slug}`;

  let schemaObj: Record<string, any> = {};

  switch (config.schemaType) {
    case "Organization":
      schemaObj = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": siteSettings.siteName,
        "url": baseUri,
        "logo": `${baseUri}/images/vio-logo.png`,
        "description": config.metaDescription,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Richmond",
          "addressRegion": "VA",
          "addressCountry": "US"
        },
        "sameAs": [
          "https://www.linkedin.com/company/viobts",
          `https://twitter.com/${siteSettings.twitterHandle.replace("@", "")}`
        ]
      };
      break;

    case "LocalBusiness":
      schemaObj = {
        "@context": "https://schema.org",
        "@type": ["ProfessionalService", "LocalBusiness"],
        "name": siteSettings.siteName,
        "url": baseUri,
        "logo": `${baseUri}/images/vio-logo.png`,
        "description": config.metaDescription,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "4840 Cox Rd, Suite 100",
          "addressLocality": "Glen Allen",
          "addressRegion": "VA",
          "postalCode": "23060",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 37.6628,
          "longitude": -77.5862
        },
        "telephone": "+1 (804) 821-6588",
        "priceRange": "$$$$",
        "openingHours": "Mo-Fr 08:30-17:30",
        "sameAs": [
          "https://www.linkedin.com/company/viobts/",
          "https://maps.google.com/?cid=viobts_richmond"
        ]
      };
      break;

    case "Service":
      schemaObj = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": config.seoTitle,
        "description": config.metaDescription,
        "provider": {
          "@type": "Organization",
          "name": siteSettings.siteName,
          "url": baseUri
        },
        "areaServed": "United States",
        "serviceType": "Enterprise Technology Consulting & Accelerator"
      };
      break;

    case "Article":
    case "TechArticle":
      schemaObj = {
        "@context": "https://schema.org",
        "@type": config.schemaType,
        "headline": config.seoTitle,
        "description": config.metaDescription,
        "url": pageUrl,
        "image": `${baseUri}${config.ogImage || siteSettings.defaultOgImage}`,
        "author": {
          "@type": "Organization",
          "name": siteSettings.siteName
        },
        "publisher": {
          "@type": "Organization",
          "name": siteSettings.siteName,
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUri}/images/vio-logo.png`
          }
        },
        "datePublished": "2024-01-01T08:00:00+00:00",
        "dateModified": new Date().toISOString()
      };
      break;

    case "FAQPage":
      schemaObj = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What services does VIO specialize in?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "VIO specializes in Technology Workforce, Big Data & Lakehouse, Open-source Integration, Cloud Enablement, API Microservices, and AI/ML architectures."
            }
          },
          {
            "@type": "Question",
            "name": "Where is VIO headquartered?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "VIO is headquartered in Richmond, Virginia and is a certified woman-owned VA-SWaM technology partner."
            }
          }
        ]
      };
      break;

    default: // WebPage
      schemaObj = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": config.seoTitle,
        "description": config.metaDescription,
        "url": pageUrl,
        "isPartOf": {
          "@type": "WebSite",
          "name": siteSettings.siteName,
          "url": baseUri
        }
      };
      break;
  }

  return JSON.stringify(schemaObj, null, 2);
}

// Generate XML Sitemap
export function generateSitemapXml(pages: PageItem[], siteUrl: string): string {
  const baseUri = siteUrl.replace(/\/+$/, "");
  const xmlEntries = pages.map((page) => {
    const loc = page.slug === "home" ? `${baseUri}/` : `${baseUri}/${page.slug}`;
    const priority = page.slug === "home" ? "1.0" : page.slug === "services" ? "0.9" : "0.8";
    const changefreq = page.slug === "home" ? "daily" : "weekly";
    const lastmod = new Date(page.updatedAt || Date.now()).toISOString().split("T")[0];

    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries.join("\n")}
</urlset>`;
}
