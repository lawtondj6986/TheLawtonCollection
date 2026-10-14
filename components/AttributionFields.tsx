"use client";

import { useEffect, useState } from "react";
import { readAttribution, type Attribution } from "./Attribution";

// Hidden fields that carry the visit's attribution into a form submission.
export function AttributionFields() {
  const [attr, setAttr] = useState<Attribution | null>(null);
  useEffect(() => setAttr(readAttribution()), []);
  if (!attr) return null;
  return (
    <>
      <input type="hidden" name="utm_source" value={attr.source} />
      <input type="hidden" name="utm_medium" value={attr.medium} />
      <input type="hidden" name="utm_campaign" value={attr.campaign} />
      <input type="hidden" name="referrer" value={attr.referrer} />
      <input type="hidden" name="landing" value={attr.landing} />
    </>
  );
}
