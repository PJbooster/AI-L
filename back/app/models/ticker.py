from sqlalchemy import JSON, Column, Enum, Integer, String

from app.database import Base
from app.enums import TickerRegion


class Ticker(Base):
    __tablename__ = "tickers"
    id = Column(Integer, primary_key=True)
    ticker_name = Column(
        Enum(TickerRegion), nullable=False, default=TickerRegion.EUROPE
    )
    data = Column(JSON)
    region = Column(String)
