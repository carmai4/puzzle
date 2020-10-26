import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  ReadingListBook
} from '@tmo/books/data-access';

@Component({
  selector: 'tmo-book-grid',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookGridComponent {

  constructor() {}
  
  @Input() books: ReadingListBook[];
}
