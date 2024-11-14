export const recommendedPortfolios = [
  {
    name: "GPT - Carteira Valor & Crescimento",
    filters: {
      pl: { min: 5, max: 12 },
      pvp: { min: 0.5, max: 1.2 },
      dividendYield: { min: 4 },
      roe: { min: 12 },
      debtToEquity: { max: 0.8 },
      netMargin: { min: 12 },
      currentLiquidity: { min: 1.5 },
    },
  },
  {
    name: "GPT - Dividendos",
    filters: {
      dividendYield: { min: 6 },
      pl: { min: 6, max: 15 },
      pvp: { min: 0.5, max: 1.5 },
      roe: { min: 12 },
      debtToEquity: { max: 0.8 },
      netMargin: { min: 10 },
      currentLiquidity: { min: 1.5 },
    },
  },
];
