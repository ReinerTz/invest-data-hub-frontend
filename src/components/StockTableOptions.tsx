import { FaAnchor, FaFilter } from "react-icons/fa6";
import { TickerFilter } from "./TickerFilter";
import { ActionMeta, MultiValue } from "react-select";
import { recommendedPortfolios } from "../util/utils";
import CreatableSelect from "react-select/creatable";

interface Option {
  value: string;
  label: string;
}

interface TickerFilterProps {
  options: Option[];
  onTicketFilterChange: (
    selectedOptions: MultiValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => void;
  onShowFilter: () => void;
  onShowColumns: () => void;
  onSelectPortfolio: (value: string) => void;
}

export const StockTableOptions: React.FC<TickerFilterProps> = ({
  options,
  onTicketFilterChange,
  onShowFilter,
  onShowColumns,
  onSelectPortfolio,
}) => {
  return (
    <div className="flex justify-end bg-slate-800 sm:rounded-lg">
      <div className="p-3">
        <CreatableSelect
          options={recommendedPortfolios.map((portfolio) => ({
            value: portfolio.name,
            label: portfolio.name,
          }))}
          placeholder="Carteira recomendada"
          onChange={(selectedOption) =>
            onSelectPortfolio(selectedOption?.value || "")
          }
          className="w-64"
          isClearable
        />
      </div>
      <div className="p-3 ">
        <TickerFilter options={options} onChange={onTicketFilterChange} />
      </div>
      <div className="p-3 ">
        <button title="Filtro" onClick={onShowFilter}>
          <FaFilter color="white" size={40} />
        </button>
      </div>
      <div className="p-3">
        <button title="Exibir/Esconder Colunas" onClick={onShowColumns}>
          <FaAnchor color="white" size={40} />
        </button>
      </div>
    </div>
  );
};
