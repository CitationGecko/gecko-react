import React, { useState } from 'react';

const TextInput = ({ value, options, onChange, ...props }) => {
  const handleChange = event => {
    onChange(event.target.value);
  };
  return <input value={value} onChange={handleChange} />;
};

export default TextInput;
