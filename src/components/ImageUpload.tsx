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
      <div className="relative rounded-2xl overflow-hidden border border-[var(--color-border)]">
        <img
          src={currentImage}
          alt="Uploaded wallpaper"
          className="w-full h-48 object-cover"
        />
        <button
          onClick={onClear}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/80 transition-colors cursor-pointer"
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
          flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border-2 border-dashed
          cursor-pointer transition-all duration-200
          ${
            dragOver
              ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10"
              : "border-[var(--color-border)] hover:border-[var(--color-text-muted)] bg-[var(--color-surface)]"
          }
        `}
      >
        {dragOver ? (
          <ImageIcon size={32} className="text-[var(--color-accent)]" />
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
