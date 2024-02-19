export interface Stock {
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
}
