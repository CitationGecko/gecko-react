import { combineReducers } from 'redux';
import { OPEN_MODAL, CLOSE_MODAL, SWITCH_LIST_VIEW, SELECT_PAPER } from 'state/actions';

/*
 * reducers
 */

const reducers = {
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
