import React from "react";

export const FilterDropdown = ({
  label,
  options,
}: {
  label?: string;
  options: string[];
}) => {
  return (
    <>
      {label && (
        <label htmlFor="filter" className="m-0 text-xs font-medium text-white">
          {label}
        </label>
      )}
      <div className="rounded-lg bg-[rgba(255,255,255,0.1)] p-3 cursor-pointer">
        <select
          id="filter"
          name="filter"
          className="w-full bg-transparent text-ajo_offWhite text-opacity-60 outline-none hover:outline-none focus:outline-none cursor-pointer"
        >
          {options.map((option) => (
            <option
              className="bg-[rgba(34,28,62,.9)] px-4 py-4 text-sm capitalize hover:text-ajo_darkBlue cursor-pointer"
              key={option}
            >
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
