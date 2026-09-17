import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DesktopHeader } from "@/components/layout/DesktopHeader";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { MobileNavDock } from "@/components/layout/MobileNavDock";
import { DesktopFooter } from "@/components/layout/DesktopFooter";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://viobts.com"),
  title: {
    default: "VIO | The Technology Accelerator for Your Business",
    template: "%s | VIO",
  },
  description:
    "Richmond, Virginia-headquartered, woman-owned VA-SWaM certified technology consulting partner. Specializing in Technology Workforce, Big Data, Open-source, Cloud Enablement, APIs, and AI/ML.",
  keywords: [
    "Technology Accelerator",
    "VA-SWaM Certified",
    "Richmond VA Tech Consulting",
    "Enterprise Cloud Enablement",
    "Big Data Lakehouse",
    "API Microservices",
    "AI and Machine Learning",
    "Technology Workforce",
  ],
  authors: [{ name: "VIO LLC" }],
  creator: "VIO LLC",
  publisher: "VIO LLC",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://viobts.com",
    siteName: "VIO",
    title: "VIO | The Technology Accelerator for Your Business",
    description:
      "Richmond, VA founder-led, woman-owned VA-SWaM enterprise technology consulting partner. Measure → Analyse → Improve.",
    images: [
      {
        url: "/images/vio-logo.png",
        width: 1200,
        height: 630,
        alt: "VIO - The Technology Accelerator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VIO | The Technology Accelerator for Your Business",
    description:
      "Richmond, VA founder-led, woman-owned VA-SWaM enterprise technology consulting partner.",
    images: ["/images/vio-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://viobts.com/#organization",
        "name": "VIO",
        "url": "https://viobts.com",
        "logo": "https://viobts.com/images/vio-logo.png",
        "description": "The technology accelerator for your business. Richmond, Virginia woman-owned VA-SWaM certified consulting partner.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Richmond",
          "addressRegion": "VA",
          "addressCountry": "US"
        },
        "slogan": "Think bigger, build Smarter, solve harder.",
        "knowsAbout": [
          "Technology Workforce",
          "Big Data & Analytics",
          "Open-source Integration",
          "Cloud Enablement & CI/CD",
          "API & Microservices",
          "RPA, ML & AI"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://viobts.com/#website",
        "url": "https://viobts.com",
        "name": "VIO",
        "publisher": {
          "@id": "https://viobts.com/#organization"
        }
      }
    ]
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white text-slate-900 font-sans antialiased flex flex-col selection:bg-blue-100 selection:text-blue-900">
        <MobileHeader />
        <DesktopHeader />
        
        {/* Main Content with Mobile Top and Bottom Clearance */}
        <main className="flex-1 pt-14 md:pt-0 pb-20 md:pb-0">
          {children}
        </main>

        <DesktopFooter />
        <MobileNavDock />
      </body>
    </html>
  );
}
