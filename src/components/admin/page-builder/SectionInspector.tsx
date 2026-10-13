"use client";

import React, { useEffect, useState } from "react";
import { AlertTriangle, Info } from "lucide-react";
import {
  PageSectionItem,
  ClientLogoItem,
  ClientTestimonialItem,
  DEFAULT_CLIENT_LOGOS,
  DEFAULT_CLIENT_TESTIMONIALS,
} from "@/lib/data";
import { TextInput, TextArea, SelectInput, FieldGroup, AddButton, RepeaterItem } from "./fields";

interface SectionInspectorProps {
  section: PageSectionItem;
  onPropChange: (key: string, value: any) => void;
  onReplaceProps: (props: Record<string, any>) => void;
}

const CUSTOM_FORM_TYPES = [
  "HeroBanner",
  "StatsCounter",
  "CTABanner",
  "SplitImageText",
  "AccordionFAQ",
  "RichTextContent",
  "MeetOurClients",
];

export function SectionInspector({ section, onPropChange, onReplaceProps }: SectionInspectorProps) {
  const [tab, setTab] = useState<"content" | "json">("content");

  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 gap-1 border-b border-slate-200 px-5">
        {(["content", "json"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`-mb-px border-b-2 px-1 py-2.5 mr-4 text-[13px] font-medium transition-colors ${
              tab === t ? "border-[#0c34cd] text-slate-900" : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {t === "content" ? "Content" : "Advanced (JSON)"}
          </button>
        ))}
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        {tab === "content" ? (
          <ContentForm section={section} onPropChange={onPropChange} />
        ) : (
          <JsonEditor section={section} onReplaceProps={onReplaceProps} />
        )}
      </div>
    </div>
  );
}

function ContentForm({ section, onPropChange }: { section: PageSectionItem; onPropChange: (k: string, v: any) => void }) {
  const p = section.props;
  const set = (key: string) => (value: any) => onPropChange(key, value);

  const updateList = <T,>(key: string, fallback: T[], fn: (list: T[]) => void) => {
    const list = [...((p[key] as T[]) || fallback)];
    fn(list);
    onPropChange(key, list);
  };

  const headingFields = (
    <FieldGroup title="Heading">
      <TextInput label="Eyebrow" value={p.eyebrow} onChange={set("eyebrow")} hint="Small label shown above the heading" />
      <TextInput label="Heading" value={p.heading} onChange={set("heading")} />
    </FieldGroup>
  );

  const ctaFields = (prefix: "primary" | "secondary", title: string) => (
    <FieldGroup title={title}>
      <div className="grid grid-cols-2 gap-3">
        <TextInput label="Label" value={p[`${prefix}CtaText`]} onChange={set(`${prefix}CtaText`)} />
        <TextInput label="Link" value={p[`${prefix}CtaLink`]} onChange={set(`${prefix}CtaLink`)} mono placeholder="/contact" />
      </div>
    </FieldGroup>
  );

  switch (section.componentType) {
    case "HeroBanner":
      return (
        <>
          <FieldGroup title="Text">
            <TextInput label="Eyebrow" value={p.eyebrow} onChange={set("eyebrow")} />
            <TextInput label="Headline" value={p.headline} onChange={set("headline")} />
            <TextInput label="Highlighted word" value={p.highlightText} onChange={set("highlightText")} hint="Must appear in the headline; it is shown in the accent colour" />
            <TextArea label="Subheading" value={p.subheading} onChange={set("subheading")} />
            <TextInput label="Badge" value={p.badge} onChange={set("badge")} />
          </FieldGroup>
          {ctaFields("primary", "Primary button")}
          {ctaFields("secondary", "Secondary button")}
          <FieldGroup title="Media">
            <TextInput label="Image path" value={p.imageSrc} onChange={set("imageSrc")} mono placeholder="/images/hero-graphic.png" />
          </FieldGroup>
        </>
      );

    case "CTABanner":
      return (
        <>
          <FieldGroup title="Text">
            <TextInput label="Eyebrow" value={p.eyebrow} onChange={set("eyebrow")} />
            <TextInput label="Heading" value={p.heading} onChange={set("heading")} />
            <TextArea label="Subheading" value={p.subheading} onChange={set("subheading")} rows={2} />
          </FieldGroup>
          {ctaFields("primary", "Primary button")}
          {ctaFields("secondary", "Secondary button")}
        </>
      );

    case "StatsCounter": {
      const stats: any[] = p.stats || [];
      return (
        <>
          {headingFields}
          <FieldGroup
            title={`Metrics (${stats.length})`}
            action={
              <AddButton
                label="Add"
                onClick={() => updateList<any>("stats", [], (l) => l.push({ label: "New metric", value: "100%", description: "" }))}
              />
            }
          >
            <div className="space-y-2">
              {stats.map((st, i) => (
                <RepeaterItem
                  key={i}
                  title={`${st.value || ""} ${st.label || ""}`.trim()}
                  subtitle={st.description}
                  onDelete={() => updateList("stats", [], (l) => l.splice(i, 1))}
                >
                  <div className="grid grid-cols-2 gap-3">
                    <TextInput label="Value" value={st.value} placeholder="10+" onChange={(v) => updateList<any>("stats", [], (l) => (l[i] = { ...l[i], value: v }))} />
                    <TextInput label="Label" value={st.label} onChange={(v) => updateList<any>("stats", [], (l) => (l[i] = { ...l[i], label: v }))} />
                  </div>
                  <TextInput label="Description" value={st.description} onChange={(v) => updateList<any>("stats", [], (l) => (l[i] = { ...l[i], description: v }))} />
                </RepeaterItem>
              ))}
            </div>
          </FieldGroup>
        </>
      );
    }

    case "SplitImageText": {
      const bullets: string[] = p.bullets || [];
      return (
        <>
          <FieldGroup title="Text">
            <TextInput label="Eyebrow" value={p.eyebrow} onChange={set("eyebrow")} />
            <TextInput label="Heading" value={p.heading} onChange={set("heading")} />
            <TextArea label="Paragraph" value={p.description} onChange={set("description")} rows={4} />
          </FieldGroup>
          <FieldGroup
            title={`Bullet points (${bullets.length})`}
            action={<AddButton label="Add" onClick={() => updateList<string>("bullets", [], (l) => l.push(""))} />}
          >
            <div className="space-y-2">
              {bullets.map((b, i) => (
                <div key={i} className="group flex items-center gap-2">
                  <input
                    type="text"
                    value={b}
                    placeholder="Bullet text"
                    onChange={(e) => updateList<string>("bullets", [], (l) => (l[i] = e.target.value))}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-900 focus:border-[#0c34cd] focus:outline-none focus:ring-2 focus:ring-[#0c34cd]/15"
                  />
                  <button
                    type="button"
                    onClick={() => updateList<string>("bullets", [], (l) => l.splice(i, 1))}
                    className="shrink-0 rounded-md px-1.5 py-1 text-xs text-slate-400 hover:bg-red-50 hover:text-red-600"
                    aria-label="Remove bullet"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </FieldGroup>
          <FieldGroup title="Media">
            <TextInput label="Image URL" value={p.imageUrl} onChange={set("imageUrl")} mono />
            <SelectInput
              label="Image position"
              value={p.imagePosition || "right"}
              onChange={set("imagePosition")}
              options={[
                { value: "right", label: "Right of text" },
                { value: "left", label: "Left of text" },
              ]}
            />
          </FieldGroup>
        </>
      );
    }

    case "AccordionFAQ": {
      const faqs: any[] = p.faqs || [];
      return (
        <>
          {headingFields}
          <FieldGroup
            title={`Questions (${faqs.length})`}
            action={<AddButton label="Add" onClick={() => updateList<any>("faqs", [], (l) => l.push({ question: "New question?", answer: "" }))} />}
          >
            <div className="space-y-2">
              {faqs.map((f, i) => (
                <RepeaterItem key={i} title={f.question} onDelete={() => updateList("faqs", [], (l) => l.splice(i, 1))}>
                  <TextInput label="Question" value={f.question} onChange={(v) => updateList<any>("faqs", [], (l) => (l[i] = { ...l[i], question: v }))} />
                  <TextArea label="Answer" value={f.answer} onChange={(v) => updateList<any>("faqs", [], (l) => (l[i] = { ...l[i], answer: v }))} />
                </RepeaterItem>
              ))}
            </div>
          </FieldGroup>
        </>
      );
    }

    case "RichTextContent":
      return (
        <>
          {headingFields}
          <FieldGroup title="Body">
            <TextArea label="HTML content" value={p.content} onChange={set("content")} rows={10} mono placeholder="<p>Your content…</p>" />
          </FieldGroup>
        </>
      );

    case "MeetOurClients": {
      const logos: ClientLogoItem[] = p.logos || DEFAULT_CLIENT_LOGOS;
      const testimonials: ClientTestimonialItem[] = p.testimonials || DEFAULT_CLIENT_TESTIMONIALS;
      const setLogo = (i: number, patch: Partial<ClientLogoItem>) =>
        updateList<ClientLogoItem>("logos", DEFAULT_CLIENT_LOGOS, (l) => (l[i] = { ...l[i], ...patch }));
      const setTestimonial = (i: number, patch: Partial<ClientTestimonialItem>) =>
        updateList<ClientTestimonialItem>("testimonials", DEFAULT_CLIENT_TESTIMONIALS, (l) => (l[i] = { ...l[i], ...patch }));

      return (
        <>
          <FieldGroup
            title={`Client logos (${logos.length})`}
            action={
              <AddButton
                label="Add"
                onClick={() =>
                  updateList<ClientLogoItem>("logos", DEFAULT_CLIENT_LOGOS, (l) =>
                    l.push({
                      id: "client-" + Date.now(),
                      name: "New client",
                      svgSrc: "/images/clients/usaid.svg",
                      category: "Enterprise & Retail",
                      headline: "",
                      summary: "",
                      metrics: [],
                    })
                  )
                }
              />
            }
          >
            <div className="space-y-2">
              {logos.map((logo, i) => (
                <RepeaterItem
                  key={logo.id || i}
                  title={logo.name}
                  subtitle={logo.category}
                  onDelete={() => updateList<ClientLogoItem>("logos", DEFAULT_CLIENT_LOGOS, (l) => l.splice(i, 1))}
                >
                  <TextInput label="Name" value={logo.name} onChange={(v) => setLogo(i, { name: v })} />
                  <TextInput label="Logo path" value={logo.svgSrc} onChange={(v) => setLogo(i, { svgSrc: v })} mono />
                  <TextInput label="Category" value={logo.category} onChange={(v) => setLogo(i, { category: v })} />
                  <TextInput label="Headline" value={logo.headline} onChange={(v) => setLogo(i, { headline: v })} />
                  <TextArea label="Summary" value={logo.summary} onChange={(v) => setLogo(i, { summary: v })} rows={2} />
                </RepeaterItem>
              ))}
            </div>
          </FieldGroup>

          <FieldGroup
            title={`Testimonials (${testimonials.length})`}
            action={
              <AddButton
                label="Add"
                onClick={() =>
                  updateList<ClientTestimonialItem>("testimonials", DEFAULT_CLIENT_TESTIMONIALS, (l) =>
                    l.push({
                      id: "test-" + Date.now(),
                      name: "New person",
                      role: "Role",
                      company: "Company",
                      imageSrc: "",
                      badgeRole: "",
                      badgeCompany: "",
                      quote: "",
                      linkedinUrl: "",
                    })
                  )
                }
              />
            }
          >
            <div className="space-y-2">
              {testimonials.map((t, i) => (
                <RepeaterItem
                  key={t.id || i}
                  title={t.name}
                  subtitle={[t.role, t.company].filter(Boolean).join(" · ")}
                  onDelete={() =>
                    updateList<ClientTestimonialItem>("testimonials", DEFAULT_CLIENT_TESTIMONIALS, (l) => l.splice(i, 1))
                  }
                >
                  <div className="grid grid-cols-2 gap-3">
                    <TextInput label="Name" value={t.name} onChange={(v) => setTestimonial(i, { name: v })} />
                    <TextInput label="Role" value={t.role} onChange={(v) => setTestimonial(i, { role: v })} />
                  </div>
                  <TextInput label="Company" value={t.company} onChange={(v) => setTestimonial(i, { company: v })} />
                  <TextArea label="Quote" value={t.quote} onChange={(v) => setTestimonial(i, { quote: v })} rows={4} />
                  <TextInput label="Photo path" value={t.imageSrc} onChange={(v) => setTestimonial(i, { imageSrc: v })} mono />
                  <TextInput label="LinkedIn URL" value={t.linkedinUrl} onChange={(v) => setTestimonial(i, { linkedinUrl: v })} mono />
                </RepeaterItem>
              ))}
            </div>
          </FieldGroup>
        </>
      );
    }
  }

  // Generic fallback for data-bound blocks (CapabilitiesGrid, Methodology, …)
  if (!CUSTOM_FORM_TYPES.includes(section.componentType)) {
    const headingKey = p.headline !== undefined ? "headline" : "heading";
    return (
      <>
        <FieldGroup title="Text">
          {p.eyebrow !== undefined && <TextInput label="Eyebrow" value={p.eyebrow} onChange={set("eyebrow")} />}
          <TextInput label="Heading" value={p[headingKey]} onChange={set(headingKey)} />
          {p.subheading !== undefined && <TextArea label="Subheading" value={p.subheading} onChange={set("subheading")} rows={2} />}
        </FieldGroup>
        {p.ctaText !== undefined && (
          <FieldGroup title="Button">
            <div className="grid grid-cols-2 gap-3">
              <TextInput label="Label" value={p.ctaText} onChange={set("ctaText")} />
              <TextInput label="Link" value={p.ctaLink} onChange={set("ctaLink")} mono />
            </div>
          </FieldGroup>
        )}
        <div className="mx-5 my-5 flex gap-2.5 rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-500">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
          <p>The items in this block come from the CMS (services, case studies, industries). Edit them in their own admin section.</p>
        </div>
      </>
    );
  }
  return null;
}

function JsonEditor({ section, onReplaceProps }: { section: PageSectionItem; onReplaceProps: (p: Record<string, any>) => void }) {
  const [draft, setDraft] = useState(() => JSON.stringify(section.props, null, 2));
  const [error, setError] = useState<string | null>(null);
  const original = JSON.stringify(section.props, null, 2);
  const dirty = draft !== original;

  useEffect(() => {
    setDraft(JSON.stringify(section.props, null, 2));
    setError(null);
  }, [section.id, section.props]);

  const apply = () => {
    try {
      onReplaceProps(JSON.parse(draft));
      setError(null);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="flex h-full flex-col gap-3 p-5">
      <p className="text-xs text-slate-500">Edit the raw properties for this section. Invalid JSON will not be saved.</p>
      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        spellCheck={false}
        className="min-h-[320px] flex-1 resize-none rounded-lg border border-slate-200 bg-slate-50 p-3 font-mono text-[11px] leading-relaxed text-slate-800 focus:border-[#0c34cd] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0c34cd]/15"
      />
      <div className="flex justify-end gap-2">
        <button
          disabled={!dirty}
          onClick={() => {
            setDraft(original);
            setError(null);
          }}
          className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-40"
        >
          Reset
        </button>
        <button
          disabled={!dirty}
          onClick={apply}
          className="rounded-lg bg-[#0c34cd] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#0a2bb0] disabled:opacity-40"
        >
          Apply changes
        </button>
      </div>
    </div>
  );
}
