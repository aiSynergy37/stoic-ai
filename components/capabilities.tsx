"use client";

import { Badge } from "@/components/ui/badge";

const capabilities = [
  { label: "AI product features", category: "core" },
  { label: "Internal copilots", category: "core" },
  { label: "Knowledge retrieval", category: "data" },
  { label: "Workflow automation", category: "core" },
  { label: "RAG architecture", category: "data" },
  { label: "Vector search", category: "tech" },
  { label: "Prompt and response design", category: "core" },
  { label: "Tool-connected workflows", category: "agent" },
  { label: "Approval-aware execution", category: "agent" },
  { label: "Guardrails and controls", category: "safety" },
  { label: "Evaluation workflows", category: "safety" },
  { label: "Operational observability", category: "safety" },
  { label: "Data and API integration", category: "data" },
  { label: "Production rollout", category: "tech" },
  { label: "Iteration after launch", category: "tech" },
];

const categoryColors: Record<string, string> = {
  core: "border-cyan-200/30 bg-cyan-200/[0.11] text-cyan-100 hover:bg-cyan-200/[0.14]",
  data: "border-sky-200/26 bg-sky-200/[0.08] text-sky-100 hover:bg-sky-200/[0.12]",
  tech: "border-white/18 bg-white/[0.05] text-slate-200 hover:bg-white/[0.09]",
  agent: "border-blue-200/24 bg-blue-200/[0.08] text-blue-100 hover:bg-blue-200/[0.12]",
  safety: "border-cyan-100/22 bg-cyan-100/[0.07] text-slate-100 hover:bg-cyan-100/[0.11]",
};

export function Capabilities() {
  return (
    <section id="capabilities" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-cyan-200/8 rounded-full blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <span className="inline-block text-sm font-medium text-cyan-200 mb-4 tracking-wider uppercase">
            What We Bring
          </span>
          <h2 className="section-title mb-6 text-4xl text-white sm:text-5xl lg:text-6xl text-balance heading-glow">
            Delivery capabilities shaped
            <br />
            <span className="heading-focus">around real operating systems</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We work across product, data, orchestration, and controls so the system can move from idea to usable
            production workflow without collapsing into a demo-only prototype.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {capabilities.map((cap, index) => (
            <Badge
              key={index}
              variant="outline"
              className={`px-4 py-2 text-sm font-medium ${categoryColors[cap.category]} transition-all duration-300 hover:scale-[1.03] cursor-default animate-in fade-in zoom-in-90 duration-500`}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              {cap.label}
            </Badge>
          ))}
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Product and workflow fit",
              description: "We shape AI systems around the user journey, operating workflow, and business constraint before implementation details take over.",
            },
            {
              title: "Technical delivery depth",
              description: "Retrieval, tool use, integrations, guardrails, and rollout decisions are handled as part of one delivery path rather than as disconnected experiments.",
            },
            {
              title: "Reliability after launch",
              description: "We build with evaluation, observability, and iteration in mind so the system can keep improving after first release.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-white/12 bg-[#071327]/76 p-8 transition-colors duration-300 hover:border-cyan-200/32 hover:bg-[#091a34]/82 animate-in fade-in slide-in-from-bottom-6 duration-700"
              style={{ animationDelay: `${index * 100 + 200}ms` }}
            >
              <div className="absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/40 to-transparent" />
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
