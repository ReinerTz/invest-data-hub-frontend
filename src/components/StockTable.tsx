// src/components/StockTable.tsx
import React, { useState } from "react";
import { Stock } from "../types/Stock";

interface Column {
  key: keyof Stock;
  header: string;
}

interface StockTableProps {
  stocks: Stock[];
}

const columns: Column[] = [
  { key: "ticker", header: "Ticker" },
  { key: "quote", header: "Preço" },
  { key: "pl", header: "P/L" },
  { key: "pvp", header: "P/VP" },
  { key: "psr", header: "PSR" },
  { key: "dividendYield", header: "Dividend Yield" },
  { key: "priceToAsset", header: "P/Ativo" },
  { key: "priceToWorkingCapital", header: "P/Cap. Giro" },
  { key: "priceToEbit", header: "P/EBIT" },
  { key: "priceToCurrentAsset", header: "P/Ativo Circ." },
  { key: "evToEbit", header: "EV/EBIT" },
  { key: "evToEbitda", header: "EV/EBITDA" },
  { key: "ebitMargin", header: "Margem EBIT" },
  { key: "netMargin", header: "Margem Líquida" },
  { key: "currentLiquidity", header: "Liq. Corrente" },
  { key: "roic", header: "ROIC" },
  { key: "roe", header: "ROE" },
  { key: "liquidityTwoMonths", header: "Liquidez 2 Meses" },
  { key: "netWorth", header: "Patrimônio Líq." },
  { key: "debtToEquity", header: "Dív./Patrimônio" },
  { key: "growthRateFiveYears", header: "Cresc. 5 Anos" },
];

const StockTable: React.FC<StockTableProps> = ({ stocks }) => {
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
    columns.reduce((acc, column) => {
      acc[column.key] = true; // Inicialmente, todas as colunas são visíveis
      return acc;
    }, {} as Record<string, boolean>)
  );

  // Função para alternar a visibilidade da coluna
  const toggleColumnVisibility = (key: string) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const [sortConfig, setSortConfig] = useState<{
    key: keyof Stock | null;
    direction: "ascending" | "descending" | null;
  }>({ key: null, direction: null });

  const requestSort = (key: keyof Stock) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedStocks = React.useMemo(() => {
    const sortableItems = [...stocks]; // Faz uma cópia do array de stocks
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (sortConfig.key) {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
        }
        return 0;
      });
    }
    return sortableItems;
  }, [stocks, sortConfig]);

  return (
    <div>
      <div className="flex flex-wrap mb-4">
        {columns.map((column) => (
          <label
            key={column.key}
            className="inline-flex items-center mr-2 mb-2"
          >
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              checked={visibleColumns[column.key]}
              onChange={() => toggleColumnVisibility(column.key)}
            />
            <span className="ml-2 text-gray-700">{column.header}</span>
          </label>
        ))}
      </div>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Nº
              </th>
              {columns
                .filter((column) => visibleColumns[column.key])
                .map((column) => (
                  <th key={column.key} scope="col" className="py-3 px-6">
                    {column.header}
                    <button
                      onClick={() => requestSort(column.key)}
                      className="ml-2"
                    >
                      <span>⬆️⬇️</span>{" "}
                    </button>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {sortedStocks.map((stock, index) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={index}
              >
                <td className="py-4 px-6">{index + 1}</td>
                {columns
                  .filter((column) => visibleColumns[column.key])
                  .map((column) => (
                    <td key={column.key} className="py-4 px-6">
                      {stock[column.key]}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockTable;
