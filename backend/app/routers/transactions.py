from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def list_transactions():
    return {
        "success": True,
        "data": {
            "items": [
                {
                    "id": "txn_001",
                    "date": "2026-03-09",
                    "description": "Acme Corp payment",
                    "amount": 4500,
                    "type": "income"
                }
            ]
        }
    }