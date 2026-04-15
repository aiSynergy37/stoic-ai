"use client";

const process = [
  {
    step: "01",
    title: "Prioritize the right use case",
    text: "We look for workflows where AI can improve speed, consistency, or decision quality without creating unnecessary operational burden.",
  },
  {
    step: "02",
    title: "Design around the operating environment",
    text: "The system is shaped around your data sources, tools, permissions, review paths, and team responsibilities before build decisions are locked in.",
  },
  {
    step: "03",
    title: "Refine with live usage",
    text: "After rollout, we use actual team feedback to improve prompts, retrieval quality, orchestration, and reliability where it matters.",
  },
];

const outcomes = [
  {
    title: "Clear operational fit",
    text: "Teams need outputs they can review, trust, and act on without adding confusion to existing workflows.",
  },
  {
    title: "Lower implementation drag",
    text: "Architecture and tooling choices are made with deployment realities, internal ownership, and maintenance in mind.",
  },
  {
    title: "Systems that can mature",
    text: "From early MVPs to broader internal rollouts, we build with observability, controls, and iteration paths in place.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative border-t border-white/10 py-24 sm:py-28">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,11,24,0.94),rgba(5,10,22,0.99))]" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">How We Work</span>
          <h2 className="mt-4 section-title text-4xl text-white sm:text-5xl lg:text-6xl text-balance heading-glow">
            A more grounded approach
            <br />
            <span className="heading-focus">to AI delivery</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-400">
            We work with teams that need AI systems to fit real operating environments, not just look impressive in a
            sales deck or prototype.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-5xl">
          <div className="grid gap-4">
            {process.map((item) => (
              <article
                key={item.step}
                className="grid gap-4 rounded-2xl border border-white/10 bg-[linear-gradient(165deg,rgba(10,16,30,0.86),rgba(7,12,24,0.78))] px-6 py-6 sm:grid-cols-[96px,1fr] sm:items-start sm:px-8"
              >
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Step {item.step}</div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-18 border-t border-white/10 pt-14">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Why It Matters</span>
            <h2 className="mt-4 section-title text-4xl text-white sm:text-5xl lg:text-6xl text-balance heading-glow">
              Built for repeatable use,
              <br />
              <span className="heading-focus">not one-off demos</span>
            </h2>
          </div>

          <div className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-3">
            {outcomes.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:bg-white/[0.05]"
              >
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
