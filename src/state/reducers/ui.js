import { combineReducers } from 'redux';
import {
  OPEN_MODAL,
  CLOSE_MODAL,
  SWITCH_LIST_VIEW,
  SELECT_PAPER,
  SWITCH_MODE
} from 'state/actions';

/*
 * reducers
 */

const reducers = {
  mode: function(state = 'references', action) {
    switch (action.type) {
      case SWITCH_MODE:
        return state === 'references' ? 'citations' : 'references';
      default:
        return state;
    }
  },
  selectedPapers: function(state = [], action) {
    switch (action.type) {
      case SELECT_PAPER:
        return [action.paper.ID];
      default:
        return state;
    }
  },
  listView: function(state = 'Seeds', action) {
    switch (action.type) {
      case SWITCH_LIST_VIEW:
        return action.view;
      case SELECT_PAPER:
        return action.paper.seed ? 'Seeds' : 'Recommended';
      default:
        return state;
    }
  },
  modal: function(state = 'onboarding', action) {
    switch (action.type) {
      case OPEN_MODAL:
        return action.modal;
      case CLOSE_MODAL:
        return null;
      default:
        return state;
    }
  }
};

export const ui = combineReducers(reducers);
