"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Brain, Repeat, Settings, TrendingUp, Zap } from "lucide-react";

const agenticFeatures = [
  {
    icon: Brain,
    title: "Autonomous Agents",
    description: "Goal-driven agents that reason through tasks, coordinate actions, and operate within defined business constraints.",
    accent: "text-cyan-200",
    glow: "from-cyan-500/20 to-blue-500/10",
  },
  {
    icon: Repeat,
    title: "Multi-step Reasoning",
    description: "Reasoning chains that break down complex workflows into structured, reliable execution paths.",
    accent: "text-violet-200",
    glow: "from-violet-500/20 to-fuchsia-500/10",
  },
  {
    icon: Settings,
    title: "AI Copilots",
    description: "Operational copilots that support teams across analysis, internal knowledge, and day-to-day execution.",
    accent: "text-emerald-200",
    glow: "from-emerald-500/20 to-teal-500/10",
  },
  {
    icon: Zap,
    title: "Workflow Automation",
    description: "AI-led workflows that reduce manual coordination, route work intelligently, and adapt as conditions change.",
    accent: "text-amber-200",
    glow: "from-amber-500/20 to-orange-500/10",
  },
  {
    icon: TrendingUp,
    title: "Self-Improving Systems",
    description: "Feedback-aware systems that improve prompts, routing, and retrieval quality over time with live usage data.",
    accent: "text-sky-200",
    glow: "from-sky-500/20 to-indigo-500/10",
  },
];

export function AgenticAI() {
  return (
    <section id="agentic" className="relative overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,22,0.96),rgba(4,8,18,0.98))]" />
      <div className="absolute top-24 right-0 h-80 w-80 rounded-full bg-primary/10 blur-[140px]" />
      <div className="absolute bottom-10 left-0 h-72 w-72 rounded-full bg-accent/8 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div>
            <Badge className="border-primary/25 bg-primary/12 text-primary hover:bg-primary/16">
              <Zap className="mr-1 h-3 w-3" />
              Agentic AI Capabilities
            </Badge>

            <h2 className="section-title mt-5 text-4xl text-white sm:text-5xl lg:text-[3.5rem]">
              Built for
              <br />
              <span className="heading-focus">multi-step work, not just chat wrappers</span>
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
              When the job needs reasoning, tool use, retrieval, and approvals working together, we design agentic
              workflows that are easier to monitor and safer to operate.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-5xl rounded-2xl border border-white/10 bg-[linear-gradient(165deg,rgba(11,18,34,0.82),rgba(8,13,26,0.68))] p-6 backdrop-blur-sm">
          <div className="grid gap-6 text-center sm:grid-cols-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Use Cases</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">Support, operations, internal knowledge, and task-heavy team workflows</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Core Layer</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">Reasoning, tools, retrieval, memory, and approval-aware orchestration</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Outcome</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">Less manual coordination with more consistent, reviewable outputs</p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {agenticFeatures.map((feature, index) => (
            <article
              key={feature.title}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(165deg,rgba(10,16,30,0.92),rgba(7,12,24,0.84))] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/16 ${
                index === 4 ? "md:col-span-2 xl:col-span-1" : ""
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.glow} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60" />

              <div className="relative">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.05] ${feature.accent}`}>
                  <feature.icon className="h-5 w-5" />
                </div>

                <h3 className="mt-5 text-2xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{feature.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Next Step</p>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              We help teams decide where agentic systems create real lift and where a simpler AI-assisted workflow is the better answer.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border border-white/12 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/[0.08]"
          >
            Discuss an agentic workflow
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
