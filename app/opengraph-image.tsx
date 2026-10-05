import { ImageResponse } from "next/og";
import { BRASS, MonogramArt, NAVY, SALT, loadOgFonts } from "@/lib/og";

// Open Graph image after public/brand/02-name-lockup.jpg (the navy field mark).
export const alt = "The Lawton Collection. Michelle Lawton, Cape Cod and the South Shore.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: NAVY,
          fontFamily: "Cormorant",
        }}
      >
        <MonogramArt height={230} />
        <div style={{ marginTop: 44, fontSize: 58, letterSpacing: 9, color: SALT }}>THE LAWTON COLLECTION</div>
        <div style={{ marginTop: 14, fontSize: 36, color: BRASS }}>Michelle Lawton · Cape Cod &amp; the South Shore</div>
        <div style={{ marginTop: 30, width: 380, height: 1, background: BRASS, opacity: 0.8 }} />
      </div>
    ),
    { ...size, fonts: await loadOgFonts() },
  );
}
