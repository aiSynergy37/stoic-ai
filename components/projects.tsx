"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Brain,
  FileSearch,
  MessageSquareText,
  Mic,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";

const featuredCase = {
  title: "Document-heavy operations workflow",
  summary:
    "Representative delivery pattern for teams handling high-volume documents, manual review queues, and approval-heavy operations that need faster throughput without losing control.",
  metrics: [
    { label: "Primary Focus", value: "Extraction + review" },
    { label: "Workflow Shape", value: "Human-in-the-loop" },
    { label: "Typical Scope", value: "Operations workflow" },
  ],
  highlights: [
    "Automated intake, classification, and structured extraction",
    "Review flows designed around exception handling and verification",
    "Reporting, audit visibility, and role-aware controls for production use",
  ],
};

const cases = [
  {
    title: "AI Support Copilot",
    outcome: "Response drafting, routing support, and cleaner handoffs",
    domain: "Customer Experience",
    tags: ["Agents", "Automation"],
    icon: MessageSquareText,
    color: "from-cyan-500/20 to-blue-500/10",
    accent: "text-cyan-200",
  },
  {
    title: "Knowledge Assistant",
    outcome: "Faster access to grounded internal answers",
    domain: "Internal Operations",
    tags: ["RAG", "Search"],
    icon: Bot,
    color: "from-emerald-500/20 to-teal-500/10",
    accent: "text-emerald-200",
  },
  {
    title: "Meeting Intelligence",
    outcome: "Cleaner summaries, action capture, and follow-up support",
    domain: "Productivity",
    tags: ["Speech", "Summary"],
    icon: Mic,
    color: "from-violet-500/20 to-fuchsia-500/10",
    accent: "text-violet-200",
  },
  {
    title: "Resume Screening Engine",
    outcome: "More consistent screening support and ranking assistance",
    domain: "HR Tech",
    tags: ["ML", "Ranking"],
    icon: FileSearch,
    color: "from-amber-500/20 to-orange-500/10",
    accent: "text-amber-200",
  },
  {
    title: "SaaS Product Insights AI",
    outcome: "Faster insight generation across usage and product signals",
    domain: "Product Analytics",
    tags: ["Analytics", "Predictions"],
    icon: Brain,
    color: "from-sky-500/20 to-indigo-500/10",
    accent: "text-sky-200",
  },
  {
    title: "Procurement Automation",
    outcome: "Lower manual handling across intake and review workflows",
    domain: "Enterprise Ops",
    tags: ["OCR", "Ops"],
    icon: ShoppingCart,
    color: "from-rose-500/20 to-red-500/10",
    accent: "text-rose-200",
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-28 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-20 right-0 h-80 w-80 rounded-full bg-primary/10 blur-[130px] animate-pulse-glow" />
      <div className="absolute bottom-10 left-0 h-72 w-72 rounded-full bg-accent/10 blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.2s" }} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <span className="inline-block text-sm font-semibold text-primary mb-3 tracking-wide uppercase">Representative Engagements</span>
          <h2 className="section-title text-4xl sm:text-5xl lg:text-6xl text-white mb-4 text-balance heading-glow">
            Representative delivery patterns built around <span className="heading-focus">real operating workflows</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
            These are representative problem shapes and delivery patterns, not inflated public case studies. They show
            the kinds of workflows we are usually brought in to improve.
          </p>
        </div>

        <div className="relative rounded-3xl glass border-gradient p-6 sm:p-8 mb-10 animate-in fade-in zoom-in-95 duration-700">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
          <div className="relative grid lg:grid-cols-[1.2fr,1fr] gap-8 lg:gap-10">
            <div>
              <Badge variant="outline" className="border-border/70 text-foreground mb-4">Representative Workflow</Badge>
              <h3 className="text-2xl sm:text-3xl font-semibold text-foreground mb-3">{featuredCase.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">{featuredCase.summary}</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {featuredCase.metrics.map((metric, index) => (
                  <div
                    key={metric.label}
                    className="rounded-xl border border-border/70 bg-background/45 px-4 py-3 animate-in fade-in slide-in-from-bottom-3 duration-700"
                    style={{ animationDelay: `${index * 120}ms` }}
                  >
                    <div className="text-xl font-bold gradient-text">{metric.value}</div>
                    <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{metric.label}</div>
                  </div>
                ))}
              </div>

              <Button className="bg-gradient-to-r from-primary to-accent text-foreground hover:opacity-90" asChild>
                <Link href="/contact">
                  Discuss a Similar Build
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="rounded-xl border border-border/70 bg-background/45 p-5 sm:p-6">
              <h4 className="text-sm uppercase tracking-[0.16em] text-muted-foreground mb-4">Delivery Highlights</h4>
              <ul className="space-y-3 text-foreground/90">
                {featuredCase.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cases.map((item, index) => (
            <article
              key={item.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(165deg,rgba(10,16,30,0.92),rgba(7,12,24,0.84))] p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/16 animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-60" />

              <div className="relative">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{item.domain}</div>
                    <div className={`mt-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.05] ${item.accent}`}>
                      <item.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-slate-300 mb-5">
                  <span className="text-slate-500">Outcome:</span> {item.outcome}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="text-xs rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
