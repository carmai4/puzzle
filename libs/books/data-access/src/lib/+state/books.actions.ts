import { createAction, props } from '@ngrx/store';
import { Book } from '@tmo/shared/models';

export const searchBooks = createAction(
  '[Books Search Bar] Search',
  props<{ term: string }>()
);

export const searchBooksSucceeded = createAction(
  '[Book Search API] Search success',
  props<{ books: Book[] }>()
);

export const searchBooksFailed = createAction(
  '[Book Search API] Search failure',
  props<{ error: any }>()
);

export const clearSearch = createAction('[Books Search Bar] Clear Search');
