from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict, Any
from dotenv import load_dotenv
from pathlib import Path
import os

from openai import OpenAI

load_dotenv(Path(__file__).resolve().parents[2] / ".env")
print("OPENAI KEY FOUND:", bool(os.getenv("OPENAI_API_KEY")))
router = APIRouter()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    success: bool
    data: Dict[str, Any]


# Simple local financial snapshot used as context for the assistant.
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


SYSTEM_PROMPT = """
You are LedgerFlow, a financial copilot for a freelance professional.
You receive:
- A structured snapshot of the freelancer's current finances (balance, income, expenses, invoices, VAT estimate, recent transactions).
- A natural-language question from the user.

Your responsibilities:
- Explain the user's current financial situation clearly and calmly.
- Base every numeric statement strictly on the provided context. If something is not in the context, say that it is not available instead of guessing.
- When you give any estimate (for example VAT or runway), clearly label it as an estimate and explain the high-level logic in simple terms.
- Never give legal, tax, investment, or compliance advice. You may give practical guidance, but always suggest confirming critical decisions with an accountant or tax advisor.
- Be concise, professional, and product-like. Prefer 2–5 short paragraphs or bullet lists over long essays.
- Do not mention that you are using a language model or external APIs.

If the user's request cannot be fully answered from the context, say what you can infer and explicitly call out what would be needed to answer more precisely.
""".strip()


client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


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

    # De‑duplicate while preserving order
    seen = set()
    unique_intents: List[str] = []
    for it in intents:
        if it not in seen:
            seen.add(it)
            unique_intents.append(it)

    return unique_intents


def build_reply(intents: List[str]) -> Dict[str, Any]:
    c = CONTEXT
    parts: List[str] = []

    if "summary" in intents:
        parts.append(
            (
                f"Here's a quick snapshot of your freelance business. "
                f"Your current account balance is approximately €{c['balance']:,.2f}. "
                f"This month you've brought in about €{c['monthly_income']:,.2f} in income "
                f"against €{c['monthly_expenses']:,.2f} in operating expenses, which is a healthy margin."
            )
        )

    if "income" in intents:
        parts.append(
            (
                f"On the income side, you're tracking roughly €{c['monthly_income']:,.2f} this month. "
                "Most of this is driven by project work with key clients like Acme Corp and Luna Startups."
            )
        )

    if "expenses" in intents:
        parts.append(
            (
                f"Your core expenses for the month are about €{c['monthly_expenses']:,.2f}. "
                "This includes software subscriptions, workspace costs, travel, and your tax provisions."
            )
        )

    if "unpaid_invoices" in intents:
        parts.append(
            (
                f"You currently have {c['unpaid_invoices_count']} unpaid invoices, "
                f"totalling around €{c['unpaid_invoices_total']:,.2f}. "
                "These are still within their payment terms but worth keeping an eye on."
            )
        )

    if "overdue_invoices" in intents:
        parts.append(
            (
                f"There are {c['overdue_invoices_count']} overdue invoices, "
                f"with an outstanding balance of about €{c['overdue_invoices_total']:,.2f}. "
                "At this stage, a polite reminder email to each client would be appropriate."
            )
        )

    if "balance" in intents and "summary" not in intents:
        parts.append(
            (
                f"Your available balance is currently around €{c['balance']:,.2f}. "
                "Given your typical monthly expense level, this gives you several months of runway."
            )
        )

    if "vat" in intents:
        vat_estimate = c["monthly_income"] * c["vat_rate"]
        parts.append(
            (
                f"Based on your current monthly income of roughly €{c['monthly_income']:,.2f} "
                f"and a VAT rate of {int(c['vat_rate'] * 100)}%, your estimated VAT provision for the period "
                f"would be about €{vat_estimate:,.2f}. "
                "It's sensible to ring‑fence this amount so it doesn't get mixed with day‑to‑day spending."
            )
        )

    # Add a brief note on recency of activity.
    if "summary" in intents or "income" in intents or "expenses" in intents:
        recent = c["recent_transactions"][:3]
        if recent:
            tx_descriptions = ", ".join(
                f"{t['description']} ({'+' if t['amount'] > 0 else ''}€{t['amount']:,.2f})"
                for t in recent
            )
            parts.append(
                f"Recent activity includes: {tx_descriptions}. "
                "Together, these confirm that your pipeline and cash movements are active."
            )

    parts.append(
        "These figures are provided as a practical guide based on your current snapshot, "
        "not as formal accounting, legal, or tax advice. For compliance‑critical decisions, "
        "you should always confirm numbers with your accountant or tax advisor."
    )

    reply = " ".join(parts)

    suggested_questions: List[str] = []

    if "summary" in intents:
        suggested_questions.append("How much runway do I have at my current burn rate?")
        suggested_questions.append("Which clients account for most of my income?")

    if "income" in intents:
        suggested_questions.append("How does this month's income compare to last month?")

    if "expenses" in intents:
        suggested_questions.append("Which expense categories are growing the fastest?")

    if "unpaid_invoices" in intents or "overdue_invoices" in intents:
        suggested_questions.append("Which invoices should I follow up on first?")
        suggested_questions.append("Can you draft a polite reminder for an overdue invoice?")

    if "vat" in intents and "How should I set aside money for VAT each month?" not in suggested_questions:
        suggested_questions.append("How should I set aside money for VAT each month?")

    if not suggested_questions:
        suggested_questions.extend(
            [
                "Give me a high‑level summary of my current financial health.",
                "What should I pay attention to this week?",
            ]
        )

    return {
        "reply": reply,
        "suggested_questions": suggested_questions[:4],
    }


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


def call_openai_assistant(user_message: str, intents: List[str]) -> str:
    context_block = build_context_block()
    intents_text = ", ".join(intents) if intents else "summary"

    user_block = (
        f"User question: {user_message}\n"
        f"Detected intents (for your awareness): {intents_text}.\n"
        "Answer using only the financial context provided above."
    )

    response = client.responses.create(
        model="gpt-4.1-mini",
        input=[
            {
                "role": "system",
                "content": [
                    {
                        "type": "input_text",
                        "text": f"{SYSTEM_PROMPT}\n\nFinancial context:\n{context_block}",
                    }
                ],
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "input_text",
                        "text": user_block,
                    }
                ],
            },
        ],
    )

    reply_text = getattr(response, "output_text", None)
    if not reply_text:
        raise ValueError("No output_text returned from OpenAI response")

    return reply_text


@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest) -> ChatResponse:
    intents = detect_intents(request.message)

    try:
        reply = call_openai_assistant(request.message, intents)
        # Use local logic only for suggested follow-up questions.
        suggestions = build_reply(intents)["suggested_questions"]
        data = {
            "reply": reply,
            "suggested_questions": suggestions,
        }
    except Exception as e:
        fallback = build_reply(intents)
        data = {
            "reply": f"OPENAI ERROR: {str(e)}\n\n{fallback['reply']}",
            "suggested_questions": fallback["suggested_questions"],
        }

    return ChatResponse(
        success=True,
        data=data,
    )

