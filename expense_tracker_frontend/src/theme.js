export const theme = {
  name: "Ocean Professional Dark",
  colors: {
    primary: "#3B82F6",
    secondary: "#F59E0B",
    success: "#22C55E",
    error: "#EF4444",
    background: "#0b1220",
    surface: "#0f172a",
    text: "#E5E7EB",
    textMuted: "#9CA3AF",
    border: "#1F2937",
    shadow: "rgba(0, 0, 0, 0.6)",
  },
  radii: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
    pill: "999px",
  },
  spacing: (n = 1) => `${n * 8}px`,
  shadow: {
    sm: "0 1px 2px rgba(0,0,0,0.3)",
    md: "0 4px 10px rgba(0,0,0,0.45)",
    lg: "0 12px 24px rgba(0,0,0,0.55)",
  },
  gradient: "linear-gradient(135deg, rgba(17,24,39,0.6), rgba(15,23,42,0.8))",
};
