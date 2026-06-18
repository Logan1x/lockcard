import type { GradientPreset, FontPreset } from "../types";
import { GRADIENT_PRESETS, FONT_PRESETS } from "../types";

interface Props {
  gradient: GradientPreset;
  font: FontPreset;
  onGradientChange: (v: GradientPreset) => void;
  onFontChange: (v: FontPreset) => void;
}

export function Controls({
  gradient,
  font,
  onGradientChange,
  onFontChange,
}: Props) {
  return (
    <div className="space-y-5">
      {/* Gradient Presets */}
      <div>
        <label className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-2 block">
          Gradient
        </label>
        <div className="grid grid-cols-4 gap-2">
          {(Object.keys(GRADIENT_PRESETS) as GradientPreset[]).map((key) => (
            <button
              key={key}
              onClick={() => onGradientChange(key)}
              className={`
                py-2.5 px-1 rounded-xl text-xs font-medium transition-all cursor-pointer
                ${
                  gradient === key
                    ? "bg-[var(--color-accent)] text-white"
                    : "bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-text-muted)]"
                }
              `}
            >
              {GRADIENT_PRESETS[key].label}
            </button>
          ))}
        </div>
      </div>

      {/* Font Presets */}
      <div>
        <label className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-2 block">
          Font
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(FONT_PRESETS) as FontPreset[]).map((key) => (
            <button
              key={key}
              onClick={() => onFontChange(key)}
              className={`
                py-2.5 px-1 rounded-xl text-xs font-medium transition-all cursor-pointer
                ${
                  font === key
                    ? "bg-[var(--color-accent)] text-white"
                    : "bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-text-muted)]"
                }
              `}
            >
              {FONT_PRESETS[key].label}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
