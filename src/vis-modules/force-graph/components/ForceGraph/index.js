import React, { Component } from 'react';
import * as d3 from 'd3';
import styles from './styles.module.css';

export default class ForceGraph extends Component {
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
      .call(
        d3.zoom().on('zoom', () => {
          this.canvas.attr('transform', d3.event.transform);
        })
      ) // Event listener to enable zoom by scrolling
      .on('dblclick.zoom', null); // Disable double click zooming
    // Center the canvas
    this.canvas.attr('transform', `translate(${this.width / 2},${this.height / 2})`);
    this.simulation = d3
      .forceSimulation()
      .force(
        'link',
        d3.forceLink().id(function(d) {
          return d.ID;
        })
      )
      .force('charge', d3.forceManyBody().strength(-200))
      //.force('center', d3.forceCenter(this.width / 2, this.height / 2))
      .force('xattract', d3.forceX())
      .force('yattract', d3.forceY());

    this.nodes = [];
    this.edges = [];
    this.shouldComponentUpdate(this.props);
  }

  shouldComponentUpdate(nextProps) {
    const {
      sizeMetric,
      data: { Papers, Edges },
      onSelect,
      selected
    } = nextProps;

    if (selected.length && Papers[selected[0]]) {
      highlightNode(selected[0], this);
    } else {
      this.circles.style('opacity', 1);
      this.lines.style('opacity', 1);
    }

    // Add / remove / update nodes from the simulation
    const existingNodeIDs = this.nodes.map(n => n.ID);
    const newNodes = Object.values(Papers)
      .filter(p => !existingNodeIDs.includes(p.ID))
      .map(p => ({ ...p }));

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

    if (this.nodes.length !== existingNodeIDs.length) {
      this.circles = this.circles.data(this.nodes, p => p.ID).join('circle');
    }
    // Update the svg circles to match simulation
    this.circles = this.circles
      .data(this.nodes, p => p.ID)
      .attr('r', p => {
        return nodeSize(p, sizeMetric);
      })
      .attr('class', function(d) {
        if (d.seed) {
          return styles['seed-node'];
        } else {
          return styles['node'];
        }
      })
      .html(d => `<title>${d.title}</title>`)
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

    //Clicking background restores mouseover behaviour
    this.svg.on('click', () => {
      onSelect(null);
    });

    // Update svg lines to match simulation
    this.lines = this.lines.data(this.edges, d => d.ID).join('line');

    // Update and restart the simulation.
    this.simulation.nodes(this.nodes).on('tick', () => tick(this));
    this.simulation.force('link').links(this.edges);
    this.simulation.force(
      'collide',
      d3.forceCollide().radius(function(d) {
        return nodeSize(d, sizeMetric);
      })
    );
    this.simulation.force('collide').initialize(this.simulation.nodes());

    if (newNodes.length) {
      this.simulation.alpha(1).restart();
    }

    return false;
  }

  componentWillUnmount() {
    this.simulation.stop();
  }

  render() {
    return (
      <svg
        id="force-graph"
        xmlns="http://www.w3.org/2000/svg"
        ref={n => {
          this.svg = d3.select(n);
        }}
        className={styles['force-graph']}
      />
    );
  }
}

function nodeSize(p, sizeMetric) {
  return p.seed ? 10 : 5 * p[sizeMetric];
}

function findNeighbours(id, edges) {
  const targets = edges.filter(e => e.source.ID === id).map(e => e.target.ID);
  const sources = edges.filter(e => e.target.ID === id).map(e => e.source.ID);
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
  d.fx = d.x;
  d.fy = d.y;
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
