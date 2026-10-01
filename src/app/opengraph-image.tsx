import { ImageResponse } from "next/og";

export const alt = "Otavio Gonzaga — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "flex-start",
        background: "#282828",
        color: "#ebdbb2",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        padding: "88px",
        width: "100%",
      }}
    >
      <div style={{ color: "#8ec07c", display: "flex", fontSize: 30, fontWeight: 700 }}>
        otaviogonzaga.dev
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 82,
          fontWeight: 700,
          letterSpacing: "-4px",
          marginTop: 28,
        }}
      >
        Otavio Gonzaga
      </div>
      <div style={{ color: "#bdae93", display: "flex", fontSize: 36, marginTop: 22 }}>
        Software Engineer
      </div>
    </div>,
    size,
  );
}
