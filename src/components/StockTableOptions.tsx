import { FaAnchor, FaFilter } from "react-icons/fa6";
import { TickerFilter } from "./TickerFilter";

import { ActionMeta, MultiValue } from "react-select";

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
}

export const StockTableOptions: React.FC<TickerFilterProps> = ({
  options,
  onTicketFilterChange,
  onShowFilter,
}) => {
  return (
    <div className="flex justify-end bg-slate-800 sm:rounded-lg">
      <div className="p-3 ">
        <TickerFilter options={options} onChange={onTicketFilterChange} />
      </div>
      <div className="p-3 ">
        <button title="Filtro" onClick={onShowFilter}>
          <FaFilter color="white" size={40} />
        </button>
      </div>
      <div className="p-3">
        <button title="Exibir/Esconder Colunas">
          <FaAnchor color="white" size={40} />
        </button>
      </div>
    </div>
  );
};
