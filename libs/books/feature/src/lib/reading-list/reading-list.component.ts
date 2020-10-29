import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList, undoRemoveFromReadingList } from '@tmo/books/data-access';
import { ReadingListItem } from '@tmo/shared/models';
import { SnackBarService } from '../snack-bar/snack-bar.service';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(
    private readonly store: Store,
    private snackBarService: SnackBarService
  ) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }

  undoRemoveFromReadingList(item: ReadingListItem) {
    const { bookId, ...rest } = item;
    const book = {
      id: item.bookId,
      ...rest
    };
    this.store.dispatch(undoRemoveFromReadingList({ book }));
  }

  showSnackBar(item: ReadingListItem) {
    this.snackBarService.openSnackBar({
      snackBarText: 'Removed from reading list',
      actionText: 'Undo',
      action: () => this.undoRemoveFromReadingList(item)
    });
  }
}
