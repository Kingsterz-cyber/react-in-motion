import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const ease = [0.22, 1, 0.36, 1] as const;

export function Frame({ page, kicker, children }: { page: number; kicker?: string; children: ReactNode }) {
  return (
    <div className="relative h-full w-full text-foreground">
      <div className="slide-grid-bg pointer-events-none absolute inset-0" />
      <div className="absolute left-24 right-24 top-14 flex items-center justify-between text-[22px] tracking-[0.2em] uppercase text-muted-foreground">
        <span className="flex items-center gap-4">
          <span className="h-3 w-3 rounded-full bg-accent shadow-glow-accent" />
          <span className="font-semibold text-foreground">Group 8</span>
          {kicker && <span>/ {kicker}</span>}
        </span>
        <span className="rounded-full border border-border px-6 py-2 text-[18px]">React Presentation</span>
      </div>
      <div className="absolute inset-x-24 bottom-24 top-36">{children}</div>
      <div className="absolute bottom-10 left-24 right-24 flex items-center justify-between text-[20px] text-muted-foreground">
        <span className="font-mono">page {String(page).padStart(2, "0")}</span>
        <span className="tracking-[0.2em] uppercase">next slide →</span>
      </div>
    </div>
  );
}

export function Title({ children, sub }: { children: ReactNode; sub?: ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
      <h2 className="text-[84px] font-bold leading-[1.02] tracking-tight">{children}</h2>
      {sub && <p className="mt-4 max-w-[1100px] text-[32px] leading-snug text-muted-foreground">{sub}</p>}
    </motion.div>
  );
}

export function Reveal({ show, children, className, delay = 0 }: { show: boolean; children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={false}
      animate={show ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 24, filter: "blur(6px)" }}
      transition={{ duration: 0.55, ease, delay: show ? delay : 0 }}
    >
      {children}
    </motion.div>
  );
}

export function Card({ children, className, active }: { children: ReactNode; className?: string; active?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card/70 p-8 backdrop-blur transition-all duration-500",
        active && "border-accent shadow-glow-accent",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Term({ children }: { children: ReactNode }) {
  return <span className="rounded-md bg-primary/20 px-2 font-mono text-accent">{children}</span>;
}

export function Arrow({ show = true, vertical = false, up = false }: { show?: boolean; vertical?: boolean; up?: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: show ? 1 : 0.15, scale: show ? 1 : 0.9 }}
      transition={{ duration: 0.5, ease }}
      className={cn("flex items-center justify-center text-accent", vertical ? "h-14" : "w-14")}
    >
      <svg width={vertical ? 24 : 56} height={vertical ? 56 : 24} viewBox={vertical ? "0 0 24 56" : "0 0 56 24"} fill="none">
        {vertical ? (
          up ? <path d="M12 54V4M12 4l-8 9M12 4l8 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
             : <path d="M12 2v50M12 52l-8-9M12 52l8-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        ) : (
          <path d="M2 12h50M52 12l-9-8M52 12l-9 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        )}
      </svg>
    </motion.div>
  );
}

export { AnimatePresence, motion };
