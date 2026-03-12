import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText, TrendingUp, Calculator, Bot, CreditCard, BarChart3,
  Tag, LineChart, Users, Download, Bell, Shield, ChevronRight,
  Check, ArrowRight, Menu, X, Lock, Globe, Eye, Sparkles,
  MessageCircle, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ───────────── HEADER ───────────── */
function Header() {
  const [open, setOpen] = useState(false);
  const links = ["Product", "Features", "Pricing", "Security", "About"];
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0e1a]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
        <span className="text-xl font-bold tracking-tight text-white">FFLOW</span>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-sm text-white/60 hover:text-white transition-colors">{l}</a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/auth/login">
            <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/5 text-sm">Login</Button>
          </Link>
          <Link to="/auth/signup">
            <Button className="bg-white text-[#0a0e1a] hover:bg-white/90 text-sm font-semibold rounded-full px-5 h-9">Get started</Button>
          </Link>
        </div>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#0a0e1a] border-t border-white/5 px-6 pb-6 pt-4 space-y-4">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="block text-sm text-white/60 hover:text-white" onClick={() => setOpen(false)}>{l}</a>
          ))}
          <div className="flex gap-3 pt-2">
            <Link to="/auth/login"><Button variant="ghost" className="text-white/70 text-sm">Login</Button></Link>
            <Link to="/auth/signup"><Button className="bg-white text-[#0a0e1a] text-sm rounded-full px-5 h-9">Get started</Button></Link>
          </div>
        </div>
      )}
    </header>
  );
}

/* ───────────── HERO ───────────── */
function Hero() {
  return (
    <section className="relative pt-32 pb-24 md:pt-44 md:pb-36 overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-20 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-indigo-500/15 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <motion.div variants={stagger} initial="hidden" animate="visible">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-white/60 mb-8">
            <Sparkles size={14} className="text-blue-400" /> Now in public beta — join 2,000+ freelancers
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.08] max-w-4xl mx-auto">
            Your financial command center for{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">freelancers</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            Manage invoices, track cashflow and understand your finances with an AI assistant.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth/signup">
              <Button className="bg-white text-[#0a0e1a] hover:bg-white/90 rounded-full px-8 h-12 text-base font-semibold shadow-2xl shadow-blue-500/20">
                Start free <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
            <Button variant="ghost" className="text-white/60 hover:text-white hover:bg-white/5 rounded-full px-8 h-12 text-base border border-white/10">
              See demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-20 relative"
        >
          <div className="rounded-2xl border border-white/10 bg-[#111827]/80 backdrop-blur-xl p-1 shadow-2xl shadow-black/40 max-w-5xl mx-auto">
            <div className="rounded-xl bg-[#0f1629] p-6 md:p-8">
              {/* Mock top bar */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-400/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                <div className="w-3 h-3 rounded-full bg-green-400/60" />
                <span className="ml-4 text-xs text-white/30">FFLOW — Dashboard</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* KPI cards */}
                {[
                  { label: "Monthly revenue", value: "€8,420", change: "+12.4%", positive: true },
                  { label: "Pending invoices", value: "€2,150", change: "3 unpaid", positive: false },
                  { label: "Available balance", value: "€14,830", change: "+€2.1k", positive: true },
                ].map((kpi, i) => (
                  <div key={i} className="rounded-lg bg-white/5 border border-white/5 p-4">
                    <p className="text-xs text-white/40 mb-1">{kpi.label}</p>
                    <p className="text-2xl font-bold text-white">{kpi.value}</p>
                    <p className={`text-xs mt-1 ${kpi.positive ? "text-emerald-400" : "text-amber-400"}`}>{kpi.change}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* Cashflow chart placeholder */}
                <div className="rounded-lg bg-white/5 border border-white/5 p-4 h-48">
                  <p className="text-xs text-white/40 mb-3">Cashflow — Last 6 months</p>
                  <div className="flex items-end gap-2 h-28">
                    {[40, 55, 45, 70, 60, 80].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-blue-500/60 to-blue-400/30" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>

                {/* AI chat placeholder */}
                <div className="rounded-lg bg-white/5 border border-white/5 p-4 h-48 flex flex-col">
                  <p className="text-xs text-white/40 mb-3">AI Assistant</p>
                  <div className="flex-1 space-y-2.5 overflow-hidden">
                    <div className="bg-white/5 rounded-lg rounded-tl-none px-3 py-2 text-xs text-white/60 max-w-[80%]">
                      Your VAT liability this quarter is estimated at €1,240. You should set aside funds before the end of March.
                    </div>
                    <div className="bg-blue-500/20 rounded-lg rounded-tr-none px-3 py-2 text-xs text-blue-200 max-w-[70%] ml-auto">
                      Which clients still owe me?
                    </div>
                    <div className="bg-white/5 rounded-lg rounded-tl-none px-3 py-2 text-xs text-white/60 max-w-[80%]">
                      3 invoices are overdue: Studio Neon (€800), Pixel Co (€450), …
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Glow under mockup */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[80%] h-24 bg-blue-500/10 blur-[60px] rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────── PROBLEM ───────────── */
function Problem() {
  const pain = [
    { icon: CreditCard, label: "Bank accounts" },
    { icon: BarChart3, label: "Spreadsheets" },
    { icon: FileText, label: "Invoicing tools" },
    { icon: Calculator, label: "Tax calculations" },
    { icon: TrendingUp, label: "Payment tracking" },
  ];
  return (
    <section className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center">
          <motion.p variants={fadeUp} className="text-sm font-medium text-blue-400 mb-4 uppercase tracking-wider">The problem</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-white max-w-3xl mx-auto leading-tight">
            Freelance finances are unnecessarily complex
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 text-white/50 max-w-2xl mx-auto text-lg">
            Freelancers juggle multiple disconnected tools every day — creating stress, errors and a total lack of financial visibility.
          </motion.p>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-16 flex flex-wrap justify-center gap-4">
          {pain.map((p, i) => (
            <motion.div key={i} variants={fadeUp} className="flex items-center gap-3 px-5 py-3 rounded-full border border-white/10 bg-white/5 text-sm text-white/60">
              <p.icon size={18} className="text-white/30" /> {p.label}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────── SOLUTION ───────────── */
function Solution() {
  const pillars = [
    { icon: FileText, title: "Invoicing", desc: "Create and send professional invoices in seconds." },
    { icon: TrendingUp, title: "Cashflow tracking", desc: "See your financial situation in real time." },
    { icon: Calculator, title: "Tax automation", desc: "Automatically estimate VAT and prepare exports for accountants." },
    { icon: Bot, title: "AI financial assistant", desc: "Ask questions and get personalized insights about your finances." },
  ];
  return (
    <section id="product" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center">
          <motion.p variants={fadeUp} className="text-sm font-medium text-blue-400 mb-4 uppercase tracking-wider">The solution</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-white max-w-3xl mx-auto leading-tight">
            One platform for your entire financial workflow
          </motion.h2>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, i) => (
            <motion.div key={i} variants={fadeUp} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.06] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-5">
                <p.icon size={22} className="text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{p.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────── AI ASSISTANT ───────────── */
function AISection() {
  const questions = [
    "How much VAT should I set aside this month?",
    "Which clients haven't paid me yet?",
    "Can I afford my expenses next month?",
    "Why did my balance drop this week?",
    "Summarize my financial activity.",
  ];
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-indigo-600/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.p variants={fadeUp} className="text-sm font-medium text-blue-400 mb-4 uppercase tracking-wider">AI-powered</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-white leading-tight">
              An AI assistant that understands your business
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-6 text-white/50 text-lg leading-relaxed">
              The AI analyzes your financial data and generates clear explanations, actionable recommendations and risk alerts — so you always stay in control.
            </motion.p>
          </div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-3">
            {questions.map((q, i) => (
              <motion.div key={i} variants={fadeUp} className="flex items-start gap-3 px-5 py-4 rounded-xl bg-white/[0.04] border border-white/10 hover:border-blue-500/30 transition-colors">
                <MessageCircle size={18} className="text-blue-400 mt-0.5 shrink-0" />
                <span className="text-sm text-white/70">{q}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────── FEATURES GRID ───────────── */
function FeaturesGrid() {
  const features = [
    { icon: FileText, title: "Invoice creation", desc: "Design and send professional invoices to clients." },
    { icon: CreditCard, title: "Payment tracking", desc: "Monitor incoming and outgoing payments in real time." },
    { icon: BarChart3, title: "Real-time dashboard", desc: "Get a live overview of your financial health." },
    { icon: Tag, title: "Expense categorization", desc: "Automatically sort and label your expenses." },
    { icon: Calculator, title: "VAT estimation", desc: "Stay prepared with automated tax calculations." },
    { icon: LineChart, title: "Financial forecasting", desc: "Plan ahead with AI-powered projections." },
    { icon: Bell, title: "Client reminders", desc: "Automate follow-ups on unpaid invoices." },
    { icon: Download, title: "Accounting export", desc: "Export clean data for your accountant in one click." },
  ];
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center">
          <motion.p variants={fadeUp} className="text-sm font-medium text-blue-400 mb-4 uppercase tracking-wider">Features</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-white">Everything you need, nothing you don't</motion.h2>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div key={i} variants={fadeUp} className="rounded-xl border border-white/10 bg-white/[0.03] p-5 hover:bg-white/[0.06] transition-colors">
              <f.icon size={20} className="text-blue-400 mb-3" />
              <h3 className="text-sm font-semibold text-white mb-1">{f.title}</h3>
              <p className="text-xs text-white/45 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────── HOW IT WORKS ───────────── */
function HowItWorks() {
  const steps = [
    { num: "01", title: "Create your account", desc: "Sign up in seconds — no credit card required." },
    { num: "02", title: "Send invoices & receive payments", desc: "Create professional invoices and track payments automatically." },
    { num: "03", title: "Track finances & ask the AI", desc: "Monitor your cashflow and get AI-powered insights anytime." },
  ];
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center">
          <motion.p variants={fadeUp} className="text-sm font-medium text-blue-400 mb-4 uppercase tracking-wider">How it works</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-white">Up and running in minutes</motion.h2>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <motion.div key={i} variants={fadeUp} className="text-center md:text-left">
              <span className="text-5xl font-bold bg-gradient-to-b from-white/20 to-transparent bg-clip-text text-transparent">{s.num}</span>
              <h3 className="text-xl font-semibold text-white mt-4 mb-2">{s.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────── PRICING ───────────── */
function Pricing() {
  const plans = [
    {
      name: "Starter", price: "12", features: ["Basic invoicing", "Simple cashflow dashboard", "Payment account access"],
    },
    {
      name: "Pro", price: "24", popular: true,
      features: ["VAT automation", "Expense categorization", "Accounting export", "Advanced dashboard"],
    },
    {
      name: "Premium AI", price: "39",
      features: ["Financial insights", "Advanced forecasting", "AI assistant", "Smart reminders"],
    },
  ];
  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center">
          <motion.p variants={fadeUp} className="text-sm font-medium text-blue-400 mb-4 uppercase tracking-wider">Pricing</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-white">Simple, transparent pricing</motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-white/50 text-lg">No hidden fees. Cancel anytime.</motion.p>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div key={i} variants={fadeUp}
              className={`rounded-2xl border p-8 flex flex-col ${plan.popular ? "border-blue-500/40 bg-blue-500/[0.06] relative" : "border-white/10 bg-white/[0.03]"}`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">Most popular</span>
              )}
              <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-bold text-white">€{plan.price}</span>
                <span className="text-white/40 text-sm">/month</span>
              </div>
              <ul className="space-y-3 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-white/60">
                    <Check size={16} className="text-blue-400 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Button className={`mt-8 rounded-full h-11 font-semibold ${plan.popular ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-white/10 hover:bg-white/15 text-white"}`}>
                Get started
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────── SECURITY ───────────── */
function Security() {
  const items = [
    { icon: Shield, title: "GDPR compliant", desc: "Full compliance with European data protection regulations." },
    { icon: Lock, title: "Secure infrastructure", desc: "End-to-end encryption and SOC 2 aligned practices." },
    { icon: Globe, title: "Banking-as-a-Service partner", desc: "Licensed financial partner for payment account operations." },
    { icon: Eye, title: "AI transparency", desc: "Clear governance on how AI processes your financial data." },
  ];
  return (
    <section id="security" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center">
          <motion.p variants={fadeUp} className="text-sm font-medium text-blue-400 mb-4 uppercase tracking-wider">Security & compliance</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-white">Your data, protected by design</motion.h2>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((s, i) => (
            <motion.div key={i} variants={fadeUp} className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                <s.icon size={22} className="text-blue-400" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-2">{s.title}</h3>
              <p className="text-xs text-white/45 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────── TESTIMONIALS ───────────── */
function Testimonials() {
  const reviews = [
    { name: "Clara M.", role: "Freelance Designer", quote: "FFLOW replaced three tools I was using. My invoices go out faster and I finally understand my cashflow." },
    { name: "Thomas R.", role: "Independent Developer", quote: "The AI assistant is like having a financial advisor on call. It flagged an overdue invoice I'd completely missed." },
    { name: "Sarah K.", role: "Strategy Consultant", quote: "Clean, focused and exactly what I needed. My accountant loves the export feature." },
  ];
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center">
          <motion.p variants={fadeUp} className="text-sm font-medium text-blue-400 mb-4 uppercase tracking-wider">Testimonials</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-white">Loved by freelancers</motion.h2>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div key={i} variants={fadeUp} className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
              <p className="text-sm text-white/60 leading-relaxed mb-6">"{r.quote}"</p>
              <div>
                <p className="text-sm font-semibold text-white">{r.name}</p>
                <p className="text-xs text-white/40">{r.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────── FAQ ───────────── */
function FAQ() {
  const faqs = [
    { q: "Is my financial data secure?", a: "Yes. All data is encrypted in transit and at rest. We follow SOC 2 aligned security practices and are fully GDPR compliant." },
    { q: "Do I need a separate bank account?", a: "No. FFLOW connects to your existing bank accounts. You can also use our integrated payment account for receiving client payments." },
    { q: "Does the AI make financial decisions?", a: "No. The AI provides insights, explanations and recommendations — but you always stay in control of every financial decision." },
    { q: "Can I export my data to my accountant?", a: "Absolutely. You can export clean, formatted financial data in CSV or PDF format with one click." },
  ];
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center">
          <motion.p variants={fadeUp} className="text-sm font-medium text-blue-400 mb-4 uppercase tracking-wider">FAQ</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-white">Frequently asked questions</motion.h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-12">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-white/10 rounded-xl bg-white/[0.03] px-6">
                <AccordionTrigger className="text-sm text-white hover:no-underline py-5">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-white/50 pb-5">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────── FINAL CTA ───────────── */
function FinalCTA() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-white max-w-2xl mx-auto leading-tight">
            Take control of your freelance finances
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 text-white/50 text-lg">Join thousands of freelancers who simplified their financial life.</motion.p>
          <motion.div variants={fadeUp} className="mt-10">
            <Link to="/auth/signup">
              <Button className="bg-white text-[#0a0e1a] hover:bg-white/90 rounded-full px-10 h-12 text-base font-semibold shadow-2xl shadow-blue-500/20">
                Get started <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────── FOOTER ───────────── */
function Footer() {
  const cols = [
    { title: "Product", links: ["Features", "Pricing", "Security", "Changelog"] },
    { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
    { title: "Legal", links: ["Privacy policy", "Terms of service", "GDPR", "Cookie policy"] },
  ];
  return (
    <footer className="border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <span className="text-lg font-bold text-white">FFLOW</span>
            <p className="text-xs text-white/40 mt-3 leading-relaxed">The financial command center for freelancers.</p>
          </div>
          {cols.map((col, i) => (
            <div key={i}>
              <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a href="#" className="text-sm text-white/40 hover:text-white/70 transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">© 2026 FFLOW. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-white/30 hover:text-white/50">Privacy</a>
            <a href="#" className="text-xs text-white/30 hover:text-white/50">Terms</a>
            <a href="#" className="text-xs text-white/30 hover:text-white/50">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ───────────── LANDING PAGE ───────────── */
export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white antialiased">
      <Header />
      <Hero />
      <Problem />
      <Solution />
      <AISection />
      <FeaturesGrid />
      <HowItWorks />
      <Pricing />
      <Security />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
