from sqlalchemy import Column, Date, Enum, Integer, String

from app.database import Base
from app.enums import Classifier, FinancingType
from app.schemas import AIModelCreate


class AIModel(Base):
    __tablename__ = "ai_models"
    id = Column(Integer, primary_key=True)
    model_name = Column(String)
    type = Column(Enum(FinancingType), nullable=False, default=FinancingType.OTHER)
    description = Column(String)
    classifier = Column(Enum(Classifier), nullable=True)
    dataset_ticker = Column(String)  # oneToONE
    start_date = Column(Date)
    end_date = Column(Date)

    @classmethod
    def from_schema(cls, schema: AIModelCreate):
        return cls(**schema.model_dump())
