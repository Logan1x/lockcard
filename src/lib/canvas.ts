import {
  type GradientPreset,
  type FontPreset,
  type TextPosition,
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
    textPosition: TextPosition;
  }
): void {
  const { width, height } = canvas;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, width, height);

  // Draw wallpaper
  ctx.drawImage(image, 0, 0, width, height);

  // Draw gradient overlay
  const preset = GRADIENT_PRESETS[opts.gradient];
  const isTop = opts.textPosition === "top";

  let gradientStart: number;
  let gradientEnd: number;

  if (isTop) {
    gradientStart = 0;
    gradientEnd = height * preset.heightRatio;
  } else {
    gradientStart = height * (1 - preset.heightRatio);
    gradientEnd = height;
  }

  const gradient = ctx.createLinearGradient(0, gradientStart, 0, gradientEnd);
  for (const stop of preset.stops) {
    gradient.addColorStop(stop.offset, stop.color);
  }

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Draw text
  const fontPreset = FONT_PRESETS[opts.font];
  const baseFontSize = Math.round(width * 0.04);
  const smallFontSize = Math.round(width * 0.028);
  const phoneFontSize = Math.round(width * 0.032);
  const padding = Math.round(width * 0.06);
  const gap = Math.round(width * 0.025);

  ctx.textBaseline = "top";

  const lines: { text: string; fontSize: number; y: number }[] = [];

  if (isTop) {
    let currentY = padding + 20;

    lines.push({ text: opts.name, fontSize: baseFontSize, y: currentY });
    currentY += baseFontSize + gap;

    lines.push({ text: "If found please call:", fontSize: smallFontSize, y: currentY });
    currentY += smallFontSize + gap * 3.5;

    lines.push({ text: opts.phone, fontSize: phoneFontSize, y: currentY });
    currentY += phoneFontSize + gap;

    if (opts.message) {
      lines.push({ text: opts.message, fontSize: smallFontSize, y: currentY });
    }
  } else {
    let currentY = height - padding;

    if (opts.message) {
      currentY -= smallFontSize;
      lines.push({ text: opts.message, fontSize: smallFontSize, y: currentY });
      currentY -= gap;
    }

    currentY -= phoneFontSize;
    lines.push({ text: opts.phone, fontSize: phoneFontSize, y: currentY });
    currentY -= gap;
    lines.push({ text: "If found please call:", fontSize: smallFontSize, y: currentY });
    currentY -= smallFontSize + gap * 3.5;

    lines.push({ text: opts.name, fontSize: baseFontSize, y: currentY });
  }

  // Render text lines
  ctx.shadowColor = "rgba(0,0,0,0.5)";
  ctx.shadowBlur = 6;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 2;

  for (const line of lines) {
    ctx.fillStyle = "white";
    ctx.font = `${fontPreset.weight} ${line.fontSize}px "${fontPreset.family}", sans-serif`;
    ctx.fillText(line.text, padding, line.y);
  }

  // Reset shadow
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
}

export function exportCanvas(canvas: HTMLCanvasElement): string {
  return canvas.toDataURL("image/png");
}
