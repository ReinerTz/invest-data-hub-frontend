import React, { useState } from "react";

interface FilterInputProps {
  label: string;
  onChange: (value: { min?: number; max?: number }) => void;
}

export const FilterInput: React.FC<FilterInputProps> = ({
  label,
  onChange,
}) => {
  // Estado interno para manter os valores mínimo e máximo
  const [minValue, setMinValue] = useState<number | undefined>(undefined);
  const [maxValue, setMaxValue] = useState<number | undefined>(undefined);

  // Atualiza os estados interno e notifica o componente pai
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const min = e.target.value ? Number(e.target.value) : undefined;
    setMinValue(min);
    onChange({ min, max: maxValue });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const max = e.target.value ? Number(e.target.value) : undefined;
    setMaxValue(max);
    onChange({ min: minValue, max });
  };

  return (
    <div className="flex flex-col border p-2 rounded">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="number"
        placeholder="Min"
        value={minValue ?? ""}
        onChange={handleMinChange}
        className="mt-1 block w-28 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      <input
        type="number"
        placeholder="Max"
        value={maxValue ?? ""}
        onChange={handleMaxChange}
        className="mt-1 block w-28 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default FilterInput;
