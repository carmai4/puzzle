import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList, ReadingListBook, undoAddToReadingList
} from '@tmo/books/data-access';
import { Book } from '@tmo/shared/models';
import { SnackBarService } from '../../../snack-bar/snack-bar.service';

@Component({
  selector: 'tmo-book-grid-item',
  templateUrl: './book-grid-item.component.html',
  styleUrls: ['./book-grid-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BookGridItemComponent {

  @Input() book: ReadingListBook;  

  constructor(
    private readonly store: Store,
    private snackBarService: SnackBarService
  ) {}

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  undoAddBookToReadingList(book:Book) {
    const { id, ...rest } = book;
    const item = {
      bookId: book.id,
      ...rest
    };
    this.store.dispatch(undoAddToReadingList({ item }));
  }

  showSnackBar(book: Book) {
    this.snackBarService.openSnackBar({
      snackBarText: 'Added to reading list',
      actionText: 'Undo',
      action: () => this.undoAddBookToReadingList(book)
    });
  }
}
