import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList, ReadingListBook
} from '@tmo/books/data-access';
import { Book } from '@tmo/shared/models';

@Component({
  selector: 'tmo-book-grid-item',
  templateUrl: './book-grid-item.component.html',
  styleUrls: ['./book-grid-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BookGridItemComponent {

  @Input() book: ReadingListBook;

  constructor(
    private readonly store: Store
  ) {}

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }
}
