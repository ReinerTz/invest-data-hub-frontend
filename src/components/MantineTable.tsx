import { useEffect, useMemo, useState } from "react";
import { Stock } from "../types/Stock";
import { fetchLatestStocks } from "../services/api";
import {
  MantineReactTable,
  MRT_ColumnDef,
  useMantineReactTable,
} from "mantine-react-table";

const MantineTable: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);

  useEffect(() => {
    const getStocks = async () => {
      const data = await fetchLatestStocks();

      setStocks(data);
    };

    getStocks();
  }, []);

  const columns = useMemo<MRT_ColumnDef<Stock>[]>(
    () => [
      {
        accessorKey: "ticker",
        header: "Ticker",
      },
      {
        accessorKey: "quote",
        header: "Preço",
      },
      {
        accessorKey: "pl",
        header: "P/L",
      },
      {
        accessorKey: "pvp",
        header: "P/VP",
      },
      {
        accessorKey: "psr",
        header: "P/SR",
      },
      {
        accessorKey: "dividendYield",
        header: "Dividend Yield",
      },
      {
        accessorKey: "priceToAsset",
        header: "Preço/Ativo",
      },
      {
        accessorKey: "priceToWorkingCapital",
        header: "Preço/Capital de Giro",
      },
      {
        accessorKey: "priceToEbit",
        header: "Preço/EBIT",
      },
      {
        accessorKey: "priceToCurrentAsset",
        header: "Preço/Ativo Circulante",
      },
      {
        accessorKey: "evToEbit",
        header: "EV/EBIT",
      },
      {
        accessorKey: "evToEbitda",
        header: "EV/EBITDA",
      },
      {
        accessorKey: "ebitMargin",
        header: "Margem EBIT",
      },
      {
        accessorKey: "netMargin",
        header: "Margem Líquida",
      },
      {
        accessorKey: "currentLiquidity",
        header: "Liquidez Corrente",
      },
      {
        accessorKey: "roic",
        header: "ROIC",
      },
      {
        accessorKey: "roe",
        header: "ROE",
      },
      {
        accessorKey: "liquidityTwoMonths",
        header: "Liquidez 2 Meses",
      },
      {
        accessorKey: "netWorth",
        header: "Patrimônio Líquido",
      },
      {
        accessorKey: "debtToEquity",
        header: "Dívida/Patrimônio",
      },
      {
        accessorKey: "growthRateFiveYears",
        header: "Taxa de Crescimento 5 Anos",
      },
    ],
    []
  );

  const table = useMantineReactTable<Stock>({
    columns,
    data: stocks, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return <MantineReactTable table={table} />;
};

export default MantineTable;
