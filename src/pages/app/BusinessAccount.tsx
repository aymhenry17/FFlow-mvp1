import { ShieldCheck, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  freelancerProfile as mockFreelancerProfile,
  kpiData as mockKpiData,
  accountActivity as mockAccountActivity,
} from "@/data/mockData";
import { toast } from "sonner";
import { getAccount, getTransactions } from "@/services/api";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-EU", { style: "currency", currency: "EUR" }).format(n);

export default function BusinessAccount() {
  const [freelancerProfile, setFreelancerProfile] = useState(
    mockFreelancerProfile
  );
  const [balance, setBalance] = useState(mockKpiData.accountBalance);
  const [activity, setActivity] = useState(mockAccountActivity);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const account = await getAccount();
        if (account) {
          if (account.profile) {
            setFreelancerProfile({
              ...mockFreelancerProfile,
              ...account.profile,
            });
          }
          if (
            typeof account.balance === "number" ||
            typeof account.accountBalance === "number"
          ) {
            setBalance(
              account.balance ?? account.accountBalance ?? mockKpiData.accountBalance
            );
          }
        }

        // Optionally reuse transactions as recent activity if backend
        // doesn't expose a dedicated account activity endpoint yet.
        const txData = await getTransactions();
        const items = (txData as any)?.items || txData || [];
        if (Array.isArray(items) && items.length > 0) {
          setActivity(
            items.slice(0, 5).map((t: any, idx: number) => ({
              id: t.id ?? `a-${idx}`,
              date: t.date,
              description: t.description,
              amount: t.amount,
              type: t.type === "income" ? "credit" : "debit",
              balance: balance,
            }))
          );
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load account data.");
      } finally {
        setLoading(false);
      }
    };

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="mb-1">Business Account</h1>
        <p className="text-sm text-muted-foreground">
          Your premium business banking at a glance.
        </p>
        {loading && (
          <p className="text-xs text-muted-foreground mt-1">
            Loading account data…
          </p>
        )}
        {error && (
          <p className="text-xs text-destructive mt-1">{error}</p>
        )}
      </div>

      {/* Account Summary */}
      <div className="ledger-card">
        <div className="flex items-center justify-between mb-6">
          <h2>Account Summary</h2>
          {freelancerProfile.kycVerified && (
            <span className="flex items-center gap-1.5 text-xs font-medium text-success bg-success/10 px-2.5 py-1 rounded-full">
              <ShieldCheck className="h-3.5 w-3.5" />
              KYC Verified
            </span>
          )}
        </div>

        <div className="mb-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            Available Balance
          </p>
          <p className="text-3xl font-semibold tracking-tight">
            {fmt(balance)}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="space-y-1">
            <p className="text-muted-foreground">Account Holder</p>
            <p className="font-medium">{freelancerProfile.accountHolder}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">IBAN</p>
            <div className="flex items-center gap-2">
              <p className="font-medium text-xs">{freelancerProfile.iban}</p>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => copyToClipboard(freelancerProfile.iban)}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">BIC</p>
            <div className="flex items-center gap-2">
              <p className="font-medium">{freelancerProfile.bic}</p>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => copyToClipboard(freelancerProfile.bic)}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="ledger-card p-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2>Recent Activity</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left font-medium text-muted-foreground px-5 py-3">
                Date
              </th>
              <th className="text-left font-medium text-muted-foreground px-5 py-3">
                Description
              </th>
              <th className="text-right font-medium text-muted-foreground px-5 py-3">
                Amount
              </th>
              <th className="text-right font-medium text-muted-foreground px-5 py-3 hidden sm:table-cell">
                Balance
              </th>
            </tr>
          </thead>
          <tbody>
            {activity.map((a) => (
              <tr
                key={a.id}
                className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
              >
                <td className="px-5 py-3.5 text-muted-foreground">{a.date}</td>
                <td className="px-5 py-3.5 font-medium">{a.description}</td>
                <td
                  className={`px-5 py-3.5 text-right font-semibold ${
                    a.type === "credit" ? "text-success" : ""
                  }`}
                >
                  {a.type === "credit" ? "+" : ""}
                  {fmt(a.amount)}
                </td>
                <td className="px-5 py-3.5 text-right text-muted-foreground hidden sm:table-cell">
                  {fmt(a.balance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
