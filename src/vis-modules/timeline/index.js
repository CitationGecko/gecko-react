import React from 'react';
import { groupBy } from 'utils';
import classNames from 'classnames';
import styles from './styles.module.css';

const X_OFFSET = 100;
const Y_OFFSET = 50;
const X_GAP = 20;
const Y_GAP = 70;

const TimeAxis = ({ years }) =>
  years.map((year, i) => (
    <React.Fragment>
      <text x={10} y={5 + Y_OFFSET + i * Y_GAP}>
        {year}
      </text>
      <line
        x1={25}
        y1={5 + Y_OFFSET + i * Y_GAP + 10}
        x2={25}
        y2={5 + Y_OFFSET + (i + 1) * Y_GAP - 20}
        stroke="black"
        stroke-dasharray={year - years[i + 1] > 1 ? '4' : null}
      />
    </React.Fragment>
  ));

const Connectors = ({ edges, nodes }) =>
  edges.map(edge => (
    <path d={getConnectingPath(edge, nodes)} fill="none" stroke="grey" strokeWidth={1} />
  ));

const Nodes = ({ nodes, onSelect, isHighlighted }) =>
  Object.values(nodes).map(node => (
    <circle
      onClick={evt => {
        onSelect(node.paper);
        evt.stopPropagation();
      }}
      className={classNames({
        [styles['seed-node']]: node.paper.seed,
        [styles['node']]: !node.paper.seed,
        [styles['hide']]: !isHighlighted(node)
      })}
      r={node.r}
      cx={node.x}
      cy={node.y}
    >
      <title>{node.paper.title}</title>
    </circle>
  ));

export const Timeline = ({ data: { Papers, Edges }, onSelect, selected }) => {
  const papersByYear = groupBy(Object.values(Papers), 'year');
  const years = Object.keys(papersByYear)
    .sort()
    .reverse();
  const maxHeight = Y_OFFSET + Y_GAP * (years.length + 2);
  const maxWidth = 10000;

  const nodes = getNodes(Object.values(Papers));
  const edges = getConnections(selected[0], Edges);

  const isHighlighted = node =>
    !edges.length
      ? true
      : edges
          .map(e => e.target)
          .concat(edges.map(e => e.source))
          .filter(id => node.ID == id).length;

  return (
    <div className={styles['timeline-container']}>
      <svg width={maxWidth} height={maxHeight} onClick={() => onSelect(null)}>
        <TimeAxis years={years} />
        <Connectors edges={edges} nodes={nodes} />
        <Nodes nodes={nodes} onSelect={onSelect} isHighlighted={isHighlighted} />
      </svg>
    </div>
  );
};

function getConnections(id, edges) {
  return edges.filter(e => e.source === id || e.target === id);
}

function getConnectingPath(edge, nodes) {
  const startPoint = [nodes[edge.source].x, nodes[edge.source].y];
  const endPoint = [nodes[edge.target].x, nodes[edge.target].y];
  const controlPoint1 = [nodes[edge.source].x, nodes[edge.source].y + Y_GAP / 2];
  const controlPoint4 = [nodes[edge.target].x, nodes[edge.target].y + Y_GAP / 2];

  if (nodes[edge.source].y == nodes[edge.target].y) {
    return `M ${startPoint} L ${controlPoint1} L${controlPoint4} L ${endPoint}`;
  }

  const controlPoint2 = [(2 * X_OFFSET) / 3, nodes[edge.source].y + Y_GAP / 2];
  const controlPoint3 = [(2 * X_OFFSET) / 3, nodes[edge.target].y + Y_GAP / 2];
  return `
    M ${startPoint} 
    L ${controlPoint1}
    L ${controlPoint2}
    L ${controlPoint3}
    L ${controlPoint4}
    L ${endPoint}
  `;
}

function getNodes(papers) {
  let nodes = {};
  // Sort by year
  const sortedPapers = papers.sort((a, b) => b.year - a.year);
  //Initialise
  let [lastX, lastY, lastR, lastYear] = [X_OFFSET, Y_OFFSET - Y_GAP, 0, 3000];
  // Loop
  for (let i = 0; i < sortedPapers.length; i++) {
    let paper = sortedPapers[i];
    let r = paper.seed ? 10 : 5 * (paper['seedsCitedBy'] + paper['seedsCited']);
    if (paper.year < lastYear) {
      lastY += Y_GAP;
      lastYear = paper.year;
      lastX = X_OFFSET;
    } else {
      lastX += lastR + X_GAP + r;
    }
    lastR = r;
    nodes[paper.ID] = {
      ID: paper.ID,
      x: lastX,
      y: lastY,
      r,
      paper
    };
  }
  return nodes;
}
