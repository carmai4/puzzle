import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList, ReadingListBook
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
  
  snackbardata = "Hello World";

  constructor(
    private readonly store: Store,
    private snackBarService: SnackBarService
  ) {}

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  showSnackBar() {
    this.snackBarService.openSnackBar('hello from book-grid-item!!!!', null);
  }
}
