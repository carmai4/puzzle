import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList, ReadingListBook
} from '@tmo/books/data-access';
import { Book } from '@tmo/shared/models';

@Component({
  selector: 'tmo-books-grid-item',
  templateUrl: './books-grid-item.component.html',
  styleUrls: ['./books-grid-item.component.scss']
})
export class BooksGridItemComponent implements OnInit {

  @Input() book: ReadingListBook;

  constructor(
    private readonly store: Store
  ) {}

  ngOnInit(): void {
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }
}
