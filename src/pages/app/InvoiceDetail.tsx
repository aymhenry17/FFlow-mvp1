import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { invoices } from "@/data/mockData";
import { toast } from "sonner";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-EU", { style: "currency", currency: "EUR" }).format(n);

export default function InvoiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const invoice = invoices.find((inv) => inv.id === id);

  if (!invoice) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        Invoice not found.
      </div>
    );
  }

  const ttc = invoice.amount + invoice.vat;

  return (
    <div className="max-w-2xl animate-fade-in">
      <button
        onClick={() => navigate("/app/invoices")}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to invoices
      </button>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="mb-1">{invoice.invoiceNumber}</h1>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              invoice.status === "paid"
                ? "status-paid"
                : invoice.status === "sent"
                ? "status-sent"
                : invoice.status === "overdue"
                ? "status-overdue"
                : "status-draft"
            }`}
          >
            {invoice.status}
          </span>
        </div>
      </div>

      {/* Client Info */}
      <div className="ledger-card mb-6">
        <h3 className="mb-3">Client</h3>
        <p className="text-sm font-medium">{invoice.clientName}</p>
        <p className="text-sm text-muted-foreground">{invoice.clientEmail}</p>
      </div>

      {/* Details */}
      <div className="ledger-card mb-6 space-y-4">
        <h3>Details</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Issue Date</p>
            <p className="font-medium">{invoice.issueDate}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Due Date</p>
            <p className="font-medium">{invoice.dueDate}</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Description</p>
          <p className="text-sm font-medium">{invoice.description}</p>
        </div>
      </div>

      {/* Amount Breakdown */}
      <div className="ledger-card mb-8">
        <h3 className="mb-4">Amount</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal (HT)</span>
            <span className="font-medium">{fmt(invoice.amount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">VAT (20%)</span>
            <span className="font-medium">{fmt(invoice.vat)}</span>
          </div>
          <div className="border-t border-border pt-2 flex justify-between">
            <span className="font-semibold">Total (TTC)</span>
            <span className="font-semibold text-lg">{fmt(ttc)}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 flex-wrap">
        {invoice.status !== "paid" && (
          <Button
            onClick={() => toast.success("Invoice marked as paid")}
            className="gap-2"
          >
            <CheckCircle className="h-4 w-4" />
            Mark as paid
          </Button>
        )}
        <Button
          variant="outline"
          onClick={() => toast.success("PDF downloaded")}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.success("Invoice sent to client")}
          className="gap-2"
        >
          <Send className="h-4 w-4" />
          Send invoice
        </Button>
      </div>
    </div>
  );
}
