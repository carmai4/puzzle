import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReadingListItem } from '@tmo/shared/models';
import * as ReadingListActions from './reading-list.actions';
import { Store } from '@ngrx/store';
import { _runtimeChecksFactory } from '@ngrx/store/src/runtime_checks';

@Injectable()
export class ReadingListEffects implements OnInitEffects {
  loadReadingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.init),
      exhaustMap(() =>
        this.http.get<ReadingListItem[]>('/api/reading-list').pipe(
          map((data) =>
            ReadingListActions.loadReadingListSucceeded({ list: data })
          ),
          catchError((error) =>
            of(ReadingListActions.loadReadingListFailed({ error }))
          )
        )
      )
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.addToReadingList),
      concatMap(({ book }) =>
        this.http.post('/api/reading-list', book).pipe(
          map(() => ReadingListActions.addToReadingListSucceeded({ book })),
          catchError(() =>
            of(ReadingListActions.addToReadingListFailed({ book }))
          )
        )
      )
    )
  );

  addToReadingListSucceeded$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ReadingListActions.addToReadingListSucceeded),
      map(({ book }) => {
        const { id, ...rest } = book;
        const item = {
          bookId: book.id,
          ...rest
        };
        this._showSnackBar(
          'Added to reading list',
          'Undo',
          () => this.store.dispatch(ReadingListActions.undoAddToReadingList({ item }))
        );
      })
    )
  }, { dispatch: false });

  undoAddBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.undoAddToReadingList),
      concatMap(({ item }) =>
        this.http.delete(`/api/reading-list/${item.bookId}`).pipe(
          map(() =>
            ReadingListActions.removeFromReadingListSucceeded({ item })
          ),
          catchError(() =>
            of(ReadingListActions.removeFromReadingListFailed({ item }))
          )
        )
      )
    )
  );

  removeBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.removeFromReadingList),
      concatMap(({ item }) =>
        this.http.delete(`/api/reading-list/${item.bookId}`).pipe(
          map(() => {
            return ReadingListActions.removeFromReadingListSucceeded({ item })
          }),
          catchError(() =>
            of(ReadingListActions.removeFromReadingListFailed({ item }))
          )
        )
      )
    )
  );

  removeFromReadingListSucceeded$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ReadingListActions.removeFromReadingListSucceeded),
      map(({ item }) => {
        const { bookId, ...rest } = item;
        const book = {
          id: item.bookId,
          ...rest
        };
        this._showSnackBar(
          'Removed from reading list',
          'Undo',
          () => this.store.dispatch(ReadingListActions.undoRemoveFromReadingList({ book }))
        );
      })
    )
  }, { dispatch: false });

  undoRemoveBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.undoRemoveFromReadingList),
      concatMap(({ book }) =>
        this.http.post('/api/reading-list', book).pipe(
          map(() => ReadingListActions.addToReadingListSucceeded({ book })),
          catchError(() =>
            of(ReadingListActions.addToReadingListFailed({ book }))
          )
        )
      )
    )
  );

  ngrxOnInitEffects() {
    return ReadingListActions.init();
  }

  _showSnackBar = (text: string, actionText: string, action: any, duration?: number) => {
    this.snackBar.open(text, actionText, { duration: duration || 5000 })
      .instance.action = action
  };

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private readonly store: Store
  ) {}
}
