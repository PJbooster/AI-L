from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.prompts.generate_tickers import generate_tickers

from .database import get_db
from .routes import predictions

app = FastAPI(title="Stock Prediction API")
app.include_router(predictions.router)


@app.get("/")
async def home(db: AsyncSession = Depends(get_db)):
    try:
        # Wykonanie najprostszego zapytania
        await db.execute(text("SELECT 1"))
        return {"status": "online", "database": "connected"}
    except Exception as e:
        raise HTTPException(
            status_code=503, detail=f"Baza danych nie odpowiada: {str(e)}"
        )

    return {"message": "Hello Financial API"}


@app.get("/tickers")
def get_tickers():
    tickers = generate_tickers()
    return {"response": tickers}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
