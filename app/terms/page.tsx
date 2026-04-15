export default function TermsPage() {
  return (
    <main className="pt-24 lg:pt-28">
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Terms</p>
        <h1 className="section-title mt-4 text-4xl text-white sm:text-5xl lg:text-6xl text-balance heading-glow">
          Terms
          <br />
          <span className="heading-focus">Of Use</span>
        </h1>
        <div className="mt-8 space-y-8 text-sm leading-8 text-slate-300 sm:text-base">
          <p>
            The information presented on this website is provided for general business and service overview purposes. It
            does not create a contractual relationship on its own.
          </p>
          <p>
            Engagement scope, delivery terms, pricing, and project responsibilities are defined separately through
            direct discussion and formal agreement where applicable.
          </p>
          <p>
            If you have a question about the use of this site or would like to discuss an engagement, contact{" "}
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
