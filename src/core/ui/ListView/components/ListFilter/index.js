import React, { useContext } from 'react';
import { Filters } from 'core/state/filters';
import styles from './styles.module.css';
import FilterOption from 'core/ui/ListView/components/FilterOption';
import SecondaryButton from 'core/components/SecondaryButton';
import PrimaryButton from 'core/components/PrimaryButton';

function ListFilter() {
  const { activeFilters, addActiveFilter, clearAllActiveFilters } = useContext(Filters);
  return (
    <div>
      <div className={styles['filter']}>
        <span>Filter Papers by:</span>
      </div>
      {activeFilters.map((filter, i) => (
        <FilterOption key={i} index={i} filter={filter} />
      ))}
      <div className={styles['container']}>
        <SecondaryButton text="Clear all Filters" onClick={clearAllActiveFilters} />
        <PrimaryButton text="Add Filter" onClick={addActiveFilter} />
      </div>
    </div>
  );
}

export default ListFilter;
