from fastapi import FastAPI

from .routes import predictions

app = FastAPI(title="Stock Prediction API")
app.include_router(predictions.router)


@app.get("/")
def home():
    return {"message": "Hello Financial API"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
