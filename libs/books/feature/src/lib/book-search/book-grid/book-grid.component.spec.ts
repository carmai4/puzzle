import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from '@tmo/shared/testing';
import { BookGridComponent } from './book-grid.component';
import { BooksFeatureModule } from '../../books-feature.module';

describe('BookGridComponent', () => {
  let component: BookGridComponent;
  let fixture: ComponentFixture<BookGridComponent>;
  const books = [{
    id: `${Date.now()}a`,
    title: `Some Title ${Math.floor(Math.random() * 9999)}a`,
    authors: ['a', 'b', 'c'],
    description: 'n/a',
    isAdded: false
  },
  {
    id: `${Date.now()}b`,
    title: `Some Title ${Math.floor(Math.random() * 9999)}b`,
    authors: ['a', 'b', 'c'],
    description: 'n/a',
    isAdded: false
  }
];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, SharedTestingModule]
    }).compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(BookGridComponent);
    component = fixture.componentInstance;
    component.books = books;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shall render books as expected', () => {
    const componentBooks = fixture.debugElement.componentInstance.books;
    const elem = fixture.debugElement.nativeElement;
    const bookItemSelector = 'tmo-book-grid-item';

    expect(componentBooks.length).toEqual(books.length);
    books.forEach((b, i) => {
      expect(b === componentBooks[i]).toBe(true);
    });
    const bookCount = elem.querySelectorAll(bookItemSelector).length;
    expect(bookCount).toEqual(componentBooks.length);
  });
});
