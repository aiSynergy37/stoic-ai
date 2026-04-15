"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/global", label: "Global" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-white/10 bg-[#050a16]/92 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-[1380px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-full border border-white/25 text-sm font-bold text-white">
            <span className="h-3.5 w-3.5 rotate-45 rounded-[2px] border border-white/85" />
          </div>
          <span className="text-xl font-semibold text-white">STOICAI</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                pathname === link.href ? "text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-lg border border-white/12 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/[0.08]"
          >
            Book a call
          </Link>
        </div>

        <button
          className="rounded-lg border border-white/12 bg-white/5 p-2 text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="mx-4 mb-4 rounded-2xl border border-white/12 bg-[#071126]/95 p-3 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-lg px-3 py-2.5 text-sm ${
                pathname === link.href ? "bg-white/12 text-white" : "text-slate-300 hover:bg-white/8 hover:text-white"
              }`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-2 inline-flex w-full items-center justify-center rounded-lg border border-white/12 bg-white/[0.06] px-4 py-2.5 text-sm font-semibold text-white"
            onClick={() => setOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}
