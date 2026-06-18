import { useCallback, useRef, useState } from "react";
import { Upload, Image as ImageIcon, X } from "lucide-react";

interface Props {
  onImageLoad: (img: HTMLImageElement, dataUrl: string) => void;
  currentImage: string | null;
  onClear: () => void;
}

const MAX_SIZE_MB = 10;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];

export function ImageUpload({ onImageLoad, currentImage, onClear }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      setError(null);

      if (!ACCEPTED.includes(file.type)) {
        setError("Only JPG, PNG, and WebP images are supported.");
        return;
      }

      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setError(`File too large. Maximum size is ${MAX_SIZE_MB}MB.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        const img = new Image();
        img.onload = () => onImageLoad(img, dataUrl);
        img.src = dataUrl;
      };
      reader.readAsDataURL(file);
    },
    [onImageLoad]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const onDragLeave = useCallback(() => setDragOver(false), []);

  if (currentImage) {
    return (
      <div className="relative rounded-2xl overflow-hidden border border-[var(--color-border)] group">
        <img
          src={currentImage}
          alt="Uploaded wallpaper"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        <button
          onClick={onClear}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 hover:bg-white/20 transition-all duration-200 cursor-pointer active:scale-90"
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={() => inputRef.current?.click()}
        className={`
          relative flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border-2 border-dashed
          cursor-pointer transition-all duration-300
          ${dragOver
            ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 scale-[1.02]"
            : "border-[var(--color-border)] hover:border-[var(--color-text-muted)] bg-[var(--color-surface)] hover:scale-[1.01]"
          }
        `}
        style={{
          backgroundImage: dragOver ? undefined : 'radial-gradient(circle at 50% 50%, var(--color-border) 0.5px, transparent 0.5px)',
          backgroundSize: '20px 20px',
        }}
      >
        {dragOver ? (
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-[var(--color-accent)]/20" />
            <ImageIcon size={32} className="text-[var(--color-accent)] relative" />
          </div>
        ) : (
          <Upload size={32} className="text-[var(--color-text-muted)]" />
        )}
        <div className="text-center">
          <p className="text-sm font-medium">
            {dragOver ? "Drop your image here" : "Drag & drop your wallpaper"}
          </p>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            or click to browse · JPG, PNG, WebP · Max {MAX_SIZE_MB}MB
          </p>
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      {error && (
        <p className="text-[var(--color-danger)] text-xs mt-2">{error}</p>
      )}
    </div>
  );
}
