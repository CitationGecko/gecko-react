import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const Dropdown = ({ value, options, onChange }) => {
  const handleChange = event => {
    onChange(event.target.value);
  };
  return (
    <Select value={value || options[0]} onChange={handleChange} displayEmpty>
      {options.map(option => (
        <MenuItem value={option}>{option}</MenuItem>
      ))}
    </Select>
  );
};

export default Dropdown;
