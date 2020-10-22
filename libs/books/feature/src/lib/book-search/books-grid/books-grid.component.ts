import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  ReadingListBook
} from '@tmo/books/data-access';

@Component({
  selector: 'tmo-books-grid',
  templateUrl: './books-grid.component.html',
  styleUrls: ['./books-grid.component.scss']
})
export class BooksGridComponent implements OnInit {

  constructor() {}
  
  @Input() books: ReadingListBook[];

  ngOnInit(): void {
  }
}
