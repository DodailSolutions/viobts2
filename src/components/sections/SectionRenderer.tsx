"use client";

import React from "react";
import { HeroBanner } from "./HeroBanner";
import { StatsCounter } from "./StatsCounter";
import { BusinessProblems } from "./BusinessProblems";
import { CapabilitiesGrid } from "./CapabilitiesGrid";
import { Methodology } from "./Methodology";
import { CaseStudyShowcase } from "./CaseStudyShowcase";
import { IndustryExplorer } from "./IndustryExplorer";
import { TestimonialsSlider } from "./TestimonialsSlider";
import { CTABanner } from "./CTABanner";
import { SplitImageText } from "./SplitImageText";
import { AccordionFAQ } from "./AccordionFAQ";
import { RichTextContent } from "./RichTextContent";
import { MeetOurClients } from "./MeetOurClients";
import { PageSectionItem } from "@/lib/data";

const COMPONENT_REGISTRY: Record<string, React.ComponentType<any>> = {
  HeroBanner,
  StatsCounter,
  MeetOurClients,
  BusinessProblems,
  CapabilitiesGrid,
  Methodology,
  CaseStudyShowcase,
  IndustryExplorer,
  TestimonialsSlider,
  CTABanner,
  SplitImageText,
  AccordionFAQ,
  RichTextContent,
};

interface SectionRendererProps {
  section: PageSectionItem;
}

export function SectionRenderer({ section }: SectionRendererProps) {
  if (!section.isVisible) return null;

  const Component = COMPONENT_REGISTRY[section.componentType];

  if (!Component) {
    return (
      <div className="py-12 px-6 text-center text-slate-500 border border-dashed border-slate-800 my-4 rounded-xl">
        <p className="text-xs uppercase tracking-widest font-mono">
          Unrecognized CMS Component: {section.componentType}
        </p>
      </div>
    );
  }

  return <Component {...section.props} />;
}
