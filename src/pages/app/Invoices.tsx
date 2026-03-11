import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { invoices as mockInvoices } from "@/data/mockData";
import { getInvoices } from "@/services/api";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-EU", { style: "currency", currency: "EUR" }).format(n);

type StatusFilter = "all" | "draft" | "sent" | "paid" | "overdue";

export default function Invoices() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<StatusFilter>("all");

  const [items, setItems] = useState(mockInvoices);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getInvoices();
        const list = (data as any)?.items || data || [];
        if (Array.isArray(list) && list.length > 0) {
          setItems(list as any);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load invoices.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const filtered = items.filter(
    (inv) => filter === "all" || inv.status === filter
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-1">Invoices</h1>
          <p className="text-sm text-muted-foreground">
            Create, track, and send invoices with confidence.
          </p>
        </div>
        <Button onClick={() => navigate("/app/invoices/new")} className="gap-2">
          <Plus className="h-4 w-4" />
          New Invoice
        </Button>
      </div>

      <div className="flex gap-1 flex-wrap">
        {(["all", "draft", "sent", "paid", "overdue"] as StatusFilter[]).map(
          (f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter(f)}
              className="capitalize"
            >
              {f}
            </Button>
          )
        )}
      </div>

      <div className="ledger-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left font-medium text-muted-foreground px-5 py-3">
                  Invoice
                </th>
                <th className="text-left font-medium text-muted-foreground px-5 py-3">
                  Client
                </th>
                <th className="text-left font-medium text-muted-foreground px-5 py-3 hidden md:table-cell">
                  Issue Date
                </th>
                <th className="text-left font-medium text-muted-foreground px-5 py-3 hidden md:table-cell">
                  Due Date
                </th>
                <th className="text-right font-medium text-muted-foreground px-5 py-3">
                  Amount
                </th>
                <th className="text-right font-medium text-muted-foreground px-5 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-4 text-sm text-muted-foreground text-center"
                  >
                    Loading invoices…
                  </td>
                </tr>
              )}
              {error && !loading && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-4 text-sm text-destructive text-center"
                  >
                    {error}
                  </td>
                </tr>
              )}
              {filtered.map((inv) => (
                <tr
                  key={inv.id}
                  className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors duration-150 cursor-pointer"
                  onClick={() => navigate(`/app/invoices/${inv.id}`)}
                >
                  <td className="px-5 py-3.5 font-medium">
                    {inv.invoiceNumber}
                  </td>
                  <td className="px-5 py-3.5">{inv.clientName}</td>
                  <td className="px-5 py-3.5 text-muted-foreground hidden md:table-cell">
                    {inv.issueDate}
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground hidden md:table-cell">
                    {inv.dueDate}
                  </td>
                  <td className="px-5 py-3.5 text-right font-semibold">
                    {fmt(inv.amount)}
                  </td>
                  <td className="px-5 py-3.5 text-right">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
