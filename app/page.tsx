import ScrollAnimation from "@/components/ScrollAnimation";

const faq = [
  {
    q: "How fast is onboarding?",
    a: "Most dealer groups connect data sources and launch first automations in under two weeks."
  },
  {
    q: "Can we run this with our current tools?",
    a: "Yes. CortexAuto layers on top of existing CRM, DMS, ad, and messaging systems."
  },
  {
    q: "Does it work for multi-location operations?",
    a: "The orchestration layer supports location-level controls and enterprise-level reporting."
  }
];

export default function HomePage() {
  return (
    <main className="bg-bg text-text">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-24">
        <p className="mb-6 inline-flex w-fit items-center rounded-full border border-accent/35 bg-accent/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-accent">
          CortexAuto Platform
        </p>
        <h1 className="max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
          AI automation for modern dealership operations.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          CortexAuto unifies lead capture, response orchestration, pricing intelligence, and executive analytics in one
          high-velocity system.
        </p>
      </section>

      <ScrollAnimation />

      <section className="mx-auto w-full max-w-6xl space-y-16 px-6 py-24">
        <div className="rounded-2xl border border-line bg-panel/70 p-8 md:p-12">
          <p className="text-sm uppercase tracking-[0.18em] text-accent">Available Now</p>
          <h2 className="mt-3 text-3xl font-semibold">Ops modules shipping today</h2>
          <ul className="mt-6 grid gap-3 text-muted md:grid-cols-2">
            <li>Lead triage and routing in under 3 seconds</li>
            <li>Automated multi-channel reply generation</li>
            <li>Sales-floor activity dashboards by store and rep</li>
            <li>Service lane no-show prediction and rebooking prompts</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-line bg-panel/70 p-8 md:p-12">
          <p className="text-sm uppercase tracking-[0.18em] text-accent">Coming Soon</p>
          <h2 className="mt-3 text-3xl font-semibold">Next wave capabilities</h2>
          <ul className="mt-6 grid gap-3 text-muted md:grid-cols-2">
            <li>Real-time lot camera inventory reconciliation</li>
            <li>Cross-store transfer recommendations with margin scoring</li>
            <li>AI call assistant with compliance-safe scripts</li>
            <li>Dynamic incentives optimization by region</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-line bg-panel/70 p-8 md:p-12">
          <p className="text-sm uppercase tracking-[0.18em] text-accent">Analytics Highlight</p>
          <h2 className="mt-3 text-3xl font-semibold">A single live command center</h2>
          <p className="mt-4 max-w-3xl text-muted">
            Track funnel velocity, marketing efficiency, appointment quality, and close-rate lift from one timeline.
            Drill down by source, location, model, and rep without waiting for overnight reports.
          </p>
        </div>

        <div className="rounded-2xl border border-line bg-panel/70 p-8 md:p-12">
          <p className="text-sm uppercase tracking-[0.18em] text-accent">FAQ</p>
          <h2 className="mt-3 text-3xl font-semibold">Common questions</h2>
          <div className="mt-8 space-y-5">
            {faq.map((item) => (
              <article key={item.q} className="rounded-xl border border-line bg-black/20 p-5">
                <h3 className="font-medium">{item.q}</h3>
                <p className="mt-2 text-muted">{item.a}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-accent/35 bg-gradient-to-r from-accent/15 to-transparent p-8 md:p-12">
          <p className="text-sm uppercase tracking-[0.18em] text-accent">CTA</p>
          <h2 className="mt-3 text-3xl font-semibold">See CortexAuto with your own data</h2>
          <p className="mt-4 max-w-2xl text-muted">
            Book a guided setup session and get a working pilot tailored to your stores.
          </p>
          <button className="mt-8 rounded-full border border-accent/60 bg-accent/20 px-6 py-3 text-sm font-medium text-accent transition hover:bg-accent/30">
            Request Pilot Access
          </button>
        </div>
      </section>
    </main>
  );
}
