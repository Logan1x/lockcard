import type { GradientPreset, FontPreset, TextPosition } from "../types";
import { GRADIENT_PRESETS, FONT_PRESETS } from "../types";
import { ArrowDownToLine, ArrowUpToLine } from "lucide-react";

interface Props {
  gradient: GradientPreset;
  font: FontPreset;
  textPosition: TextPosition;
  onGradientChange: (v: GradientPreset) => void;
  onFontChange: (v: FontPreset) => void;
  onTextPositionChange: (v: TextPosition) => void;
}

export function Controls({
  gradient,
  font,
  textPosition,
  onGradientChange,
  onFontChange,
  onTextPositionChange,
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

      {/* Text Position */}
      <div>
        <label className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-2 block">
          Text Position
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onTextPositionChange("bottom")}
            className={`
              flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer
              ${
                textPosition === "bottom"
                  ? "bg-[var(--color-accent)] text-white"
                  : "bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-text-muted)]"
              }
            `}
          >
            <ArrowDownToLine size={14} />
            Bottom
          </button>
          <button
            onClick={() => onTextPositionChange("top")}
            className={`
              flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer
              ${
                textPosition === "top"
                  ? "bg-[var(--color-accent)] text-white"
                  : "bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-text-muted)]"
              }
            `}
          >
            <ArrowUpToLine size={14} />
            Top
          </button>
        </div>
      </div>
    </div>
  );
}
