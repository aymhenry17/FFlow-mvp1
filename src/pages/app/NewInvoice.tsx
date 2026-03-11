import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function NewInvoice() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    clientName: "",
    clientEmail: "",
    invoiceNumber: "INV-2026-015",
    issueDate: "2026-03-10",
    dueDate: "2026-04-09",
    amount: "",
    vat: "",
    description: "",
  });

  const update = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSaveDraft = () => {
    toast.success("Invoice saved as draft");
    navigate("/app/invoices");
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Invoice created successfully");
    navigate("/app/invoices");
  };

  return (
    <div className="max-w-2xl animate-fade-in">
      <div className="mb-8">
        <h1 className="mb-1">New Invoice</h1>
        <p className="text-sm text-muted-foreground">
          Fill in the details to create a professional invoice.
        </p>
      </div>

      <form onSubmit={handleCreate} className="space-y-8">
        {/* Client */}
        <div className="ledger-card space-y-4">
          <h3>Client Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client name</Label>
              <Input
                id="clientName"
                value={form.clientName}
                onChange={(e) => update("clientName", e.target.value)}
                placeholder="Acme Corp"
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientEmail">Client email</Label>
              <Input
                id="clientEmail"
                type="email"
                value={form.clientEmail}
                onChange={(e) => update("clientEmail", e.target.value)}
                placeholder="billing@acme.com"
                className="h-10"
              />
            </div>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="ledger-card space-y-4">
          <h3>Invoice Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="invoiceNumber">Invoice number</Label>
              <Input
                id="invoiceNumber"
                value={form.invoiceNumber}
                onChange={(e) => update("invoiceNumber", e.target.value)}
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="issueDate">Issue date</Label>
              <Input
                id="issueDate"
                type="date"
                value={form.issueDate}
                onChange={(e) => update("issueDate", e.target.value)}
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due date</Label>
              <Input
                id="dueDate"
                type="date"
                value={form.dueDate}
                onChange={(e) => update("dueDate", e.target.value)}
                className="h-10"
              />
            </div>
          </div>
        </div>

        {/* Amount */}
        <div className="ledger-card space-y-4">
          <h3>Pricing</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (HT)</Label>
              <Input
                id="amount"
                type="number"
                value={form.amount}
                onChange={(e) => update("amount", e.target.value)}
                placeholder="0.00"
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vat">VAT</Label>
              <Input
                id="vat"
                type="number"
                value={form.vat}
                onChange={(e) => update("vat", e.target.value)}
                placeholder="0.00"
                className="h-10"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="ledger-card space-y-4">
          <h3>Description</h3>
          <div className="space-y-2">
            <Label htmlFor="description">Service description</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Describe the work delivered..."
              rows={4}
            />
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={handleSaveDraft}>
            Save draft
          </Button>
          <Button type="submit">Create invoice</Button>
        </div>
      </form>
    </div>
  );
}
