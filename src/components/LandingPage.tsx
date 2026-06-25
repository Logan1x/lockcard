import { useState, useEffect, useCallback, useRef } from "react";
import { Shield, ArrowRight, Smartphone, Palette, Download, Eye, Lock, Zap, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

export function LandingPage() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    return (localStorage.getItem("lockcard-theme") as "dark" | "light") || "dark";
  });

  const carouselItems = [
    { img: "/402be458-1269-4f44-96d7-4c05736d75e8.webp", name: "Sarah Chen", phone: "415-867-5309", msg: "please call my husband" },
    { img: "/5c110299-536c-4da3-b893-5f52e5b680e0.webp", name: "Arjun Mehta", phone: "718-333-4567", msg: "if found please call" },
    { img: "/7e5366ec-b495-4a7e-85d1-206aa64cbf7a.webp", name: "James Wilson", phone: "212-555-0198", msg: "return to owner — reward" },
    { img: "/eafee518-799b-4b53-b8ed-911a89b8f8bf.webp", name: "Priya Patel", phone: "312-444-7890", msg: "call my brother" },
    { img: "/95a95cec-2c30-4cd3-956c-0c1e874cb63e.webp", name: "Emily Davis", phone: "503-222-3456", msg: "call my mom" },
  ];

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const carouselIndexRef = useRef(carouselIndex);
  carouselIndexRef.current = carouselIndex;
  const backCardIndexRef = useRef<number | null>(null);
  const isAnimatingCarousel = useRef(false);
  const N = carouselItems.length;

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (isAnimatingCarousel.current) return;
    dragStartX.current = e.touches[0].clientX;
    backCardIndexRef.current = null;
    setIsTransitioning(false);
    setDragOffset(0);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    if (isAnimatingCarousel.current) return;
    setDragOffset(e.touches[0].clientX - dragStartX.current);
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(diff) < 60) {
      setIsTransitioning(true);
      setDragOffset(0);
      setTimeout(() => setIsTransitioning(false), 350);
      return;
    }
    isAnimatingCarousel.current = true;
    const revealed = diff > 0
      ? (carouselIndexRef.current - 1 + N) % N
      : (carouselIndexRef.current + 1) % N;
    backCardIndexRef.current = revealed;
    setCarouselIndex(revealed);
    setIsTransitioning(true);
    setDragOffset(diff > 0 ? 600 : -600);
    setTimeout(() => {
      setIsTransitioning(false);
      setDragOffset(0);
      isAnimatingCarousel.current = false;
    }, 350);
  }, []);

  const tiltClasses = ["-rotate-[5deg]", "-rotate-[3deg]", "rotate-0", "rotate-[3deg]", "rotate-[5deg]"];

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("lockcard-theme", theme);
  }, [theme]);

  const handleThemeToggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("lockcard-theme", next);
      return next;
    });
  }, []);

  return (
    <div className="noise-overlay">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 w-screen max-w-[100vw] overflow-hidden bg-[var(--color-bg)] border-b border-[var(--color-border)]">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
              <Lock size={14} className="text-black" />
            </div>
            <span className="font-[family-name:var(--font-display)] font-bold text-lg tracking-tight">LockCard</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
            <button
              onClick={() => navigate("/app")}
              className="px-5 py-2 rounded-full text-sm font-medium bg-[var(--color-text)] text-[var(--color-bg)] hover:opacity-90 transition-all duration-200 cursor-pointer active:scale-[0.97]"
            >
              Open App
            </button>
          </div>
        </div>
      </nav>

      {/* Hero + Carousel */}
      <section className="min-h-screen flex flex-col relative pt-16">
        {/* Subtle background glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--color-accent)]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center relative z-10">
            {/* Heading */}
            <h1 className="font-[family-name:var(--font-display)] text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.75] mb-6 anim-fade-up delay-1">
              Your phone is lost.
              <br />
              <span className="text-[var(--color-accent)]">One look. One call. Home.</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-[var(--color-text-muted)] max-w-xl mx-auto mb-10 leading-relaxed anim-fade-up delay-2">
              Your contact info lives on your lockscreen wallpaper. Anyone who picks up your phone sees who to call. No menus. No passcode.
            </p>

            {/* CTA */}
            <div className="flex flex-col items-center gap-3 anim-fade-up delay-3">
              <button
                onClick={() => navigate("/app")}
                className="group px-8 py-4 rounded-2xl bg-[var(--color-accent)] text-[var(--color-bg)] font-semibold text-base flex items-center gap-3 hover:bg-[var(--color-accent-hover)] transition-all duration-200 cursor-pointer active:scale-[0.97]"
              >
                Create your free LockCard
                <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
              </button>
              <span className="text-sm text-[var(--color-text-muted)]">Free. No signup. No data collected.</span>
              <div className="flex items-center gap-4 text-[10px] text-[var(--color-text-muted)]/50">
                <span>100% open source</span>
                <span className="w-px h-3 bg-[var(--color-text-muted)]/20" />
                <span>No tracking</span>
                <span className="w-px h-3 bg-[var(--color-text-muted)]/20" />
                <span>Built in public</span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel */}
        {(() => {
          const renderCard = (cardItem: typeof carouselItems[number], showAnim: boolean) => (
            <div className={`phone-mockup relative z-10 ${showAnim ? 'glow-pulse float-anim' : ''}`}>
              <div className="phone-screen flex flex-col justify-end p-5 relative overflow-hidden">
                <img src={cardItem.img} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="relative z-10">
                  <p className="font-[family-name:var(--font-display)] text-white text-lg font-bold mb-1">{cardItem.name}</p>
                  <p className="text-white/60 text-xs mb-1">If found please call:</p>
                  <p className="text-white text-base font-semibold mb-2">{cardItem.phone}</p>
                  <p className="text-white/50 text-xs">{cardItem.msg}</p>
                </div>
              </div>
            </div>
          );

          const abs = Math.min(Math.abs(dragOffset), 300);
          const d = dragOffset;
          const currentScale = 1 - abs * 0.00045;
          const currentOpacity = 1 - abs * 0.002;
          const adjacentScale = 0.88 + abs * 0.0004;
          const adjacentOpacity = 0.3 + abs * 0.0023;
          const computedAdjacent = d > 0
            ? (carouselIndex - 1 + N) % N
            : (carouselIndex + 1) % N;
          const adjacentIndex = backCardIndexRef.current ?? computedAdjacent;
          const isIdle = !isTransitioning && dragOffset === 0;

          return (<>
            {/* Mobile swipe carousel */}
            <div className="sm:hidden w-full max-w-[100vw] -mt-12 pt-12 overflow-hidden" style={{ contain: "paint" }}>
              <div
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="select-none touch-pan-y overflow-hidden"
              >
                <div className="flex justify-center">
                  <div className="relative min-h-[580px] w-full max-[400px]:min-h-[500px]">
                    <div
                      className="absolute inset-0 flex items-start justify-center pt-8"
                      style={{
                        transform: `scale(${adjacentScale})`,
                        opacity: adjacentOpacity,
                        transition: isTransitioning
                          ? 'transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1)'
                          : 'none',
                      }}
                    >
                      {renderCard(carouselItems[adjacentIndex], false)}
                    </div>
                    <div
                      className="absolute inset-0 flex items-start justify-center pt-8"
                      style={{
                        transform: `translateX(${d}px) rotate(${d * 0.06}deg) scale(${currentScale})`,
                        opacity: currentOpacity,
                        transition: isTransitioning
                          ? 'transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1)'
                          : 'none',
                        willChange: 'transform',
                      }}
                    >
                      {renderCard(carouselItems[carouselIndex], isIdle)}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center gap-2 mt-14 mb-[30px]">
                  {carouselItems.map((_, i) => (
                    <button key={i} onClick={() => setCarouselIndex(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${i === carouselIndex ? "bg-[var(--color-text)] w-5" : "bg-[var(--color-text-muted)]/30"}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop tilted carousel */}
            <div className="hidden sm:block pb-12">
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex justify-center items-center gap-4 sm:gap-6">
                  {carouselItems.map((item, i) => (
                    <div key={i}
                      className={`${tiltClasses[i]} hover:rotate-0 hover:scale-105 transition-all duration-300 ease-out cursor-default ${i === 2 ? "z-10 scale-110" : "z-0 scale-85 sm:scale-90 opacity-60 hover:opacity-100"} ${i === 0 || i === 4 ? "hidden lg:block" : ""}`}
                    >
                      <div className="phone-mockup !w-[200px] !h-[410px] lg:!w-[240px] lg:!h-[500px]">
                        <div className="phone-screen relative overflow-hidden">
                          <img src={item.img} alt="" className="absolute inset-0 w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5 z-10">
                            <p className="font-[family-name:var(--font-display)] text-white text-sm lg:text-base font-bold mb-1">{item.name}</p>
                            <p className="text-white/60 text-[10px] lg:text-xs mb-1">If found please call:</p>
                            <p className="text-white text-xs lg:text-sm font-semibold mb-1 lg:mb-2">{item.phone}</p>
                            <p className="text-white/50 text-[10px] lg:text-xs">{item.msg}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>);
        })()}
      </section>

      {/* Problem section */}
      <section className="py-24 sm:py-32 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 gap-12 items-center">
            <div className="anim-fade-up">
              <p className="text-xs font-medium text-[var(--color-accent-light)] uppercase tracking-[0.2em] mb-3">The problem</p>
              <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold tracking-tight mb-6 leading-tight">
                Your phone is locked. 
                <br />
                Your contacts are inside.
              </h2>
              <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
                Every year, millions of phones are lost or stolen. The person who finds yours wants to return it, but your lock screen gives them nothing to work with.
              </p>
              <p className="text-[var(--color-text-muted)] leading-relaxed">
                iOS Medical ID and Android Emergency Info help in crises, but they don't solve the everyday problem: <span className="text-[var(--color-text)]">getting your phone back when you've left it at a restaurant.</span>
              </p>
            </div>
            <div className="anim-fade-up delay-2">
              <div className="space-y-4">
                {[
                  { stat: "70M+", label: "phones lost or stolen each year in the US alone" },
                  { stat: "Only 1 in 3", label: "lost phones are ever returned to their owner" },
                  { stat: "0 seconds", label: "it takes for a finder to see your contact info on your wallpaper" },
                ].map((item) => (
                  <div key={item.stat} className="p-5 rounded-2xl glass-panel">
                    <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-accent)]">{item.stat}</p>
                    <p className="text-sm text-[var(--color-text-muted)] mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 sm:py-32 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-medium text-[var(--color-accent-light)] uppercase tracking-[0.2em] mb-3 anim-fade-up">How it works</p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-5xl font-bold tracking-tight anim-fade-up delay-1">
              Three steps. Ten seconds.
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                step: "01",
                icon: Smartphone,
                title: "Pick your wallpaper",
                desc: "Upload any image from your phone or computer. Your favorite photo, a solid color, anything.",
              },
              {
                step: "02",
                icon: Phone,
                title: "Add your contact",
                desc: "Enter your name and phone number. Add a short message like 'call my wife' or 'return to owner'.",
              },
              {
                step: "03",
                icon: Download,
                title: "Download & set",
                desc: "Get a lockscreen-ready image. Set it as your wallpaper. Done. Your info is now visible to anyone who finds your phone.",
              },
            ].map((item, i) => (
              <div
                key={item.step}
                className={`group relative p-8 rounded-3xl glass-panel hover-lift anim-fade-up delay-${i + 2}`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--color-accent)]/10 flex items-center justify-center group-hover:bg-[var(--color-accent)]/15 transition-all duration-300">
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

      {/* Why LockCard */}
      <section className="py-24 sm:py-32 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-medium text-[var(--color-accent-light)] uppercase tracking-[0.2em] mb-3 anim-fade-up">Why LockCard</p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-5xl font-bold tracking-tight anim-fade-up delay-1">
              Built to bring your phone home.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Eye, title: "Live preview", desc: "See exactly how your lockscreen looks before downloading. No guessing." },
              { icon: Palette, title: "4 gradient styles", desc: "Classic, Subtle, Bold, Minimal. Pick the one that fits your wallpaper." },
              { icon: Zap, title: "Instant download", desc: "Full-resolution PNG. Set it as your wallpaper and you're done." },
              { icon: Smartphone, title: "Bottom placement", desc: "Your contact info sits at the bottom, always visible but never in the way." },
              { icon: Shield, title: "Zero data collection", desc: "No accounts, no servers, no analytics. Everything runs in your browser." },
              { icon: Lock, title: "Works offline", desc: "Once loaded, it all runs locally. No internet connection needed." },
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
          <div className="relative p-8 sm:p-12 rounded-3xl glass-panel overflow-hidden">
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 flex items-center justify-center mb-6">
                <Shield size={28} className="text-green-600 dark:text-green-400" />
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Your data never leaves your device.
              </h2>
              <p className="text-[var(--color-text-muted)] leading-relaxed max-w-2xl mb-8">
                No servers. No databases. No analytics. LockCard runs entirely in your browser using the Canvas API. 
                Your wallpaper, your name, your phone number, all processed locally. Close the tab and everything is gone.
              </p>
              <div className="flex flex-wrap gap-3">
                {["No accounts", "No cookies", "No tracking", "Open source"].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full text-xs font-medium bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison section */}
      <section className="py-24 sm:py-32 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-medium text-[var(--color-accent-light)] uppercase tracking-[0.2em] mb-3 anim-fade-up">How it compares</p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold tracking-tight anim-fade-up delay-1">
              Why not just use iOS Medical ID?
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 anim-fade-up delay-2">
            <div className="p-6 rounded-2xl glass-panel">
              <p className="font-[family-name:var(--font-display)] font-semibold text-sm mb-4 text-[var(--color-text-muted)]">iOS / Android Emergency Info</p>
              <ul className="space-y-3 text-sm text-[var(--color-text-muted)]">
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span> Hidden behind "Emergency" button</li>
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span> Most people don't know it exists</li>
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span> Requires extra taps to access</li>
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span> Limited customization</li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl glass-panel border border-[var(--color-accent)]/20">
              <p className="font-[family-name:var(--font-display)] font-semibold text-sm mb-4 text-[var(--color-accent)]">LockCard</p>
              <ul className="space-y-3 text-sm text-[var(--color-text-muted)]">
                <li className="flex items-start gap-2"><span className="text-green-700 dark:text-green-500/40 mt-0.5">✓</span> Always visible on your lockscreen</li>
                <li className="flex items-start gap-2"><span className="text-green-700 dark:text-green-500/40 mt-0.5">✓</span> Anyone can see it, no tech skills needed</li>
                <li className="flex items-start gap-2"><span className="text-green-700 dark:text-green-500/40 mt-0.5">✓</span> Zero taps, just look at the screen</li>
                <li className="flex items-start gap-2"><span className="text-green-700 dark:text-green-500/40 mt-0.5">✓</span> Works with any wallpaper you choose</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 sm:py-32 relative text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 anim-fade-up">
            Don't wait until it's lost.
          </h2>
          <p className="text-lg text-[var(--color-text-muted)] mb-10 anim-fade-up delay-1">
            Create your lockscreen contact card in 30 seconds.
          </p>
          <button
            onClick={() => navigate("/app")}
            className="group px-10 py-5 rounded-2xl bg-[var(--color-accent)] text-[var(--color-bg)] font-semibold text-lg flex items-center gap-3 mx-auto hover:bg-[var(--color-accent-hover)] transition-all duration-200 cursor-pointer active:scale-[0.97] anim-fade-up delay-2"
          >
            Create your LockCard for free
            <ArrowRight size={20} className="transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center">
              <Lock size={10} className="text-black" />
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
