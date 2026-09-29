import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { 
  FileText, 
  ShieldCheck, 
  Scale, 
  CheckCircle2, 
  ChevronRight, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  Briefcase
} from "lucide-react";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Terms of Engagement | VIO Business & Technology Solutions",
  description: "Review VIO LLC's enterprise terms of engagement, consulting governance, statements of work, and professional delivery standards. Richmond, VA.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Engagement | VIO",
    description: "Enterprise professional services terms and consulting governance at VIO LLC.",
    url: "https://viobts.com/terms",
    type: "website",
  },
};

export default function TermsOfEngagementPage() {
  const lastUpdated = "September 28, 2026";

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      {/* Hero Header */}
      <section className="relative py-14 sm:py-18 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8">
          <Link href="/" className="hover:text-[#0c34cd] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#0c34cd] font-bold">Terms of Engagement</span>
        </nav>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 mb-6">
          <Scale className="w-4 h-4 text-[#0c34cd]" />
          <span className="text-xs font-bold text-[#0c34cd] uppercase tracking-wider">
            PROFESSIONAL SERVICES GOVERNANCE
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[#071739] tracking-tight leading-[1.15] mb-4">
          Terms of Engagement
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
        {/* Overview Banner */}
        <div className="p-8 rounded-3xl bg-blue-50/50 border border-blue-200/70 space-y-3">
          <h2 className="text-lg font-bold text-[#071739] flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#0c34cd]" />
            <span>Enterprise Professional Delivery Framework</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-700">
            These Terms of Engagement (&ldquo;Terms&rdquo;) govern the professional technology consulting services, workforce augmentation solutions, and software architecture deliverables provided by VIO LLC (&ldquo;VIO&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) to commercial enterprises, government agencies, and contracting partners. By engaging VIO or entering into a Statement of Work (&ldquo;SOW&rdquo;), clients agree to the conditions herein.
          </p>
        </div>

        {/* Section 1 */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-[#071739] tracking-tight flex items-center gap-2.5">
            <span className="text-xs font-mono font-bold text-[#0c34cd] px-2 py-0.5 rounded bg-blue-50">01</span>
            <span>Scope of Services &amp; Statements of Work</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            VIO delivers specialized technology capabilities across six core engineering practices:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-2">
            <li className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0c34cd] shrink-0" />
              <span>Technology Workforce (Full-Time, Contract, Pods)</span>
            </li>
            <li className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0c34cd] shrink-0" />
              <span>Big Data &amp; Modern Lakehouse Architectures</span>
            </li>
            <li className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0c34cd] shrink-0" />
              <span>Open-Source Stack Modernization &amp; Hardening</span>
            </li>
            <li className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0c34cd] shrink-0" />
              <span>Cloud Enablement &amp; Automated CI/CD Pipelines</span>
            </li>
            <li className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0c34cd] shrink-0" />
              <span>Modular API &amp; Microservices Interoperability</span>
            </li>
            <li className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0c34cd] shrink-0" />
              <span>RPA, Machine Learning &amp; Cognitive AI Automation</span>
            </li>
          </ul>
          <p className="text-xs text-slate-600 mt-2">
            Specific timelines, deliverables, resource allocations, and milestone criteria shall be detailed in executed Statements of Work (SOWs). In the event of a direct conflict between an executed SOW and these general terms, the SOW shall prevail for that engagement.
          </p>
        </div>

        {/* Section 2 */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-[#071739] tracking-tight flex items-center gap-2.5">
            <span className="text-xs font-mono font-bold text-[#0c34cd] px-2 py-0.5 rounded bg-blue-50">02</span>
            <span>Intellectual Property &amp; Work Product Ownership</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            <strong>Client Work Product:</strong> Upon receipt of full payment under the relevant SOW, all bespoke custom code, schemas, and configurations created specifically for the client by VIO shall constitute &ldquo;work made for hire&rdquo; and belong exclusively to the client.
          </p>
          <p className="text-sm leading-relaxed text-slate-600">
            <strong>VIO Pre-Existing Tooling:</strong> VIO retains all rights, title, and interest in its pre-existing proprietary frameworks, reusable architectural accelerators, benchmarking utilities, and knowledge methodologies developed prior to or independently of the engagement. VIO grants client a perpetual, non-exclusive, royalty-free license to utilize such components embedded within client deliverables.
          </p>
        </div>

        {/* Section 3 */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-[#071739] tracking-tight flex items-center gap-2.5">
            <span className="text-xs font-mono font-bold text-[#0c34cd] px-2 py-0.5 rounded bg-blue-50">03</span>
            <span>Confidentiality &amp; Non-Disclosure</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            Both parties agree to protect and maintain confidential all non-public proprietary information disclosed during discovery and delivery—including source code, architectural diagrams, financial data, and security audit records. Neither party shall disclose confidential information to any third party without express written authorization, except as required by law or judicial decree.
          </p>
        </div>

        {/* Section 4 */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-[#071739] tracking-tight flex items-center gap-2.5">
            <span className="text-xs font-mono font-bold text-[#0c34cd] px-2 py-0.5 rounded bg-blue-50">04</span>
            <span>Professional Warranties &amp; Service Standards</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            VIO warrants that all consulting services shall be performed in a professional, workmanlike manner adhering to prevailing enterprise standards and certified VA-SWaM quality practices. Engagements adhere to our empirical Measure → Analyse → Improve operational doctrine.
          </p>
        </div>

        {/* Section 5 */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-[#071739] tracking-tight flex items-center gap-2.5">
            <span className="text-xs font-mono font-bold text-[#0c34cd] px-2 py-0.5 rounded bg-blue-50">05</span>
            <span>Limitation of Liability</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            To the maximum extent permitted by applicable law, neither party shall be liable for indirect, incidental, consequential, special, or punitive damages (including loss of profits, revenue, or business interruption). Except for gross negligence or willful misconduct, each party&rsquo;s aggregate liability arising under any SOW shall not exceed the total fees paid or payable by client under the specific SOW in the twelve (12) months preceding the incident.
          </p>
        </div>

        {/* Section 6 */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-[#071739] tracking-tight flex items-center gap-2.5">
            <span className="text-xs font-mono font-bold text-[#0c34cd] px-2 py-0.5 rounded bg-blue-50">06</span>
            <span>Governing Law &amp; Jurisdiction</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            These Terms and any dispute arising out of or related to professional services shall be governed by and construed in accordance with the laws of the Commonwealth of Virginia, United States, without regard to conflict of laws principles. The state and federal courts located in the City of Richmond or the Eastern District of Virginia shall hold exclusive venue and jurisdiction.
          </p>
        </div>

        {/* Contact Information */}
        <div className="p-8 rounded-3xl bg-[#f8fafc] border border-slate-200 space-y-4">
          <h2 className="text-lg font-bold text-[#071739]">Contact VIO Legal &amp; Contracts Department</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            For contractual questions, vendor onboarding, or master service agreement (MSA) negotiations, please contact our Richmond executive office:
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
        eyebrow="READY TO ENGAGE"
        heading="Partner with a certified technology accelerator."
        subheading="Book a complimentary 30-minute discovery consultation to discuss your project scope and squad requirements."
        primaryCtaText="Book a Consultation"
        primaryCtaLink="https://calendly.com/viobts/consultation"
        secondaryCtaText="Contact Us"
        secondaryCtaLink="/contact"
      />
    </div>
  );
}
