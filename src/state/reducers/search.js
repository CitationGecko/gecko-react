import { SEED_SEARCH_SUBMIT, SEED_SEARCH_PENDING, SEED_SEARCH_COMPLETE } from '../actions';

/*
 * reducer
 */

export function search(state = { query: null, status: null, results: null }, action) {
  switch (action.type) {
    case SEED_SEARCH_SUBMIT:
      return {
        ...state,
        status: 'submitted',
        query: action.query
      };
    case SEED_SEARCH_PENDING:
      return {
        ...state,
        status: 'pending'
      };
    case SEED_SEARCH_COMPLETE:
      return {
        ...state,
        status: 'complete',
        results: action.results
      };
    default:
      return state;
  }
}
