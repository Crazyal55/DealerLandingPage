import Navbar from "@/components/Navbar";
import ScrollAnimation from "@/components/ScrollAnimation";

const problemStats = [
  {
    value: "60%",
    label: "of car buyers research vehicles outside business hours"
  },
  {
    value: "$200K+",
    label: "annual cost to staff a 24/7 human team — not feasible for most dealers"
  },
  {
    value: "0",
    label: "responses when your site goes dark after 7 PM — and buyers move on"
  }
];

const productFeatures = [
  {
    title: "Inventory-Aware Answers",
    description: "Responds to questions about pricing, availability, and features in real time"
  },
  {
    title: "Automated Scheduling",
    description: "Books test drives without a human lifting a finger"
  },
  {
    title: "Objection Handling",
    description: "Uses real vehicle data — not generic scripts — to earn buyer trust"
  },
  {
    title: "Self-Improving AI",
    description: "Learns from every conversation and gets smarter over time"
  }
];

const howItWorks = [
  {
    step: "01",
    title: "Scrape",
    description: "Automatically pulls inventory, pricing, FAQs, and service hours from your website"
  },
  {
    step: "02",
    title: "Learn",
    description: "RAG-based AI understands your dealership's data — no hallucinations, only verified facts"
  },
  {
    step: "03",
    title: "Engage",
    description: "Natural conversations at scale — handles multiple customers simultaneously, 24/7"
  },
  {
    step: "04",
    title: "Optimize",
    description: "Analytics dashboard surfaces what's working — continuous improvement from real interactions"
  }
];

const comparisonData = [
  { feature: "Inventory Knowledge", generic: "Generic, often wrong", ours: "Trained on YOUR data" },
  { feature: "Setup", generic: "Manual, slow, costly", ours: "Auto-discovery, self-serve" },
  { feature: "Personalization", generic: "One-size-fits-all", ours: "Personalized per dealer" },
  { feature: "Analytics", generic: "None", ours: "Full dashboard included" },
  { feature: "Accuracy", generic: "Hallucinations possible", ours: "RAG-powered, fact-based" }
];

const marketStats = [
  { value: "18K+", label: "US Car Dealerships" },
  { value: "3-5", label: "Locations Per Dealer" },
  { value: "$20+", label: "Human 24/7 Staff Cost (per year)" }
];

const tractionPoints = [
  { title: "Full Dev Ops Platform", description: "Complete R&D infrastructure built and operational for AI validation" },
  { title: "Quality Scoring System", description: "Designed and implemented to ensure data accuracy at every layer" },
  { title: "59-Vehicle Test Dataset", description: "Real-world placeholder inventory to simulate live dealership environments" }
];

export default function HomePage() {
  return (
    <main className="text-text relative">
      <ScrollAnimation />
      <Navbar />

      {/* Hero Section - Problem Statement */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24">
        <div className="mx-auto max-w-6xl text-center">
          <div className="rounded-3xl border border-accent/40 bg-black/40 backdrop-blur-md p-12 md:p-20">
            <p className="text-accent uppercase tracking-[0.2em] text-sm mb-6">The Problem</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
              Your Dealership Is Losing Sales Right Now
            </h1>
            <p className="text-2xl md:text-3xl text-muted italic mb-12">
              "When a customer visits your website at 11 PM and has a question — who answers?"
            </p>
            <p className="text-xl text-text/80">
              Your showroom closes at 7 PM. Your customers don't.
            </p>
          </div>
        </div>
      </section>

      {/* Problem Stats */}
      <section className="mx-auto w-full max-w-6xl px-6 py-24">
        <div className="grid gap-8 md:grid-cols-3">
          {problemStats.map((stat, index) => (
            <div key={index} className="rounded-2xl border border-line/30 bg-black/35 backdrop-blur-md p-8 text-center">
              <div className="text-5xl md:text-6xl font-bold text-accent mb-4">{stat.value}</div>
              <p className="text-sm md:text-base leading-relaxed">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Simple Intelligence */}
      <section className="mx-auto w-full max-w-6xl px-6 py-32">
        <div className="text-center mb-16">
          <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4">The Vision</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Simple Intelligence</h2>
          <p className="text-2xl md:text-3xl text-text/70">
            Drop your URL. We do the rest.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Drop URL", desc: "Dealer submits website link" },
            { title: "Auto Discover", desc: "Finds all dealership locations" },
            { title: "Inventory Scrape", desc: "Collects full vehicle listings" },
            { title: "AI Learns", desc: "Understands dealership data fast" }
          ].map((step, index) => (
            <div key={index} className="rounded-2xl border border-line/30 bg-black/35 backdrop-blur-md p-8 text-center">
              <h3 className="text-lg font-bold mb-3">{step.title}</h3>
              <p className="text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted">
            No onboarding calls. No manual data entry. No IT headaches. One URL is all it takes.
          </p>
        </div>
      </section>

      {/* Product Features */}
      <section className="mx-auto w-full max-w-6xl px-6 py-32">
        <div className="mb-16 rounded-2xl border border-line/30 bg-black/35 backdrop-blur-sm p-8 inline-block">
          <p className="text-sm uppercase tracking-[0.2em] text-accent">The Product</p>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold">Meet Your AI Sales Rep</h2>
          <p className="mt-4 text-lg text-muted">
            AI-powered customer engagement, built specifically for car dealerships.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {productFeatures.map((feature, index) => (
            <div
              key={index}
              className="rounded-2xl border border-line/25 bg-black/50 backdrop-blur-md p-8 hover:bg-black/60 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="leading-relaxed text-text/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Under the Hood */}
      <section className="mx-auto w-full max-w-6xl px-6 py-32">
        <div className="mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-accent mb-4">Under the Hood</p>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">How It Works</h2>
          <p className="text-muted">Built with RAG (Retrieval-Augmented Generation) — hallucination-free, data-driven, dealer-specific.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-accent/40 text-6xl font-bold absolute -top-4 -left-2">{step.step}</div>
              <div className="rounded-2xl border border-line/30 bg-black/35 backdrop-blur-md p-8 pt-12">
                <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                <p className="text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto w-full max-w-6xl px-6 py-32">
        <div className="mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-accent mb-4">Simple Pricing</p>
          <h2 className="text-3xl md:text-4xl font-semibold">Predictable Revenue</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-12">
          <div className="rounded-2xl border border-line/30 bg-black/35 backdrop-blur-md p-8">
            <h3 className="text-xl font-bold mb-4">Per-Location Monthly Fee</h3>
            <p className="leading-relaxed text-text/80">Covers setup, maintenance, and ongoing support. Scales cleanly with dealership size — no surprises.</p>
          </div>
          <div className="rounded-2xl border border-line/30 bg-black/35 backdrop-blur-md p-8">
            <h3 className="text-xl font-bold mb-4">Per-Response Charge</h3>
            <p className="leading-relaxed text-text/80">You only pay when the AI is actively helping a customer. Idle software costs you nothing.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-accent/40 bg-black/40 backdrop-blur-md p-8">
          <h3 className="text-lg font-bold mb-6">Why This Model Works</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <h4 className="font-semibold mb-2">Pay for value, not potential</h4>
              <p className="text-sm text-text/70">Dealers pay when conversations happen — not for software that sits idle</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Aligned incentives</h4>
              <p className="text-sm text-text/70">We grow only when you grow — our success is tied to yours</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Zero hidden tiers</h4>
              <p className="text-sm text-text/70">Transparent pricing from day one, no confusing addons</p>
            </div>
          </div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="mx-auto w-full max-w-6xl px-6 py-32">
        <div className="mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-accent mb-4">Massive Market</p>
          <h2 className="text-3xl md:text-4xl font-semibold">Clear Entry Point</h2>
          <p className="mt-4 text-muted">We cost a fraction of human 24/7 staff.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {marketStats.map((stat, index) => (
            <div key={index} className="rounded-2xl border border-line/30 bg-black/35 backdrop-blur-md p-8 text-center">
              <div className="text-4xl font-bold text-accent mb-3">{stat.value}</div>
              <p className="text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="mx-auto w-full max-w-6xl px-6 py-32">
        <div className="mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-accent mb-4">Differentiation</p>
          <h2 className="text-3xl md:text-4xl font-semibold">We're Not Just Another Chatbot</h2>
        </div>

        <div className="rounded-2xl border border-line/30 bg-black/35 backdrop-blur-md overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-line/30">
                <th className="text-left p-6 font-semibold">Feature</th>
                <th className="text-left p-6 font-semibold text-muted">Generic Chatbots</th>
                <th className="text-left p-6 font-semibold text-accent">Our AI</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr key={index} className="border-b border-line/20 last:border-b-0">
                  <td className="p-6 font-medium">{row.feature}</td>
                  <td className="p-6 text-muted">{row.generic}</td>
                  <td className="p-6 text-text">{row.ours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted">
            Our Moat: The data flywheel — more conversations = smarter AI = better results for every dealer on the platform.
          </p>
        </div>
      </section>

      {/* Traction */}
      <section className="mx-auto w-full max-w-6xl px-6 py-32">
        <div className="mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-accent mb-4">Traction</p>
          <h2 className="text-3xl md:text-4xl font-semibold">Built. Tested. Ready to Pilot.</h2>
        </div>

        <div className="space-y-6">
          {tractionPoints.map((point, index) => (
            <div key={index} className="rounded-2xl border border-line/30 bg-black/35 backdrop-blur-md p-8">
              <h3 className="text-xl font-bold mb-3">{point.title}</h3>
              <p className="text-text/80">{point.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-accent/40 bg-accent/10 backdrop-blur-md p-8 text-center">
          <p className="text-lg italic">"We're not guessing — we're building what dealers told us they need."</p>
        </div>
      </section>

      {/* Roadmap */}
      <section className="mx-auto w-full max-w-6xl px-6 py-32">
        <div className="mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-accent mb-4">Where We're Going</p>
          <h2 className="text-3xl md:text-4xl font-semibold">The Road Ahead</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-bold text-accent mb-6">Right Now</h3>
            <div className="space-y-4">
              {[
                "5 Dealership Pilots — Prove the technology works in the real world",
                "Validate Auto-Discovery — Confirm seamless onboarding at scale",
                "Learn & Iterate Fast — Real feedback drives rapid product improvement"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-accent/60 mt-1">→</span>
                  <p className="text-sm text-text/80">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-accent mb-6">Next 12 Months</h3>
            <div className="space-y-4">
              {[
                "Public Launch — Full rollout to independent dealerships nationwide",
                "50+ Dealers Onboarded — Build density, prove retention, show the data flywheel spinning",
                "Series A Capital — Scale to regional and national chains"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-accent/60 mt-1">→</span>
                  <p className="text-sm text-text/80">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="mx-auto w-full max-w-4xl px-6 py-32 text-center">
        <div className="rounded-3xl border border-accent/40 bg-black/40 backdrop-blur-md p-12 md:p-16">
          <p className="text-sm uppercase tracking-[0.2em] text-accent">Get Started</p>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold mb-6">
            Dealerships are already getting questions. We help them answer.
          </h2>
          <p className="text-lg text-muted mb-8">
            At scale. 24/7. With intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="rounded-full border border-accent/40 bg-accent/20 px-8 py-4 text-base font-medium text-accent transition hover:bg-accent/30">
              Book a Demo
            </button>
            <button className="rounded-full border border-line/30 bg-black/30 px-8 py-4 text-base font-medium text-text transition hover:bg-black/50">
              Join the Platform
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line/30 bg-black/45 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-12 md:grid-cols-4">
            <div>
              <h3 className="font-semibold text-text mb-4">Contact</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted hover:text-text transition-colors">Email</a></li>
                <li><a href="#" className="text-muted hover:text-text transition-colors">LinkedIn</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-text mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-muted hover:text-text transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-muted hover:text-text transition-colors">Pricing</a></li>
                <li><a href="#" className="text-muted hover:text-text transition-colors">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-text mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted hover:text-text transition-colors">About</a></li>
                <li><a href="#" className="text-muted hover:text-text transition-colors">Careers</a></li>
                <li><a href="#" className="text-muted hover:text-text transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-text mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted hover:text-text transition-colors">Blog</a></li>
                <li><a href="#" className="text-muted hover:text-text transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-line/30 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted">© 2026 CortexAuto. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted hover:text-text transition-colors">Privacy</a>
              <a href="#" className="text-sm text-muted hover:text-text transition-colors">Terms</a>
              <a href="#" className="text-sm text-muted hover:text-text transition-colors">Disclaimer</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
