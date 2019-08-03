import React, { useContext } from 'react';

import Dropdown from 'core/components/Dropdown';

import styles from './styles.module.css';
import { IconButton } from '@material-ui/core';
import Icon from 'core/components/Icon';
import TextInput from 'core/components/TextInput';
import { Filters } from 'core/state/filters';

function FilterOption({ index, filter }) {
  const { filters, setActiveFilter, clearActiveFilter } = useContext(Filters);
  const setValue = value => setActiveFilter(index, { value });
  const setField = field => setActiveFilter(index, { field });
  const setOption = option => setActiveFilter(index, { option });
  return (
    <div className={styles['container']}>
      <Dropdown value={filter.field} options={Object.keys(filters)} onChange={setField} />
      <Dropdown
        value={filter.option}
        options={Object.keys(filters[filter.field].options)}
        onChange={setOption}
      />
      <TextInput value={filter.value} onChange={setValue} />
      <IconButton color="red" disableRipple={true} onClick={() => clearActiveFilter(index)}>
        <Icon icon="close" />
      </IconButton>
    </div>
  );
}

export default FilterOption;
