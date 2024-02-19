// src/components/StockList.tsx
import React, { useEffect, useState } from "react";
import { fetchLatestStocks } from "../services/api";
import { Stock } from "../types/Stock";
import StockTable from "./StockTable";
import { FilterInput } from "./FilterInput";
import { TickerFilter } from "./TickerFilter";
import { MultiValue } from "react-select";

const StockList: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);

  useEffect(() => {
    const getStocks = async () => {
      const data = await fetchLatestStocks();
      console.log(data);
      setStocks(data);
    };

    getStocks();
  }, []);

  const [filters, setFilters] = useState<{
    tickers?: string[];
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
  }>({});

  const handleFilterChange = (
    field: string,
    range: { min?: number; max?: number }
  ) => {
    setFilters((prev) => ({ ...prev, [field]: range }));
  };

  interface Option {
    value: string;
    label: string;
  }

  const tickerOptions: Option[] = stocks.map((data) => ({
    value: data.ticker,
    label: data.ticker,
  }));

  const handleTickerChange = (selectedOptions: MultiValue<Option>) => {
    const selectedTickers = selectedOptions.map((option) => option.value);
    setFilters((prev) => ({ ...prev, tickers: selectedTickers }));
  };

  return (
    <div className="p-4">
      <div className="p-3">
        <TickerFilter options={tickerOptions} onChange={handleTickerChange} />
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <FilterInput
          label="P/L"
          onChange={(value) => handleFilterChange("pl", value)}
        />
        <FilterInput
          label="P/VP"
          onChange={(value) => handleFilterChange("pvp", value)}
        />
        <FilterInput
          label="PSR"
          onChange={(value) => handleFilterChange("psr", value)}
        />
        <FilterInput
          label="Dividend Yield"
          onChange={(value) => handleFilterChange("dividendYield", value)}
        />
        <FilterInput
          label="P/Ativo"
          onChange={(value) => handleFilterChange("priceToAsset", value)}
        />
        <FilterInput
          label="P/Cap. Giro"
          onChange={(value) =>
            handleFilterChange("priceToWorkingCapital", value)
          }
        />
        <FilterInput
          label="P/EBIT"
          onChange={(value) => handleFilterChange("priceToEbit", value)}
        />
        <FilterInput
          label="P/Ativo Circ."
          onChange={(value) => handleFilterChange("priceToCurrentAsset", value)}
        />
        <FilterInput
          label="EV/EBIT"
          onChange={(value) => handleFilterChange("evToEbit", value)}
        />
        <FilterInput
          label="EV/EBITDA"
          onChange={(value) => handleFilterChange("evToEbitda", value)}
        />
        <FilterInput
          label="Margem EBIT"
          onChange={(value) => handleFilterChange("ebitMargin", value)}
        />
        <FilterInput
          label="Margem Líquida"
          onChange={(value) => handleFilterChange("netMargin", value)}
        />
        <FilterInput
          label="Liq. Corrente"
          onChange={(value) => handleFilterChange("currentLiquidity", value)}
        />
        <FilterInput
          label="ROIC"
          onChange={(value) => handleFilterChange("roic", value)}
        />
        <FilterInput
          label="ROE"
          onChange={(value) => handleFilterChange("roe", value)}
        />
        <FilterInput
          label="Liquidez 2 Meses"
          onChange={(value) => handleFilterChange("liquidityTwoMonths", value)}
        />
        <FilterInput
          label="Patrimônio Líq."
          onChange={(value) => handleFilterChange("netWorth", value)}
        />
        <FilterInput
          label="Dív./Patrimônio"
          onChange={(value) => handleFilterChange("debtToEquity", value)}
        />
        <FilterInput
          label="Cresc. 5 Anos"
          onChange={(value) => handleFilterChange("growthRateFiveYears", value)}
        />
      </div>

      <StockTable
        stocks={stocks.filter((stock) => {
          // Verifica se a lista de tickers está definida e se o ticker atual está incluído na lista
          if (
            filters.tickers &&
            !filters.tickers.includes(stock.ticker) &&
            filters.tickers.length > 0
          ) {
            return false;
          }

          // Filtragem para outros campos
          return Object.entries(filters).every(([key, filter]) => {
            if (key === "tickers") return true; // Já tratamos a filtragem de tickers acima

            const value = stock[key as keyof Omit<Stock, "ticker" | "id">];
            if (typeof filter === "object" && filter !== null) {
              const { min, max } = filter as { min: number; max: number };
              return (!min || value >= min) && (!max || value <= max);
            }
            return true;
          });
        })}
      />
    </div>
  );
};

export default StockList;
