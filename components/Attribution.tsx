"use client";

import { useEffect } from "react";

// Remembers how a visitor found the site (a Facebook post, a flyer's link,
// Google) for the length of their visit, so a lead can say where it came
// from. Reads utm_* parameters and the referring site; stores nothing about
// the person and nothing that lasts beyond the browser tab.
export const ATTRIBUTION_KEY = "lc_attribution";

export type Attribution = {
  source: string;
  medium: string;
  campaign: string;
  referrer: string;
  landing: string;
};

export function readAttribution(): Attribution | null {
  try {
    const raw = sessionStorage.getItem(ATTRIBUTION_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

export function Attribution() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(ATTRIBUTION_KEY)) return;
      const params = new URLSearchParams(window.location.search);
      let referrer = "";
      try {
        const ref = document.referrer ? new URL(document.referrer) : null;
        if (ref && ref.hostname !== window.location.hostname) referrer = ref.hostname.replace(/^www\./, "");
      } catch {}
      const data: Attribution = {
        source: (params.get("utm_source") || "").slice(0, 60),
        medium: (params.get("utm_medium") || "").slice(0, 60),
        campaign: (params.get("utm_campaign") || "").slice(0, 80),
        referrer,
        landing: window.location.pathname.slice(0, 120),
      };
      sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(data));
    } catch {}
  }, []);
  return null;
}
