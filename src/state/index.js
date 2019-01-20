import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

/*
 * actions
 */

const NEW_SEEDS = 'NEW_SEEDS';
const UPDATE_SEED = 'UPDATE_SEED';
const DELETE_SEED = 'DELETE_SEED';
const NEW_PAPERS = 'NEW_PAPERS';
const UPDATE_PAPER = 'UPDATE_PAPER';
const NEW_EDGES = 'NEW_EDGES';
const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';
const LOAD_EXAMPLE = 'LOAD_EXAMPLE';

/*
 * action creators
 */
export function loadExample() {
  return { type: LOAD_EXAMPLE };
}
export function closeModal() {
  return { type: CLOSE_MODAL };
}
export function openModal(modal) {
  return { type: OPEN_MODAL, modal };
}
export function newSeeds(text) {
  return { type: NEW_SEEDS, text };
}
export function newPapers(index) {
  return { type: NEW_PAPERS, index };
}
export function updateSeed(index) {
  return { type: UPDATE_SEED, index };
}
export function updatePaper(index) {
  return { type: UPDATE_PAPER, index };
}
export function deleteSeed(index) {
  return { type: DELETE_SEED, index };
}
export function newEdges(index) {
  return { type: NEW_EDGES, index };
}

/*
 * reducers
 */

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
    case NEW_SEEDS:
      return state;
    default:
      return state;
  }
}

function edges(state = [], action) {
  switch (action.type) {
    case NEW_EDGES:
      return state;
    default:
      return state;
  }
}

const reducer = combineReducers({ papers, edges, modal });

export const store = createStore(reducer, composeWithDevTools());
