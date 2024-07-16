import React, { useState } from "react";
import { Stock } from "../types/Stock";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa6";
import FilterInput from "./FilterInput";

enum EColumnType {
  CURRENCY = "currency",
  PERCENTAGE = "percentage",
}
interface Column {
  key: keyof Stock;
  header: string;
  type?: EColumnType;
}

interface StockTableProps {
  stocks: Stock[];
  onFilterChange: (
    field: string,
    range: { min?: number; max?: number }
  ) => void;
  showFilter: boolean;
  showMenu: boolean;
}

const columns: Column[] = [
  { key: "ticker", header: "Ticker" },
  { key: "quote", header: "Preço", type: EColumnType.CURRENCY },
  { key: "pl", header: "P/L" },
  { key: "pvp", header: "P/VP" },
  { key: "psr", header: "PSR" },
  {
    key: "dividendYield",
    header: "Dividend Yield",
    type: EColumnType.PERCENTAGE,
  },
  { key: "priceToAsset", header: "P/Ativo" },
  {
    key: "priceToWorkingCapital",
    header: "P/Cap. Giro",
  },
  { key: "priceToEbit", header: "P/EBIT" },
  {
    key: "priceToCurrentAsset",
    header: "P/Ativo Circ.",
  },
  { key: "evToEbit", header: "EV/EBIT" },
  { key: "evToEbitda", header: "EV/EBITDA" },
  { key: "ebitMargin", header: "Margem EBIT", type: EColumnType.PERCENTAGE },
  { key: "netMargin", header: "Margem Líquida", type: EColumnType.PERCENTAGE },
  {
    key: "currentLiquidity",
    header: "Liq. Corrente",
  },
  { key: "roic", header: "ROIC", type: EColumnType.PERCENTAGE },
  { key: "roe", header: "ROE", type: EColumnType.PERCENTAGE },
  {
    key: "liquidityTwoMonths",
    header: "Liquidez 2 Meses",
  },
  { key: "netWorth", header: "Patrimônio Líq.", type: EColumnType.CURRENCY },
  {
    key: "debtToEquity",
    header: "Dív./Patrimônio",
  },
  {
    key: "growthRateFiveYears",
    header: "Cresc. 5 Anos",
    type: EColumnType.PERCENTAGE,
  },
];

const StockTable: React.FC<StockTableProps> = ({
  stocks,
  onFilterChange,
  showFilter,
  showMenu,
}) => {
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
    columns.reduce((acc, column) => {
      acc[column.key] = true; // Inicialmente, todas as colunas são visíveis
      return acc;
    }, {} as Record<string, boolean>)
  );

  const toggleColumnVisibility = (key: string) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const [sortConfig, setSortConfig] = useState<{
    key: keyof Stock | null;
    direction: "ascending" | "descending" | null;
  }>({ key: null, direction: null });

  const requestSort = (key: keyof Stock) => {
    let direction: "ascending" | "descending" | null = "ascending";

    if (sortConfig.key === key) {
      if (sortConfig.direction === "ascending") {
        direction = "descending";
      }
      if (sortConfig.direction === "descending") {
        direction = null;
      }
    }

    setSortConfig({ key, direction });
  };

  function formatValue(value: string | number, type?: EColumnType) {
    const valueAsNumber = Number(value);
    if (type === EColumnType.CURRENCY) {
      return formatCurrency(valueAsNumber);
    } else if (type === EColumnType.PERCENTAGE) {
      return formatPercentage(valueAsNumber);
    }

    return value;
  }

  function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }

  // Formatação para valores percentuais
  function formatPercentage(value: number) {
    return `${value.toFixed(2)}%`; // Mantém duas casas decimais e adiciona o símbolo de porcentagem
  }

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
    <div className="relative">
      {showMenu && (
        <div className="checkbox-menu absolute  right-4 bg-white p-4 shadow-md z-50">
          {columns.map((column) => (
            <label key={column.key} className="flex items-center mb-2">
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
      )}

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border border-[#414141]">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-3 border">
                Nº
              </th>
              {columns
                .filter((column) => visibleColumns[column.key])
                .map((column) => (
                  <th
                    key={column.key}
                    scope="col"
                    className="px-6 text-white font-semibold border"
                  >
                    <div className="flex items-center">
                      {column.header}
                      <button
                        onClick={() => requestSort(column.key)}
                        className="ml-2 flex items-center w-10"
                      >
                        {sortConfig &&
                          (sortConfig.key === column.key ? (
                            sortConfig.direction === "ascending" ? (
                              <FaSortDown />
                            ) : sortConfig.direction === "descending" ? (
                              <FaSortUp />
                            ) : (
                              <FaSort />
                            )
                          ) : (
                            <FaSort />
                          ))}
                      </button>
                    </div>
                    {showFilter && column.key !== "ticker" && (
                      <div>
                        <FilterInput
                          onChange={(value) =>
                            onFilterChange(column.key, value)
                          }
                        />
                      </div>
                    )}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {sortedStocks.map((stock, index) => {
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={index}
                >
                  <td className="text-white text-center border">{index + 1}</td>
                  {columns
                    .filter((column) => visibleColumns[column.key])
                    .map((column) => {
                      const columnValue = formatValue(
                        stock[column.key],
                        column.type
                      );
                      return (
                        <td
                          key={column.key}
                          className={`${
                            (stock[column.key] as number) < 0
                              ? "text-red-500"
                              : "text-white"
                          }  border-l border-white text-end p-1`}
                        >
                          {columnValue}
                        </td>
                      );
                    })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockTable;
