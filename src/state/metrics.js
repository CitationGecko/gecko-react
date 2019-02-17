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
