import { ImageResponse } from "next/og";
import { BRASS, MonogramArt, NAVY, SALT, loadOgFonts } from "@/lib/og";
import { shareTitle } from "@/lib/share";

// Share image for an individual page: navy field, thin brass frame, the page
// name in large type, and Michelle's name underneath.
export const runtime = "nodejs";

export async function GET(request: Request) {
  const title = shareTitle(new URL(request.url).searchParams.get("page") ?? "") ?? "The Lawton Collection";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: NAVY, padding: 28, fontFamily: "Cormorant" }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: `2px solid ${BRASS}`,
            padding: "56px 64px",
          }}
        >
          <MonogramArt height={110} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: title.length > 34 ? 66 : 82, lineHeight: 1.05, color: SALT }}>{title}</div>
            <div style={{ marginTop: 22, width: 120, height: 2, background: BRASS }} />
            <div style={{ marginTop: 22, fontSize: 36, color: BRASS }}>Michelle Lawton · Cape Cod &amp; the South Shore</div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: await loadOgFonts(),
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=31536000, immutable" },
    },
  );
}
