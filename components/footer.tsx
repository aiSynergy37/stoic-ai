"use client";

import Link from "next/link";

const navigation = [
  {
    title: "Services",
    links: [
      { label: "Agentic AI Systems", href: "/services" },
      { label: "AI Automation", href: "/services" },
      { label: "Knowledge Systems", href: "/services" },
      { label: "AI Delivery", href: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Work", href: "/work" },
      { label: "Global", href: "/global" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#040914]">
      <div className="mx-auto max-w-[1380px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="border-b border-white/10 pb-8 lg:flex lg:items-start lg:justify-between lg:gap-16">
          <div className="max-w-sm lg:flex-none">
            <Link href="/" className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-sm font-bold text-white">
                <span className="h-3.5 w-3.5 rotate-45 rounded-[2px] border border-white/85" />
              </div>
              <div>
                <p className="text-lg font-semibold text-white">STOICAI</p>
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Engineering Intelligence</p>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">
              We help teams launch MVP SaaS AI products, automation workflows, and decision systems that are practical
              to operate and built to scale.
            </p>
          </div>

          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:mt-0 lg:min-w-[52rem] lg:flex-1 lg:grid-cols-3 lg:justify-items-start">
            {navigation.map((group) => (
              <div key={group.title} className="min-w-0">
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{group.title}</h4>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm leading-6 text-slate-300 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="min-w-0">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Contact</h4>
              <div className="mt-4 grid gap-4 text-sm text-slate-300">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">Email</p>
                  <p className="mt-1 break-words">hello@stoicai.com</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">Best For</p>
                  <p className="mt-1 leading-6">MVP SaaS AI, operations automation, internal tools, and production-grade systems</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">Delivery</p>
                  <p className="mt-1 leading-6">Serving teams across India, APAC, and global remote engagements</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} STOICAI. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            <Link href="/privacy" className="transition-colors hover:text-slate-300">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-slate-300">
              Terms
            </Link>
            <Link href="/contact" className="transition-colors hover:text-slate-300">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
