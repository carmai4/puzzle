import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToReadingList, ReadingListBook, getReadingList } from '@tmo/books/data-access';
import { Book } from '@tmo/shared/models';

@Component({
  selector: 'tmo-book-grid-item',
  templateUrl: './book-grid-item.component.html',
  styleUrls: ['./book-grid-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BookGridItemComponent implements OnInit {

  @Input() book: ReadingListBook;
  isFinished: boolean;

  constructor(
    private readonly store: Store
  ) {}

  ngOnInit() {
    this.setIsFinished(this.book);
  }

  setIsFinished(book) {
    this.store.select(getReadingList).subscribe(
      list => {
        const found = list.find(item => item.bookId === book.id);
        this.isFinished = found?.finished;
      }
    ).unsubscribe();
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }
}
