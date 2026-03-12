const API_BASE =
  (import.meta as any).env?.VITE_API_URL || "http://127.0.0.1:8000/api/v1";

export async function getDashboard() {
  const res = await fetch(`${API_BASE}/dashboard`);
  if (!res.ok) {
    throw new Error("API request failed");
  }
  const json = await res.json();
  return json.data;
}

export async function getTransactions() {
  const res = await fetch(`${API_BASE}/transactions`);
  if (!res.ok) {
    throw new Error("API request failed");
  }
  const json = await res.json();
  return json.data;
}

export async function getInvoices() {
  const res = await fetch(`${API_BASE}/invoices`);
  if (!res.ok) {
    throw new Error("API request failed");
  }
  const json = await res.json();
  return json.data;
}

export async function getAccount() {
  const res = await fetch(`${API_BASE}/account`);
  if (!res.ok) {
    throw new Error("API request failed");
  }
  const json = await res.json();
  return json.data;
}

export async function askAssistant(message: string, page?: string) {
  const res = await fetch(`${API_BASE}/assistant/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      page
        ? {
            message,
            page,
          }
        : { message }
    ),
  });
  if (!res.ok) {
    throw new Error("API request failed");
  }

  const json = await res.json();
  return json.data;
}