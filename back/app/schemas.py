from pydantic import BaseModel

class TrainRequest(BaseModel):
    ticker: str
    start_date: str