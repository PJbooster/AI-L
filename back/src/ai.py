import yfinance as yf

def get_financial_data(ticker="ALE.WA"):
    df = yf.download(ticker, start="2022-01-01")