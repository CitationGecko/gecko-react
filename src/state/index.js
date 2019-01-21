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

function papers(state = [], action) {
  switch (action.type) {
    case UPDATE_PAPERS:
      let newState = { ...state };
      action.papers.forEach(paper => {
        paper.seed = action.seeds;
        // Match / merge and return with ID
        // For each reference / citedBy match and merge then match / merge edges
        let match = matchPapers(paper, state);
        if (!match) {
          newState[Object.keys(newState).length] = paper;
        } else {
          newState[match.ID] = merge(match, paper);
        }
      });
      return newState;
    case DELETE_PAPERS:
      return state;
    default:
      return state;
  }
}

function edges(state = [], action) {
  switch (action.type) {
    case UPDATE_EDGES:
      return state;
    default:
      return state;
  }
}

const reducer = combineReducers({ papers, edges, modal, listView });

export const store = createStore(reducer, composeWithDevTools());

//For a new paper this function tries to find a match in the existing database
function matchPapers(paper, Papers) {
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

//Given two paper/edge objects that are deemed to be matching, this merges the info in the two.
function merge(oldRecord, newRecord) {
  let mergedRecord = { ...oldRecord };
  for (let i in newRecord) {
    mergedRecord[i] = oldRecord[i] ? oldRecord[i] : newRecord[i];
  }
  mergedRecord.seed = oldRecord.seed || newRecord.seed; //If either record is marked as a seed make the merged result a seed.
  return mergedRecord;
}
