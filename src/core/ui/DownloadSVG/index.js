import React from 'react';
import { saveSVG } from 'utils';
import SecondaryButton from 'core/components/SecondaryButton';
import styles from './styles.module.css';

export const DownloadSVG = ({ id }) => {
  return (
    <div className={styles['downloadSvg']}>
      <SecondaryButton text={'Save Image'} onClick={() => saveSVG(id)} />
    </div>
  );
};
