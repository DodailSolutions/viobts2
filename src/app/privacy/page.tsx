import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  FileText, 
  CheckCircle2, 
  ChevronRight, 
  Mail, 
  Phone, 
  MapPin,
  Calendar
} from "lucide-react";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Privacy Policy | VIO Business & Technology Solutions",
  description: "Learn how VIO LLC collects, protects, and governs your data. Compliant with Virginia CDPA, HIPAA guidelines, and enterprise security baselines.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | VIO",
    description: "Enterprise privacy practices and data protection governance at VIO LLC.",
    url: "https://viobts.com/privacy",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "September 28, 2026";

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      {/* Hero Header */}
      <section className="relative py-14 sm:py-18 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8">
          <Link href="/" className="hover:text-[#0c34cd] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#0c34cd] font-bold">Privacy Policy</span>
        </nav>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 mb-6">
          <ShieldCheck className="w-4 h-4 text-[#0c34cd]" />
          <span className="text-xs font-bold text-[#0c34cd] uppercase tracking-wider">
            ENTERPRISE DATA GOVERNANCE
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[#071739] tracking-tight leading-[1.15] mb-4">
          Privacy Policy
        </h1>

        <div className="flex items-center gap-3 text-xs text-slate-500">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span>Last Updated: {lastUpdated}</span>
          <span className="text-slate-300">•</span>
          <span>VIO LLC • Richmond, Virginia</span>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12 text-slate-700 leading-relaxed font-normal">
        {/* Overview */}
        <div className="p-8 rounded-3xl bg-blue-50/50 border border-blue-200/70 space-y-3">
          <h2 className="text-lg font-bold text-[#071739] flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#0c34cd]" />
            <span>Our Commitment to Confidentiality & Data Integrity</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-700">
            VIO LLC (&ldquo;VIO&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), headquartered in Richmond, Virginia, is committed to safeguarding the privacy and confidentiality of our enterprise clients, prospective partners, and web visitors. This Privacy Policy details our policies regarding the collection, use, and disclosure of personal and business information when you interact with our websites, software portals, and professional consulting services.
          </p>
        </div>

        {/* Section 1 */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-[#071739] tracking-tight flex items-center gap-2.5">
            <span className="text-xs font-mono font-bold text-[#0c34cd] px-2 py-0.5 rounded bg-blue-50">01</span>
            <span>Information We Collect</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            We collect only information essential to providing enterprise engineering services, staffing engagements, and answering direct business inquiries:
          </p>
          <ul className="space-y-2.5 pl-2">
            <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-[#0c34cd] mt-0.5 shrink-0" />
              <span><strong>Contact & Business Profile Data:</strong> Full name, professional email address, corporate telephone number, job title, and organization name submitted via contact forms, RFP requests, or Calendly scheduling links.</span>
            </li>
            <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-[#0c34cd] mt-0.5 shrink-0" />
              <span><strong>Project & Architectural Scoping Details:</strong> Information voluntarily provided regarding technical requirements, cloud platforms, staffing specifications, or data architecture goals.</span>
            </li>
            <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-[#0c34cd] mt-0.5 shrink-0" />
              <span><strong>Technical & Usage Telemetry:</strong> Anonymized server logs, browser user-agent signatures, IP addresses, referrers, and page interaction timestamps gathered to optimize site reliability and prevent malicious traffic.</span>
            </li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-[#071739] tracking-tight flex items-center gap-2.5">
            <span className="text-xs font-mono font-bold text-[#0c34cd] px-2 py-0.5 rounded bg-blue-50">02</span>
            <span>How We Use Your Information</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            All gathered information is processed under lawful bases—principally contractual necessity and legitimate business interest:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="text-xs font-bold text-[#071739] uppercase tracking-wider mb-1.5">Direct Communication</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Responding to client proposals, scheduling discovery consultations, and fulfilling contractual statements of work (SOWs).</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="text-xs font-bold text-[#071739] uppercase tracking-wider mb-1.5">Enterprise Delivery</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Executing technology workforce augmentation, cloud architecture engineering, and data pipeline integrations.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="text-xs font-bold text-[#071739] uppercase tracking-wider mb-1.5">Compliance & Auditing</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Maintaining rigorous compliance records for Virginia SWaM state procurement, federal guidelines, and corporate governance.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="text-xs font-bold text-[#071739] uppercase tracking-wider mb-1.5">Security & Fraud Prevention</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Detecting network intrusion attempts, safeguarding administrative CMS endpoints, and protecting proprietary assets.</p>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-[#071739] tracking-tight flex items-center gap-2.5">
            <span className="text-xs font-mono font-bold text-[#0c34cd] px-2 py-0.5 rounded bg-blue-50">03</span>
            <span>Zero Data Sale & Controlled Disclosure</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            <strong>VIO does not sell, rent, monetize, or trade your personal or business data under any circumstance.</strong>
          </p>
          <p className="text-sm leading-relaxed text-slate-600">
            We only disclose data to trusted service providers who operate under strict non-disclosure and security compliance agreements—such as cloud hosting infrastructure (Vercel, Supabase, AWS GovCloud) and calendar scheduling tools (Calendly)—solely to fulfill requested services.
          </p>
        </div>

        {/* Section 4 */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-[#071739] tracking-tight flex items-center gap-2.5">
            <span className="text-xs font-mono font-bold text-[#0c34cd] px-2 py-0.5 rounded bg-blue-50">04</span>
            <span>Security & Compliance Framework</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            As an engineering firm catering to government agencies and Fortune 500 capital markets clients, we enforce defense-in-depth security standards:
          </p>
          <ul className="space-y-2 pl-2">
            <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-[#0c34cd] mt-0.5 shrink-0" />
              <span><strong>Encryption:</strong> TLS 1.3 encryption in transit for all web endpoints and AES-256 encryption for data at rest.</span>
            </li>
            <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-[#0c34cd] mt-0.5 shrink-0" />
              <span><strong>Access Control:</strong> Strict role-based access control (RBAC), multi-factor authentication (MFA), and audit logging.</span>
            </li>
            <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-[#0c34cd] mt-0.5 shrink-0" />
              <span><strong>Regulatory Alignment:</strong> Architectures mapped to NIST 800-53, HIPAA data vaults, and SOC2 compliance controls.</span>
            </li>
          </ul>
        </div>

        {/* Section 5 */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-[#071739] tracking-tight flex items-center gap-2.5">
            <span className="text-xs font-mono font-bold text-[#0c34cd] px-2 py-0.5 rounded bg-blue-50">05</span>
            <span>Your Rights (Virginia CDPA, CCPA & GDPR)</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            Depending on your jurisdiction (including the Virginia Consumer Data Protection Act, California Consumer Privacy Act, and GDPR), you possess the right to:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-700 pl-2">
            <li>Request confirmation whether VIO processes your personal data and obtain a copy.</li>
            <li>Request prompt rectification of any inaccurate information.</li>
            <li>Request deletion of personal information where no ongoing contractual or statutory obligation applies.</li>
            <li>Opt out of marketing communications at any time.</li>
          </ul>
        </div>

        {/* Contact Info Card */}
        <div className="p-8 rounded-3xl bg-[#f8fafc] border border-slate-200 space-y-4">
          <h2 className="text-lg font-bold text-[#071739]">Contact VIO Privacy & Security Office</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            For inquiries regarding our privacy posture, data processing agreements, or to exercise your rights, please reach out to our Richmond headquarters:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-800">
              <Mail className="w-4 h-4 text-[#0c34cd]" />
              <span>info@viobts.com</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-800">
              <Phone className="w-4 h-4 text-[#0c34cd]" />
              <span>+1 804 821 6588</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-800">
              <MapPin className="w-4 h-4 text-[#0c34cd]" />
              <span>Richmond, Virginia, USA</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        eyebrow="ENTERPRISE COMPLIANCE & ARCHITECTURE"
        heading="Deploy technology with total security confidence."
        subheading="Book an architectural discovery consultation to review your compliance and cloud requirements."
        primaryCtaText="Book a Consultation"
        primaryCtaLink="https://calendly.com/viobts/consultation"
        secondaryCtaText="Explore Services"
        secondaryCtaLink="/services"
      />
    </div>
  );
}
