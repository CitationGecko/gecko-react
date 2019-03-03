/*
 * actions
 */

export const DELETE_PAPERS = 'DELETE_PAPERS';
export const UPDATE_PAPERS = 'UPDATE_PAPERS';
export const UPDATE_EDGES = 'UPDATE_EDGES';
export const REQUEST_SENT = 'REQUEST_SENT';
export const MAKE_SEED = 'MAKE_SEED';

/*
 * action creators
 */

export function updatePapers(papers, seeds) {
  return { type: UPDATE_PAPERS, papers, seeds };
}
export function deletePapers(index) {
  return { type: DELETE_PAPERS, index };
}
export function updateEdges(index) {
  return { type: UPDATE_EDGES, index };
}
export function requestSent(papers, source) {
  return { type: REQUEST_SENT, papers, source };
}
export function makeSeed(id) {
  return { type: MAKE_SEED, id };
}
