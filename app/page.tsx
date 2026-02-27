import Navbar from "@/components/Navbar";
import ScrollAnimation from "@/components/ScrollAnimation";

const features = [
  {
    title: "Seamless website integration",
    description: "Deploy directly onto your dealership website without disrupting your current stack."
  },
  {
    title: "Smart customer capture",
    description: "Automatically capture customer intent, contact information, and vehicle interest in real time."
  },
  {
    title: "Sales & service AI assistant",
    description: "Answer inventory, financing, and service questions 24/7."
  },
  {
    title: "Lead routing",
    description: "Intelligent lead distribution to the right sales team instantly."
  },
  {
    title: "Tracking",
    description: "Monitor every customer interaction from first visit to closed deal."
  },
  {
    title: "Live badge",
    description: "Real-time status indicators for your sales team."
  },
  {
    title: "Opportunities",
    description: "Never miss a sales opportunity with AI-powered alerts."
  }
];

const platform = [
  "Performance dashboard",
  "Platform support",
  "Dashboard",
  "Multi-location",
  "Conversion metrics",
  "Unified intelligence",
  "Appointments",
  "Revenue attribution"
];

export default function HomePage() {
  return (
    <main className="text-text relative">
      <ScrollAnimation />
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24">
        <div className="mx-auto max-w-5xl text-center">
          <div className="rounded-3xl border border-line/30 bg-black/40 backdrop-blur-md p-12 md:p-16">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight text-accent">
              CortexAuto
            </h1>
            <h2 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
              The Intelligence Layer for Modern Dealerships
            </h2>
            <div className="mt-8 space-y-4 max-w-3xl mx-auto">
              <p className="text-lg md:text-xl leading-relaxed">
                An AI-powered revenue engine built directly into your dealership website.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                Engage buyers instantly. Extract buying signals. Turn conversations into appointments, test drives, and closed deals.
              </p>
            </div>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="rounded-full border border-accent/40 bg-accent/20 px-8 py-4 text-base font-medium text-accent transition hover:bg-accent/30">
                Book a Demo
              </button>
              <button className="rounded-full border border-line/30 bg-black/30 px-8 py-4 text-base font-medium text-text transition hover:bg-black/60">
                Join the Platform
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="mx-auto w-full max-w-6xl px-6 py-32">
        <div className="mb-16 rounded-2xl border border-line/30 bg-black/35 backdrop-blur-sm p-8 inline-block">
          <p className="text-sm uppercase tracking-[0.18em] text-accent">Features</p>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold">Powerful Features</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-2xl border border-line/25 bg-black/50 backdrop-blur-md p-8 hover:bg-black/40 transition-colors"
            >
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-3 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tagline Section 1 */}
      <section className="mx-auto w-full max-w-6xl px-6 py-24">
        <div className="rounded-3xl border border-accent/40 bg-black/50 backdrop-blur-md p-12 md:p-20 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Track What Matters.
          </h2>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-accent">
            Improve What Converts.
          </h2>
        </div>
      </section>

      {/* Platform Section */}
      <section id="platform" className="mx-auto w-full max-w-6xl px-6 py-32">
        <div className="mb-16 rounded-2xl border border-line/30 bg-black/35 backdrop-blur-sm p-8">
          <p className="text-sm uppercase tracking-[0.18em] text-accent">Platform</p>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold">Built for Scale</h2>
          <p className="mt-4 text-lg max-w-2xl">
            Enterprise-grade infrastructure designed for multi-location dealership groups.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {platform.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-line/25 bg-black/50 backdrop-blur-md p-6 hover:bg-black/40 transition-colors"
            >
              <p className="font-medium">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Analytics Section */}
      <section id="analytics" className="mx-auto w-full max-w-6xl px-6 py-32">
        <div className="mb-16 rounded-2xl border border-line/30 bg-black/35 backdrop-blur-sm p-8">
          <p className="text-sm uppercase tracking-[0.18em] text-accent">Analytics</p>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold">Customer Analytics Engine</h2>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-line/25 bg-black/50 backdrop-blur-md p-8 md:p-12">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-semibold">Behavioral Intelligence</h3>
                <p className="mt-3 max-w-2xl leading-relaxed">
                  Capture behavioral signals from conversations to improve conversion and follow-up timing.
                </p>
              </div>
              <span className="rounded-full bg-accent/20 border border-accent/40 px-4 py-1.5 text-sm text-accent whitespace-nowrap">
                Coming Soon
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-line/25 bg-black/50 backdrop-blur-md p-8 md:p-12">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-semibold">Seamless CRM Integration</h3>
                <p className="mt-3 max-w-2xl leading-relaxed">
                  Sync leads, attach transcripts, and track revenue inside your CRM.
                </p>
              </div>
              <span className="rounded-full bg-accent/20 border border-accent/40 px-4 py-1.5 text-sm text-accent whitespace-nowrap">
                Coming Soon
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Tagline Section 2 */}
      <section className="mx-auto w-full max-w-6xl px-6 py-24">
        <div className="rounded-3xl border border-accent/40 bg-black/50 backdrop-blur-md p-12 md:p-20 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Turn Website Visitors Into Measurable Sales.
          </h2>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="mx-auto w-full max-w-4xl px-6 py-32 text-center">
        <div className="rounded-3xl border border-accent/40 bg-black/50 backdrop-blur-md p-12 md:p-16">
          <p className="text-sm uppercase tracking-[0.18em] text-accent">Get Started</p>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold">
            Book a demo or join the platform to modernize your dealership.
          </h2>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="rounded-full border border-accent/40 bg-accent/20 px-8 py-4 text-base font-medium text-accent transition hover:bg-accent/30">
              Book a Demo
            </button>
            <button className="rounded-full border border-line/30 bg-black/30 px-8 py-4 text-base font-medium text-text transition hover:bg-black/60">
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
                <li><a href="#platform" className="text-muted hover:text-text transition-colors">Platform</a></li>
                <li><a href="#analytics" className="text-muted hover:text-text transition-colors">Analytics</a></li>
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
                <li><a href="#" className="text-muted hover:text-text transition-colors">Documentation</a></li>
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
