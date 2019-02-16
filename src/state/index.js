import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

/*
 * actions
 */

const DELETE_PAPERS = 'DELETE_PAPERS';
const UPDATE_PAPERS = 'UPDATE_PAPERS';
const UPDATE_EDGES = 'UPDATE_EDGES';
const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';
const SELECT_PAPER = 'SELECT_PAPER';
const SWITCH_LIST_VIEW = 'SWITCH_LIST_VIEW';
const REQUEST_SENT = 'REQUEST_SENT';

/*
 * action creators
 */

export function closeModal() {
  return { type: CLOSE_MODAL };
}
export function openModal(modal) {
  return { type: OPEN_MODAL, modal };
}
export function updatePapers(papers, seeds) {
  return { type: UPDATE_PAPERS, papers, seeds };
}
export function deletePapers(index) {
  return { type: DELETE_PAPERS, index };
}
export function updateEdges(index) {
  return { type: UPDATE_EDGES, index };
}
export function selectPaper(paper) {
  return { type: SELECT_PAPER, paper };
}
export function switchToList(view) {
  return { type: SWITCH_LIST_VIEW, view };
}
export function requestSent(papers, source) {
  return { type: REQUEST_SENT, papers, source };
}

/*
 * reducers
 */

function listView(state = 'Seeds', action) {
  if (action.type === SWITCH_LIST_VIEW) {
    return action.view;
  } else {
    return state;
  }
}

function modal(state = 'onboarding', action) {
  switch (action.type) {
    case OPEN_MODAL:
      return action.modal;
    case CLOSE_MODAL:
      return null;
    default:
      return state;
  }
}

function data(state = { Papers: {}, Edges: [] }, action) {
  switch (action.type) {
    case REQUEST_SENT:
      let papers = action.papers.map(paper => {
        paper[action.source] = true;
        return paper;
      });
      return { Papers: { ...state.Papers, ...papers }, Edges: state.Edges };
    case UPDATE_PAPERS:
      let Papers = { ...state.Papers };
      let Edges = [...state.Edges];
      action.papers.forEach(paper => {
        paper.seed = paper.seed || action.seeds;
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
          }
          if (paper.citations) {
            paper.citations.forEach(ref => {
              ref = addPaper(ref, Papers);
              let edge = { source: ref.ID, target: paper.ID };
              addEdge(edge, Edges);
            });
          }
        }
      });
      return { Papers, Edges };
    case DELETE_PAPERS:
      return state;
    default:
      return state;
  }
}

const reducer = combineReducers({ data, modal, listView });

export const store = createStore(reducer, composeWithDevTools());

//For a new paper this function tries to find a match in the existing database
function matchPaper(paper, Papers) {
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

function matchEdge(edge, Edges) {
  return Edges.filter(function(e) {
    return (e.source === edge.source) & (e.target === edge.target);
  })[0];
}

//Given two paper/edge objects that are deemed to be matching, this merges the info in the two.
function merge(oldRecord, newRecord) {
  if (!oldRecord) return newRecord;
  let mergedRecord = { ...oldRecord };
  for (let i in newRecord) {
    mergedRecord[i] = oldRecord[i] || newRecord[i];
  }
  mergedRecord.seed = oldRecord.seed || newRecord.seed; //If either record is marked as a seed make the merged result a seed.
  return mergedRecord;
}

function addPaper(paper, Papers) {
  let match = matchPaper(paper, Papers);
  paper = merge(match, paper);
  paper.ID = paper.ID | Object.keys(Papers).length;
  Papers[paper.ID] = paper;
  return paper;
}

function addEdge(edge, Edges) {
  let matchedEdge = Edges.filter(function(e) {
    return (e.source === edge.source) & (e.target === edge.target);
  })[0];
  if (!matchedEdge) {
    Edges.push(edge);
  } else {
    merge(matchedEdge, edge);
  }
}
