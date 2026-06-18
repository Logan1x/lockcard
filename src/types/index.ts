export type GradientPreset = "classic" | "subtle" | "bold" | "minimal";
export type FontPreset = "clean" | "bold" | "classic";

export const GRADIENT_PRESETS: Record<
  GradientPreset,
  { label: string; stops: { offset: number; color: string }[]; heightRatio: number }
> = {
  classic: {
    label: "Classic",
    heightRatio: 0.4,
    stops: [
      { offset: 0, color: "rgba(0,0,0,0)" },
      { offset: 0.4, color: "rgba(0,0,0,0.3)" },
      { offset: 1, color: "rgba(0,0,0,0.85)" },
    ],
  },
  subtle: {
    label: "Subtle",
    heightRatio: 0.35,
    stops: [
      { offset: 0, color: "rgba(0,0,0,0)" },
      { offset: 0.5, color: "rgba(0,0,0,0.15)" },
      { offset: 1, color: "rgba(0,0,0,0.6)" },
    ],
  },
  bold: {
    label: "Bold",
    heightRatio: 0.5,
    stops: [
      { offset: 0, color: "rgba(0,0,0,0)" },
      { offset: 0.3, color: "rgba(0,0,0,0.5)" },
      { offset: 1, color: "rgba(0,0,0,0.92)" },
    ],
  },
  minimal: {
    label: "Minimal",
    heightRatio: 0.18,
    stops: [
      { offset: 0, color: "rgba(0,0,0,0)" },
      { offset: 0.6, color: "rgba(0,0,0,0.2)" },
      { offset: 1, color: "rgba(0,0,0,0.7)" },
    ],
  },
};

export const FONT_PRESETS: Record<FontPreset, { label: string; family: string; weight: string }> = {
  clean: { label: "Clean", family: "Inter", weight: "600" },
  bold: { label: "Bold", family: "Poppins", weight: "700" },
  classic: { label: "Classic", family: "Roboto", weight: "500" },
};
