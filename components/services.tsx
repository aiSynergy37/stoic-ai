"use client";

import {
  Bot,
  Database,
  Workflow,
  MessageSquare,
  GitBranch,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const services = [
  {
    icon: Bot,
    title: "AI Product Features",
    description: "AI copilots, assistants, search layers, and workflow features designed to fit real SaaS products and internal tools.",
    features: ["User-facing copilots", "AI-assisted workflows", "SaaS feature integration"],
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: Database,
    title: "Knowledge and Retrieval Systems",
    description: "Grounded answer workflows built around your documents, data sources, and internal context so outputs stay useful and accountable.",
    features: ["RAG architecture", "Semantic retrieval", "Document-grounded answers"],
    color: "from-emerald-500 to-teal-400",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "Operational workflows that summarize, classify, route, and support decisions without forcing teams into brittle process redesigns.",
    features: ["Case triage", "Routing and summarization", "Decision-support flows"],
    color: "from-rose-500 to-red-400",
  },
  {
    icon: MessageSquare,
    title: "Support and Internal Copilots",
    description: "Assistants for support, operations, and internal teams that reduce repetitive work while keeping human review in the loop.",
    features: ["Support copilots", "Internal team assistants", "Response drafting"],
    color: "from-cyan-500 to-blue-400",
  },
  {
    icon: GitBranch,
    title: "Agentic Workflows",
    description: "Multi-step systems that combine reasoning, tools, retrieval, and approvals where a single prompt is not enough.",
    features: ["Tool-connected flows", "Multi-step orchestration", "Approval-aware execution"],
    color: "from-violet-500 to-purple-400",
  },
  {
    icon: ShieldCheck,
    title: "Production Readiness",
    description: "Evaluation, guardrails, observability, and rollout support so systems can move from pilot usage into reliable day-to-day operation.",
    features: ["Guardrails and controls", "Evaluation workflows", "Rollout and iteration"],
    color: "from-amber-500 to-orange-400",
  },
];

export function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary mb-4 tracking-wider uppercase">
            <Sparkles className="w-4 h-4" />
            Core Offerings
          </span>
          <h2 className="section-title text-4xl sm:text-5xl lg:text-6xl text-white mb-6 text-balance heading-glow">
            Services built for <span className="heading-focus">real product and operational use</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We focus on the delivery work most teams actually need: AI product features, retrieval, automation, copilots,
            and the production controls that make them usable after launch.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative glass rounded-2xl p-6 transition-all duration-500 glass-hover border-gradient animate-in fade-in slide-in-from-bottom-4 duration-700 overflow-hidden"
              style={{ animationDelay: `${index * 50}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Animated gradient background on hover */}
              <div 
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${service.color}`}
                style={{ opacity: hoveredIndex === index ? 0.08 : 0 }}
              />
              
              {/* Glow effect */}
              <div 
                className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl transition-all duration-700 bg-gradient-to-br ${service.color}`}
                style={{ opacity: hoveredIndex === index ? 0.3 : 0, transform: hoveredIndex === index ? 'scale(1.5)' : 'scale(1)' }}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div className={`mb-5 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                  <service.icon className="h-7 w-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:gradient-text transition-all duration-300">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature, fIndex) => (
                    <li 
                      key={fIndex} 
                      className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Learn more link */}
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Delivery-led, integration-aware, and built around live usage.
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Engagement Fit</p>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-300">
              Best for teams shipping a new AI product capability, modernizing an internal workflow, or turning a rough
              AI prototype into something the business can actually operate.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border border-white/12 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/[0.08]"
          >
            Discuss a use case
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
