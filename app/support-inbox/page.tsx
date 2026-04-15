import { SupportInbox } from "@/components/support-inbox";

export default function SupportInboxPage() {
  return (
    <main className="min-h-screen px-6 pb-24 pt-36 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/70">Support Operations</p>
          <h1 className="section-title text-4xl text-white sm:text-5xl lg:text-6xl text-balance heading-glow">
            Support
            <br />
            <span className="heading-focus">Inbox</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-400">
            Review incoming support conversations from the site widget and send follow-up replies from one place.
          </p>
        </div>

        <SupportInbox />
      </div>
    </main>
  );
}
