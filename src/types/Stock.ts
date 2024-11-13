export type Stock = {
  id: string;
  ticker: string;
  quote: number;
  pl: number;
  pvp: number;
  psr: number;
  dividendYield: number;
  priceToAsset: number;
  priceToWorkingCapital: number;
  priceToEbit: number;
  priceToCurrentAsset: number;
  evToEbit: number;
  evToEbitda: number;
  ebitMargin: number;
  netMargin: number;
  currentLiquidity: number;
  roic: number;
  roe: number;
  liquidityTwoMonths: number;
  netWorth: number;
  debtToEquity: number;
  growthRateFiveYears: number;
};

export interface StockFilters {
  tickers?: string[];
  quote?: { min?: number; max?: number };
  pl?: { min?: number; max?: number };
  pvp?: { min?: number; max?: number };
  psr?: { min?: number; max?: number };
  dividendYield?: { min?: number; max?: number };
  priceToAsset?: { min?: number; max?: number };
  priceToWorkingCapital?: { min?: number; max?: number };
  priceToEbit?: { min?: number; max?: number };
  priceToCurrentAsset?: { min?: number; max?: number };
  evToEbit?: { min?: number; max?: number };
  evToEbitda?: { min?: number; max?: number };
  ebitMargin?: { min?: number; max?: number };
  netMargin?: { min?: number; max?: number };
  currentLiquidity?: { min?: number; max?: number };
  roic?: { min?: number; max?: number };
  roe?: { min?: number; max?: number };
  liquidityTwoMonths?: { min?: number; max?: number };
  netWorth?: { min?: number; max?: number };
  debtToEquity?: { min?: number; max?: number };
  growthRateFiveYears?: { min?: number; max?: number };
}
