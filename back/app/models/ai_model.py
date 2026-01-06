from back.app.enums import Classifier, FinancingType
from sqlalchemy import Column, Date, Enum, Integer, String

from app.database import Base


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
