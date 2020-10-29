import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList, markBookFinished, markBookNotFinished } from '@tmo/books/data-access';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }

  markBookFinished(item) {
    this.store.dispatch(markBookFinished({ item: { ...item, finishedDate: new Date().toISOString() } }));
  }

  markBookNotFinished(item) {
    this.store.dispatch(markBookNotFinished({ item: { ...item, finished: false, finishedDate: undefined } }));
  }
}
