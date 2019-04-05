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
