function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

import {
  type GradientPreset,
  type FontPreset,
  GRADIENT_PRESETS,
  FONT_PRESETS,
} from "../types";

export function renderToCanvas(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  opts: {
    name: string;
    phone: string;
    message: string;
    gradient: GradientPreset;
    font: FontPreset;
    textPosition: "bottom";
  }
): void {
  const { width, height } = canvas;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, width, height);

  // Draw wallpaper
  ctx.drawImage(image, 0, 0, width, height);

  // Draw gradient overlay
  const preset = GRADIENT_PRESETS[opts.gradient];
  const gradientStart = height * (1 - preset.heightRatio);
  const gradientEnd = height;

  const gradient = ctx.createLinearGradient(0, gradientStart, 0, gradientEnd);
  for (const stop of preset.stops) {
    gradient.addColorStop(stop.offset, stop.color);
  }

  // Only fill the gradient band, not the whole canvas
  ctx.fillStyle = gradient;
  ctx.fillRect(0, gradientStart, width, gradientEnd - gradientStart);

  // Font sizes and spacing
  const fontPreset = FONT_PRESETS[opts.font];
  const nameFontSize    = Math.round(width * 0.055);
  const labelFontSize   = Math.round(width * 0.02);
  const phoneFontSize   = Math.round(width * 0.048);
  const messageFontSize = Math.round(width * 0.022);
  const padding         = Math.round(width * 0.07);
  const gap             = Math.round(width * 0.02);
  const groupGap        = Math.round(width * 0.06);

  ctx.textBaseline = "top";

  const lines: {
    text: string;
    fontSize: number;
    y: number;
    opacity?: number;
    letterSpacing?: number;
  }[] = [];

  // Build bottom-to-top: start at the bottom edge and walk up
  let hrY = 0;
  let y = height - padding;

  if (opts.message) {
    y -= messageFontSize;
    lines.push({ text: opts.message, fontSize: messageFontSize, y, opacity: 0.7 });
    y -= gap;
  }

  y -= phoneFontSize;
  lines.push({ text: formatPhone(opts.phone), fontSize: phoneFontSize, y });
  y -= gap;

  y -= labelFontSize;
  lines.push({
    text: "IF FOUND PLEASE CALL:",
    fontSize: labelFontSize,
    y,
    opacity: 0.6,
    letterSpacing: 1.5,
  });

  const contactTop = y;
  hrY = contactTop - groupGap * 0.5;

  y = contactTop - groupGap - nameFontSize;
  lines.push({ text: opts.name, fontSize: nameFontSize, y });

  // Draw text with shadow
  ctx.shadowColor    = "rgba(0,0,0,0.55)";
  ctx.shadowBlur     = 14;
  ctx.shadowOffsetX  = 0;
  ctx.shadowOffsetY  = 2;

  for (const line of lines) {
    ctx.fillStyle     = line.opacity ? `rgba(255,255,255,${line.opacity})` : "white";
    ctx.font          = `${fontPreset.weight} ${line.fontSize}px "${fontPreset.family}", sans-serif`;
    ctx.letterSpacing = line.letterSpacing ? `${line.letterSpacing}px` : "0px";
    ctx.fillText(line.text, padding, line.y);
  }

  // Reset state before drawing the rule
  ctx.letterSpacing  = "0px";
  ctx.shadowColor    = "transparent";
  ctx.shadowBlur     = 0;
  ctx.shadowOffsetX  = 0;
  ctx.shadowOffsetY  = 0;

  // Divider line between identity and contact groups
  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.lineWidth   = 1;
  ctx.beginPath();
  ctx.moveTo(padding,         Math.round(hrY));
  ctx.lineTo(width - padding, Math.round(hrY));
  ctx.stroke();
}

export function exportCanvas(canvas: HTMLCanvasElement): string {
  return canvas.toDataURL("image/png");
}
