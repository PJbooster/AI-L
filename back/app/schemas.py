from datetime import date
from typing import Optional

from pydantic import BaseModel

from app.enums import Classifier, FinancingType


class TrainRequest(BaseModel):
    ticker: str
    start_date: str


class AIModelCreate(BaseModel):
    model_name: str
    type: FinancingType
    description: Optional[str] = None
    classifier: Optional[Classifier] = None
    dataset_ticker: str
    start_date: date
    end_date: date

    class Config:
        from_attributes = True
