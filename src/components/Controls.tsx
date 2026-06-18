import type { GradientPreset, FontPreset } from "../types";
import { GRADIENT_PRESETS, FONT_PRESETS } from "../types";

interface Props {
  gradient: GradientPreset;
  font: FontPreset;
  onGradientChange: (v: GradientPreset) => void;
  onFontChange: (v: FontPreset) => void;
}

function gradientCSS(key: GradientPreset): string {
  const p = GRADIENT_PRESETS[key];
  const parts = p.stops.map(s => `${s.color} ${s.offset * 100}%`);
  return `linear-gradient(to top, ${parts.join(", ")})`;
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
                relative flex flex-col items-center gap-1.5 py-2.5 px-1 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer overflow-hidden
                ${gradient === key
                  ? "bg-[var(--color-accent)] text-white ring-2 ring-[var(--color-accent)]/30"
                  : "bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-text-muted)]"
                }
              `}
            >
              <div className="w-full h-5 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-white" />
                <div
                  className="absolute inset-0"
                  style={{ background: gradientCSS(key) }}
                />
              </div>
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
          {(Object.keys(FONT_PRESETS) as FontPreset[]).map((key) => {
            const fp = FONT_PRESETS[key];
            return (
              <button
                key={key}
                onClick={() => onFontChange(key)}
                className={`
                  py-3 px-2 rounded-xl text-sm transition-all duration-200 cursor-pointer
                  ${font === key
                    ? "bg-[var(--color-accent)] text-white ring-2 ring-[var(--color-accent)]/30"
                    : "bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-text-muted)]"
                  }
                `}
                style={{ fontFamily: fp.family, fontWeight: fp.weight }}
              >
                {fp.label}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
