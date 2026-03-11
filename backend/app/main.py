from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import dashboard, transactions, invoices, account, assistant

app = FastAPI(title="LedgerFlow API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboard.router, prefix="/api/v1/dashboard", tags=["Dashboard"])
app.include_router(transactions.router, prefix="/api/v1/transactions", tags=["Transactions"])
app.include_router(invoices.router, prefix="/api/v1/invoices", tags=["Invoices"])
app.include_router(account.router, prefix="/api/v1/account", tags=["Account"])
app.include_router(assistant.router, prefix="/api/v1/assistant", tags=["Assistant"])


@app.get("/")
def root():
    return {"success": True, "data": {"message": "LedgerFlow API running"}}