import React from 'react';
import MaterialIcon from '@material-ui/core/Icon';

const Icon = ({ icon, ...props }) => {
  return <MaterialIcon fontSize="inherit">{icon}</MaterialIcon>;
};

export default Icon;
