"use client";

const stackGroups = [
  {
    title: "Foundation Models",
    items: ["OpenAI", "Anthropic", "Gemini", "Mistral", "Cohere", "Llama"],
  },
  {
    title: "Orchestration",
    items: ["LangChain", "LlamaIndex", "OpenAI Agents", "Workflow APIs"],
  },
  {
    title: "Retrieval",
    items: ["Pinecone", "Weaviate", "Milvus", "Chroma", "pgvector", "Knowledge Graphs"],
  },
  {
    title: "Cloud & Data",
    items: ["Azure", "AWS", "Google Cloud", "Databricks", "Snowflake", "Postgres"],
  },
];

const engagementTypes = [
  {
    title: "AI features for SaaS products",
    text: "User-facing copilots, search, assistants, and workflow steps designed to fit a real product surface.",
  },
  {
    title: "Internal knowledge systems",
    text: "Grounded retrieval and answer workflows built around your documents, policies, and operational context.",
  },
  {
    title: "Workflow automation",
    text: "AI-assisted routing, triage, summarization, and decision support for support, operations, and internal teams.",
  },
  {
    title: "Operational guardrails",
    text: "Prompt controls, retrieval tuning, evaluations, and approval paths that reduce avoidable production risk.",
  },
  {
    title: "Data and integration fit",
    text: "Architecture shaped around your stack, cloud environment, APIs, and internal ownership constraints.",
  },
  {
    title: "Production handoff",
    text: "Clear delivery artifacts, implementation logic, and iteration paths so the system can be maintained after launch.",
  },
];

export function TechStack() {
  const marqueeItems = stackGroups.flatMap((group) => group.items);

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,11,24,1),rgba(5,10,22,0.95)_40%,rgba(5,10,22,0.92))]" />

      <div className="relative z-10 mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            Built Across The Modern AI Stack
          </p>
          <h2 className="section-title mt-4 text-4xl text-white sm:text-5xl lg:text-6xl text-balance heading-glow">
            Models, retrieval, orchestration,
            <br />
            <span className="heading-focus">and infrastructure selected to match the job</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            We work across the layers commonly needed to ship AI product features, internal knowledge systems, and
            workflow automation without forcing a one-stack-fits-all approach.
          </p>
        </div>

        <div
          className="mt-10 overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="animate-marquee flex min-w-max items-center gap-10 md:gap-14" style={{ animationDuration: "42s" }}>
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((partner, index) => (
              <span
                key={`${partner}-${index}`}
                className="font-display whitespace-nowrap text-[22px] font-medium leading-none text-white/28 md:text-[28px]"
                style={{ fontStretch: "88%" }}
              >
                {partner}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stackGroups.map((group) => (
            <article
              key={group.title}
              className="rounded-lg border border-white/8 bg-white/[0.02] p-5"
            >
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{group.title}</h3>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-slate-300">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-20 max-w-xl text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">Typical Engagements</span>
          <h2 className="section-title mt-4 text-4xl text-white sm:text-5xl lg:text-6xl text-balance heading-glow">
            What We Usually Help
            <br />
            <span className="heading-focus">Teams Ship</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {engagementTypes.map((item, i) => (
            <article
              key={item.title}
              className="group rounded-lg border border-white/8 bg-white/[0.02] p-6 transition-all hover:border-white/16 hover:bg-white/[0.04]"
            >
              <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/[0.06] text-sm font-bold text-slate-300">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
