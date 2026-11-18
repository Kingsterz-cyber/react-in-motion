import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import { Deck } from "@/deck/Deck";
import { slides } from "@/deck/slides";

const clamp = (n: number, max: number) => Math.max(0, Math.min(max, Math.floor(Number(n) || 0)));

export const Route = createFileRoute("/")({
  validateSearch: (s: Record<string, unknown>): { slide?: number; step?: number } => ({ slide: Number(s['slide']) || 1, step: Number(s['step']) || 1 }),
  head: () => ({
    meta: [
      { title: "React Presentation — GROUP 8" },
      { name: "description", content: "Interactive slide deck by GROUP 8 on React events, controlled components, propagation, debouncing and throttling." },
      { property: "og:title", content: "React Presentation — GROUP 8" },
      { property: "og:description", content: "Interactive React deck: synthetic events, controlled inputs, bubbling, debounce & throttle." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { slide = 1, step = 1 } = Route.useSearch();
  const navigate = useNavigate({ from: "/" });
  const i = clamp(slide - 1, slides.length - 1);
  const st = clamp(step - 1, slides[i]!.steps - 1);
  return (
    <ClientOnly fallback={<div className="h-screen w-screen bg-sidebar" />}>
      <Deck initialSlide={i} initialStep={st}
        onChange={(a, b) => navigate({ search: { slide: a + 1, step: b + 1 }, replace: true })} />
    </ClientOnly>
  );
}
