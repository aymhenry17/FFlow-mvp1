import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { suggestedPrompts } from "@/data/mockData";
import { askAssistant } from "@/services/api";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const mockResponses: Record<string, string> = {
  "Summarize my spending this month":
    "This month you've spent €3,870.25 across software (€79.99), workspace (€45), travel (€87.50), tax provisions (€1,200), and insurance (€125). Your spending is down 4% compared to last month — a healthy trend.",
  "Which invoices are overdue?":
    "You have 2 overdue invoices: INV-2026-010 from Vertex Labs (€3,200, due Mar 15) and INV-2026-014 from Meridian Labs (€2,100, due Mar 19). Total overdue: €5,300. I'd recommend sending gentle reminders.",
  "What should I follow up on this week?":
    "Three things to consider: (1) Follow up on 2 overdue invoices totaling €5,300, (2) Review the draft invoice for Nova Finance (€6,200), and (3) Your quarterly tax provision was processed — verify it matches your records.",
  "How is my cashflow trending?":
    "Your cashflow has been positive for 6 consecutive months. March is your strongest month yet with €12,400 in income against €3,870 in expenses. Net cashflow: +€8,530. You're building a healthy runway.",
};

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello Alex. I'm your financial copilot. Ask me anything about your business finances, or choose a suggestion below.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const data = await askAssistant(text);
      const reply =
        (data as any)?.reply ||
        (data as any)?.message ||
        (data as any)?.content ||
        mockResponses[text] ||
        "I've analyzed your data. Everything looks in order today. Is there something specific you'd like to explore?";
      const assistantMsg: Message = { role: "assistant", content: reply };
      setMessages((m) => [...m, assistantMsg]);
    } catch (err) {
      console.error(err);
      setError("The assistant is currently unavailable. Please try again.");
      const fallback: Message = {
        role: "assistant",
        content:
          mockResponses[text] ||
          "I'm having trouble reaching the server right now, but from your current snapshot everything seems in order.",
      };
      setMessages((m) => [...m, fallback]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)] animate-fade-in">
      <div className="mb-6">
        <h1 className="mb-1">AI Assistant</h1>
        <p className="text-sm text-muted-foreground">
          Need help understanding your cashflow?
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto space-y-4 mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <p className="text-xs text-muted-foreground mb-2">
          Thinking with your financial data…
        </p>
      )}
      {error && (
        <p className="text-xs text-destructive mb-2">{error}</p>
      )}

      {/* Suggested Prompts */}
      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestedPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => sendMessage(prompt)}
              className="text-xs px-3 py-1.5 rounded-full border border-border bg-card text-muted-foreground hover:bg-muted transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
        className="flex gap-2"
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your finances..."
          className="h-11"
        />
        <Button type="submit" size="icon" className="h-11 w-11 shrink-0">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
