import { createContext, useState } from 'react';

const initialState = {
  Papers: {},
  Edges: []
};

export const Store = createContext(initialState);

export function useDataStore() {
  let [state, setState] = useState(initialState);

  return {
    Papers: state.Papers,
    Edges: state.Edges,
    updatePapers: (papers, seeds) => setState(prevState => updatePapers(papers, seeds, prevState)),
    deletePapers: paperIDs => setState(prevState => deletePapers(paperIDs, prevState)),
    makeSeed: id => setState(prevState => makeSeed(id, prevState))
  };
}

function makeSeed(id, state) {
  let { Papers, Edges } = state;
  let paper = { ...Papers[id] };
  paper.seed = true;
  Papers[id] = paper;

  if (paper.references) {
    paper.references.forEach(ref => {
      ref = addPaper(ref, Papers);
      let edge = { source: paper.ID, target: ref.ID };
      addEdge(edge, Edges);
    });
    Papers = updateMetrics(Papers, Edges);
  }
  if (paper.citations) {
    paper.citations.forEach(ref => {
      ref = addPaper(ref, Papers);
      let edge = { source: ref.ID, target: paper.ID };
      addEdge(edge, Edges);
    });
    Papers = updateMetrics(Papers, Edges);
  }
  return { Papers, Edges };
}

function deletePapers(paperIDs, state) {
  let { Papers, Edges } = state;
  paperIDs.forEach(id => {
    Papers[id] = { ...Papers[id], seed: false };
  });
  Papers = updateMetrics(Papers, Edges);
  return { Papers, Edges };
}

function updatePapers(papers, seeds, state) {
  let { Papers, Edges } = state;
  papers.forEach(paper => {
    paper.seed = paper.seed || seeds || false;
    // For each reference / citedBy match and merge then match / merge edges
    paper = addPaper(paper, Papers);
    if (paper.seed) {
      // Add references and citations.
      if (paper.references) {
        paper.references.forEach(ref => {
          ref = addPaper(ref, Papers);
          let edge = { source: paper.ID, target: ref.ID };
          addEdge(edge, Edges);
        });
        Papers = updateMetrics(Papers, Edges);
      }
      if (paper.citations) {
        paper.citations.forEach(ref => {
          ref = addPaper(ref, Papers);
          let edge = { source: ref.ID, target: paper.ID };
          addEdge(edge, Edges);
        });
        Papers = updateMetrics(Papers, Edges);
      }
    }
  });
  return { Papers, Edges };
}

//For a new paper this function tries to find a match in the existing database
export function matchPaper(paper, Papers) {
  Papers = Object.values(Papers);
  var match;
  if (paper.microsoftID) {
    match = Papers.filter(function(p) {
      return p.microsoftID === paper.microsoftID;
    })[0];
  }
  if (!match && paper.doi) {
    match = Papers.filter(function(p) {
      return paper.doi.toLowerCase() === (p.doi ? p.doi.toLowerCase() : null);
    })[0];
  }
  if (!match && paper.title && paper.author) {
    match = Papers.filter(function(p) {
      if (p.title) {
        return (
          p.title.toLowerCase() === paper.title.toLowerCase() &&
          paper.author.toLowerCase() === (p.author ? p.author.toLowerCase() : null)
        );
      }
      return null;
    })[0];
  }
  return match;
}

export function matchEdge(edge, Edges) {
  return Edges.filter(function(e) {
    return (e.source === edge.source) & (e.target === edge.target);
  })[0];
}

//Given two paper/edge objects that are deemed to be matching, this merges the info in the two.
export function merge(oldRecord, newRecord) {
  if (!oldRecord) return newRecord;
  let mergedRecord = { ...oldRecord };
  for (let i in newRecord) {
    mergedRecord[i] = oldRecord[i] || newRecord[i];
  }
  mergedRecord.seed = oldRecord.seed || newRecord.seed; //If either record is marked as a seed make the merged result a seed.
  return mergedRecord;
}

export function addPaper(paper, Papers) {
  let match = matchPaper(paper, Papers);
  if (!match) {
    paper.ID = Object.keys(Papers).length;
  } else {
    paper = merge(match, paper);
  }
  Papers[paper.ID] = paper;
  return paper;
}

export function addEdge(edge, Edges) {
  edge.ID = `${edge.source}-${edge.target}`;
  let matchedEdge = matchEdge(edge, Edges);
  if (!matchedEdge) {
    Edges.push(edge);
  } else {
    merge(matchedEdge, edge);
  }
}

export const metrics = {
  localCitedBy: function(paper, Papers, Edges) {
    //Count number of times cited in the edges list supplied
    return Edges.filter(e => e.target === paper.ID).length;
  },
  localReferences: function(paper, Papers, Edges) {
    //Count number of times a paper cites another paper (in the edge list provided)
    return Edges.filter(e => e.source === paper.ID).length;
  },
  seedsCitedBy: function(paper, Papers, Edges) {
    //Count number of seed papers that cite the paper.
    return Edges.filter(e => Papers[e.source].seed & (e.target === paper.ID)).length;
  },
  seedsCited: function(paper, Papers, Edges) {
    //Count number of seed papers the paper cites.
    return Edges.filter(e => Papers[e.target].seed & (e.source === paper.ID)).length;
  }
};

//Recalculates all metrics
export function updateMetrics(Papers, Edges) {
  let updatedPapers = Papers;
  for (let metric in metrics) {
    for (let p in updatedPapers) {
      let updatedPaper = { ...updatedPapers[p] };
      updatedPaper[metric] = metrics[metric](updatedPaper, Papers, Edges);
      updatedPapers[p] = updatedPaper;
    }
  }
  return updatedPapers;
}
