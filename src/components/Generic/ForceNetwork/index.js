import React, { Component } from 'react';
import * as d3 from 'd3';
import styles from './styles.module.css';

export default class ForceNetwork extends Component {
  componentDidMount() {
    this.width = this.svg.node().getBoundingClientRect().width;
    this.height = this.svg.node().getBoundingClientRect().height;
    this.canvas = this.svg.append('g');
    this.lines = this.canvas // Create d3 selection for lines
      .append('g')
      .attr('class', styles['link'])
      .selectAll('line');
    this.circles = this.canvas // Create d3 selection for circles
      .append('g')
      .attr('class', styles['node'])
      .selectAll('circle');

    this.svg
      .on('mouseover', () => {
        this.circles.style('opacity', 1);
        this.lines.style('opacity', 1);
      })
      .on('click', () => {
        this.circles.style('opacity', 1);
        this.lines.style('opacity', 1);
      }) // Event listener to unselect papers when clicking background
      .call(
        d3.zoom().on('zoom', () => {
          this.canvas.attr('transform', d3.event.transform);
        })
      ) // Event listener to enable zoom by scrolling
      .on('dblclick.zoom', null); // Disable double click zooming

    this.simulation = d3
      .forceSimulation()
      .force(
        'link',
        d3.forceLink().id(function(d) {
          return d.ID;
        })
      )
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(this.width / 2, this.height / 2))
      .force('xattract', d3.forceX())
      .force('yattract', d3.forceY())
      .force(
        'collide',
        d3.forceCollide().radius(function(d) {
          return d.size;
        })
      );
    this.nodes = [];
    this.edges = [];
  }

  shouldComponentUpdate(nextProps) {
    const {
      sizeMetric,
      data: { Papers, Edges },
      onSelect,
      selected
    } = nextProps;

    if (selected.length) {
      highlightNode(selected[0], this);
    }

    // Add / remove / update nodes from the simulation
    const existingNodeIDs = this.nodes.map(n => n.ID);
    const newNodes = Object.values(Papers)
      .filter(p => !existingNodeIDs.includes(p.ID))
      .map(p => {
        return { ...p, size: p.seed ? 10 : 5 * p[sizeMetric] };
      });

    if (!newNodes.length) return false;

    this.nodes = this.nodes
      .filter(n => Papers[n.ID]) // filter dead nodes
      .map(n => {
        return { ...n, ...Papers[n.ID] }; // update existing info
      })
      .concat(newNodes); // add new nodes
    // Update edges
    this.edges = Edges.map(e => {
      return { ...e };
    });

    // Update the svg circles to match simulation
    this.circles = this.circles
      .data(this.nodes, p => p.ID)
      .join('circle')
      .attr('r', p => {
        return p.size;
      })
      .attr('class', function(d) {
        if (d.seed) {
          return styles['seed-node'];
        } else {
          return styles['node'];
        }
      })
      .call(
        d3
          .drag()
          .on('start', d => dragstarted(d, this.simulation))
          .on('drag', d => dragged(d))
          .on('end', d => dragended(d, this.simulation))
      )
      /*
      .on('dblclick', p => p) // Display abstract?
      .on('mouseover', p => {
        onSelect(p);
        d3.event.stopPropagation();
      }) */
      .on('click', p => {
        onSelect(p);
        //this.circles.on('mouseover', null);
        //this.svg.on('mouseover', null);
        d3.event.stopPropagation();
      });

    //Clicking background restores mouseover beahviour
    this.svg.on('click', () => {
      this.circles.style('opacity', 1);
      this.lines.style('opacity', 1);
      /*  this.circles.on('mouseover', p => {
        onSelect(p);
        d3.event.stopPropagation();
      });
      this.svg.on('mouseover', () => {
        this.circles.style('opacity', 1);
        this.lines.style('opacity', 1);
      }); */
    });

    this.circles.append('title').text(function(d) {
      return d.title;
    }); //Label nodes with title on hover

    // Update svg lines to match simulation
    this.lines = this.lines.data(this.edges, d => d.ID).join('line');

    // Update and restart the simulation.
    this.simulation.nodes(this.nodes).on('tick', () => tick(this));
    this.simulation.force('link').links(this.edges);
    this.simulation.force('collide').initialize(this.simulation.nodes());
    this.simulation.alpha(1).restart();

    return false;
  }

  componentWillUnmount() {
    this.simulation.stop();
  }

  render() {
    return (
      <svg
        ref={n => {
          this.svg = d3.select(n);
        }}
        className={styles['force-graph']}
      />
    );
  }
}

function updateNodes(nodes, Papers) {
  const existingNodeIDs = nodes.map(n => n.ID);
  const newNodes = Object.values(Papers)
    .filter(p => !existingNodeIDs.includes(p.ID))
    .map(p => {
      return { ...p };
    });
  return nodes
    .map(n => {
      return { ...n, ...Papers[n.ID] }; // update existing info
    })
    .filter(n => Papers[n.ID]) // filter dead nodes
    .concat(newNodes); // add new nodes
}

function findNeighbours(id, edges) {
  const targets = edges.filter(e => e.source === id).map(e => e.target);
  const sources = edges.filter(e => e.target === id).map(e => e.source);
  return targets.concat(sources);
}

function highlightNode(id, graph) {
  const neighbours = findNeighbours(id, graph.edges);
  graph.circles.style('opacity', node => {
    return node.ID === id || neighbours.includes(node.ID) ? 1 : 0.15;
  });
  graph.lines.style('opacity', edge => {
    return edge.source.ID === id || edge.target.ID === id ? 1 : 0.15;
  });
}

function dragstarted(d, simulation) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}
function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d, simulation) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

function tick(graph) {
  graph.lines
    .attr('x1', function(d) {
      return d.source.x;
    })
    .attr('y1', function(d) {
      return d.source.y;
    })
    .attr('x2', function(d) {
      return d.target.x;
    })
    .attr('y2', function(d) {
      return d.target.y;
    });
  graph.circles
    .attr('cx', function(d) {
      return d.x;
    })
    .attr('cy', function(d) {
      return d.y;
    });
}
