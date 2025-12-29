import yfinance as yf
import pandas as pd
import numpy as np
from xgboost import XGBClassifier
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report, accuracy_score

def get_financial_data(ticker="ALE.WA", start='2022-01-01'):
    df = yf.download(ticker, start)
    
    # Feature Engineering
    df['MA20'] = df['Close'].rolling(window=20).mean()
    df['MA50'] = df['Close'].rolling(window=50).mean()
    df['Return'] = df['Close'].pct_change()
    df['Vol_Change'] = df['Volume'].pct_change()
    
    df['Target'] = (df['Close'].shift(-1) > df['Close']).astype(int)
    
    return df.dropna()

def train_logic(ticker, start_date):
    df = get_financial_data(ticker,start_date)

    X = df[['Close', 'MA20', 'MA50', 'Return', 'Vol_Change']]
    y = df['Target']


    split_index = int(len(df) * 0.8)
    X_train, X_test = X.iloc[:split_index], X.iloc[split_index:]
    y_train, y_test = y.iloc[:split_index], y.iloc[split_index:]


    pipeline = Pipeline([
        ('scaler', StandardScaler()),
        ('model', XGBClassifier(
            n_estimators=100, 
            learning_rate=0.05, 
            max_depth=5, 
            random_state=42,
            eval_metric='logloss'
        ))
    ])


    pipeline.fit(X_train, y_train)
    y_pred = pipeline.predict(X_test)

    return pipeline, accuracy_score(y_test, y_pred)