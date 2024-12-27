from fastapi import FastAPI
from routers import orders, sales

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Welcome to the Sales Project API"}

# Include routers
app.include_router(orders.router)
app.include_router(sales.router)
