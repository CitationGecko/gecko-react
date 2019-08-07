import React, { useContext, useState } from 'react';
import { Filters } from 'core/state/filters';
import styles from './styles.module.css';
import FilterOption from 'core/ui/ListView/components/FilterOption';
import SecondaryButton from 'core/components/SecondaryButton';
import PrimaryButton from 'core/components/PrimaryButton';

function ListFilter() {
  const { filters, activeFilters, setActiveFilters } = useContext(Filters);
  const [pendingFilters, setPendingFilters] = useState(activeFilters);
  const addPendingFilter = () =>
    setPendingFilters(pendingFilters => [
      ...pendingFilters,
      { field: 'Year', option: 'before', value: 2019 }
    ]);
  const clearPendingFilter = index =>
    setPendingFilters(filters => filters.filter((f, i) => i !== index));
  const setPendingFilter = (index, fields) =>
    setPendingFilters(pendingFilters =>
      pendingFilters.map((f, i) => (i === index ? { ...f, ...fields } : f))
    );
  const applyPendingFilters = () => {
    setActiveFilters(pendingFilters);
  };
  return (
    <div>
      <div className={styles['filter']}>
        <span>Filter Papers by:</span>
      </div>
      {pendingFilters.map((filter, i) => (
        <FilterOption
          key={i}
          filter={filter}
          filters={filters}
          setPendingFilter={values => setPendingFilter(i, values)}
          clearPendingFilter={() => clearPendingFilter(i)}
        />
      ))}
      <div className={styles['container']}>
        <SecondaryButton text="Add Filter" onClick={addPendingFilter} />
        <PrimaryButton text="Apply all Filters" onClick={applyPendingFilters} />
      </div>
    </div>
  );
}

export default ListFilter;
