from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI, status
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.prompts.generate_tickers import generate_tickers
from app.database import engine, get_db
from app.models import AIModel
from app.schemas import AIModelCreate

from .routes import predictions


@asynccontextmanager
async def lifespan(app: FastAPI):
    if settings.app_env == "dev":
        print("env: dev")
        # Check db connection:
        try:
            async with engine.begin() as conn:
                await conn.execute(text("SELECT 1"))
            print("Database connection successful", flush=True)
        except Exception as e:
            print(f"Database connection failed: {e}")
    yield


app = FastAPI(title="Stock Prediction API", lifespan=lifespan)
app.include_router(predictions.router)


@app.get("/")
async def home():
    return {"message": "Hello Financial API"}


@app.post("/model", status_code=status.HTTP_201_CREATED)
async def create_model(model_data: AIModelCreate, db: AsyncSession = Depends(get_db)):
    new_model = AIModel.from_schema(model_data)
    print(type(new_model))

    db.add(new_model)
    await db.commit()
    await db.refresh(new_model)

    return {
        "status": "success",
        "data": {"id": new_model.id, "name": new_model.model_name},
    }


@app.get("/tickers")
def get_tickers():
    tickers = generate_tickers()
    return {"response": tickers}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
