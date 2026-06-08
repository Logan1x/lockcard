import { Shield, ArrowRight, Smartphone, Palette, Download, Eye, Lock, Zap } from "lucide-react";

interface Props {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: Props) {
  return (
    <div className="noise-overlay">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-purple)] flex items-center justify-center">
              <Lock size={14} className="text-white" />
            </div>
            <span className="font-[family-name:var(--font-display)] font-bold text-lg tracking-tight">LockCard</span>
          </div>
          <button
            onClick={onGetStarted}
            className="px-5 py-2 rounded-full text-sm font-medium bg-[var(--color-text)] text-[var(--color-bg)] hover:opacity-90 transition-all duration-200 cursor-pointer active:scale-[0.97]"
          >
            Open App
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        {/* Background glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-accent)]/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-[var(--color-purple)]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center relative z-10">
          {/* Badge */}
          <div className="anim-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 gradient-border">
            <Shield size={14} className="text-green-400" />
            <span className="text-xs font-medium text-[var(--color-text-muted)]">100% private — no server, no data collection</span>
          </div>

          {/* Heading */}
          <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95] mb-6 anim-fade-up delay-1">
            Your lockscreen.
            <br />
            <span className="shimmer-text">Your contact.</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-[var(--color-text-muted)] max-w-xl mx-auto mb-10 leading-relaxed anim-fade-up delay-2">
            Upload any wallpaper. We'll add your name and phone number with a beautiful gradient. 
            If your phone is lost, the finder knows exactly who to call.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 anim-fade-up delay-3">
            <button
              onClick={onGetStarted}
              className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-purple)] text-white font-semibold text-base flex items-center gap-3 hover:shadow-[0_0_40px_rgba(99,102,241,0.3)] transition-all duration-300 cursor-pointer active:scale-[0.97]"
            >
              Create your lockscreen
              <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
            </button>
            <span className="text-sm text-[var(--color-text-muted)]">Free. No signup required.</span>
          </div>

          {/* Phone mockup preview */}
          <div className="mt-16 sm:mt-24 anim-scale-in delay-5 flex justify-center">
            <div className="relative">
              {/* Glow behind phone */}
              <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-accent)]/20 to-[var(--color-purple)]/10 rounded-[40px] blur-[60px] scale-110 pointer-events-none" />
              <div className="phone-mockup glow-pulse relative z-10 float-anim">
                <div className="phone-screen flex flex-col justify-end p-5">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
                  <div className="relative z-10">
                    <p className="font-[family-name:var(--font-display)] text-white text-lg font-bold mb-1">Khushal Sharma</p>
                    <p className="text-white/60 text-xs mb-1">If found please call:</p>
                    <p className="text-white text-base font-semibold mb-2">9214537373</p>
                    <p className="text-white/50 text-xs">call my brother</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 anim-fade-in delay-8">
          <div className="w-5 h-8 rounded-full border border-[var(--color-text-muted)]/30 flex justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-[var(--color-text-muted)]/50 animate-bounce" />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 sm:py-32 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-medium text-[var(--color-accent-light)] uppercase tracking-[0.2em] mb-3 anim-fade-up">How it works</p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-5xl font-bold tracking-tight anim-fade-up delay-1">
              Three steps. Five seconds.
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                step: "01",
                icon: Smartphone,
                title: "Upload wallpaper",
                desc: "Drag & drop any image from your phone or computer.",
              },
              {
                step: "02",
                icon: Palette,
                title: "Add your info",
                desc: "Name, phone number, and an optional message. Pick a gradient style.",
              },
              {
                step: "03",
                icon: Download,
                title: "Download & set",
                desc: "Get your lockscreen-ready PNG. Set it as your wallpaper. Done.",
              },
            ].map((item, i) => (
              <div
                key={item.step}
                className={`group relative p-8 rounded-3xl glass gradient-border hover-lift anim-fade-up delay-${i + 2}`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-purple)]/10 flex items-center justify-center group-hover:from-[var(--color-accent)]/30 group-hover:to-[var(--color-purple)]/20 transition-all duration-300">
                    <item.icon size={22} className="text-[var(--color-accent-light)]" />
                  </div>
                  <span className="text-xs font-mono text-[var(--color-text-muted)]">{item.step}</span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 sm:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-accent)]/3 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <p className="text-xs font-medium text-[var(--color-accent-light)] uppercase tracking-[0.2em] mb-3 anim-fade-up">Features</p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-5xl font-bold tracking-tight anim-fade-up delay-1">
              Everything you need.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Palette, title: "4 gradient presets", desc: "Classic, Subtle, Bold, Minimal — one tap to apply." },
              { icon: Eye, title: "Live preview", desc: "See exactly how it looks in a phone mockup before downloading." },
              { icon: Zap, title: "Instant download", desc: "Full-resolution PNG, ready to set as your lockscreen." },
              { icon: Smartphone, title: "Top or bottom", desc: "Place your contact info wherever it looks best." },
              { icon: Shield, title: "Zero data collection", desc: "No accounts, no servers, no cookies. Your data stays with you." },
              { icon: Lock, title: "Works offline", desc: "Once loaded, everything runs in your browser. No internet needed." },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`flex items-start gap-4 p-6 rounded-2xl hover:bg-[var(--color-surface)] transition-colors duration-200 anim-fade-up delay-${Math.min(i + 2, 8)}`}
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <item.icon size={18} className="text-[var(--color-accent-light)]" />
                </div>
                <div>
                  <h4 className="font-[family-name:var(--font-display)] font-semibold text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy section */}
      <section className="py-24 sm:py-32 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="relative p-8 sm:p-12 rounded-3xl glass gradient-border overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)]/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-green-500/15 flex items-center justify-center mb-6">
                <Shield size={28} className="text-green-400" />
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Your data never leaves your device.
              </h2>
              <p className="text-[var(--color-text-muted)] leading-relaxed max-w-2xl mb-8">
                No servers. No databases. No analytics. LockCard runs entirely in your browser using the Canvas API. 
                Your wallpaper, your name, your phone number — all processed locally. Close the tab and everything is gone.
              </p>
              <div className="flex flex-wrap gap-3">
                {["No accounts", "No cookies", "No tracking", "Open source"].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 sm:py-32 relative text-center">
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-accent)]/5 to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 anim-fade-up">
            Lost phone?<br />
            <span className="shimmer-text">Found by someone who cares.</span>
          </h2>
          <p className="text-lg text-[var(--color-text-muted)] mb-10 anim-fade-up delay-1">
            Create your lockscreen contact card in 30 seconds.
          </p>
          <button
            onClick={onGetStarted}
            className="group px-10 py-5 rounded-2xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-purple)] text-white font-semibold text-lg flex items-center gap-3 mx-auto hover:shadow-[0_0_50px_rgba(99,102,241,0.35)] transition-all duration-300 cursor-pointer active:scale-[0.97] anim-fade-up delay-2"
          >
            Get started — it's free
            <ArrowRight size={20} className="transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-purple)] flex items-center justify-center">
              <Lock size={10} className="text-white" />
            </div>
            <span className="font-[family-name:var(--font-display)] font-semibold text-sm">LockCard</span>
          </div>
          <p className="text-xs text-[var(--color-text-muted)]">
            Built with privacy in mind. No data collection. Ever.
          </p>
        </div>
      </footer>
    </div>
  );
}
