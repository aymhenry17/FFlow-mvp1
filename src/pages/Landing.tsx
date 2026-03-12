import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText, TrendingUp, Calculator, Bot, CreditCard, BarChart3,
  Tag, LineChart, Users, Download, Bell, Shield, ChevronRight,
  Check, ArrowRight, Menu, X, Lock, Globe, Eye, Sparkles,
  MessageCircle, Zap, Target, Brain, Layers, Clock,
  ChevronDown, Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.06 } },
};

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* ───────────── HEADER ───────────── */
function Header() {
  const [open, setOpen] = useState(false);
  const navItems = [
    { label: "Product", target: "product" },
    { label: "Features", target: "features" },
    { label: "Pricing", target: "pricing" },
    { label: "Security", target: "security" },
    { label: "About", target: "about" },
  ];
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0e1a]/80 backdrop-blur-2xl border-b border-white/[0.04]">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
        <button onClick={() => scrollTo("hero")} className="text-xl font-bold tracking-tight text-white">FFLOW</button>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button key={item.label} onClick={() => scrollTo(item.target)} className="text-[13px] text-white/50 hover:text-white transition-colors duration-200">{item.label}</button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/auth/login">
            <Button variant="ghost" className="text-white/60 hover:text-white hover:bg-white/[0.04] text-[13px] h-9">Login</Button>
          </Link>
          <Link to="/auth/signup">
            <Button className="bg-white text-[#0a0e1a] hover:bg-white/90 text-[13px] font-semibold rounded-full px-5 h-9">Get started</Button>
          </Link>
        </div>

        <button className="md:hidden text-white/70" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="md:hidden bg-[#0a0e1a]/95 backdrop-blur-2xl border-t border-white/[0.04] px-6 pb-6 pt-4 space-y-4">
          {navItems.map((item) => (
            <button key={item.label} onClick={() => { scrollTo(item.target); setOpen(false); }} className="block text-sm text-white/50 hover:text-white">{item.label}</button>
          ))}
          <div className="flex gap-3 pt-2">
            <Link to="/auth/login"><Button variant="ghost" className="text-white/60 text-sm">Login</Button></Link>
            <Link to="/auth/signup"><Button className="bg-white text-[#0a0e1a] text-sm rounded-full px-5 h-9">Get started</Button></Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}

/* ───────────── HERO ───────────── */
function Hero() {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      <div className="absolute top-20 left-1/4 w-[700px] h-[700px] rounded-full bg-blue-600/[0.12] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-indigo-500/[0.08] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <motion.div variants={stagger} initial="hidden" animate="visible">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-xs text-white/50 mb-8">
            <Sparkles size={13} className="text-blue-400" /> Now in early access — join 2,000+ freelancers
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-[4.25rem] font-bold tracking-[-0.03em] text-white leading-[1.06] max-w-4xl mx-auto">
            The financial operating system{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent">built for freelancers</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-7 text-lg md:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed">
            Send invoices, track cashflow, estimate taxes and get AI-powered financial insights — all from one platform designed for independent professionals.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth/signup">
              <Button className="bg-white text-[#0a0e1a] hover:bg-white/90 rounded-full px-8 h-12 text-[15px] font-semibold shadow-2xl shadow-blue-500/10">
                Start free <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
            <Button onClick={() => scrollTo("demo")} variant="ghost" className="text-white/50 hover:text-white hover:bg-white/[0.04] rounded-full px-8 h-12 text-[15px] border border-white/[0.08]">
              See the product
            </Button>
          </motion.div>

          {/* Trust row */}
          <motion.div variants={fadeUp} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-white/30">
            <span className="flex items-center gap-1.5"><Check size={14} className="text-emerald-400/70" /> No credit card required</span>
            <span className="hidden sm:block w-px h-3 bg-white/10" />
            <span className="flex items-center gap-1.5"><Shield size={14} className="text-blue-400/70" /> GDPR compliant</span>
            <span className="hidden sm:block w-px h-3 bg-white/10" />
            <span className="flex items-center gap-1.5"><Lock size={14} className="text-blue-400/70" /> Bank-grade encryption</span>
          </motion.div>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          id="demo"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 relative"
        >
          <div className="rounded-2xl border border-white/[0.08] bg-[#111827]/70 backdrop-blur-xl p-1 shadow-2xl shadow-black/50 max-w-5xl mx-auto">
            <div className="rounded-xl bg-[#0c1220] overflow-hidden">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.04]">
                <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
                <div className="ml-4 flex-1 h-6 rounded-md bg-white/[0.03] flex items-center justify-center">
                  <span className="text-[10px] text-white/20">app.fflow.io/dashboard</span>
                </div>
              </div>

              <div className="flex">
                {/* Sidebar */}
                <div className="hidden md:flex flex-col w-48 border-r border-white/[0.04] p-4 gap-1">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-[10px] font-bold text-white">F</div>
                    <span className="text-xs font-semibold text-white/80">FFLOW</span>
                  </div>
                  {["Dashboard", "Invoices", "Transactions", "Cashflow", "AI Assistant", "Settings"].map((item, i) => (
                    <div key={i} className={`text-[11px] px-3 py-2 rounded-md ${i === 0 ? "bg-white/[0.06] text-white/80 font-medium" : "text-white/30"}`}>{item}</div>
                  ))}
                </div>

                {/* Main content */}
                <div className="flex-1 p-5 md:p-6 space-y-4">
                  {/* Greeting */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-white/30">Good morning, Clara</p>
                      <p className="text-sm font-semibold text-white/80 mt-0.5">Financial overview</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400/20 to-indigo-400/20 border border-white/[0.06] flex items-center justify-center text-[10px] text-white/50">CM</div>
                    </div>
                  </div>

                  {/* KPI row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { label: "Revenue (Mar)", value: "€8,420", delta: "+12.4%", up: true },
                      { label: "Unpaid invoices", value: "€3,200", delta: "3 pending", up: false },
                      { label: "VAT to set aside", value: "€1,684", delta: "Q1 estimate", up: false },
                      { label: "Projected balance", value: "€14,830", delta: "+€2.1k", up: true },
                    ].map((kpi, i) => (
                      <div key={i} className="rounded-lg bg-white/[0.03] border border-white/[0.05] p-3">
                        <p className="text-[10px] text-white/30 mb-1">{kpi.label}</p>
                        <p className="text-lg font-bold text-white/90 tracking-tight">{kpi.value}</p>
                        <p className={`text-[10px] mt-0.5 ${kpi.up ? "text-emerald-400/80" : "text-amber-400/70"}`}>{kpi.delta}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    {/* Chart */}
                    <div className="md:col-span-3 rounded-lg bg-white/[0.03] border border-white/[0.05] p-4">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-[10px] text-white/30">Cashflow — 6 months</p>
                        <div className="flex gap-3 text-[9px] text-white/20">
                          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-400" />Income</span>
                          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-white/20" />Expenses</span>
                        </div>
                      </div>
                      <div className="flex items-end gap-1.5 h-28">
                        {[
                          { inc: 52, exp: 28 }, { inc: 68, exp: 30 }, { inc: 48, exp: 35 },
                          { inc: 72, exp: 32 }, { inc: 60, exp: 26 }, { inc: 85, exp: 34 },
                        ].map((bar, i) => (
                          <div key={i} className="flex-1 flex gap-0.5 items-end">
                            <div className="flex-1 rounded-t-sm bg-gradient-to-t from-blue-500/50 to-blue-400/20" style={{ height: `${bar.inc}%` }} />
                            <div className="flex-1 rounded-t-sm bg-white/[0.06]" style={{ height: `${bar.exp}%` }} />
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-1.5 mt-2">
                        {["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"].map((m) => (
                          <span key={m} className="flex-1 text-center text-[8px] text-white/15">{m}</span>
                        ))}
                      </div>
                    </div>

                    {/* AI Assistant */}
                    <div className="md:col-span-2 rounded-lg bg-white/[0.03] border border-white/[0.05] p-4 flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <Bot size={12} className="text-blue-400/70" />
                        <p className="text-[10px] text-white/30">AI Assistant</p>
                      </div>
                      <div className="flex-1 space-y-2 overflow-hidden text-[11px]">
                        <div className="bg-white/[0.04] rounded-lg rounded-tl-sm px-3 py-2 text-white/50 max-w-[90%]">
                          3 invoices are overdue totaling €3,200. Studio Neon owes €1,400 since Feb 15.
                        </div>
                        <div className="bg-blue-500/15 rounded-lg rounded-tr-sm px-3 py-2 text-blue-200/70 max-w-[80%] ml-auto">
                          What's my projected balance next month?
                        </div>
                        <div className="bg-white/[0.04] rounded-lg rounded-tl-sm px-3 py-2 text-white/50 max-w-[90%]">
                          Based on current invoices and recurring expenses, your projected April balance is ~€16,400.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent invoices table */}
                  <div className="rounded-lg bg-white/[0.03] border border-white/[0.05] p-4">
                    <p className="text-[10px] text-white/30 mb-3">Recent invoices</p>
                    <div className="space-y-0">
                      {[
                        { client: "Studio Neon", num: "INV-041", amount: "€1,400", status: "Overdue", statusColor: "text-red-400/80 bg-red-400/10" },
                        { client: "Pixel Co", num: "INV-040", amount: "€800", status: "Sent", statusColor: "text-blue-400/80 bg-blue-400/10" },
                        { client: "Vertex Labs", num: "INV-039", amount: "€2,800", status: "Paid", statusColor: "text-emerald-400/80 bg-emerald-400/10" },
                        { client: "Bloom Health", num: "INV-038", amount: "€5,100", status: "Paid", statusColor: "text-emerald-400/80 bg-emerald-400/10" },
                      ].map((inv, i) => (
                        <div key={i} className={`flex items-center justify-between py-2 ${i < 3 ? "border-b border-white/[0.03]" : ""}`}>
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded bg-white/[0.04] flex items-center justify-center text-[8px] text-white/30">{inv.client[0]}</div>
                            <div>
                              <p className="text-[11px] text-white/70 font-medium">{inv.client}</p>
                              <p className="text-[9px] text-white/25">{inv.num}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-[11px] text-white/60 font-medium">{inv.amount}</span>
                            <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${inv.statusColor}`}>{inv.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[70%] h-32 bg-blue-500/[0.06] blur-[80px] rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────── WHY FFLOW ───────────── */
function WhyFflow() {
  const diffs = [
    {
      icon: Target,
      title: "Built for freelancers, not generic businesses",
      desc: "Every feature is designed around the workflows of independent professionals — not teams, not enterprises. From invoice numbering to VAT estimation, the product fits how freelancers actually work.",
    },
    {
      icon: Brain,
      title: "AI that explains your finances in plain language",
      desc: "No dashboards to interpret. Ask the AI assistant what your numbers mean, which clients owe you, or whether you can afford a purchase — and get a clear, specific answer.",
    },
    {
      icon: Layers,
      title: "Invoicing, payments and cashflow in one place",
      desc: "Stop switching between your bank, spreadsheet and invoicing tool. FFLOW centralizes your financial operations so nothing slips through the cracks.",
    },
  ];
  return (
    <section id="about" className="py-28 md:py-36 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-600/[0.03] to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center">
          <motion.p variants={fadeUp} className="text-sm font-medium text-blue-400/80 mb-4 uppercase tracking-wider">Why FFLOW</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-white max-w-3xl mx-auto leading-tight tracking-[-0.02em]">
            Not another finance tool.<br />A financial partner for independents.
          </motion.h2>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {diffs.map((d, i) => (
            <motion.div key={i} variants={fadeUp} className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 hover:border-white/[0.12] transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-blue-500/[0.08] border border-blue-500/[0.1] flex items-center justify-center mb-6">
                <d.icon size={20} className="text-blue-400/80" />
              </div>
              <h3 className="text-[17px] font-semibold text-white mb-3 leading-snug">{d.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{d.desc}</p>
            </motion.div>
          ))}
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
    <section className="py-28 md:py-36 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center">
          <motion.p variants={fadeUp} className="text-sm font-medium text-blue-400/80 mb-4 uppercase tracking-wider">The problem</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-white max-w-3xl mx-auto leading-tight tracking-[-0.02em]">
            Freelancers lose hours every month managing money across disconnected tools
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-7 text-white/40 max-w-2xl mx-auto text-lg leading-relaxed">
            You check your bank here, invoice there, track expenses somewhere else, and estimate taxes in a spreadsheet. The result? Stress, missed payments and zero financial clarity.
          </motion.p>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-16 flex flex-wrap justify-center gap-3">
          {pain.map((p, i) => (
            <motion.div key={i} variants={fadeUp} className="flex items-center gap-2.5 px-5 py-3 rounded-full border border-white/[0.06] bg-white/[0.02] text-sm text-white/40">
              <p.icon size={16} className="text-white/20" /> {p.label}
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
    { icon: FileText, title: "Invoicing", desc: "Create, customize and send professional invoices. Track payment status automatically." },
    { icon: TrendingUp, title: "Cashflow tracking", desc: "See real-time income vs. expenses, account balances and financial projections." },
    { icon: Calculator, title: "Tax automation", desc: "Estimate quarterly VAT, track deductible expenses and export reports for your accountant." },
    { icon: Bot, title: "AI financial assistant", desc: "Ask plain-language questions about your finances and receive specific, data-backed answers." },
  ];
  return (
    <section id="product" className="py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center">
          <motion.p variants={fadeUp} className="text-sm font-medium text-blue-400/80 mb-4 uppercase tracking-wider">The platform</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-white max-w-3xl mx-auto leading-tight tracking-[-0.02em]">
            One platform for your entire financial workflow
          </motion.h2>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, i) => (
            <motion.div key={i} variants={fadeUp} className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-blue-500/[0.08] border border-blue-500/[0.1] flex items-center justify-center mb-6">
                <p.icon size={20} className="text-blue-400/80" />
              </div>
              <h3 className="text-[17px] font-semibold text-white mb-2">{p.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{p.desc}</p>
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
    "How much VAT should I set aside this quarter?",
    "Which clients still owe me and since when?",
    "Can I afford to invest €2,000 in new equipment next month?",
    "Why did my balance drop €800 last week?",
    "Summarize my financial activity for March.",
  ];
  return (
    <section className="py-28 md:py-36 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/[0.06] blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.p variants={fadeUp} className="text-sm font-medium text-blue-400/80 mb-4 uppercase tracking-wider">AI-powered</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-white leading-tight tracking-[-0.02em]">
              Ask your finances a question. Get a real answer.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-7 text-white/40 text-lg leading-relaxed">
              The AI assistant reads your invoices, transactions and cashflow data to generate specific explanations — not generic advice. It identifies overdue payments, forecasts shortfalls and helps you prepare for tax season.
            </motion.p>
          </div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-2.5">
            {questions.map((q, i) => (
              <motion.div key={i} variants={fadeUp} className="flex items-center gap-3 px-5 py-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-blue-500/20 hover:bg-white/[0.04] transition-all duration-300 cursor-default">
                <MessageCircle size={16} className="text-blue-400/60 shrink-0" />
                <span className="text-sm text-white/55">{q}</span>
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
    { icon: FileText, title: "Invoice creation", desc: "Design branded invoices with automatic numbering and PDF export." },
    { icon: CreditCard, title: "Payment tracking", desc: "See which invoices are paid, pending or overdue at a glance." },
    { icon: BarChart3, title: "Real-time dashboard", desc: "KPIs, cashflow charts and financial health in one view." },
    { icon: Tag, title: "Expense categorization", desc: "Tag and sort expenses by type for cleaner bookkeeping." },
    { icon: Calculator, title: "VAT estimation", desc: "Quarterly VAT calculations based on your actual revenue." },
    { icon: LineChart, title: "Financial forecasting", desc: "Project your balance forward based on recurring patterns." },
    { icon: Bell, title: "Payment reminders", desc: "Automated follow-ups when invoices pass their due date." },
    { icon: Download, title: "Accounting export", desc: "Export formatted CSV or PDF reports for your accountant." },
  ];
  return (
    <section id="features" className="py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center">
          <motion.p variants={fadeUp} className="text-sm font-medium text-blue-400/80 mb-4 uppercase tracking-wider">Features</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-white tracking-[-0.02em]">Everything you need to run your finances</motion.h2>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div key={i} variants={fadeUp} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300">
              <f.icon size={18} className="text-blue-400/70 mb-4" />
              <h3 className="text-sm font-semibold text-white/90 mb-1.5">{f.title}</h3>
              <p className="text-[13px] text-white/35 leading-relaxed">{f.desc}</p>
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
    { num: "01", title: "Create your account", desc: "Sign up in under a minute. No credit card, no setup fees." },
    { num: "02", title: "Send invoices & track payments", desc: "Create professional invoices and see payments as they arrive." },
    { num: "03", title: "Monitor finances & ask the AI", desc: "Track your cashflow in real time and get AI-powered answers about your money." },
  ];
  return (
    <section className="py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center">
          <motion.p variants={fadeUp} className="text-sm font-medium text-blue-400/80 mb-4 uppercase tracking-wider">How it works</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-white tracking-[-0.02em]">Start in minutes, not days</motion.h2>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((s, i) => (
            <motion.div key={i} variants={fadeUp} className="relative text-center md:text-left">
              <span className="text-6xl font-bold bg-gradient-to-b from-white/[0.12] to-transparent bg-clip-text text-transparent tracking-tight">{s.num}</span>
              <h3 className="text-xl font-semibold text-white mt-4 mb-3">{s.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{s.desc}</p>
              {i < 2 && <div className="hidden md:block absolute top-8 -right-5 w-px h-16 bg-gradient-to-b from-white/[0.06] to-transparent" />}
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
      name: "Starter", price: "12",
      desc: "For freelancers getting started with structured invoicing.",
      features: ["Unlimited invoices", "Cashflow dashboard", "Payment account", "CSV export"],
    },
    {
      name: "Pro", price: "24", popular: true,
      desc: "For independent professionals who want full financial visibility.",
      features: ["Everything in Starter", "VAT automation", "Expense categorization", "Accounting reports", "Payment reminders"],
    },
    {
      name: "Premium", price: "39",
      desc: "For freelancers who want AI-powered financial intelligence.",
      features: ["Everything in Pro", "AI financial assistant", "Cash forecasting", "Smart risk alerts", "Priority support"],
    },
  ];
  return (
    <section id="pricing" className="py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center">
          <motion.p variants={fadeUp} className="text-sm font-medium text-blue-400/80 mb-4 uppercase tracking-wider">Pricing</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-white tracking-[-0.02em]">Transparent pricing, no surprises</motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-white/40 text-lg">Start free for 14 days. No credit card required.</motion.p>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div key={i} variants={fadeUp}
              className={`rounded-2xl border p-8 flex flex-col ${plan.popular ? "border-blue-500/30 bg-blue-500/[0.04] relative" : "border-white/[0.06] bg-white/[0.02]"}`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[11px] font-semibold px-3 py-1 rounded-full">Recommended</span>
              )}
              <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
              <p className="text-xs text-white/30 mt-1.5 leading-relaxed">{plan.desc}</p>
              <div className="mt-5 mb-6">
                <span className="text-4xl font-bold text-white tracking-tight">€{plan.price}</span>
                <span className="text-white/30 text-sm">/month</span>
              </div>
              <ul className="space-y-2.5 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-white/50">
                    <Check size={14} className="text-blue-400/70 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Button className={`mt-8 rounded-full h-11 font-semibold text-sm ${plan.popular ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-white/[0.06] hover:bg-white/[0.1] text-white/80 border border-white/[0.06]"}`}>
                Start free trial
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
    { icon: Shield, title: "GDPR compliant", desc: "We process and store data in the EU in accordance with GDPR requirements." },
    { icon: Lock, title: "Encrypted infrastructure", desc: "All data is encrypted in transit (TLS 1.3) and at rest (AES-256)." },
    { icon: Globe, title: "Regulated payment partner", desc: "Payment services are provided through a licensed European payment institution." },
    { icon: Eye, title: "AI data governance", desc: "Your financial data is never used to train models. AI outputs are traceable and auditable." },
  ];
  return (
    <section id="security" className="py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center">
          <motion.p variants={fadeUp} className="text-sm font-medium text-blue-400/80 mb-4 uppercase tracking-wider">Security & compliance</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-white tracking-[-0.02em]">Built with security as a foundation</motion.h2>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((s, i) => (
            <motion.div key={i} variants={fadeUp} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-7 text-center hover:border-white/[0.12] transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-blue-500/[0.08] border border-blue-500/[0.1] flex items-center justify-center mx-auto mb-5">
                <s.icon size={20} className="text-blue-400/80" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-2">{s.title}</h3>
              <p className="text-[13px] text-white/35 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────── DESIGNED FOR ───────────── */
function DesignedFor() {
  const audiences = [
    {
      icon: Users,
      role: "Freelance designers & creatives",
      quote: "FFLOW replaced three tools I was paying for. My invoices go out faster, and I actually understand where my money goes now.",
      name: "Clara M.",
      title: "Brand designer, 4 years freelancing",
    },
    {
      icon: Zap,
      role: "Independent developers",
      quote: "The AI flagged an overdue invoice from a client I'd forgotten about — €1,400 I almost lost. That alone paid for a year of FFLOW.",
      name: "Thomas R.",
      title: "Full-stack developer, Paris",
    },
    {
      icon: BarChart3,
      role: "Consultants & strategists",
      quote: "My accountant used to spend hours reformatting my data. Now I export everything clean from FFLOW in two clicks.",
      name: "Sarah K.",
      title: "Strategy consultant, independent since 2021",
    },
  ];
  return (
    <section className="py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center">
          <motion.p variants={fadeUp} className="text-sm font-medium text-blue-400/80 mb-4 uppercase tracking-wider">Designed for</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-white tracking-[-0.02em]">Built by freelancers, for freelancers</motion.h2>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {audiences.map((a, i) => (
            <motion.div key={i} variants={fadeUp} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 hover:border-white/[0.1] transition-all duration-300">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-lg bg-blue-500/[0.08] border border-blue-500/[0.1] flex items-center justify-center">
                  <a.icon size={16} className="text-blue-400/70" />
                </div>
                <span className="text-xs font-medium text-white/50">{a.role}</span>
              </div>
              <p className="text-sm text-white/50 leading-relaxed mb-6 italic">"{a.quote}"</p>
              <div className="pt-5 border-t border-white/[0.04]">
                <p className="text-sm font-medium text-white/80">{a.name}</p>
                <p className="text-xs text-white/30 mt-0.5">{a.title}</p>
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
    { q: "Is my financial data secure?", a: "Yes. All data is encrypted using AES-256 at rest and TLS 1.3 in transit. We store data in EU-based infrastructure and comply with GDPR. We're working towards SOC 2 Type II certification as part of our security roadmap." },
    { q: "Do I need a separate bank account?", a: "No. You can use FFLOW alongside your existing bank account. We also offer an integrated payment account through a licensed European payment partner, but it's optional — you choose what works best for your workflow." },
    { q: "Does the AI make financial decisions for me?", a: "No. The AI analyzes your financial data and provides explanations, insights and suggestions — but every decision remains yours. It's designed to help you understand your numbers, not to act on your behalf." },
    { q: "Can I export data for my accountant?", a: "Yes. You can export invoices, transaction history and expense reports in CSV and PDF formats. The exports are structured to match common accounting formats, so your accountant can import them directly." },
    { q: "What happens if I cancel my subscription?", a: "You can export all your data before canceling. After cancellation, your account remains accessible in read-only mode for 30 days before data is permanently deleted." },
  ];
  return (
    <section className="py-28 md:py-36">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center">
          <motion.p variants={fadeUp} className="text-sm font-medium text-blue-400/80 mb-4 uppercase tracking-wider">FAQ</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-white tracking-[-0.02em]">Common questions</motion.h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-14">
          <Accordion type="single" collapsible className="space-y-2.5">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-white/[0.06] rounded-xl bg-white/[0.02] px-6 hover:border-white/[0.1] transition-colors duration-200">
                <AccordionTrigger className="text-sm text-white/80 hover:no-underline py-5 [&>svg]:text-white/30">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-white/40 pb-5 leading-relaxed">{faq.a}</AccordionContent>
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
    <section className="py-28 md:py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/[0.06] via-transparent to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-white max-w-2xl mx-auto leading-tight tracking-[-0.02em]">
            Take control of your freelance finances
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 text-white/40 text-lg">Start your free trial today. No credit card, no commitment.</motion.p>
          <motion.div variants={fadeUp} className="mt-10">
            <Link to="/auth/signup">
              <Button className="bg-white text-[#0a0e1a] hover:bg-white/90 rounded-full px-10 h-12 text-[15px] font-semibold shadow-2xl shadow-blue-500/10">
                Get started free <ArrowRight size={16} className="ml-2" />
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
    { title: "Product", links: [
      { label: "Features", target: "features" },
      { label: "Pricing", target: "pricing" },
      { label: "Security", target: "security" },
      { label: "AI Assistant", target: "product" },
    ]},
    { title: "Company", links: [
      { label: "About", target: "about" },
      { label: "Blog", target: null },
      { label: "Careers", target: null },
      { label: "Contact", target: null },
    ]},
    { title: "Legal", links: [
      { label: "Privacy policy", target: null },
      { label: "Terms of service", target: null },
      { label: "GDPR", target: null },
    ]},
  ];
  return (
    <footer className="border-t border-white/[0.04] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <span className="text-lg font-bold text-white tracking-tight">FFLOW</span>
            <p className="text-xs text-white/30 mt-3 leading-relaxed max-w-[180px]">The financial operating system for independent professionals.</p>
          </div>
          {cols.map((col, i) => (
            <div key={i}>
              <p className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((link, j) => (
                  <li key={j}>
                    {link.target ? (
                      <button onClick={() => scrollTo(link.target)} className="text-sm text-white/30 hover:text-white/60 transition-colors duration-200">{link.label}</button>
                    ) : (
                      <span className="text-sm text-white/20 cursor-default">{link.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">© 2026 FFLOW. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="text-xs text-white/20">Privacy</span>
            <span className="text-xs text-white/20">Terms</span>
            <span className="text-xs text-white/20">GDPR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ───────────── LANDING PAGE ───────────── */
export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white antialiased scroll-smooth">
      <Header />
      <Hero />
      <WhyFflow />
      <Problem />
      <Solution />
      <AISection />
      <FeaturesGrid />
      <HowItWorks />
      <Pricing />
      <Security />
      <DesignedFor />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
