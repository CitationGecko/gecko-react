export const SEED_SEARCH_SUBMIT = 'SEED_SEARCH_SUBMIT';

export function seedSearchSubmit(query) {
  return { type: SEED_SEARCH_SUBMIT, query };
}

export const SEED_SEARCH_PENDING = 'SEED_SEARCH_PENDING';

export function seedSearchPending() {
  return { type: SEED_SEARCH_PENDING };
}

export const SEED_SEARCH_COMPLETE = 'SEED_SEARCH_COMPLETE';

export function seedSearchComplete(results) {
  return { type: SEED_SEARCH_COMPLETE, results };
}
