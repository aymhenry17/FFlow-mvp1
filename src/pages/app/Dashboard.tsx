import {
  Wallet,
  TrendingUp,
  TrendingDown,
  FileWarning,
  Lightbulb,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  cashflowData as mockCashflowData,
  aiInsights as mockAiInsights,
} from "@/data/mockData";
import { getDashboard, getTransactions, getInvoices } from "@/services/api";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-EU", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(n);

type DashboardKpis = {
  accountBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  unpaidInvoices: number;
};

export default function Dashboard() {
  const [kpis, setKpis] = useState<DashboardKpis>({
    accountBalance: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    unpaidInvoices: 0,
  });
  const [loading, setLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState<string | null>(null);

  const [txns, setTxns] = useState<
    {
      id: string;
      date: string;
      description: string;
      category: string;
      amount: number;
      type: "income" | "expense";
      status: string;
    }[]
  >([]);
  const [txnsLoading, setTxnsLoading] = useState(false);
  const [txnsError, setTxnsError] = useState<string | null>(null);

  const [invs, setInvs] = useState<any[]>([]);
  const [invsLoading, setInvsLoading] = useState(false);
  const [invsError, setInvsError] = useState<string | null>(null);

  const [cashflow] = useState(mockCashflowData);
  const [aiInsights] = useState(mockAiInsights);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setDashboardError(null);
        const data = await getDashboard();
        const apiKpis = (data as any)?.kpis || (data as any)?.kpiData || data;

        if (apiKpis) {
          setKpis({
            accountBalance:
              apiKpis.accountBalance ??
              apiKpis.balance ??
              0,
            monthlyIncome:
              apiKpis.monthlyIncome ??
              apiKpis.monthly_income ??
              0,
            monthlyExpenses:
              apiKpis.monthlyExpenses ??
              apiKpis.monthly_expenses ??
              0,
            unpaidInvoices:
              apiKpis.unpaidInvoices ??
              apiKpis.unpaid_invoices ??
              0,
          });
        }
      } catch (err) {
        console.error(err);
        setDashboardError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    const loadTransactions = async () => {
      try {
        setTxnsLoading(true);
        setTxnsError(null);
        const data = await getTransactions();
        const items = (data as any)?.items || data || [];
        if (Array.isArray(items) && items.length > 0) {
          setTxns(
            items.map((t: any) => ({
              id: t.id,
              date: t.date,
              description: t.description,
              category: t.category ?? "General",
              amount: t.amount,
              type: t.type === "income" ? "income" : "expense",
              status: t.status ?? "completed",
            }))
          );
        }
      } catch (err) {
        console.error(err);
        setTxnsError("Failed to load transactions.");
      } finally {
        setTxnsLoading(false);
      }
    };

    const loadInvoices = async () => {
      try {
        setInvsLoading(true);
        setInvsError(null);
        const data = await getInvoices();
        const items = (data as any)?.items || data || [];
        if (Array.isArray(items) && items.length > 0) {
          setInvs(items as any);
        }
      } catch (err) {
        console.error(err);
        setInvsError("Failed to load invoices.");
      } finally {
        setInvsLoading(false);
      }
    };

    loadDashboard();
    loadTransactions();
    loadInvoices();
  }, []);

  const kpisArray = [
    {
      label: "Account Balance",
      value: fmt(kpis.accountBalance),
      icon: Wallet,
      change: "+12%",
    },
    {
      label: "Monthly Income",
      value: fmt(kpis.monthlyIncome),
      icon: TrendingUp,
      change: "+28%",
    },
    {
      label: "Monthly Expenses",
      value: fmt(kpis.monthlyExpenses),
      icon: TrendingDown,
      change: "-4%",
    },
    {
      label: "Unpaid Invoices",
      value: String(kpis.unpaidInvoices),
      icon: FileWarning,
      change: "",
    },
  ];

  const recentTransactions = txns.slice(0, 5);
  const recentInvoices = invs.slice(0, 4);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="mb-1">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Your finances, organized and in view.
        </p>
        {loading && (
          <p className="text-xs text-muted-foreground mt-1">
            Loading latest data…
          </p>
        )}
        {dashboardError && (
          <p className="text-xs text-destructive mt-1">{dashboardError}</p>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpisArray.map((kpi) => (
          <div key={kpi.label} className="ledger-kpi">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {kpi.label}
              </span>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-semibold tracking-tight">{kpi.value}</p>
            {kpi.change && (
              <p className="text-xs text-muted-foreground mt-1">
                {kpi.change} from last month
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Cashflow Chart */}
      <div className="ledger-card">
        <h2 className="mb-4">Cashflow Overview</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={cashflow}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,14%,91%)" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "hsl(215,14%,46%)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "hsl(215,14%,46%)" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `€${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(value: number) => [fmt(value)]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid hsl(220,14%,91%)",
                  fontSize: 13,
                }}
              />
              <Area
                type="monotone"
                dataKey="income"
                stackId="1"
                stroke="hsl(215,28%,17%)"
                fill="hsl(215,28%,17%)"
                fillOpacity={0.15}
                strokeWidth={2}
                name="Income"
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stackId="2"
                stroke="hsl(136,8%,67%)"
                fill="hsl(136,8%,67%)"
                fillOpacity={0.15}
                strokeWidth={2}
                name="Expenses"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="ledger-card">
          <h2 className="mb-4">Recent Transactions</h2>
          <div className="space-y-3">
            {txnsLoading && (
              <p className="text-xs text-muted-foreground">
                Loading transactions…
              </p>
            )}
            {txnsError && (
              <p className="text-xs text-destructive">{txnsError}</p>
            )}
            {recentTransactions.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div>
                  <p className="text-sm font-medium">{t.description}</p>
                  <p className="text-xs text-muted-foreground">{t.date}</p>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    t.type === "income" ? "text-success" : "text-foreground"
                  }`}
                >
                  {t.type === "income" ? "+" : ""}
                  {fmt(t.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="ledger-card">
          <h2 className="mb-4">Recent Invoices</h2>
          <div className="space-y-3">
            {invsLoading && (
              <p className="text-xs text-muted-foreground">
                Loading invoices…
              </p>
            )}
            {invsError && (
              <p className="text-xs text-destructive">{invsError}</p>
            )}
            {recentInvoices.map((inv) => (
              <div
                key={inv.id}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div>
                  <p className="text-sm font-medium">{inv.clientName}</p>
                  <p className="text-xs text-muted-foreground">
                    {inv.invoiceNumber}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold">{fmt(inv.amount)}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      inv.status === "paid"
                        ? "status-paid"
                        : inv.status === "sent"
                        ? "status-sent"
                        : inv.status === "overdue"
                        ? "status-overdue"
                        : "status-draft"
                    }`}
                  >
                    {inv.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="ledger-card">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="h-4 w-4 text-warning" />
          <h2>AI Insights</h2>
        </div>
        <ul className="space-y-2">
          {aiInsights.map((insight, i) => (
            <li
              key={i}
              className="text-sm text-muted-foreground pl-4 border-l-2 border-accent py-1"
            >
              {insight}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
