import { ImageResponse } from "next/og";
import { MonogramArt, NAVY } from "@/lib/og";

// Large home-screen icon: brass LC on harbor navy.
export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: NAVY }}>
        <MonogramArt height={340} />
      </div>
    ),
    { width: 512, height: 512 },
  );
}
