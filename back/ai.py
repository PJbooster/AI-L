import yfinance as yf
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# 1. Pobieranie danych
df = yf.download("ALE.WA", start="2022-01-01")

# 2. Feature Engineering (Inżynieria cech)
df['MA20'] = df['Close'].rolling(window=20).mean()
df['MA50'] = df['Close'].rolling(window=50).mean()
df['Return'] = df['Close'].pct_change()
# Target: 1 jeśli jutro cena wzrośnie, 0 jeśli spadnie
df['Target'] = (df['Close'].shift(-1) > df['Close']).astype(int)

# Czyszczenie danych z wartości pustych (NaN)
df = df.dropna()

# 3. Podział na Cechy (X) i Cel (y)
X = df[['Close', 'MA20', 'MA50', 'Return']]
y = df['Target']

# Podział na zbiór treningowy (do nauki) i testowy (do sprawdzenia)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 4. TRENOWANIE MODELU (Nasz "student" się uczy)
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 5. SPRAWDZENIE SKUTECZNOŚCI
predictions = model.predict(X_test)
accuracy = accuracy_score(y_test, predictions)

print(f"Skuteczność modelu: {accuracy:.2%}")

# 6. PROGNOZA NA JUTRO
last_data = X.tail(1)
prediction_tomorrow = model.predict(last_data)
print(f"Prognoza na kolejną sesję: {'WZROST' if prediction_tomorrow[0] == 1 else 'SPADEK'}")