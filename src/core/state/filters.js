import { createContext, useState } from 'react';

const sortFields = ['seedsCitedBy', 'seedsCited'];

const filters = {
  'Marked irrelevant': {
    options: {
      hide: (paper, value) => !paper.irrelevant,
      show: (paper, value) => true
    }
  },
  Year: {
    options: {
      before: (paper, value) => paper.year < value,
      after: (paper, value) => paper.year > value,
      equals: (paper, value) => paper.year == value
    },
    value: 'text'
  },
  Journal: {
    options: {
      is: (paper, value) => paper.journal && paper.journal.toLowerCase() == value.toLowerCase()
    },
    value: 'text'
  },
  'Seeds Cited By': {
    options: {
      '>': (paper, value) => paper.seedsCitedBy > value,
      '<': (paper, value) => paper.seedsCitedBy < value,
      '=': (paper, value) => paper.seedsCitedBy == value
    },
    value: 'text'
  },
  'Seeds Cited': {
    options: {
      '>': (paper, value) => paper.seedsCited > value,
      '<': (paper, value) => paper.seedsCited < value,
      '=': (paper, value) => paper.seedsCited == value
    },
    value: 'text'
  }
};

export const Filters = createContext({});

export function useFilters() {
  const [activeFilters, setActiveFilters] = useState([
    { field: 'Marked irrelevant', option: 'hide' }
  ]);
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
