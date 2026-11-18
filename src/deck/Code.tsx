import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ease } from "./primitives";

const KW = /\b(const|let|function|return|import|from|export|default|if|else|new|useEffect|clearTimeout|setTimeout)\b/;
const PROP = /\b(onClick|onChange|onSubmit|onScroll|value|useState|useRef|stopPropagation|preventDefault|defaultValue|ref)\b/;
const TOKEN = /(\/\/.*$|"[^"]*"|'[^']*'|`[^`]*`|\b[A-Za-z_]\w*\b|\d+|[^\sA-Za-z_\d]+|\s+)/gm;

function tokenize(line: string) {
  const out: { t: string; c: string }[] = [];
  for (const m of line.matchAll(TOKEN)) {
    const t = m[0];
    let c = "text-foreground/90";
    if (t.startsWith("//")) c = "text-code-comment italic";
    else if (/^["'`]/.test(t)) c = "text-code-str";
    else if (PROP.test(t) && t.match(PROP)![0] === t) c = "text-code-prop font-semibold";
    else if (KW.test(t) && t.match(KW)![0] === t) c = "text-code-kw";
    else if (/^[A-Z]/.test(t)) c = "text-code-fn";
    else if (/^\d+$/.test(t)) c = "text-code-prop";
    else if (/^[^\w\s]+$/.test(t)) c = "text-muted-foreground";
    out.push({ t, c });
  }
  return out;
}

export function Code({ lines, highlight = [], visible, title = "App.jsx", className }: { lines: string[]; highlight?: number[] | undefined; visible?: number; title?: string; className?: string }) {
  const shown = visible ?? lines.length;
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-border bg-code-bg shadow-glow", className)}>
      <div className="flex items-center gap-3 border-b border-border px-6 py-4">
        <span className="h-3.5 w-3.5 rounded-full bg-destructive/80" />
        <span className="h-3.5 w-3.5 rounded-full bg-chart-4/80" />
        <span className="h-3.5 w-3.5 rounded-full bg-success/80" />
        <span className="ml-4 font-mono text-[18px] text-muted-foreground">{title}</span>
      </div>
      <pre className="px-2 py-5 font-mono text-[24px] leading-[1.6]">
        {lines.map((l, i) => {
          const hl = highlight.includes(i);
          return (
            <motion.div
              key={i}
              initial={false}
              animate={{ opacity: i < shown ? (highlight.length && !hl ? 0.45 : 1) : 0, x: i < shown ? 0 : -12 }}
              transition={{ duration: 0.45, ease }}
              className={cn("relative flex rounded-md px-4 transition-colors duration-500", hl && "bg-primary/20")}
            >
              {hl && <motion.span layoutId="code-bar" className="absolute left-0 top-0 h-full w-1 rounded bg-accent" />}
              <span className="mr-6 w-8 select-none text-right text-code-comment">{i + 1}</span>
              <span>{tokenize(l).map((tk, j) => <span key={j} className={tk.c}>{tk.t}</span>)}</span>
            </motion.div>
          );
        })}
      </pre>
    </div>
  );
}
