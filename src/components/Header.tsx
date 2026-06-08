import { Lock } from "lucide-react";

export function Header() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-purple)] flex items-center justify-center">
        <Lock size={12} className="text-white" />
      </div>
      <h1 className="font-[family-name:var(--font-display)] text-base font-bold tracking-tight">LockCard</h1>
    </div>
  );
}
