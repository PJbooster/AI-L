from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
import os

app = FastAPI(title="Stock Prediction API", description="API do przewidywania ruchów Allegro (ALE.WA)")

@app.get("/")
def home():
    return {"message": "System prognozowania giełdowego online. Wejdź na /docs po dokumentację."}