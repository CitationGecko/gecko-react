/*
 * actions
 */

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const SELECT_PAPER = 'SELECT_PAPER';
export const SWITCH_LIST_VIEW = 'SWITCH_LIST_VIEW';

/*
 * action creators
 */

export function closeModal() {
  return { type: CLOSE_MODAL };
}
export function openModal(modal) {
  return { type: OPEN_MODAL, modal };
}
export function switchToList(view) {
  return { type: SWITCH_LIST_VIEW, view };
}
export function selectPaper(paper) {
  return { type: SELECT_PAPER, paper };
}
