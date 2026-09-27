import { LocalSEOSettings } from "./types";

export const INITIAL_LOCAL_SEO_SETTINGS: LocalSEOSettings = {
  businessName: "VIO Business & Technology Solutions LLC",
  businessType: "ProfessionalService",
  streetAddress: "4840 Cox Rd, Suite 100",
  city: "Glen Allen",
  state: "VA",
  postalCode: "23060",
  country: "US",
  phone: "+1 (804) 821-6588",
  email: "info@viobts.com",
  latitude: 37.6628,
  longitude: -77.5862,
  priceRange: "$$$$",
  openingHours: "Mo-Fr 08:30-17:30",
  googleBusinessProfileUrl: "https://maps.google.com/?cid=viobts_richmond",
  appleMapsUrl: "https://maps.apple.com/?q=VIO+Business+and+Technology+Solutions",
  googlePlaceId: "ChIJ776kY1sbsYkRH9dJ2bK1",
  primaryServiceArea: "Richmond, VA & Greater Mid-Atlantic",
  serviceAreas: [
    "Richmond, VA",
    "Henrico County, VA",
    "Chesterfield County, VA",
    "Washington D.C. Metro",
    "Northern Virginia (NoVA)",
    "Raleigh-Durham, NC",
    "Nationwide (USA)"
  ],
  averageRating: 5.0,
  reviewCount: 48,
  enableLocalPackSnippet: true,
  geoKeywords: [
    "IT consulting Richmond VA",
    "enterprise cloud migration Virginia",
    "Richmond VA woman owned SWaM technology vendor",
    "data lakehouse consultants Glen Allen VA",
    "custom software development Richmond Virginia",
    "AWS Azure cloud architects Richmond VA",
    "public sector IT staff augmentation Virginia"
  ],
  branches: [
    {
      id: "branch-richmond-hq",
      name: "Corporate Headquarters (Richmond)",
      branchType: "Headquarters",
      streetAddress: "4840 Cox Rd, Suite 100",
      city: "Glen Allen",
      state: "VA",
      postalCode: "23060",
      phone: "+1 (804) 821-6588",
      email: "richmond@viobts.com",
      googlePlaceId: "ChIJ776kY1sbsYkRH9dJ2bK1",
      isHeadquarters: true,
    },
    {
      id: "branch-dc-metro",
      name: "Federal & Public Sector Practice (D.C. Metro)",
      branchType: "Regional Office",
      streetAddress: "1200 G Street NW, Suite 800",
      city: "Washington",
      state: "DC",
      postalCode: "20005",
      phone: "+1 (202) 555-0182",
      email: "federal@viobts.com",
      googlePlaceId: "ChIJW-T2WtG3t4kRx0P5",
      isHeadquarters: false,
    },
    {
      id: "branch-dallas-hub",
      name: "Southern Cloud & AI Center (Dallas Hub)",
      branchType: "Regional Office",
      streetAddress: "5000 Legacy Dr, Suite 400",
      city: "Plano",
      state: "TX",
      postalCode: "75024",
      phone: "+1 (469) 555-0193",
      email: "dallas@viobts.com",
      googlePlaceId: "ChIJ8aZgVqgXTIYRYp81",
      isHeadquarters: false,
    }
  ]
};

// Generate Valid Schema.org JSON-LD for Local Business & Professional Service
export function generateLocalBusinessSchema(settings: LocalSEOSettings, siteUrl: string): string {
  const baseUri = siteUrl.replace(/\/+$/, "");

  const schemaObj: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": [settings.businessType || "ProfessionalService", "LocalBusiness"],
    "@id": `${baseUri}/#localbusiness`,
    "name": settings.businessName,
    "legalName": settings.businessName,
    "alternateName": "VIO",
    "url": baseUri,
    "logo": `${baseUri}/images/vio-logo.png`,
    "image": `${baseUri}/images/og-preview.png`,
    "description": "Richmond, Virginia-based enterprise technology accelerator partner specializing in Technology Workforce, Cloud Modernization, Big Data Lakehouses, Open-source Integration, and AI/ML.",
    "telephone": settings.phone,
    "email": settings.email,
    "priceRange": settings.priceRange,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": settings.streetAddress,
      "addressLocality": settings.city,
      "addressRegion": settings.state,
      "postalCode": settings.postalCode,
      "addressCountry": settings.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": settings.latitude,
      "longitude": settings.longitude
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:30",
        "closes": "17:30"
      }
    ],
    "areaServed": settings.serviceAreas.map((area) => ({
      "@type": "AdministrativeArea",
      "name": area
    })),
    "hasMap": settings.googleBusinessProfileUrl,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": settings.averageRating.toString(),
      "reviewCount": settings.reviewCount.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "sameAs": [
      "https://www.linkedin.com/company/viobts/",
      settings.googleBusinessProfileUrl,
      settings.appleMapsUrl
    ]
  };

  if (settings.branches && settings.branches.length > 1) {
    const secondaryBranches = settings.branches.filter((b) => !b.isHeadquarters);
    if (secondaryBranches.length > 0) {
      schemaObj["subOrganization"] = secondaryBranches.map((branch) => ({
        "@type": "ProfessionalService",
        "name": `${settings.businessName} - ${branch.name}`,
        "telephone": branch.phone,
        "email": branch.email || settings.email,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": branch.streetAddress,
          "addressLocality": branch.city,
          "addressRegion": branch.state,
          "postalCode": branch.postalCode,
          "addressCountry": "US"
        }
      }));
    }
  }

  return JSON.stringify(schemaObj, null, 2);
}
