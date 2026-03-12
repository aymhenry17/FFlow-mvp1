from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict, Any


router = APIRouter()


class ChatRequest(BaseModel):
    message: str
    page: str | None = None


class ChatResponse(BaseModel):
    success: bool
    data: Dict[str, Any]


# Mock financial context for now
CONTEXT = {
    "balance": 24830.50,
    "monthly_income": 12400.00,
    "monthly_expenses": 3870.25,
    "unpaid_invoices_count": 4,
    "overdue_invoices_count": 2,
    "unpaid_invoices_total": 5300.00,
    "overdue_invoices_total": 5300.00,
    "recent_transactions": [
        {
            "date": "2026-03-09",
            "description": "Acme Corp — Brand Strategy",
            "amount": 4500,
            "type": "income",
        },
        {
            "date": "2026-03-08",
            "description": "Figma Pro Subscription",
            "amount": -15,
            "type": "expense",
        },
        {
            "date": "2026-03-07",
            "description": "WeWork Day Pass",
            "amount": -45,
            "type": "expense",
        },
        {
            "date": "2026-03-06",
            "description": "Luna Startups — UX Audit",
            "amount": 2800,
            "type": "income",
        },
    ],
    "recent_invoices": [
        {
            "invoice_number": "INV-2026-012",
            "client": "Acme Corp",
            "amount": 4500,
            "status": "sent",
            "due_date": "2026-03-31",
        },
        {
            "invoice_number": "INV-2026-011",
            "client": "Luna Startups",
            "amount": 2800,
            "status": "paid",
            "due_date": "2026-03-20",
        },
        {
            "invoice_number": "INV-2026-010",
            "client": "Vertex Labs",
            "amount": 3200,
            "status": "overdue",
            "due_date": "2026-03-15",
        },
    ],
    "vat_rate": 0.20,
}


def detect_intents(message: str) -> List[str]:
    text = message.lower()
    intents: List[str] = []

    if any(k in text for k in ["income", "earning", "revenue"]):
        intents.append("income")
    if any(k in text for k in ["expense", "spend", "spending", "costs"]):
        intents.append("expenses")
    if "unpaid" in text and "invoice" in text:
        intents.append("unpaid_invoices")
    if any(k in text for k in ["overdue", "late invoice", "late payment"]):
        intents.append("overdue_invoices")
    if any(k in text for k in ["balance", "cash", "cashflow", "cash flow", "cash position"]):
        intents.append("balance")
    if any(k in text for k in ["vat", "v.a.t", "tax", "provision"]):
        intents.append("vat")
    if any(k in text for k in ["summary", "overview", "health", "how am i doing"]):
        intents.append("summary")

    if not intents:
        intents.append("summary")

    seen = set()
    unique_intents: List[str] = []
    for intent in intents:
        if intent not in seen:
            seen.add(intent)
            unique_intents.append(intent)

    return unique_intents


def build_context_block() -> str:
    c = CONTEXT
    lines: List[str] = []

    lines.append(f"Current balance: €{c['balance']:,.2f}.")
    lines.append(
        f"Monthly income: €{c['monthly_income']:,.2f}; monthly expenses: €{c['monthly_expenses']:,.2f}."
    )
    lines.append(
        f"Unpaid invoices: {c['unpaid_invoices_count']} invoices totalling €{c['unpaid_invoices_total']:,.2f}."
    )
    lines.append(
        f"Overdue invoices: {c['overdue_invoices_count']} invoices totalling €{c['overdue_invoices_total']:,.2f}."
    )

    vat_estimate = c["monthly_income"] * c["vat_rate"]
    lines.append(
        f"Estimated VAT for current monthly income at {int(c['vat_rate'] * 100)}%: about €{vat_estimate:,.2f}."
    )

    if c["recent_transactions"]:
        tx_lines = []
        for t in c["recent_transactions"]:
            sign = "+" if t["amount"] > 0 else ""
            tx_lines.append(
                f"{t['date']}: {t['description']} ({sign}€{t['amount']:,.2f}, {t['type']})"
            )
        lines.append("Recent transactions: " + "; ".join(tx_lines) + ".")

    if c.get("recent_invoices"):
        inv_lines = []
        for inv in c["recent_invoices"]:
            inv_lines.append(
                f"{inv['invoice_number']} for {inv['client']} — €{inv['amount']:,.2f}, "
                f"status: {inv['status']}, due {inv['due_date']}"
            )
        lines.append("Recent invoices: " + "; ".join(inv_lines) + ".")

    return "\n".join(lines)


def build_suggested_questions(page: str | None) -> List[str]:
    """
    Return 4 page-specific suggested questions.
    Defaults to dashboard questions if page is missing or unknown.
    """
    normalized = (page or "dashboard").lower()

    if normalized == "transactions":
        return [
            "What are my biggest expenses this month?",
            "Where am I spending the most money?",
            "Are my expenses increasing?",
            "Show me unusual spending",
        ]

    if normalized == "invoices":
        return [
            "Which invoices are overdue?",
            "How much money is still unpaid?",
            "Which clients pay the slowest?",
            "Draft a reminder for an overdue invoice",
        ]

    if normalized == "account":
        return [
            "What is my current cash position?",
            "How long can my business run with this balance?",
            "Should I worry about cashflow this month?",
            "How much should I keep for taxes?",
        ]

    # Default: dashboard
    return [
        "Give me a summary of my financial health",
        "How much runway do I have at my current burn rate?",
        "What should I pay attention to this week?",
        "How much VAT should I set aside this month?",
    ]


def build_rule_based_reply(message: str, intents: List[str]) -> str:
    """
    Simple internal assistant that responds using only the mocked CONTEXT.
    No external AI or API calls – purely rule-based.
    """
    c = CONTEXT
    lines: List[str] = []

    # Always start with a short, product-like intro
    lines.append("Here’s a quick view of your finances based on your current LedgerFlow snapshot.")

    # Balance / cash position
    if "balance" in intents or "summary" in intents:
        runway_months = (
            c["balance"] / c["monthly_expenses"] if c["monthly_expenses"] > 0 else None
        )
        balance_line = f"Your current available balance is €{c['balance']:,.2f}."
        if runway_months is not None:
            balance_line += (
                f" At your current monthly expenses of €{c['monthly_expenses']:,.2f}, "
                f"that covers roughly {runway_months:.1f} months of run rate (estimate)."
            )
        lines.append(balance_line)

    # Income
    if "income" in intents or "summary" in intents:
        income_line = (
            f"This month you’ve booked about €{c['monthly_income']:,.2f} in income."
        )
        lines.append(income_line)

    # Expenses
    if "expenses" in intents or "summary" in intents:
        expense_ratio = (
            c["monthly_expenses"] / c["monthly_income"]
            if c["monthly_income"] > 0
            else None
        )
        expense_line = (
            f"Your monthly expenses are around €{c['monthly_expenses']:,.2f}."
        )
        if expense_ratio is not None:
            expense_line += (
                f" That’s about {expense_ratio*100:.1f}% of your recorded income."
            )
        lines.append(expense_line)

    # Unpaid & overdue invoices
    if "unpaid_invoices" in intents or "summary" in intents:
        lines.append(
            f"You have {c['unpaid_invoices_count']} unpaid invoices "
            f"totalling €{c['unpaid_invoices_total']:,.2f} waiting to be collected."
        )

    if "overdue_invoices" in intents or "summary" in intents:
        overdue_count = c["overdue_invoices_count"]
        overdue_total = c["overdue_invoices_total"]
        if overdue_count > 0:
            lines.append(
                f"{overdue_count} of those invoices are overdue, "
                f"for about €{overdue_total:,.2f} in late payments."
            )
        else:
            lines.append("You don’t have any overdue invoices in the current snapshot.")

    # VAT estimate
    if "vat" in intents or "summary" in intents:
        vat_estimate = c["monthly_income"] * c["vat_rate"]
        lines.append(
            "For VAT, based on your current month’s income "
            f"and a rate of {int(c['vat_rate'] * 100)}%, "
            f"you should expect roughly €{vat_estimate:,.2f} in VAT liability (estimate, not tax advice)."
        )

    # Recent activity – referenced but not over-detailed
    if "summary" in intents:
        if c["recent_transactions"]:
            last_tx = c["recent_transactions"][0]
            sign = "+" if last_tx["amount"] > 0 else ""
            lines.append(
                "Your latest transaction is "
                f"{last_tx['description']} on {last_tx['date']} "
                f"({sign}€{last_tx['amount']:,.2f}, {last_tx['type']})."
            )

    # Fallback note for any unsupported questions
    lines.append(
        "These insights are based only on the financial data currently available in LedgerFlow."
    )

    return " ".join(lines)


@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest) -> ChatResponse:
    intents = detect_intents(request.message)

    try:
        reply = build_rule_based_reply(request.message, intents)
        suggestions = build_suggested_questions(request.page)

        return ChatResponse(
            success=True,
            data={
                "reply": reply,
                "suggested_questions": suggestions,
            },
        )

    except Exception:
        return ChatResponse(
            success=False,
            data={
                "reply": "Something went wrong while generating your financial summary. Please try again in a moment.",
                "suggested_questions": [
                    "Give me a high-level summary of my financial health.",
                    "What should I pay attention to this week?",
                ],
            },
        )