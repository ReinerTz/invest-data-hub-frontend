import React, { useEffect, useState } from "react";

interface FilterInputProps {
  label?: string;
  onChange: (value: { min?: number; max?: number }) => void;
  initialValues?: { min?: number; max?: number };
}

export const FilterInput: React.FC<FilterInputProps> = ({
  label,
  onChange,
  initialValues = {},
}) => {
  const [minValue, setMinValue] = useState<number | undefined>(
    initialValues.min
  );
  const [maxValue, setMaxValue] = useState<number | undefined>(
    initialValues.max
  );

  useEffect(() => {
    setMinValue(initialValues.min);
    setMaxValue(initialValues.max);
  }, [initialValues]);

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
    <div className="flex flex-col border p-2 rounded text-black">
      <label className="block text-lg font-medium text-gray-700">{label}</label>
      <input
        type="number"
        placeholder="Min"
        value={minValue ?? ""}
        onChange={handleMinChange}
        className="mt-1 block w-20 text-colo  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      <input
        type="number"
        placeholder="Max"
        value={maxValue ?? ""}
        onChange={handleMaxChange}
        className="mt-1 block w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default FilterInput;
