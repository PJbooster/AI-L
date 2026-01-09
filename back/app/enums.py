import enum


class FinancingType(str, enum.Enum):
    STOCK = "stock"
    CRYPTO = "crypto"
    OTHER = "other"


class Classifier(str, enum.Enum):
    STOCK = "RandomForestClassifier"
    CRYPTO = "XGBClassifier"


class TickerRegion(str, enum.Enum):
    EUROPE = "Europe"
    POLAND = "Poland"
