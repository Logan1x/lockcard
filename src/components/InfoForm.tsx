import { User, Phone, MessageSquare } from "lucide-react";

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

interface Props {
  name: string;
  phone: string;
  message: string;
  onNameChange: (v: string) => void;
  onPhoneChange: (v: string) => void;
  onMessageChange: (v: string) => void;
}

export function InfoForm({
  name,
  phone,
  message,
  onNameChange,
  onPhoneChange,
  onMessageChange,
}: Props) {
  return (
    <div className="space-y-3">
      <div className="relative">
        <User
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
        />
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          maxLength={30}
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-sm focus:outline-none focus:border-[var(--color-accent)] transition-colors placeholder:text-[var(--color-text-muted)]"
        />
      </div>
      <div className="relative">
        <Phone
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
        />
        <input
          type="tel"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => onPhoneChange(formatPhone(e.target.value))}
          maxLength={12}
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-sm focus:outline-none focus:border-[var(--color-accent)] transition-colors placeholder:text-[var(--color-text-muted)]"
        />
      </div>
      <div className="relative">
        <MessageSquare
          size={16}
          className="absolute left-3 top-3 text-[var(--color-text-muted)]"
        />
        <textarea
          placeholder="Optional message (e.g. 'Call my brother' or 'Reward available')"
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          rows={2}
          maxLength={60}
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-sm focus:outline-none focus:border-[var(--color-accent)] transition-colors placeholder:text-[var(--color-text-muted)] resize-none"
        />
      </div>
    </div>
  );
}
