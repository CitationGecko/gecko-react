import { REQUEST_SENT, UPDATE_PAPERS, DELETE_PAPERS, MAKE_SEED } from '../actions/data';
import { addPaper, addEdge } from '../utils';
import { updateMetrics } from '../metrics';

/*
 * reducer
 */

export function data(state = { Papers: {}, Edges: [] }, action) {
  let Papers = { ...state.Papers };
  let Edges = [...state.Edges];
  switch (action.type) {
    case REQUEST_SENT:
      action.papers.forEach(paper => {
        paper[action.source] = true;
        Papers[paper.ID] = paper;
        return paper;
      });
      return { Papers: Papers, Edges: state.Edges };
    case UPDATE_PAPERS:
      action.papers.forEach(paper => {
        paper.seed = paper.seed || action.seeds || false;
        paper = addPaper(paper, Papers);
        // For each reference / citedBy match and merge then match / merge edges
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
    case DELETE_PAPERS:
      action.paperIDs.forEach(id => {
        Papers[id] = { ...Papers[id], seed: false };
      });
      Papers = updateMetrics(Papers, Edges);
      return { Papers, Edges };
    case MAKE_SEED:
      let paper = { ...Papers[action.id] };
      paper.seed = true;
      Papers[action.id] = paper;

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
    default:
      return state;
  }
}
