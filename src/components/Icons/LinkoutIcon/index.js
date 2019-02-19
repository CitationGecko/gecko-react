import React from 'react';

export var LinkoutIcon = props => (
  <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="16" height="14" fill="black" fill-opacity="0" transform="translate(0 1)" />
    <path d="M7.5 8.5L16 1M16 1H11.5M16 1V5.5" stroke={props.color} strokeWidth="1.8" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.5459 3H3C2.44727 3 2 3.44775 2 4V12C2 12.5522 2.44727 13 3 13H12C12.5527 13 13 12.5522 13 12V6.6001H15V12C15 13.6567 13.6572 15 12 15H3C1.34277 15 0 13.6567 0 12V4C0 2.34326 1.34277 1 3 1H9.5459V3Z"
      fill={props.color}
    />
  </svg>
);
