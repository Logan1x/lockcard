import { useEffect, useRef, useState } from "react";
import { Smartphone } from "lucide-react";
import type { GradientPreset, FontPreset } from "../types";
import { renderToCanvas } from "../lib/canvas";

interface Props {
  image: HTMLImageElement | null;
  name: string;
  phone: string;
  message: string;
  gradient: GradientPreset;
  font: FontPreset;
}

export function PhonePreview({
  image,
  name,
  phone,
  message,
  gradient,
  font,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!image) {
      setLoaded(false);
      return;
    }
    const canvas = canvasRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!canvas || !previewCanvas) return;

    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    renderToCanvas(canvas, image, {
      name: name || "Your Name",
      phone: phone || "+1 234 567 890",
      message,
      gradient,
      font,
      textPosition: "bottom",
    });

    const previewCtx = previewCanvas.getContext("2d")!;
    previewCanvas.width = 280;
    previewCanvas.height = 560;
    previewCtx.clearRect(0, 0, 280, 560);
    previewCtx.drawImage(canvas, 0, 0, 280, 560);
    requestAnimationFrame(() => setLoaded(true));
  }, [image, name, phone, message, gradient, font]);

  if (!image) {
    return (
      <div className="phone-mockup flex items-center justify-center">
        <div className="text-center px-6">
          <div className="w-12 h-12 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center mx-auto mb-4">
            <Smartphone size={22} className="text-[var(--color-text-muted)]" />
          </div>
          <p className="text-sm font-medium">No wallpaper yet</p>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">Upload an image to preview</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`phone-mockup transition-all duration-500 ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
      <canvas ref={canvasRef} className="hidden" />
      <div className="phone-screen">
        <canvas ref={previewCanvasRef} className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
