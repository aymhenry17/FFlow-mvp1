import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { transactions as mockTransactions } from "@/data/mockData";
import { getTransactions } from "@/services/api";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-EU", { style: "currency", currency: "EUR" }).format(n);

type Filter = "all" | "income" | "expense";

export default function Transactions() {
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  const [items, setItems] = useState(mockTransactions);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getTransactions();
        const list = (data as any)?.items || data || [];
        if (Array.isArray(list) && list.length > 0) {
          setItems(
            list.map((t: any) => ({
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
        setError("Failed to load transactions.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const filtered = items.filter((t) => {
    if (filter === "income" && t.type !== "income") return false;
    if (filter === "expense" && t.type !== "expense") return false;
    if (search && !t.description.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="mb-1">Transactions</h1>
        <p className="text-sm text-muted-foreground">
          Track every movement of money in your business.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10"
          />
        </div>
        <div className="flex gap-1">
          {(["all", "income", "expense"] as Filter[]).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter(f)}
              className="capitalize"
            >
              {f}
            </Button>
          ))}
        </div>
      </div>

      <div className="ledger-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left font-medium text-muted-foreground px-5 py-3">
                  Date
                </th>
                <th className="text-left font-medium text-muted-foreground px-5 py-3">
                  Description
                </th>
                <th className="text-left font-medium text-muted-foreground px-5 py-3 hidden sm:table-cell">
                  Category
                </th>
                <th className="text-right font-medium text-muted-foreground px-5 py-3">
                  Amount
                </th>
                <th className="text-right font-medium text-muted-foreground px-5 py-3 hidden sm:table-cell">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-4 text-sm text-muted-foreground text-center"
                  >
                    Loading transactions…
                  </td>
                </tr>
              )}
              {error && !loading && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-4 text-sm text-destructive text-center"
                  >
                    {error}
                  </td>
                </tr>
              )}
              {filtered.map((t) => (
                <tr
                  key={t.id}
                  className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors duration-150"
                >
                  <td className="px-5 py-3.5 text-muted-foreground">{t.date}</td>
                  <td className="px-5 py-3.5 font-medium">{t.description}</td>
                  <td className="px-5 py-3.5 text-muted-foreground hidden sm:table-cell">
                    {t.category}
                  </td>
                  <td
                    className={`px-5 py-3.5 text-right font-semibold ${
                      t.type === "income" ? "text-success" : ""
                    }`}
                  >
                    {t.type === "income" ? "+" : ""}
                    {fmt(t.amount)}
                  </td>
                  <td className="px-5 py-3.5 text-right hidden sm:table-cell">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        t.status === "completed"
                          ? "bg-muted text-muted-foreground"
                          : "status-overdue"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">
            No transactions found.
          </div>
        )}
      </div>
    </div>
  );
}
