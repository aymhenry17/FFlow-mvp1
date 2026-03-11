export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: "income" | "expense";
  status: "completed" | "pending";
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  vat: number;
  description: string;
  status: "draft" | "sent" | "paid" | "overdue";
}

export interface AccountActivity {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "credit" | "debit";
  balance: number;
}

export const freelancerProfile = {
  name: "Alex Morgan",
  email: "alex@morgandesign.co",
  avatar: "AM",
  businessName: "Morgan Design Co.",
  businessType: "Design Consultancy",
  currency: "EUR",
  iban: "FR76 3000 6000 0112 3456 7890 189",
  bic: "AGRIFRPP",
  accountHolder: "Morgan Design Co.",
  kycVerified: true,
};

export const kpiData = {
  accountBalance: 24_830.50,
  monthlyIncome: 12_400.00,
  monthlyExpenses: 3_870.25,
  unpaidInvoices: 4,
};

export const transactions: Transaction[] = [
  { id: "t1", date: "2026-03-09", description: "Acme Corp — Brand Strategy", category: "Client Payment", amount: 4500, type: "income", status: "completed" },
  { id: "t2", date: "2026-03-08", description: "Figma Pro Subscription", category: "Software", amount: -15, type: "expense", status: "completed" },
  { id: "t3", date: "2026-03-07", description: "WeWork Day Pass", category: "Workspace", amount: -45, type: "expense", status: "completed" },
  { id: "t4", date: "2026-03-06", description: "Luna Startups — UX Audit", category: "Client Payment", amount: 2800, type: "income", status: "completed" },
  { id: "t5", date: "2026-03-05", description: "Adobe Creative Cloud", category: "Software", amount: -54.99, type: "expense", status: "completed" },
  { id: "t6", date: "2026-03-04", description: "Train to Client Meeting", category: "Travel", amount: -87.50, type: "expense", status: "completed" },
  { id: "t7", date: "2026-03-03", description: "Vertex Labs — Dashboard Design", category: "Client Payment", amount: 3200, type: "income", status: "pending" },
  { id: "t8", date: "2026-03-01", description: "Quarterly Tax Provision", category: "Tax", amount: -1200, type: "expense", status: "completed" },
  { id: "t9", date: "2026-02-28", description: "Notion Team Plan", category: "Software", amount: -10, type: "expense", status: "completed" },
  { id: "t10", date: "2026-02-27", description: "Bloom Health — App Redesign", category: "Client Payment", amount: 5100, type: "income", status: "completed" },
  { id: "t11", date: "2026-02-25", description: "Professional Insurance", category: "Insurance", amount: -125, type: "expense", status: "completed" },
  { id: "t12", date: "2026-02-23", description: "CloudSync — Landing Page", category: "Client Payment", amount: 1800, type: "income", status: "completed" },
];

export const invoices: Invoice[] = [
  { id: "inv1", invoiceNumber: "INV-2026-012", clientName: "Acme Corp", clientEmail: "billing@acme.com", issueDate: "2026-03-01", dueDate: "2026-03-31", amount: 4500, vat: 900, description: "Brand Strategy & Identity Design", status: "sent" },
  { id: "inv2", invoiceNumber: "INV-2026-011", clientName: "Luna Startups", clientEmail: "finance@lunastartups.io", issueDate: "2026-02-20", dueDate: "2026-03-20", amount: 2800, vat: 560, description: "UX Audit & Recommendations Report", status: "paid" },
  { id: "inv3", invoiceNumber: "INV-2026-010", clientName: "Vertex Labs", clientEmail: "ap@vertexlabs.co", issueDate: "2026-02-15", dueDate: "2026-03-15", amount: 3200, vat: 640, description: "Analytics Dashboard Design", status: "overdue" },
  { id: "inv4", invoiceNumber: "INV-2026-009", clientName: "Bloom Health", clientEmail: "hello@bloomhealth.com", issueDate: "2026-02-10", dueDate: "2026-03-10", amount: 5100, vat: 1020, description: "Mobile App Redesign", status: "paid" },
  { id: "inv5", invoiceNumber: "INV-2026-008", clientName: "CloudSync", clientEmail: "team@cloudsync.dev", issueDate: "2026-02-01", dueDate: "2026-03-01", amount: 1800, vat: 360, description: "Marketing Landing Page", status: "paid" },
  { id: "inv6", invoiceNumber: "INV-2026-013", clientName: "Nova Finance", clientEmail: "ops@novafinance.eu", issueDate: "2026-03-08", dueDate: "2026-04-07", amount: 6200, vat: 1240, description: "Financial Dashboard MVP Design", status: "draft" },
  { id: "inv7", invoiceNumber: "INV-2026-014", clientName: "Meridian Labs", clientEmail: "billing@meridianlabs.com", issueDate: "2026-03-05", dueDate: "2026-03-19", amount: 2100, vat: 420, description: "Design System Documentation", status: "overdue" },
];

export const accountActivity: AccountActivity[] = [
  { id: "a1", date: "2026-03-09", description: "Incoming — Acme Corp", amount: 4500, type: "credit", balance: 24830.50 },
  { id: "a2", date: "2026-03-08", description: "Figma Pro Subscription", amount: -15, type: "debit", balance: 20330.50 },
  { id: "a3", date: "2026-03-07", description: "WeWork Day Pass", amount: -45, type: "debit", balance: 20345.50 },
  { id: "a4", date: "2026-03-06", description: "Incoming — Luna Startups", amount: 2800, type: "credit", balance: 20390.50 },
  { id: "a5", date: "2026-03-05", description: "Adobe Creative Cloud", amount: -54.99, type: "debit", balance: 17590.50 },
  { id: "a6", date: "2026-03-04", description: "Train — Client Meeting", amount: -87.50, type: "debit", balance: 17645.49 },
];

export const cashflowData = [
  { month: "Oct", income: 8200, expenses: 3100 },
  { month: "Nov", income: 10500, expenses: 3400 },
  { month: "Dec", income: 7800, expenses: 4200 },
  { month: "Jan", income: 11200, expenses: 3600 },
  { month: "Feb", income: 9700, expenses: 3200 },
  { month: "Mar", income: 12400, expenses: 3870 },
];

export const aiInsights = [
  "Your income is up 28% compared to last month. Great momentum.",
  "2 invoices are overdue totaling €5,300. Consider sending reminders.",
  "Software subscriptions account for 2.1% of expenses — well within healthy range.",
  "You've maintained a positive cashflow for 6 consecutive months.",
];

export const suggestedPrompts = [
  "Summarize my spending this month",
  "Which invoices are overdue?",
  "What should I follow up on this week?",
  "How is my cashflow trending?",
];
