import { createAction, props } from '@ngrx/store';
import { Book, ReadingListItem } from '@tmo/shared/models';

export const init = createAction('[Reading List] Initialize');

export const loadReadingListSucceeded = createAction(
  '[Reading List API] Load list success',
  props<{ list: ReadingListItem[] }>()
);
export const loadReadingListFailed = createAction(
  '[Reading List API] Load list error',
  props<{ error: string }>()
);

export const addToReadingList = createAction(
  '[Books Search Results] Add to list',
  props<{ book: Book }>()
);

export const addToReadingListFailed = createAction(
  '[Reading List API] Failed add to list',
  props<{ book: Book }>()
);

export const addToReadingListSucceeded = createAction(
  '[Reading List API] Confirmed add to list',
  props<{ book: Book }>()
);

export const removeFromReadingList = createAction(
  '[Books Search Results] Remove from list',
  props<{ item: ReadingListItem }>()
);

export const removeFromReadingListFailed = createAction(
  '[Reading List API] Failed remove from list',
  props<{ item: ReadingListItem }>()
);

export const removeFromReadingListSucceeded = createAction(
  '[Reading List API] Confirmed remove from list',
  props<{ item: ReadingListItem }>()
);

export const markBookFinished = createAction(
  '[Reading List API] Mark book finished on list',
  props<{ item: ReadingListItem }>()
);

export const markBookFinishedSucceeded = createAction(
  '[Reading List API] Confirmed mark book finished on list',
  props<{ item: ReadingListItem }>()
);

export const markBookFinishedFailed = createAction(
  '[Reading List API] Failed to mark book finished on list',
  props<{ item: ReadingListItem }>()
);

export const markBookNotFinished = createAction(
  '[Reading List API] Mark book not finished on list',
  props<{ item: ReadingListItem }>()
);

export const markBookNotFinishedSucceeded = createAction(
  '[Reading List API] Confirmed mark book not finished on list',
  props<{ item: ReadingListItem }>()
);

export const markBookNotFinishedFailed = createAction(
  '[Reading List API] Failed to mark book not finished on list',
  props<{ item: ReadingListItem }>()
);
