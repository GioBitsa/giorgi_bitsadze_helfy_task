import { createContext, useContext, useState, type ReactNode } from "react";
import { FilterType } from "../models/filter.model";

interface FilterContextProps {
  currentFilter: FilterType;
  setCurrentFilter: (val: FilterType) => void;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const [currentFilter, setCurrentFilter] = useState<FilterType>(
    FilterType.All
  );

  return (
    <FilterContext.Provider
      value={{
        currentFilter,
        setCurrentFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
};
