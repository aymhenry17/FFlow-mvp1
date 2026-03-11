from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_dashboard():
    return {
        "success": True,
        "data": {
            "kpis": {
                "balance": 24830.50,
                "monthly_income": 12400,
                "monthly_expenses": 3870,
                "unpaid_invoices": 4
            }
        }
    }