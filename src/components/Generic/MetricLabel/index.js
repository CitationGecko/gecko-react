import React from 'react';
import styles from './styles.module.css';

const MetricLabel = ({ paper, metric }) => {
  switch (metric) {
    case 'seedsCitedBy':
      return (
        <span className={styles['metric']}>
          cited by <span className={styles['metric-count']}>{paper[metric]}</span> seed papers
        </span>
      );
    case 'seedsCited':
      return (
        <span className={styles['metric']}>
          cites <span className={styles['metric-count']}>{paper[metric]}</span> seed papers
        </span>
      );
    default:
      return null;
  }
};

export default MetricLabel;
