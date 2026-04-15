"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mail, Calendar, ArrowRight, CheckCircle2, Sparkles, Clock, Users, Zap, Loader2 } from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    description: "hello@stoicai.com",
    href: "mailto:hello@stoicai.com?subject=STOICAI%20Inquiry",
  },
  {
    icon: Calendar,
    title: "Scoping",
    description: "Share the workflow, systems, and constraints involved",
    href: "#contact-form",
  },
  {
    icon: Clock,
    title: "Response",
    description: "Initial review typically within one business day",
    href: "#contact-form",
  },
];

const benefits = [
  { icon: Clock, text: "Clear next steps" },
  { icon: Users, text: "Practical technical input" },
  { icon: Zap, text: "Focused on implementation" },
];

export function Contact() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/support/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          message,
          pagePath: "/contact",
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Unable to send your request.");
      }

      setSubmitted(true);
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
      window.setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send your request.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute left-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-primary/15 blur-[200px] animate-pulse-glow" />
      <div
        className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-accent/15 blur-[180px] animate-pulse-glow"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
          linear-gradient(rgba(99, 179, 237, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99, 179, 237, 0.03) 1px, transparent 1px)
        `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center animate-in fade-in slide-in-from-bottom-6 duration-700">
          <span className="mb-4 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-accent">
            <Sparkles className="h-4 w-4" />
            Contact
          </span>
          <h2 className="section-title mb-6 text-4xl text-white sm:text-5xl lg:text-7xl text-balance heading-glow">
            Talk through the workflow,
            <br />
            <span className="heading-focus">then decide the right delivery path</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Share the process you want to improve, the systems involved, and where the bottleneck sits. We&apos;ll
            review the use case and reply with a practical next step.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 animate-in fade-in slide-in-from-left-8 duration-1000 lg:order-1">
            <div id="contact-form" className="glass relative overflow-hidden rounded-3xl border-gradient p-8">
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-2xl" />
              <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-gradient-to-tr from-accent/20 to-transparent blur-2xl" />

              <div className="relative">
                <h3 className="mb-2 text-2xl font-bold text-foreground">Tell Us What Needs To Work Better</h3>
                <p className="mb-8 text-muted-foreground">
                  Share the workflow, constraints, and expected outcome. We&apos;ll treat this as a serious project
                  intake rather than a generic contact request.
                </p>

                {submitted ? (
                  <div className="animate-in zoom-in flex flex-col items-center justify-center py-12 text-center duration-500">
                    <div className="glow-cyan mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
                      <CheckCircle2 className="h-8 w-8 text-foreground" />
                    </div>
                    <h4 className="gradient-text mb-2 text-xl font-bold">Request Received</h4>
                    <p className="text-muted-foreground">We&apos;ll review the intake and follow up with the right next step.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">Name</label>
                        <Input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          className="glass h-12 border-border/50 bg-transparent focus:border-primary/50"
                          required
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">Company</label>
                        <Input
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Your company"
                          className="glass h-12 border-border/50 bg-transparent focus:border-primary/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">Email</label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="glass h-12 border-border/50 bg-transparent focus:border-primary/50"
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">What are you trying to improve?</label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Describe the current workflow, where the friction sits, which systems are involved, and what a good outcome looks like."
                        rows={5}
                        className="glass w-full resize-none rounded-lg border border-border/50 bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring/20"
                        required
                      />
                    </div>

                    {error ? <p className="text-sm leading-6 text-rose-300">{error}</p> : null}

                    <Button
                      type="submit"
                      size="lg"
                      disabled={submitting}
                      className="glow-blue group h-14 w-full bg-gradient-to-r from-primary to-accent text-lg text-foreground transition-all duration-300 hover:opacity-90 disabled:opacity-70"
                    >
                      {submitting ? "Sending Request" : "Send Request"}
                      {submitting ? (
                        <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                      ) : (
                        <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      )}
                    </Button>

                    <div className="flex flex-wrap gap-4 pt-4">
                      {benefits.map((benefit) => (
                        <div key={benefit.text} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <benefit.icon className="h-4 w-4 text-primary" />
                          <span>{benefit.text}</span>
                        </div>
                      ))}
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          <div className="order-1 space-y-6 animate-in fade-in slide-in-from-right-8 duration-1000 lg:order-2">
            <div className="group glass relative overflow-hidden rounded-3xl border-gradient p-8 transition-all duration-500 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-chart-3/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-gradient-to-br from-primary/30 to-transparent blur-3xl transition-transform duration-700 group-hover:scale-150" />

              <div className="relative flex items-start gap-6">
                <div className="glow-blue flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent">
                  <Calendar className="h-8 w-8 text-foreground" />
                </div>
                <div className="flex-1">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-accent">
                    <Sparkles className="h-3 w-3" />
                    Recommended
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-foreground">Start With A Project Discussion</h3>
                  <p className="mb-4 text-muted-foreground">
                    The fastest route is to outline the workflow, current tooling, and expected outcome. We&apos;ll help
                    determine whether the right next step is an AI feature, automation, retrieval, a copilot, or a
                    broader delivery engagement.
                  </p>
                  <Button
                    asChild
                    className="glow-blue group/btn bg-gradient-to-r from-primary to-accent text-foreground transition-all duration-300 hover:opacity-90"
                  >
                    <Link href="mailto:hello@stoicai.com?subject=Project%20Discussion">
                      Start The Conversation
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {contactMethods.map((method) => (
                <Link
                  key={method.title}
                  href={method.href}
                  className="group glass-hover rounded-2xl border-gradient glass p-5 text-center transition-all duration-300 hover:scale-105"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 transition-all duration-300 group-hover:from-primary/30 group-hover:to-accent/30">
                    <method.icon className="h-6 w-6 text-primary transition-colors group-hover:text-accent" />
                  </div>
                  <h4 className="mb-1 font-semibold text-foreground transition-all group-hover:gradient-text">{method.title}</h4>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </Link>
              ))}
            </div>

            <div className="glass rounded-2xl border-gradient p-6">
              <div className="grid gap-5 sm:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Best Fit</p>
                  <p className="mt-2 text-sm leading-7 text-foreground/90">MVP SaaS AI, knowledge workflows, internal copilots, and operational automation</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Delivery Style</p>
                  <p className="mt-2 text-sm leading-7 text-foreground/90">Practical scoping, implementation, integration, and iteration with production use in mind</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Response</p>
                  <p className="mt-2 text-sm leading-7 text-foreground/90">Initial review within one business day for qualified inquiries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
