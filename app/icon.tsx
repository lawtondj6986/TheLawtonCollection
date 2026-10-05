import { ImageResponse } from "next/og";
import { MonogramArt, NAVY } from "@/lib/og";

// Favicon from the navy field mark: brass LC on harbor navy.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: NAVY }}>
        <MonogramArt height={50} />
      </div>
    ),
    size,
  );
}
