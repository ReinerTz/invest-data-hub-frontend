export const recommendedPortfolios = [
  {
    name: "GPT - Foco em Dividendos - Dividend Yield",
    filters: {
      dividendYield: { min: 5, max: 10 },
      pl: { min: 8, max: 15 },
      pvp: { min: 0.8, max: 1.2 },
      debtToEquity: { max: 0.5 },
      netWorth: { min: 500000 },
    },
  },
  {
    name: "GPT - Potencial de Crescimento - Crescimento de 5 Anos",
    filters: {
      growthRateFiveYears: { min: 10 },
      roe: { min: 12 },
      roic: { min: 10 },
      pl: { min: 10, max: 18 },
      priceToEbit: { min: 5, max: 12 },
      netMargin: { min: 10 },
    },
  },
  {
    name: "GPT - Jogada de Valor - P/L e P/VPA Moderados",
    filters: {
      pl: { min: 7, max: 12 },
      pvp: { min: 0.7, max: 1.3 },
      priceToEbit: { min: 5, max: 10 },
      evToEbitda: { min: 5, max: 11 },
      debtToEquity: { max: 0.6 },
      currentLiquidity: { min: 1.5 },
    },
  },
  {
    name: "GPT - Renda Estável - Dividendos e Patrimônio Líquido",
    filters: {
      dividendYield: { min: 4 },
      netWorth: { min: 1000000 },
      priceToAsset: { min: 0.5, max: 1.5 },
      evToEbit: { min: 6, max: 12 },
      roe: { min: 10 },
      liquidityTwoMonths: { min: 200000 },
    },
  },
  {
    name: "GPT - Alta Liquidez e Margem de Lucro",
    filters: {
      currentLiquidity: { min: 2 },
      ebitMargin: { min: 15 },
      netMargin: { min: 12 },
      priceToWorkingCapital: { min: 0.8, max: 1.5 },
      debtToEquity: { max: 0.4 },
      roic: { min: 8 },
    },
  },
];
