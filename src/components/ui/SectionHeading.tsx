import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  tone?: "light" | "dark";
  className?: string;
};

/** Nadpis sekcie – `id` sa použije pre aria-labelledby na <section>. */
export function SectionHeading({ id, eyebrow, title, intro, tone = "light", className }: SectionHeadingProps) {
  const dark = tone === "dark";

  return (
    <div className={cn("max-w-2xl", className)}>
      <p
        data-reveal
        className={cn(
          "mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em]",
          dark ? "text-brand-light" : "text-brand-strong",
        )}
      >
        <span aria-hidden="true" className="h-px w-8 bg-brand" />
        {eyebrow}
      </p>
      <h2
        id={id}
        data-reveal
        className={cn("text-3xl font-bold sm:text-4xl lg:text-5xl", dark ? "text-white" : "text-ink")}
      >
        {title}
      </h2>
      {intro ? (
        <p
          data-reveal
          className={cn("mt-5 text-base leading-relaxed sm:text-lg", dark ? "text-white/70" : "text-muted")}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
