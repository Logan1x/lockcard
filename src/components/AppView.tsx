import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Download, RotateCcw, ArrowLeft, Shield } from "lucide-react";
import { Header } from "./Header";
import { ImageUpload } from "./ImageUpload";
import { InfoForm } from "./InfoForm";
import { Controls } from "./Controls";
import { PhonePreview } from "./PhonePreview";
import { renderToCanvas, exportCanvas } from "../lib/canvas";
import type { GradientPreset, FontPreset, TextPosition } from "../types";

export function AppView() {
  const navigate = useNavigate();
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [gradient, setGradient] = useState<GradientPreset>("classic");
  const [font, setFont] = useState<FontPreset>("clean");
  const [textPosition, setTextPosition] = useState<TextPosition>("bottom");
  const [downloading, setDownloading] = useState(false);

  const handleImageLoad = useCallback((img: HTMLImageElement, dataUrl: string) => {
    setImage(img);
    setImageDataUrl(dataUrl);
  }, []);

  const handleClearImage = useCallback(() => {
    setImage(null);
    setImageDataUrl(null);
  }, []);

  const handleDownload = useCallback(() => {
    if (!image) return;
    setDownloading(true);

    requestAnimationFrame(() => {
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      renderToCanvas(canvas, image, {
        name: name || "Your Name",
        phone: phone || "+1 234 567 890",
        message,
        gradient,
        font,
        textPosition,
      });

      const link = document.createElement("a");
      link.download = "lockcard-wallpaper.png";
      link.href = exportCanvas(canvas);
      link.click();
      setDownloading(false);
    });
  }, [image, name, phone, message, gradient, font, textPosition]);

  const handleReset = useCallback(() => {
    setImage(null);
    setImageDataUrl(null);
    setName("");
    setPhone("");
    setMessage("");
    setGradient("classic");
    setFont("clean");
    setTextPosition("bottom");
  }, []);

  const hasContent = image && (name || phone);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 glass border-b border-[var(--color-border)]">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Home</span>
          </button>
          <Header />
          <div className="w-16" />
        </div>
      </nav>

      <div className="max-w-lg mx-auto px-4 mt-4 w-full">
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-500/10 border border-green-500/20">
          <Shield size={14} className="text-green-500 shrink-0" />
          <p className="text-xs text-green-500/90">
            100% private, everything runs in your browser. No data leaves your device.
          </p>
        </div>
      </div>

      <main className="flex-1 w-full max-w-lg mx-auto px-4 py-6 pb-8">
        <section className="mb-6">
          <ImageUpload
            onImageLoad={handleImageLoad}
            currentImage={imageDataUrl}
            onClear={handleClearImage}
          />
        </section>

        <section className="mb-6">
          <h2 className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
            Contact Info
          </h2>
          <InfoForm
            name={name}
            phone={phone}
            message={message}
            onNameChange={setName}
            onPhoneChange={setPhone}
            onMessageChange={setMessage}
          />
        </section>

        <section className="mb-6">
          <h2 className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
            Customize
          </h2>
          <Controls
            gradient={gradient}
            font={font}
            textPosition={textPosition}
            onGradientChange={setGradient}
            onFontChange={setFont}
            onTextPositionChange={setTextPosition}
          />
        </section>

        <section className="mb-6 flex justify-center">
          <PhonePreview
            image={image}
            name={name}
            phone={phone}
            message={message}
            gradient={gradient}
            font={font}
            textPosition={textPosition}
          />
        </section>

        <section className="space-y-3">
          <button
            onClick={handleDownload}
            disabled={!image || downloading}
            className={`
              w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer active:scale-[0.98]
              ${
                image
                  ? "bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white"
                  : "bg-[var(--color-surface)] text-[var(--color-text-muted)] cursor-not-allowed"
              }
            `}
          >
            <Download size={18} />
            {downloading ? "Generating..." : "Download Wallpaper"}
          </button>

          {hasContent && (
            <button
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
            >
              <RotateCcw size={14} />
              Start over
            </button>
          )}
        </section>
      </main>

      <footer className="text-center py-4 text-xs text-[var(--color-text-muted)] space-y-1">
        <p>LockCard, Your info, on your lockscreen</p>
        <button
          onClick={() => navigate("/privacy")}
          className="underline hover:text-[var(--color-text)] transition-colors cursor-pointer"
        >
          Privacy Policy
        </button>
      </footer>
    </div>
  );
}
