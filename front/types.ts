export interface PredictionData {
  model_used: string;
  prediction: number;
  probability_rise: number;
  probability_fall: number;
}

export interface FinancialDataset {
  result: number;
  MA20: number;
  MA50: number;
}
