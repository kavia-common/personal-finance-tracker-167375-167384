export const theme = {
  name: "Ocean Professional",
  colors: {
    primary: "#2563EB",
    secondary: "#F59E0B",
    success: "#22C55E",
    error: "#EF4444",
    background: "#f9fafb",
    surface: "#ffffff",
    text: "#111827",
    textMuted: "#6B7280",
    border: "#E5E7EB",
    shadow: "rgba(0, 0, 0, 0.06)",
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
    sm: "0 1px 2px rgba(0,0,0,0.04)",
    md: "0 4px 10px rgba(0,0,0,0.06)",
    lg: "0 10px 20px rgba(0,0,0,0.08)",
  },
  gradient: "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(249,250,251,1))",
};
