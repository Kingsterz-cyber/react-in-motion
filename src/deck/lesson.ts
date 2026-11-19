import content from "./content.json";

export const lessons = content.flatMap((lesson) => {
  if (!lesson.code || lesson.code.length <= 13) return [lesson];
  const split = lesson.code.findIndex((line) => line.trim().startsWith("return <>"));
  const boundary = split > 0 ? split : 10;
  return [
    { ...lesson, title: `${lesson.title}: logic`, code: lesson.code.slice(0, boundary), intro: `${lesson.intro} The next slide continues the same component.`, notes: `${lesson.notes}\nExplain the handler or effect first. The next slide continues with the displayed elements.` },
    { ...lesson, title: `${lesson.title}: display`, code: lesson.code.slice(boundary), intro: "Continued from the previous slide: these elements use the state and handler we just defined.", notes: `${lesson.notes}\nThis is the continuation of the same component, not a separate component. Connect the displayed field or list back to its handler.` },
  ];
});