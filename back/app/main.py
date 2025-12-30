import os
import uuid

import joblib
import yfinance as yf
from fastapi import FastAPI, HTTPException

from app.schemas import TrainRequest
from src.financial import train_logic

app = FastAPI(title="Stock Prediction API")


@app.get("/")
def home():
    return {"message": "Hello Financial API"}


@app.post("/train")
def train_model(data: TrainRequest):
    try:
        model, acc = train_logic(data.ticker, data.start_date)
        model_id = f"{data.ticker}_{data.start_date}_{uuid.uuid4().hex[:8]}"
        file_path = os.path.join("models", f"{model_id}.pkl")
        joblib.dump(model, file_path)

        return {"model_id": model_id, "accuracy": round(acc, 3)}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/predict/{model_id}")
def predict(model_id: str, ticker: str = "ALE.WA"):
    file_path = os.path.join("models", f"{model_id}.pkl")

    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Model not found")

    model = joblib.load(file_path)

    df_recent = yf.download(ticker, period="60d")
    df_recent["MA20"] = df_recent["Close"].rolling(window=20).mean()
    df_recent["MA50"] = df_recent["Close"].rolling(window=50).mean()
    df_recent["Return"] = df_recent["Close"].pct_change()
    df_recent["Vol_Change"] = df_recent["Volume"].pct_change()

    features = df_recent[["Close", "MA20", "MA50", "Return", "Vol_Change"]].tail(1)

    prediction = model.predict(features)[0]
    prob_fall = model.predict_proba(features)[0][0]
    prob_rise = model.predict_proba(features)[0][1]

    return {
        "model_used": model_id,
        "prediction": int(prediction),
        "probability_rise": float(prob_rise),
        "probability_fall": float(prob_fall),
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
