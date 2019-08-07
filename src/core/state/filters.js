import { createContext, useState } from 'react';

const sortFields = ['seedsCitedBy', 'seedsCited'];

const filters = {
  Year: {
    options: {
      before: (paper, value) => paper.year < value,
      after: (paper, value) => paper.year > value,
      equals: (paper, value) => paper.year == value
    }
  },
  Journal: {
    options: {
      is: (paper, value) => paper.journal && paper.journal.toLowerCase() == value.toLowerCase()
    }
  },
  'Seeds Cited By': {
    options: {
      '>': (paper, value) => paper.seedsCitedBy > value,
      '<': (paper, value) => paper.seedsCitedBy < value,
      '=': (paper, value) => paper.seedsCitedBy == value
    }
  },
  'Seeds Cited': {
    options: {
      '>': (paper, value) => paper.seedsCited > value,
      '<': (paper, value) => paper.seedsCited < value,
      '=': (paper, value) => paper.seedsCited == value
    }
  }
};

export const Filters = createContext({});

export function useFilters() {
  const [activeFilters, setActiveFilters] = useState([]);
  const [activeSortField, setActiveSortField] = useState('seedsCitedBy');

  return {
    activeSortField,
    sortFields,
    setActiveSortField,
    filters,
    activeFilters,
    setActiveFilters,
    applyActiveFilters: papers => {
      return papers.filter(
        paper =>
          !activeFilters.reduce(
            (fail, filter) =>
              fail || !filters[filter.field].options[filter.option](paper, filter.value),
            false
          )
      );
    },
    applySort: papers => {
      return papers.sort((a, b) => b[activeSortField] - a[activeSortField]);
    }
  };
}
