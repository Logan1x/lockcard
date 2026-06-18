import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Download, RotateCcw, ArrowLeft, Shield } from "lucide-react";
import { Header } from "./Header";
import { ThemeToggle } from "./ThemeToggle";
import { ImageUpload } from "./ImageUpload";
import { InfoForm } from "./InfoForm";
import { Controls } from "./Controls";
import { PhonePreview } from "./PhonePreview";
import { renderToCanvas, exportCanvas } from "../lib/canvas";
import { getAspectRatioWarning } from "../lib/ratio";
import type { GradientPreset, FontPreset } from "../types";

const STORAGE_KEY = "lockcard-form";

function loadSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveState(state: Record<string, string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* quota exceeded, silently ignore */ }
}

export function AppView() {
  const navigate = useNavigate();
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);

  const saved = loadSaved();
  const [name, setName] = useState(saved.name ?? "");
  const [phone, setPhone] = useState(saved.phone ?? "");
  const [message, setMessage] = useState(saved.message ?? "");
  const [gradient, setGradient] = useState<GradientPreset>(saved.gradient ?? "classic");
  const [font, setFont] = useState<FontPreset>(saved.font ?? "clean");
  const [downloading, setDownloading] = useState(false);
  const [aspectRatioWarning, setAspectRatioWarning] = useState<string | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    return (localStorage.getItem("lockcard-theme") as "dark" | "light") || "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("lockcard-theme", theme);
  }, [theme]);

  const handleImageLoad = useCallback((img: HTMLImageElement, dataUrl: string) => {
    setImage(img);
    setImageDataUrl(dataUrl);
    setAspectRatioWarning(getAspectRatioWarning(img.naturalWidth, img.naturalHeight));
  }, []);

  const handleClearImage = useCallback(() => {
    setImage(null);
    setImageDataUrl(null);
    setAspectRatioWarning(null);
  }, []);

  const handleThemeToggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("lockcard-theme", next);
      return next;
    });
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
        textPosition: "bottom",
      });

      const link = document.createElement("a");
      link.download = "lockcard-wallpaper.png";
      link.href = exportCanvas(canvas);
      link.click();
      setDownloading(false);
    });
  }, [image, name, phone, message, gradient, font]);

  useEffect(() => {
    if (name || phone || message) {
      saveState({ name, phone, message, gradient, font });
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [name, phone, message, gradient, font]);

  const handleReset = useCallback(() => {
    setImage(null);
    setImageDataUrl(null);
    setName("");
    setPhone("");
    setMessage("");
    setGradient("classic");
    setFont("clean");
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const hasContent = image && (name || phone);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back</span>
          </button>
          <Header />
          <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 mt-4 w-full">
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
          <Shield size={14} className="text-[var(--color-text-muted)] shrink-0" />
          <p className="text-xs text-[var(--color-text-muted)]">
            100% private, everything runs in your browser. No data leaves your device.
          </p>
        </div>
      </div>

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-6 pb-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <section>
              <h2 className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
                Wallpaper
              </h2>
              <ImageUpload
                onImageLoad={handleImageLoad}
                currentImage={imageDataUrl}
                onClear={handleClearImage}
              />
              {aspectRatioWarning && (
                <p className="flex items-center gap-2 mt-2 text-xs text-amber-400">
                  <span>⚠</span>
                  {aspectRatioWarning}
                </p>
              )}
            </section>

            <section>
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

            <section>
              <h2 className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
                Customize
              </h2>
              <Controls
                gradient={gradient}
                font={font}
                onGradientChange={setGradient}
                onFontChange={setFont}
              />
            </section>
          </div>

          <div className="lg:w-[320px] flex flex-col items-center gap-6">
            <section className="flex justify-center">
              <PhonePreview
                image={image}
                name={name}
                phone={phone}
                message={message}
                gradient={gradient}
                font={font}
              />
            </section>

            <section className="w-full space-y-3">
              <button
                onClick={handleDownload}
                disabled={!image || !(name || phone) || downloading}
                className={`
                  w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer active:scale-[0.98]
                  ${
                    image && (name || phone)
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
          </div>
        </div>
      </main>

      <footer className="border-t border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto w-full px-4 py-4 flex items-center justify-between text-xs text-[var(--color-text-muted)]">
        <p>LockCard, Your info, on your lockscreen</p>
        <button
          onClick={() => navigate("/privacy")}
          className="underline hover:text-[var(--color-text)] transition-colors cursor-pointer"
        >
          Privacy Policy
        </button>
        </div>
      </footer>
    </div>
  );
}
