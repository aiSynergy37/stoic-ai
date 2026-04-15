export default function PrivacyPage() {
  return (
    <main className="pt-24 lg:pt-28">
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Privacy</p>
        <h1 className="section-title mt-4 text-4xl text-white sm:text-5xl lg:text-6xl text-balance heading-glow">
          Privacy
          <br />
          <span className="heading-focus">Policy</span>
        </h1>
        <div className="mt-8 space-y-8 text-sm leading-8 text-slate-300 sm:text-base">
          <p>
            STOICAI uses information you submit through contact forms or direct email only to review inquiries, respond
            to requests, and discuss potential engagements.
          </p>
          <p>
            We do not intentionally collect unnecessary personal data through this website. If you choose to share
            project information, contact details, or business context, that information is used only for communication
            and evaluation of the inquiry.
          </p>
          <p>
            If you would like information updated or removed from our records, contact us at{" "}
            <a className="text-cyan-200 hover:text-cyan-100" href="mailto:hello@stoicai.com">
              hello@stoicai.com
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
