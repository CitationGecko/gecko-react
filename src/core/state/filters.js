import { createContext, useState } from 'react';

const filters = {
  Year: {
    options: {
      before: (paper, value) => paper.year < value,
      after: (paper, value) => paper.year > value
    }
  }
};

const initialActiveFilters = [];

export const Filters = createContext(initialActiveFilters);

export function useFilters() {
  const [activeFilters, setActiveFilters] = useState(initialActiveFilters);

  return {
    filters,
    activeFilters,
    addActiveFilter: () =>
      setActiveFilters(activeFilters => [
        ...activeFilters,
        { field: 'Year', option: 'before', value: 2019 }
      ]),
    clearAllActiveFilters: () => setActiveFilters([]),
    clearActiveFilter: index => setActiveFilters(filters => filters.filter((f, i) => i !== index)),
    setActiveFilter: (index, fields) =>
      setActiveFilters(activeFilters =>
        activeFilters.map((f, i) => (i === index ? { ...f, ...fields } : f))
      ),
    applyActiveFilters: papers => {
      return papers.filter(
        paper =>
          !activeFilters.reduce(
            (fail, filter) =>
              fail || !filters[filter.field].options[filter.option](paper, filter.value),
            false
          )
      );
    }
  };
}
