import { ImageResponse } from "next/og";

export const alt = "Furniture OS — the operating system for furniture retail";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #242629 0%, #363B40 60%, #4a2a1a 100%)",
          color: "#F1ECDA",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#F1ECDA",
              color: "#242629",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 700,
            }}
          >
            F
          </div>
          <div style={{ fontSize: 34, fontWeight: 600 }}>Furniture OS</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 26, color: "#C1602A", textTransform: "uppercase", letterSpacing: 2 }}>
            The operating system for furniture retail
          </div>
          <div style={{ fontSize: 60, fontWeight: 600, lineHeight: 1.1, maxWidth: 1000 }}>
            One system that does the paperwork for you.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
