import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { freelancerProfile } from "@/data/mockData";
import { toast } from "sonner";

export default function Settings() {
  const [form, setForm] = useState({
    name: freelancerProfile.name,
    email: freelancerProfile.email,
    businessName: freelancerProfile.businessName,
    businessType: freelancerProfile.businessType,
    currency: freelancerProfile.currency,
  });

  const update = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Settings saved successfully");
  };

  return (
    <div className="max-w-2xl animate-fade-in">
      <div className="mb-8">
        <h1 className="mb-1">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your profile and business preferences.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <div className="ledger-card space-y-4">
          <h3>Personal Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="h-10"
              />
            </div>
          </div>
        </div>

        <div className="ledger-card space-y-4">
          <h3>Business Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business name</Label>
              <Input
                id="businessName"
                value={form.businessName}
                onChange={(e) => update("businessName", e.target.value)}
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessType">Business type</Label>
              <Input
                id="businessType"
                value={form.businessType}
                onChange={(e) => update("businessType", e.target.value)}
                className="h-10"
              />
            </div>
          </div>
        </div>

        <div className="ledger-card space-y-4">
          <h3>Preferences</h3>
          <div className="max-w-xs space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Input
              id="currency"
              value={form.currency}
              onChange={(e) => update("currency", e.target.value)}
              className="h-10"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Save changes</Button>
        </div>
      </form>
    </div>
  );
}
