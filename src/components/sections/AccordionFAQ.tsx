"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface AccordionFAQProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  faqs?: FAQItem[];
}

export function AccordionFAQ({
  eyebrow = "FREQUENTLY ASKED QUESTIONS",
  heading = "Everything You Need to Know About Partnering with VIO",
  subheading = "Clear answers about our workforce engagement, security compliance, and technology methodologies.",
  faqs = [
    {
      question: "What is VIO's VA-SWaM certification and what does it mean for contracts?",
      answer: "VIO is a certified woman-owned Small, Women-owned, and Minority-owned (SWaM) business headquartered in Richmond, Virginia. This allows state, federal, and prime enterprise contractors to fulfill mandatory diversity tier-1 and tier-2 vendor goals while partnering with an elite engineering firm.",
    },
    {
      question: "How does VIO integrate into our existing technical workflows?",
      answer: "We offer both dedicated technical squads and specialized pods that integrate natively into your Jira, Slack, CI/CD, and Git repositories. We adhere to your security guardrails and agile sprint rhythms.",
    },
    {
      question: "What differentiates VIO from generic IT staffing or consultancy firms?",
      answer: "Unlike traditional body shops, VIO operates on our Measure → Analyse → Improve philosophy led by principal architects. Every engineer is technically vetted and supported by our architecture board, guaranteeing delivery accountability and measurable ROI.",
    },
    {
      question: "Can VIO work with classified or highly regulated federal/state data?",
      answer: "Yes, our team has proven experience delivering compliant platforms for Virginia State Agencies (ODGA), USAID, and financial institutions adhering to NIST 800-53, HIPAA, and SOC2 requirements.",
    },
  ],
}: AccordionFAQProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="relative py-24 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {eyebrow && (
            <p className="text-xs font-bold tracking-[0.25em] text-blue-600 uppercase mb-3">
              {eyebrow}
            </p>
          )}
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight mb-4">
            {heading}
          </h2>
          {subheading && (
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              {subheading}
            </p>
          )}
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200/80 shadow-sm overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 hover:text-blue-600 transition-colors"
                >
                  <span className="text-base sm:text-lg">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-blue-600 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-0 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
