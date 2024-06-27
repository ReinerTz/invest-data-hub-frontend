import { useState } from "react";
import { Stock } from "../types/Stock";

interface Column {
  key: keyof Stock;
  header: string;
}

interface StockTableHeaderFilterProps {
  columns: Column[];
}

const StockTableHeaderFilter: React.FC<StockTableHeaderFilterProps> = ({
  columns,
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

  return (
    <div className="flex flex-wrap mb-4">
      {columns.map((column) => (
        <label key={column.key} className="inline-flex items-center mr-2 mb-2">
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
  );
};

export default StockTableHeaderFilter;
