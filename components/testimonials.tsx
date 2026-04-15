"use client";

const themes = [
  {
    title: "Product teams shipping AI features",
    text: "Usually need copilots, search, or AI-assisted workflows that feel native to the product instead of bolted on after the fact.",
  },
  {
    title: "Knowledge-heavy functions",
    text: "Need retrieval quality, grounded answers, and internal assistants that can surface the right information with less friction.",
  },
  {
    title: "Operations and service teams",
    text: "Care about response quality, consistency, turnaround time, and keeping human oversight where it matters.",
  },
  {
    title: "Platform and delivery owners",
    text: "Need maintainable architecture, governance controls, and a realistic path from pilot usage to dependable production use.",
  },
];

export function Testimonials() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-1/2 right-0 h-80 w-80 rounded-full bg-accent/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-accent">
            Where We Usually Fit
          </span>
          <h2 className="section-title text-4xl text-white sm:text-5xl lg:text-6xl text-balance heading-glow">
            The kinds of teams that usually
            <br />
            <span className="heading-focus">get the most from working with us</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Rather than making broad claims, we focus on the recurring delivery situations where practical AI systems
            tend to create the most value.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {themes.map((item, index) => (
            <article
              key={item.title}
              className="group relative rounded-2xl border border-white/10 bg-[linear-gradient(165deg,rgba(10,16,30,0.92),rgba(7,12,24,0.84))] p-8 transition-all duration-300 hover:border-white/16 hover:bg-[linear-gradient(165deg,rgba(11,19,36,0.94),rgba(8,14,28,0.88))]"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="relative">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Engagement Theme</p>
                <h3 className="mt-4 text-2xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-4 text-sm leading-8 text-muted-foreground">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
