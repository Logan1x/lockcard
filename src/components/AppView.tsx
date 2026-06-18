import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Download, ArrowLeft, Eye } from "lucide-react";
import { Header } from "./Header";
import { ThemeToggle } from "./ThemeToggle";
import { ImageUpload } from "./ImageUpload";
import { InfoForm } from "./InfoForm";
import { Controls } from "./Controls";
import { PhonePreview } from "./PhonePreview";
import { renderToCanvas, exportCanvas } from "../lib/canvas";
import { getAspectRatioWarning } from "../lib/ratio";
import type { GradientPreset, FontPreset } from "../types";

function useScrollFade() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-fade]");
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0");
            entry.target.classList.add("anim-fade-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

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
  useScrollFade();
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


  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--color-accent)]/3 rounded-full blur-[150px] pointer-events-none" />
      <nav className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-lg">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-all duration-200 cursor-pointer active:scale-[0.95]"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back</span>
          </button>
          <Header />
          <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
        </div>
      </nav>

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-6 pb-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <section data-fade className="opacity-0">
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

            <section data-fade className="opacity-0">
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

            <section data-fade className="opacity-0">
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
            <section data-fade className="opacity-0 flex flex-col items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] font-medium uppercase tracking-wider">
                <Eye size={12} />
                Preview
              </div>
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
              <div className="relative">
                <button
                  onClick={handleDownload}
                  disabled={!image || !(name || phone) || downloading}
                  className={`
                    w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer active:scale-[0.98]
                    ${image && (name || phone)
                      ? "bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white shadow-lg shadow-[var(--color-accent)]/25 hover:shadow-xl hover:shadow-[var(--color-accent)]/30"
                      : "bg-[var(--color-surface)] text-[var(--color-text-muted)]/40 cursor-not-allowed border border-[var(--color-border)]"
                    }
                  `}
                >
                  <Download size={18} />
                  {downloading ? "Generating..." : "Download Wallpaper"}
                </button>
              </div>
              <p className="text-[10px] text-center text-[var(--color-text-muted)]/40">
                PNG · Full resolution
              </p>

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
