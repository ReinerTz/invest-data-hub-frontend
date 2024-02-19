import CreatableSelect, { ActionMeta, MultiValue } from "react-select";

interface Option {
  value: string;
  label: string;
}

interface TickerFilterProps {
  options: Option[];
  onChange: (
    selectedOptions: MultiValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => void;
}

export const TickerFilter: React.FC<TickerFilterProps> = ({
  options,
  onChange,
}) => {
  return (
    <CreatableSelect
      isMulti
      name="tickers"
      options={options}
      className="basic-multi-select"
      classNamePrefix="select"
      placeholder="Selecione tickers..."
      onChange={onChange}
    />
  );
};
