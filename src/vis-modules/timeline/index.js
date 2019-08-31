import React from 'react';
import { groupBy } from 'utils';
import classNames from 'classnames';
import styles from './styles.module.css';

const X_OFFSET = 50;
const Y_OFFSET = 20;
const X_GAP = 20;
const Y_GAP = 70;

const getX = index => X_OFFSET + X_GAP * index;
const getY = index => Y_OFFSET + Y_GAP * index;

export const Timeline = ({ data: { Papers, Edges }, sizeMetric, onSelect, selected }) => {
  const papersByYear = groupBy(Object.values(Papers), 'year');
  const years = Object.keys(papersByYear);
  const maxYear = Math.max(...years);
  const minYear = Math.min(...years);
  const maxHeight = getY(maxYear - minYear);
  const maxWidth = getX(Math.max(...Object.values(papersByYear).map(row => row.length)));
  const highlightedNodes = selected.length
    ? findNeighbours(selected[0], Edges)
    : Object.keys(Papers);

  return (
    <div className={styles['timeline-container']}>
      <svg width={maxWidth} height={maxHeight}>
        {Object.values(papersByYear).map(row =>
          row.map((paper, i) => (
            <circle
              onClick={() => onSelect(paper)}
              className={classNames({
                [styles['seed-node']]: paper.seed,
                [styles['node']]: !paper.seed,
                [styles['hide']]: !highlightedNodes.filter(id => id == paper.ID).length
              })}
              r={7}
              cx={getX(i)}
              cy={getY(maxYear - paper.year)}
            />
          ))
        )}
      </svg>
    </div>
  );
};

function findNeighbours(id, edges) {
  const targets = edges.filter(e => e.source === id).map(e => e.target);
  const sources = edges.filter(e => e.target === id).map(e => e.source);
  return targets.concat(sources).concat([id]);
}
