"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const focusAreas = [
  "MVP SaaS AI",
  "Internal copilots",
  "Workflow automation",
  "Knowledge and retrieval",
  "Production delivery",
];

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  bias: number;
  hue: "cyan" | "violet";
};

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    let nodes: Node[] = [];

    const setup = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const totalNodes = Math.max(90, Math.floor((width * height) / 14500));
      const anchors = [
        { x: width * 0.18, y: height * 0.26, spreadX: width * 0.14, spreadY: height * 0.18, hue: "violet" as const },
        { x: width * 0.34, y: height * 0.68, spreadX: width * 0.16, spreadY: height * 0.2, hue: "violet" as const },
        { x: width * 0.72, y: height * 0.34, spreadX: width * 0.15, spreadY: height * 0.18, hue: "cyan" as const },
        { x: width * 0.84, y: height * 0.72, spreadX: width * 0.14, spreadY: height * 0.18, hue: "cyan" as const },
        { x: width * 0.54, y: height * 0.5, spreadX: width * 0.2, spreadY: height * 0.24, hue: "cyan" as const },
      ];

      const organicNodes: Node[] = [];
      for (let i = 0; i < totalNodes; i++) {
        const anchor = anchors[i % anchors.length];
        const useAnchor = Math.random() < 0.76;
        let x = 0;
        let y = 0;
        let hue: "cyan" | "violet" = anchor.hue;

        if (useAnchor) {
          x = anchor.x + (Math.random() - 0.5) * anchor.spreadX;
          y = anchor.y + (Math.random() - 0.5) * anchor.spreadY;
        } else {
          x = Math.random() * width;
          y = Math.random() * height;
          hue = Math.random() > 0.55 ? "cyan" : "violet";
        }

        x = Math.max(width * 0.02, Math.min(width * 0.98, x));
        y = Math.max(height * 0.02, Math.min(height * 0.98, y));

        const centerBiasX = 1 - Math.min(1, Math.abs(x / width - 0.5) * 1.65);
        const centerBiasY = 1 - Math.min(1, Math.abs(y / height - 0.5) * 1.7);
        const bias = 0.52 + centerBiasX * 0.2 + centerBiasY * 0.18 + (useAnchor ? 0.12 : 0);

        organicNodes.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.14,
          vy: (Math.random() - 0.5) * 0.13,
          r: Math.random() * 1.25 + 0.5,
          bias,
          hue,
        });
      }

      nodes = organicNodes;
    };

    const maxDistance = 165;
    const maxDistanceSq = maxDistance * maxDistance;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const t = performance.now() * 0.001;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx;
        a.y += a.vy;

        if (a.x < width * 0.01 || a.x > width * 0.99) a.vx *= -1;
        if (a.y < height * 0.01 || a.y > height * 0.99) a.vy *= -1;

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxDistanceSq) {
            const pairBias = (a.bias + b.bias) * 0.5;
            const verticalBoost = 0.78 + ((a.y + b.y) / (2 * height)) * 0.32;
            const alpha = (1 - d2 / maxDistanceSq) * 0.19 * verticalBoost * pairBias;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            const cyanMix = a.hue === "cyan" || b.hue === "cyan";
            ctx.strokeStyle = cyanMix
              ? `rgba(108, 192, 255, ${alpha})`
              : `rgba(142, 132, 255, ${alpha * 0.92})`;
            ctx.lineWidth = 0.58;
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const pulse = 0.82 + 0.28 * Math.sin(t * 2 + i * 0.6);
        const nodeAlpha = 0.42 + node.bias * 0.42;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle =
          node.hue === "cyan"
            ? `rgba(164, 232, 255, ${nodeAlpha})`
            : `rgba(180, 170, 255, ${nodeAlpha * 0.95})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r * pulse * 2, 0, Math.PI * 2);
        ctx.fillStyle =
          node.hue === "cyan"
            ? `rgba(127, 208, 255, ${0.035 + node.bias * 0.045})`
            : `rgba(124, 110, 255, ${0.028 + node.bias * 0.04})`;
        ctx.fill();
      }

      const vignette = ctx.createRadialGradient(width / 2, height / 2, width * 0.25, width / 2, height / 2, width * 0.68);
      vignette.addColorStop(0, "rgba(2, 4, 10, 0)");
      vignette.addColorStop(1, "rgba(2, 4, 10, 0.28)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      raf = requestAnimationFrame(draw);
    };

    setup();
    const ro = new ResizeObserver(() => setup());
    ro.observe(canvas);
    draw();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden border-b border-white/10 pt-28 pb-14 sm:pt-32 sm:pb-20 lg:min-h-screen">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#02040a_0%,#06101f_42%,#081120_72%,#040713_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(17,26,56,0.72),transparent_34%),radial-gradient(circle_at_18%_26%,rgba(35,91,145,0.18),transparent_28%),radial-gradient(circle_at_82%_24%,rgba(30,107,121,0.12),transparent_24%)]" />
      <div className="absolute inset-0 animate-bg-pan bg-[radial-gradient(circle_at_50%_8%,rgba(111,75,255,0.16),transparent_34%),radial-gradient(circle_at_22%_40%,rgba(110,204,255,0.10),transparent_32%),radial-gradient(circle_at_80%_35%,rgba(124,236,222,0.08),transparent_36%)]" />
      <div className="absolute inset-0 opacity-[0.22] bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#02040a] to-transparent" />

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-88" />

      <div className="pointer-events-none absolute inset-x-[-10%] bottom-[-42%] h-[96%] opacity-28 animate-grid-shift">
        <div className="h-full w-full origin-bottom [transform:perspective(1000px)_rotateX(69deg)] bg-[linear-gradient(rgba(135,154,190,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(135,154,190,0.10)_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#060b18] via-[#060b18]/80 to-transparent z-20" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%] bg-[linear-gradient(180deg,transparent,rgba(4,7,19,0.4)_42%,rgba(4,7,19,0.82))]" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#040814] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#040814] to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[980px] text-center">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300 shadow-[0_0_20px_rgba(111,75,255,0.08)]">
              STOICAI | MVP, SaaS, and Operational AI Delivery
            </span>

            <h1 className="mx-auto mt-8 max-w-[900px] font-display text-[3.15rem] font-semibold leading-[0.94] text-white sm:text-[4.2rem] lg:text-[5rem]">
              AI systems for
              <br />
              teams shipping
              <br />
              <span className="heading-focus">MVP SaaS products</span>
              <br />
              and operational automation.
            </h1>

            <p className="mx-auto mt-7 max-w-[720px] text-base leading-8 text-slate-300 sm:text-lg">
              We help founders, product teams, and operators design AI features, internal copilots, and workflow
              systems that are useful in production, not just compelling in a prototype.
            </p>

            <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#07101f] transition-colors hover:bg-slate-200"
              >
                Book a consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-lg border border-white/12 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/[0.08]"
              >
                Explore services
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {focusAreas.map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-300 backdrop-blur-sm"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mx-auto mt-12 grid max-w-[860px] gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Where We Fit</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">New AI product surfaces, internal copilots, and workflow automation</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Delivery Model</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">Scoping, build, integration, rollout, and iteration with your team</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Best Fit</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">Teams that need a credible path from MVP to reliable day-to-day usage</p>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}
