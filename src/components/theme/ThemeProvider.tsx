"use client";

import React, { useEffect, useState } from "react";
import { cmsStore, AppGeneralSettings, INITIAL_GENERAL_SETTINGS } from "@/lib/data";

const FONT_STACK_MAP: Record<string, string> = {
  "Plus Jakarta Sans": "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  "Poppins": "'Poppins', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  "Inter": "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  "Outfit": "'Outfit', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  "Montserrat": "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  "Roboto": "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
  "System Sans": "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
};

const FONT_SIZE_MAP: Record<string, string> = {
  "compact": "95%",
  "standard": "100%",
  "spacious": "105%"
};

const HEADING_WEIGHT_MAP: Record<string, string> = {
  "bold": "700",
  "extrabold": "800",
  "black": "900"
};

const LETTER_SPACING_MAP: Record<string, string> = {
  "tight": "-0.025em",
  "normal": "0em",
  "wide": "0.035em"
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [settings, setSettings] = useState<AppGeneralSettings>(() => {
    try {
      return cmsStore.getGeneralSettings();
    } catch {
      return INITIAL_GENERAL_SETTINGS;
    }
  });

  useEffect(() => {
    setMounted(true);
    try {
      const live = cmsStore.getGeneralSettings();
      if (live) setSettings(live);
    } catch {
      // keep fallback
    }
  }, []);

  const typo = settings.typography || INITIAL_GENERAL_SETTINGS.typography;
  const headingFontStack = FONT_STACK_MAP[typo.headingFont] || FONT_STACK_MAP["Plus Jakarta Sans"];
  const bodyFontStack = FONT_STACK_MAP[typo.bodyFont] || FONT_STACK_MAP["Inter"];
  const fontSizeScale = FONT_SIZE_MAP[typo.fontSizeScale] || "100%";
  const headingWeight = HEADING_WEIGHT_MAP[typo.headingWeight] || "800";
  const letterSpacing = LETTER_SPACING_MAP[typo.letterSpacing] || "-0.025em";
  const primaryColor = settings.primaryBrandColor || "#0c34cd";

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          :root {
            --font-heading: ${headingFontStack};
            --font-body: ${bodyFontStack};
            --font-size-scale: ${fontSizeScale};
            --heading-weight: ${headingWeight};
            --heading-tracking: ${letterSpacing};
            --primary: ${primaryColor};
          }
          html {
            font-size: ${fontSizeScale};
          }
          h1, h2, h3, h4, h5, h6, .font-heading {
            font-family: var(--font-heading) !important;
            letter-spacing: var(--heading-tracking) !important;
          }
          body, p, span, a, input, button, select, textarea {
            font-family: var(--font-body);
          }
        `
      }} />
      {children}
    </>
  );
}
