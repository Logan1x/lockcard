import { ArrowLeft, Shield } from "lucide-react";

interface Props {
  onBack: () => void;
}

export function PrivacyPolicy({ onBack }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-[var(--color-bg)]/80 backdrop-blur-lg border-b border-[var(--color-border)]">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl hover:bg-[var(--color-surface)] transition-colors cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-2">
            <Shield size={18} className="text-[var(--color-accent)]" />
            <h1 className="text-sm font-semibold">Privacy Policy</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-lg mx-auto px-4 py-8">
        <div className="space-y-6 text-sm leading-relaxed">
          {/* Hero section */}
          <div className="bg-[var(--color-surface)] rounded-2xl p-6 border border-[var(--color-border)]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center">
                <Shield size={20} className="text-green-500" />
              </div>
              <div>
                <h2 className="font-semibold">100% Private</h2>
                <p className="text-xs text-[var(--color-text-muted)]">No data ever leaves your device</p>
              </div>
            </div>
          </div>

          {/* Key points */}
          <section>
            <h3 className="font-semibold mb-2">Your data stays on your device</h3>
            <p className="text-[var(--color-text-muted)]">
              LockCard processes everything locally in your browser. No images, names, phone numbers,
              or any other information is ever sent to a server. There is no server. Period.
            </p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">No account required</h3>
            <p className="text-[var(--color-text-muted)]">
              We don't ask you to sign up, log in, or provide an email. You open the site, create your
              lockscreen, download it, and leave. That's it.
            </p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">No tracking or analytics</h3>
            <p className="text-[var(--color-text-muted)]">
              We don't use cookies, trackers, or analytics tools. We don't know who you are, where
              you're from, or what device you're using.
            </p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">No data storage</h3>
            <p className="text-[var(--color-text-muted)]">
              Your uploaded wallpaper and contact information are held in your browser's memory only.
              Close the tab and everything is gone. We store nothing.
            </p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">Fully open source</h3>
            <p className="text-[var(--color-text-muted)]">
              LockCard is open source. Anyone can audit the code to verify that no data is transmitted
              anywhere. Transparency is not a promise — it's provable.
            </p>
          </section>

          {/* Technical details */}
          <div className="bg-[var(--color-surface)] rounded-2xl p-6 border border-[var(--color-border)]">
            <h3 className="font-semibold mb-3">How it works (technical)</h3>
            <ul className="space-y-2 text-[var(--color-text-muted)]">
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-accent)] mt-0.5">1.</span>
                <span>You upload an image → it's loaded into browser memory as a data URL</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-accent)] mt-0.5">2.</span>
                <span>You fill in your info → stored only in React state (RAM)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-accent)] mt-0.5">3.</span>
                <span>Canvas API renders the gradient and text directly in your browser</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-accent)] mt-0.5">4.</span>
                <span>Download generates a PNG blob — never uploaded anywhere</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <section>
            <h3 className="font-semibold mb-2">Questions?</h3>
            <p className="text-[var(--color-text-muted)]">
              If you have any questions about this privacy policy or how LockCard works, reach out
              at <span className="text-[var(--color-text)]">hello@lockcard.app</span>
            </p>
          </section>

          <p className="text-xs text-[var(--color-text-muted)] text-center pt-4 pb-8">
            Last updated: June 2026
          </p>
        </div>
      </main>
    </div>
  );
}
