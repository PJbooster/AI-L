from fastapi import FastAPI

from app.core.prompts.generate_tickers import generate_tickers

from .routes import predictions

app = FastAPI(title="Stock Prediction API")
app.include_router(predictions.router)


@app.get("/")
async def home():
    return {"message": "Hello Financial API"}


@app.get("/tickers")
def get_tickers():
    tickers = generate_tickers()
    return {"response": tickers}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
