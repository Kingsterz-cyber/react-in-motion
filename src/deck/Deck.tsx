import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, LayoutGrid, Maximize, Minimize, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { slides, type Transition } from "./slides";
import { ease } from "./primitives";

const variants: Record<Transition, any> = {
  fade: { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } },
  push: {
    initial: (d: number) => ({ x: d * 240, opacity: 0 }),
    animate: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d * -240, opacity: 0 }),
  },
  morph: { initial: { opacity: 0, scale: 0.96, filter: "blur(10px)" }, animate: { opacity: 1, scale: 1, filter: "blur(0px)" }, exit: { opacity: 0, scale: 1.03, filter: "blur(10px)" } },
  wipe: { initial: { clipPath: "inset(0 100% 0 0)" }, animate: { clipPath: "inset(0 0% 0 0)" }, exit: { opacity: 0 } },
};

function useScale(ref: React.RefObject<HTMLDivElement | null>) {
  const [s, setS] = useState(0.5);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const ro = new ResizeObserver(([e]) => e && setS(Math.min(e.contentRect.width / 1920, e.contentRect.height / 1080)));
    ro.observe(el); return () => ro.disconnect();
  }, [ref]);
  return s;
}

export function Deck({ initialSlide, initialStep, onChange }: { initialSlide: number; initialStep: number; onChange: (s: number, st: number) => void }) {
  const [[idx, step, dir], set] = useState<[number, number, number]>([initialSlide, initialStep, 1]);
  const [grid, setGrid] = useState(false);
  const [fs, setFs] = useState(false);
  const [idle, setIdle] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const scale = useScale(stage);
  const total = slides.length;
  const slide = slides[idx]!;

  const next = useCallback(() => set(([i, s]) => (s < slides[i]!.steps - 1 ? [i, s + 1, 1] : i < total - 1 ? [i + 1, 0, 1] : [i, s, 1])), [total]);
  const prev = useCallback(() => set(([i, s]) => (s > 0 ? [i, s - 1, -1] : i > 0 ? [i - 1, slides[i - 1]!.steps - 1, -1] : [i, s, -1])), []);
  const go = (i: number) => { set(([c]) => [i, 0, i >= c ? 1 : -1]); setGrid(false); };
  const toggleFs = () => (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen());

  useEffect(() => { onChange(idx, step); document.title = `${idx + 1}/${total} — ${slide.title} · GROUP 8`; }, [idx, step]);
  useEffect(() => {
    const h = () => setFs(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", h); return () => document.removeEventListener("fullscreenchange", h);
  }, []);
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (["ArrowRight", " ", "PageDown", "Enter"].includes(e.key)) { e.preventDefault(); next(); }
      else if (["ArrowLeft", "PageUp", "Backspace"].includes(e.key)) { e.preventDefault(); prev(); }
      else if (e.key === "f" || e.key === "F5") { e.preventDefault(); toggleFs(); }
      else if (e.key === "g") setGrid((g) => !g);
      else if (e.key === "Escape") setGrid(false);
      else if (e.key === "Home") go(0);
      else if (e.key === "End") go(total - 1);
    };
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, [next, prev]);
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const m = () => { setIdle(false); clearTimeout(t); t = setTimeout(() => setIdle(true), 2500); };
    m(); window.addEventListener("mousemove", m); return () => { window.removeEventListener("mousemove", m); clearTimeout(t); };
  }, []);

  const touch = useRef(0);
  const progress = (idx + (step + 1) / slide.steps) / total;
  const v = variants[slide.transition];

  return (
    <div className={cn("relative flex h-screen w-screen flex-col bg-sidebar text-foreground", fs && idle && "cursor-none")}
      onTouchStart={(e) => (touch.current = e.touches[0]?.clientX ?? 0)}
      onTouchEnd={(e) => { const dx = (e.changedTouches[0]?.clientX ?? 0) - touch.current; if (Math.abs(dx) > 50) (dx < 0 ? next() : prev()); }}>
      <div ref={stage} className={cn("relative flex-1 overflow-hidden", !fs && "m-4 md:m-8 rounded-2xl border border-border")}>
        <div className="slide-canvas" style={{ transform: `scale(${scale})` }} onClick={next}>
          <AnimatePresence mode="popLayout" custom={dir} initial={false}>
            <motion.div key={idx} custom={dir} variants={v} initial="initial" animate="animate" exit="exit"
              transition={{ duration: slide.transition === "wipe" ? 0.8 : 0.6, ease }} className="absolute inset-0">
              {slide.render(step)}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute inset-x-0 top-0 h-1 bg-muted/50">
        <motion.div className="h-full bg-gradient-to-r from-primary to-accent" animate={{ width: `${progress * 100}%` }} transition={{ duration: 0.5, ease }} />
      </div>

      <div className={cn("absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-card/90 px-3 py-2 backdrop-blur transition-opacity duration-500 md:bottom-10", idle && "opacity-0 hover:opacity-100")}>
        <button aria-label="Previous" onClick={prev} className="rounded-full p-2 hover:bg-muted"><ChevronLeft className="h-5 w-5" /></button>
        <span className="min-w-24 text-center font-mono text-sm text-muted-foreground">
          {String(idx + 1).padStart(2, "0")} / {total}{slide.steps > 1 && <span className="text-accent"> · {step + 1}/{slide.steps}</span>}
        </span>
        <button aria-label="Next" onClick={next} className="rounded-full p-2 hover:bg-muted"><ChevronRight className="h-5 w-5" /></button>
        <span className="mx-1 h-5 w-px bg-border" />
        <button aria-label="All slides" onClick={() => setGrid(true)} className="rounded-full p-2 hover:bg-muted"><LayoutGrid className="h-5 w-5" /></button>
        <button aria-label="Fullscreen" onClick={toggleFs} className="rounded-full p-2 hover:bg-muted">{fs ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}</button>
      </div>

      <AnimatePresence>
        {grid && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 overflow-auto bg-background/95 p-8 backdrop-blur">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">All slides <span className="text-muted-foreground">· press G to toggle</span></h2>
              <button aria-label="Close" onClick={() => setGrid(false)} className="rounded-full p-2 hover:bg-muted"><X /></button>
            </div>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
              {slides.map((s, i) => (
                <button key={i} onClick={() => go(i)} className={cn("group text-left", i === idx && "[&>div]:border-accent [&>div]:shadow-glow-accent")}>
                  <div className="relative aspect-video overflow-hidden rounded-xl border border-border transition group-hover:border-accent">
                    <Thumb i={i} />
                  </div>
                  <p className="mt-2 text-sm"><span className="font-mono text-accent">{String(i + 1).padStart(2, "0")}</span> {s.title}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Thumb({ i }: { i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const s = useScale(ref);
  return (
    <div ref={ref} className="pointer-events-none absolute inset-0">
      <div className="slide-canvas" style={{ transform: `scale(${s})` }}>{slides[i]!.render(slides[i]!.steps - 1)}</div>
    </div>
  );
}
