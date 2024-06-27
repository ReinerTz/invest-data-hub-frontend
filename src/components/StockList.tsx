// src/components/StockList.tsx
import React, { useEffect, useState } from "react";
import { fetchLatestStocks } from "../services/api";
import { Stock } from "../types/Stock";
import StockTable from "./StockTable";
import { MultiValue } from "react-select";
import { StockTableOptions } from "./StockTableOptions";

const StockList: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [showFilter, setShowFilter] = useState<boolean>(false);
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

  useEffect(() => {
    const getStocks = async () => {
      const data = await fetchLatestStocks();

      setStocks(data);
    };

    getStocks();
  }, []);

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
  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <div className="p-1">
      <StockTableOptions
        options={tickerOptions}
        onTicketFilterChange={handleTickerChange}
        onShowFilter={handleShowFilter}
      />

      <StockTable
        onFilterChange={handleFilterChange}
        showFilter={showFilter}
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
              const { min, max } = filter as { min?: number; max?: number };
              // Verifica explicitamente se min e max são diferentes de undefined
              return (
                (min !== undefined ? value >= min : true) &&
                (max !== undefined ? value <= max : true)
              );
            }
            return true;
          });
        })}
      />
    </div>
  );
};

export default StockList;
