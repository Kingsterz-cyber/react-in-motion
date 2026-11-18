import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Arrow, Card, Frame, Reveal, Term, Title, motion, ease } from "./primitives";
import { Code } from "./Code";

export type Transition = "fade" | "push" | "morph" | "wipe";
export type SlideDef = { title: string; steps: number; transition: Transition; render: (step: number) => ReactNode };

/* 01 */
function TitleSlide() {
  return (
    <div className="relative h-full w-full">
      <div className="slide-grid-bg absolute inset-0" />
      <motion.div className="absolute right-[-200px] top-[140px] h-[800px] w-[800px] rounded-full border border-accent/30"
        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.4, ease }} />
      <motion.div className="absolute right-[-60px] top-[280px] h-[520px] w-[520px] rounded-full bg-primary/30 blur-[100px]"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6 }} />
      <motion.svg viewBox="-11.5 -10.23 23 20.46" className="absolute right-[160px] top-[330px] h-[420px] w-[420px] text-accent"
        initial={{ rotate: -30, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 1.4, ease }}>
        <circle r="2.05" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="0.6" fill="none">
          <ellipse rx="11" ry="4.2" /><ellipse rx="11" ry="4.2" transform="rotate(60)" /><ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </motion.svg>
      <div className="absolute left-28 top-16 flex items-center gap-4 text-[22px] uppercase tracking-[0.2em] text-muted-foreground">
        <span className="h-3 w-3 rounded-full bg-accent shadow-glow-accent" /> <span className="font-semibold text-foreground">Group 8</span>
      </div>
      <div className="absolute left-28 top-[300px]">
        <Reveal show><span className="rounded-full border border-accent/50 px-6 py-2 text-[22px] uppercase tracking-[0.2em] text-accent">Frontend Engineering</span></Reveal>
        <motion.h1 className="mt-10 text-[180px] font-bold leading-[0.92] tracking-tight"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.15 }}>
          React<br /><span className="text-gradient">Presentation</span>
        </motion.h1>
        <Reveal show delay={0.5} className="mt-14 flex items-center gap-6 text-[32px]">
          <span className="text-muted-foreground">presented by:</span>
          <span className="rounded-xl bg-primary px-8 py-3 font-bold tracking-wider text-primary-foreground shadow-glow">GROUP 8</span>
        </Reveal>
      </div>
      <div className="absolute bottom-10 left-28 font-mono text-[20px] text-muted-foreground">page 01</div>
    </div>
  );
}

/* 02 */
const agenda = [
  ["01", "React Event Systems", "Synthetic events & the handling pipeline"],
  ["02", "Component Architecture", "Controlled vs. uncontrolled inputs"],
  ["03", "Propagation", "Capturing, bubbling & stopPropagation()"],
  ["04", "Performance", "Debouncing & throttling handlers"],
];
function Agenda({ step }: { step: number }) {
  return (
    <Frame page={2} kicker="Overview">
      <Title sub="Four pillars of interactive React interfaces.">Agenda.</Title>
      <div className="mt-16 grid grid-cols-4 gap-8">
        {agenda.map(([n, t, d], i) => (
          <Reveal key={n} show={step >= i}>
            <Card active={step === i} className="h-[420px] flex flex-col justify-between">
              <span className="font-mono text-[72px] font-bold text-accent">{n}</span>
              <div><h3 className="text-[40px] font-bold leading-tight">{t}</h3><p className="mt-4 text-[26px] text-muted-foreground">{d}</p></div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Frame>
  );
}

/* 03 */
function Synthetic({ step }: { step: number }) {
  return (
    <Frame page={3} kicker="Event Systems">
      <Title>React Synthetic Events.</Title>
      <div className="mt-12 grid grid-cols-2 gap-14">
        <div className="space-y-8 text-[30px] leading-snug">
          <Reveal show={step >= 0}><p>A <Term>SyntheticEvent</Term> is React's <b>cross-browser wrapper</b> around the browser's native event.</p></Reveal>
          <Reveal show={step >= 1}><p className="text-muted-foreground">Same interface everywhere: <Term>e.target</Term>, <Term>e.preventDefault()</Term>, <Term>e.stopPropagation()</Term>.</p></Reveal>
          <Reveal show={step >= 1}><p className="text-muted-foreground">React attaches one listener at the <b className="text-foreground">root</b> and delegates.</p></Reveal>
        </div>
        <Reveal show={step >= 2}>
          <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-border text-[26px]">
            <div className="bg-muted p-6 font-bold">Native DOM</div><div className="bg-primary/30 p-6 font-bold text-accent">React</div>
            {[["onclick", "onClick"], ['"handle()" string', "{handle} function"], ["return false", "e.preventDefault()"], ["Per-element listeners", "Root delegation"]].map(([a, b]) => (
              <div key={a} className="contents"><div className="border-t border-border p-6 font-mono text-muted-foreground">{a}</div><div className="border-t border-border p-6 font-mono">{b}</div></div>
            ))}
          </div>
        </Reveal>
      </div>
    </Frame>
  );
}

/* 04 */
const pipe = ["User Click", "SyntheticEvent Layer", "Handler Execution", "State Dispatch", "UI Update"];
function Pipeline({ step }: { step: number }) {
  const code = ["const [count, setCount] = useState(0);", "", "function handleClick(e) {", "  setCount(count + 1);", "}", "", "<button onClick={handleClick}>", "  Clicked {count} times", "</button>"];
  const hl = [[6], [6], [2], [3], [7]][step];
  return (
    <Frame page={4} kicker="Event Systems">
      <Title>Event Handling Pipeline.</Title>
      <div className="mt-14 flex items-center">
        {pipe.map((p, i) => (
          <div key={p} className="flex items-center">
            <motion.div initial={false} animate={{ opacity: step >= i ? 1 : 0.25, y: step === i ? -8 : 0 }} transition={{ duration: 0.6, ease }}
              className={cn("flex h-[150px] w-[250px] flex-col justify-center rounded-2xl border p-6 transition-colors duration-500",
                step === i ? "border-accent bg-primary/25 shadow-glow-accent" : "border-border bg-card/60")}>
              <span className="font-mono text-[20px] text-accent">0{i + 1}</span>
              <span className="text-[28px] font-bold leading-tight">{p}</span>
            </motion.div>
            {i < pipe.length - 1 && <Arrow show={step > i} />}
          </div>
        ))}
      </div>
      <div className="mt-12 grid grid-cols-[1fr_1fr] gap-12">
        <Code lines={code} highlight={hl} />
        <Card className="flex flex-col justify-center gap-6">
          <span className="text-[22px] uppercase tracking-[0.2em] text-muted-foreground">Live result</span>
          <motion.button key={step} initial={{ scale: step === 0 ? 0.92 : 1 }} animate={{ scale: 1 }}
            className="w-fit rounded-xl bg-primary px-10 py-5 text-[32px] font-bold text-primary-foreground shadow-glow">
            Clicked {step >= 4 ? 1 : 0} times
          </motion.button>
          <p className="text-[26px] text-muted-foreground">{["The user presses the button.", "React wraps the native click into a SyntheticEvent.", "handleClick runs with the event object.", "setCount schedules a state update.", "React re-renders — the UI shows the new count."][step]}</p>
        </Card>
      </div>
    </Frame>
  );
}

/* 05 */
function CvU({ step }: { step: number }) {
  return (
    <Frame page={5} kicker="Component Architecture">
      <Title sub="Who owns the input's value — React state, or the DOM?">Controlled vs. Uncontrolled.</Title>
      <div className="mt-12 grid grid-cols-2 gap-10">
        <Reveal show={step >= 0}><Card active={step === 0}>
          <h3 className="text-[40px] font-bold text-accent">Controlled</h3>
          <p className="mt-3 text-[26px] text-muted-foreground">React state is the <b className="text-foreground">single source of truth</b>.</p>
          <Code className="mt-6" lines={["const [name, setName] = useState('');", "<input value={name}", "  onChange={e => setName(e.target.value)} />"]} highlight={step === 0 ? [1, 2] : []} />
        </Card></Reveal>
        <Reveal show={step >= 1}><Card active={step === 1}>
          <h3 className="text-[40px] font-bold">Uncontrolled</h3>
          <p className="mt-3 text-[26px] text-muted-foreground">The <b className="text-foreground">DOM</b> keeps the value; read it with a ref.</p>
          <Code className="mt-6" lines={["const inputRef = useRef(null);", "<input defaultValue=\"\" ref={inputRef} />", "// inputRef.current.value onSubmit"]} highlight={step === 1 ? [1, 2] : []} />
        </Card></Reveal>
      </div>
      <Reveal show={step >= 2} className="mt-10 text-center text-[34px]">
        Single source of truth → <span className="text-gradient font-bold">predictable, testable, validatable</span> forms.
      </Reveal>
    </Frame>
  );
}

/* 06 */
const rows = [
  ["Data source", "React state", "The DOM"],
  ["State management", "useState + onChange", "useRef / defaultValue"],
  ["Form validation", "Instant, on every keystroke", "On submit"],
  ["Performance", "Re-render per change", "Fewer re-renders"],
  ["Use cases", "Live validation, dynamic UI", "Simple forms, file inputs"],
];
function CompareTable({ step }: { step: number }) {
  return (
    <Frame page={6} kicker="Component Architecture">
      <Title>Head-to-head.</Title>
      <div className="mt-12 overflow-hidden rounded-2xl border border-border text-[30px]">
        <div className="grid grid-cols-[1fr_1.3fr_1.3fr] bg-muted font-bold">
          <div className="p-6 text-muted-foreground">Aspect</div><div className="p-6 text-accent">Controlled</div><div className="p-6">Uncontrolled</div>
        </div>
        {rows.map((r, i) => (
          <Reveal key={r[0]} show={step >= i}>
            <div className={cn("grid grid-cols-[1fr_1.3fr_1.3fr] border-t border-border transition-colors duration-500", step === i && "bg-primary/15")}>
              <div className="p-6 font-semibold">{r[0]}</div><div className="p-6">{r[1]}</div><div className="p-6 text-muted-foreground">{r[2]}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </Frame>
  );
}

/* 07 */
const loop = [
  ["Input typing", "User types “R”"],
  ["onChange trigger", "e.target.value = “R”"],
  ["useState update", "setName(“R”)"],
  ["Re-render", "<input value=“R” />"],
];
function Lifecycle({ step }: { step: number }) {
  const pos = ["left-1/2 top-0 -translate-x-1/2", "right-0 top-1/2 -translate-y-1/2", "left-1/2 bottom-0 -translate-x-1/2", "left-0 top-1/2 -translate-y-1/2"];
  return (
    <Frame page={7} kicker="Component Architecture">
      <Title>Controlled Lifecycle.</Title>
      <div className="mt-6 grid grid-cols-[1fr_620px] items-center gap-12">
        <div className="relative mx-auto h-[700px] w-[1000px]">
          <svg className="absolute inset-0" viewBox="0 0 1000 700">
            <ellipse cx="500" cy="350" rx="340" ry="250" fill="none" stroke="var(--border)" strokeWidth="3" strokeDasharray="10 12" />
            <motion.ellipse cx="500" cy="350" rx="340" ry="250" fill="none" stroke="var(--accent)" strokeWidth="4"
              initial={false} animate={{ pathLength: (step + 1) / 4 }} transition={{ duration: 0.9, ease }} style={{ rotate: -90, transformOrigin: "500px 350px" }} />
          </svg>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-[24px] uppercase tracking-[0.2em] text-muted-foreground">state</div>
            <motion.div key={step} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="font-mono text-[56px] font-bold text-accent">
              name = "{step >= 2 ? "R" : ""}"
            </motion.div>
          </div>
          {loop.map(([t, d], i) => (
            <motion.div key={t} initial={false} animate={{ opacity: step >= i ? 1 : 0.25 }} className={cn("absolute", pos[i])}>
              <div className={cn("w-[300px] rounded-2xl border bg-card p-6 text-center transition-all duration-500", step === i ? "border-accent shadow-glow-accent" : "border-border")}>
                <div className="font-mono text-[20px] text-accent">0{i + 1}</div>
                <div className="text-[30px] font-bold">{t}</div>
                <div className="mt-1 font-mono text-[20px] text-muted-foreground">{d}</div>
              </div>
            </motion.div>
          ))}
        </div>
        <Code lines={["function NameField() {", "  const [name, setName] = useState('');", "  return (", "    <input", "      value={name}", "      onChange={e => setName(e.target.value)}", "    />", "  );", "}"]}
          highlight={[[3], [5], [1], [4]][step]} />
      </div>
    </Frame>
  );
}

/* 08 */
function Bubbling({ step }: { step: number }) {
  return (
    <Frame page={8} kicker="Propagation">
      <Title sub="Every event travels through the tree twice.">Event Bubbling & Propagation.</Title>
      <div className="mt-12 grid grid-cols-3 gap-8">
        {[
          ["Capturing phase", "Travels down from window → target. Listen with onClickCapture.", "↓"],
          ["Bubbling phase", "Travels back up from target → ancestors. Default for onClick.", "↑"],
          ["e.stopPropagation()", "Halts the journey — ancestors never receive the event.", "■"],
        ].map(([t, d, ic], i) => (
          <Reveal key={t} show={step >= i}><Card active={step === i} className="h-[340px]">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-[44px] font-bold text-primary-foreground shadow-glow">{ic}</div>
            <h3 className="mt-8 font-mono text-[36px] font-bold">{t}</h3>
            <p className="mt-4 text-[26px] text-muted-foreground">{d}</p>
          </Card></Reveal>
        ))}
      </div>
      <Reveal show={step >= 2} className="mt-10">
        <Code lines={["<div onClick={() => log('parent')}>", "  <button onClick={e => { e.stopPropagation(); log('child'); }}>", "    Click", "  </button>", "</div>"]} highlight={[1]} />
      </Reveal>
    </Frame>
  );
}

/* 09 */
const tree = ["window", "<div id=\"root\">", "<section>", "<form>", "<button>"];
function DomTree({ step }: { step: number }) {
  const [stop, setStop] = useState(false);
  const [tick, setTick] = useState(0);
  const reached = Math.min(step, 4);
  useEffect(() => setTick((t) => t + 1), [step, stop]);
  return (
    <Frame page={9} kicker="Propagation">
      <Title>DOM Tree Bubbling.</Title>
      <div className="mt-8 grid grid-cols-[1fr_640px] gap-16">
        <div className="flex flex-col items-center">
          {tree.map((n, i) => {
            const lvl = 4 - i; // 0 = button
            const lit = lvl <= reached && !(stop && lvl > 1);
            const blocked = stop && lvl > 1 && lvl <= reached;
            return (
              <div key={n} className="flex flex-col items-center">
                <motion.div initial={false} animate={{ scale: lit && lvl === reached ? 1.05 : 1 }}
                  className={cn("w-[420px] rounded-xl border px-8 py-5 text-center font-mono text-[30px] transition-all duration-500",
                    lit ? "border-accent bg-primary/25 shadow-glow-accent" : blocked ? "border-destructive/50 opacity-40 line-through" : "border-border bg-card/60 text-muted-foreground")}>
                  {n}{lvl === 1 && stop && <span className="ml-3 text-[20px] text-destructive">stopPropagation()</span>}
                </motion.div>
                {i < tree.length - 1 && <Arrow vertical up show={lvl - 1 < reached && !(stop && lvl - 1 >= 1)} />}
              </div>
            );
          })}
        </div>
        <div className="flex flex-col justify-center gap-8">
          <p className="text-[30px] leading-snug text-muted-foreground">A click on <Term>{"<button>"}</Term> bubbles <b className="text-foreground">upward</b> through every ancestor — one level per step.</p>
          <button onClick={(e) => { e.stopPropagation(); setStop((s) => !s); }}
            className={cn("flex items-center gap-6 rounded-2xl border p-6 text-left text-[28px] transition-colors", stop ? "border-destructive bg-destructive/15" : "border-border bg-card")}>
            <span className={cn("relative h-10 w-20 rounded-full transition-colors", stop ? "bg-destructive" : "bg-muted")}>
              <span className={cn("absolute top-1 h-8 w-8 rounded-full bg-foreground transition-all", stop ? "left-11" : "left-1")} />
            </span>
            <span><b className="font-mono">stopPropagation()</b> on &lt;form&gt;: {stop ? "ON" : "OFF"}</span>
          </button>
          <p key={tick} className="font-mono text-[24px] text-accent">
            {stop && reached > 1 ? "→ event stopped at <form>" : `→ event reached ${tree[4 - reached]}`}
          </p>
        </div>
      </div>
    </Frame>
  );
}

/* 10 */
function TimelineRow({ label, events, fires, show }: { label: string; events: number[]; fires: number[]; show: boolean }) {
  return (
    <div className="flex items-center gap-8">
      <span className="w-[200px] text-[26px] font-semibold">{label}</span>
      <div className="relative h-16 flex-1 border-b-2 border-border">
        {events.map((x, i) => (
          <motion.span key={"e" + i} initial={false} animate={{ opacity: show ? 1 : 0, scaleY: show ? 1 : 0 }} transition={{ delay: show ? i * 0.05 : 0, duration: 0.3 }}
            className="absolute bottom-0 h-10 w-1.5 origin-bottom rounded bg-muted-foreground" style={{ left: `${x}%` }} />
        ))}
        {fires.map((x, i) => (
          <motion.span key={"f" + i} initial={false} animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0 }} transition={{ delay: show ? 0.6 + i * 0.1 : 0, duration: 0.4, ease }}
            className="absolute -top-3 h-8 w-8 -translate-x-1/2 rounded-full bg-accent shadow-glow-accent" style={{ left: `${x}%` }} />
        ))}
      </div>
    </div>
  );
}
const burst = [2, 6, 9, 13, 17, 20, 24, 42, 46, 50, 53, 57, 61, 64, 68, 72];
function Debounce({ step }: { step: number }) {
  const seq = ["User types", "Timer starts", "Previous timer resets", "User stops typing", "Search executes"];
  return (
    <Frame page={10} kicker="Performance">
      <Title sub="Wait until the user stops — then run once.">Debouncing in React.</Title>
      <div className="mt-10 flex items-center">
        {seq.map((s, i) => (
          <div key={s} className="flex items-center">
            <motion.div initial={false} animate={{ opacity: step >= i ? 1 : 0.25 }}
              className={cn("rounded-xl border px-6 py-4 text-[24px] font-semibold transition-all duration-500", step === i ? "border-accent bg-primary/25 shadow-glow-accent" : "border-border bg-card/60")}>{s}</motion.div>
            {i < seq.length - 1 && <Arrow show={step > i} />}
          </div>
        ))}
      </div>
      <div className="mt-10 grid grid-cols-[1.1fr_1fr] gap-12">
        <Code title="SearchBox.jsx" lines={["const [query, setQuery] = useState('');", "useEffect(() => {", "  const id = setTimeout(() => {", "    search(query); // fires 300ms after last key", "  }, 300);", "  return () => clearTimeout(id);", "}, [query]);", "<input value={query} onChange={e => setQuery(e.target.value)} />"]}
          highlight={[[7], [2, 4], [5], [6], [3]][step]} />
        <Card className="flex flex-col justify-center gap-8">
          <span className="text-[22px] uppercase tracking-[0.2em] text-muted-foreground">Timing · 300ms delay</span>
          <TimelineRow label="Keystrokes" events={burst} fires={[]} show={step >= 0} />
          <TimelineRow label="search()" events={[]} fires={[34, 84]} show={step >= 4} />
          <p className="text-[26px] text-muted-foreground">16 keystrokes → <b className="text-accent">2 API calls</b>.</p>
        </Card>
      </div>
    </Frame>
  );
}

/* 11 */
const scrolls = Array.from({ length: 30 }, (_, i) => 2 + i * 3.2);
function Throttle({ step }: { step: number }) {
  return (
    <Frame page={11} kicker="Performance">
      <Title sub="Run at most once per interval — no matter how often it fires.">Throttling in React.</Title>
      <div className="mt-12 grid grid-cols-[1fr_1.1fr] gap-12">
        <div className="space-y-8">
          <Reveal show={step >= 0}><Card active={step === 0}><h3 className="text-[34px] font-bold">Concept</h3><p className="mt-2 text-[26px] text-muted-foreground">Guarantees a steady, limited execution rate.</p></Card></Reveal>
          <Reveal show={step >= 1}><Card active={step === 1}><h3 className="text-[34px] font-bold">Execution interval</h3><p className="mt-2 text-[26px] text-muted-foreground">Calls inside the window are ignored; the next one after it runs.</p></Card></Reveal>
          <Reveal show={step >= 2}><Card active={step === 2}>
            <span className="text-[22px] uppercase tracking-[0.2em] text-muted-foreground">Scroll · 200ms interval</span>
            <div className="mt-6 space-y-6">
              <TimelineRow label="onScroll" events={scrolls} fires={[]} show />
              <TimelineRow label="handler" events={[]} fires={[2, 21, 40, 59, 78, 97]} show={step >= 2} />
            </div>
          </Card></Reveal>
        </div>
        <Code title="useThrottle.js" lines={["const last = useRef(0);", "", "function onScroll() {", "  const now = Date.now();", "  if (now - last.current < 200) return;", "  last.current = now;", "  updateHeader(window.scrollY);", "}", "", "useEffect(() => {", "  window.addEventListener('scroll', onScroll);", "  return () => window.removeEventListener('scroll', onScroll);", "}, []);"]}
          highlight={[[0, 5], [4], [10, 11]][step]} />
      </div>
    </Frame>
  );
}

/* 12 */
function DvT({ step }: { step: number }) {
  const ev = [3, 6, 9, 12, 15, 18, 21, 24, 45, 48, 51, 54, 57, 60];
  return (
    <Frame page={12} kicker="Performance">
      <Title>Debounce vs. Throttle.</Title>
      <Card className="mt-10 space-y-8">
        <TimelineRow label="Raw events" events={ev} fires={[]} show={step >= 0} />
        <TimelineRow label="Debounce" events={[]} fires={[32, 68]} show={step >= 1} />
        <TimelineRow label="Throttle" events={[]} fires={[3, 15, 45, 57]} show={step >= 2} />
      </Card>
      <Reveal show={step >= 3} className="mt-10">
        <div className="overflow-hidden rounded-2xl border border-border text-[26px]">
          <div className="grid grid-cols-3 bg-muted font-bold"><div className="p-5 text-muted-foreground">Aspect</div><div className="p-5 text-accent">Debounce</div><div className="p-5 text-accent">Throttle</div></div>
          {[["Fires", "Once, after activity stops", "Regularly, at fixed intervals"], ["Best for", "Search, autosave, resize end", "Scroll, mousemove, drag"], ["Mental model", "“Wait for silence”", "“Steady heartbeat”"]].map((r) => (
            <div key={r[0]} className="grid grid-cols-3 border-t border-border"><div className="p-5 font-semibold">{r[0]}</div><div className="p-5">{r[1]}</div><div className="p-5">{r[2]}</div></div>
          ))}
        </div>
      </Reveal>
    </Frame>
  );
}

/* 13 */
function Summary({ step }: { step: number }) {
  const rules = [
    ["Pass functions, not calls", "onClick={handle} — not onClick={handle()}"],
    ["Prefer controlled inputs", "One source of truth for forms"],
    ["Stop propagation sparingly", "It can break parent analytics & menus"],
    ["Always clean up", "Clear timers & remove listeners in useEffect"],
  ];
  if (step >= 4)
    return (
      <div className="relative flex h-full w-full flex-col items-center justify-center text-center">
        <div className="slide-grid-bg absolute inset-0" />
        <motion.div className="absolute h-[700px] w-[700px] rounded-full bg-primary/30 blur-[120px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} />
        <motion.h1 initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease }} className="relative text-[220px] font-bold leading-none text-gradient">Q&amp;A</motion.h1>
        <Reveal show delay={0.4} className="relative mt-10 text-[44px]">Thank you — <b>GROUP 8</b></Reveal>
        <div className="absolute bottom-10 font-mono text-[20px] text-muted-foreground">page 13</div>
      </div>
    );
  return (
    <Frame page={13} kicker="Summary">
      <Title sub="Key rules to ship fast, leak-free React UIs.">Best Practices.</Title>
      <div className="mt-12 grid grid-cols-2 gap-8">
        {rules.map(([t, d], i) => (
          <Reveal key={t} show={step >= i}><Card active={step === i} className="flex gap-6">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-primary font-mono text-[28px] font-bold text-primary-foreground">{i + 1}</span>
            <div><h3 className="text-[36px] font-bold">{t}</h3><p className="mt-2 font-mono text-[24px] text-muted-foreground">{d}</p></div>
          </Card></Reveal>
        ))}
      </div>
      <Reveal show={step >= 3} className="mt-8 text-[28px] text-muted-foreground">
        Forgotten <Term>setTimeout</Term> or <Term>addEventListener</Term> cleanups cause <b className="text-destructive">memory leaks</b> and updates on unmounted components.
      </Reveal>
    </Frame>
  );
}

export const slides: SlideDef[] = [
  { title: "React Presentation", steps: 1, transition: "fade", render: () => <TitleSlide /> },
  { title: "Agenda", steps: 4, transition: "push", render: (s) => <Agenda step={s} /> },
  { title: "Synthetic Events", steps: 3, transition: "push", render: (s) => <Synthetic step={s} /> },
  { title: "Event Pipeline", steps: 5, transition: "wipe", render: (s) => <Pipeline step={s} /> },
  { title: "Controlled vs Uncontrolled", steps: 3, transition: "push", render: (s) => <CvU step={s} /> },
  { title: "Comparison Table", steps: 5, transition: "morph", render: (s) => <CompareTable step={s} /> },
  { title: "Controlled Lifecycle", steps: 4, transition: "wipe", render: (s) => <Lifecycle step={s} /> },
  { title: "Bubbling & Propagation", steps: 3, transition: "push", render: (s) => <Bubbling step={s} /> },
  { title: "DOM Tree Bubbling", steps: 5, transition: "morph", render: (s) => <DomTree step={s} /> },
  { title: "Debouncing", steps: 5, transition: "push", render: (s) => <Debounce step={s} /> },
  { title: "Throttling", steps: 3, transition: "morph", render: (s) => <Throttle step={s} /> },
  { title: "Debounce vs Throttle", steps: 4, transition: "wipe", render: (s) => <DvT step={s} /> },
  { title: "Summary & Q&A", steps: 5, transition: "fade", render: (s) => <Summary step={s} /> },
];
