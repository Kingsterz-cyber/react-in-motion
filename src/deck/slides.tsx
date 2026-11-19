import type { ReactNode } from "react";
import { Arrow, Card, Frame, Reveal, Title } from "./primitives";
import { Code } from "./Code";
import { lessons } from "./lesson";

export type Transition = "fade" | "push" | "morph" | "wipe";
export type SlideDef = { title: string; notes: string; steps: number; transition: Transition; render: (step: number) => ReactNode };

function Lesson({ index, step }: { index: number; step: number }) {
  const lesson = lessons[index];
  if (!lesson) return null;
  return <Frame page={index + 1} kicker={lesson.section}>
    <Title sub={lesson.intro}>{lesson.title}</Title>
    {lesson.process && <div className="mt-8 flex items-center gap-2">
      {lesson.process.map((text, i) => <div key={text} className="flex flex-1 items-center gap-2">
        <Reveal show={step >= i} className="flex-1"><Card active={step === i} className="flex h-[140px] items-center gap-5 p-5"><span className="font-mono text-[36px] text-accent">{i + 1}</span><span className="text-[28px] leading-snug">{text}</span></Card></Reveal>
        {i < lesson.process.length - 1 && <Arrow show={step > i} />}
      </div>)}
    </div>}
    {lesson.table ? <div className="mt-10 overflow-hidden rounded-lg border border-border">
      {lesson.table.map((row, i) => <Reveal key={row[0]} show={step >= Math.max(0, i - 1)}><div className={`grid grid-cols-[0.8fr_1.2fr_1.2fr] border-b border-border text-[28px] leading-snug ${i === 0 ? "bg-muted font-bold text-accent" : "bg-card/40"}`}>
        {row.map((cell) => <div key={cell} className="px-6 py-5">{cell}</div>)}
      </div></Reveal>)}
    </div> : <div className={`mt-8 grid gap-10 ${lesson.code ? "grid-cols-[1.25fr_1fr]" : "grid-cols-3"}`}>
      {lesson.code && <Code title={lesson.title.includes("display") ? "Continued JSX" : "React example.jsx"} lines={lesson.code} highlight={step > 0 ? [Math.min(step * 2, lesson.code.length - 1)] : []} />}
      <div className={lesson.code ? "space-y-5" : "contents"}>
        {lesson.blocks.map((block, i) => <Reveal key={block.title} show={step >= i}><Card active={step === i} className={lesson.code ? "p-6" : "h-[310px]"}>
          <h3 className="text-[32px] font-bold leading-snug text-accent">{block.title}</h3>
          <p className="mt-3 text-[28px] leading-snug text-muted-foreground">{block.text}</p>
        </Card></Reveal>)}
      </div>
    </div>}
    <Reveal show={step >= Math.max(0, lesson.blocks.length - 1)} className="absolute inset-x-0 bottom-0 border-t border-border pt-5 text-[28px] leading-snug text-accent"><b>Remember:</b> {lesson.key}</Reveal>
  </Frame>;
}

const transitions: Transition[] = ["fade", "push", "morph", "wipe"];
export const slides: SlideDef[] = lessons.map((lesson, index) => ({
  title: lesson.title, notes: lesson.notes,
  steps: Math.max(lesson.blocks.length, lesson.process?.length ?? 0, (lesson.table?.length ?? 1) - 1, 1),
  transition: transitions[index % transitions.length] ?? "fade",
  render: (step) => <Lesson index={index} step={step} />,
}));