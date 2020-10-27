import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookGridComponent } from './book-grid.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BookGridComponent', () => {
  let component: BookGridComponent;
  let fixture: ComponentFixture<BookGridComponent>;
  const books = [{
    id: 'asdfjkl',
    title: 'Harry Potter and the Order of the Phoenix',
    authors: ['J.K. Rowling'],
    publisher: 'ASDF',
    publishedDate: '01/01/2000',
    description: 'n/a',
    isAdded: false
  },
  {
    id: 'qwerty',
    title: 'Gone with the Wind',
    authors: ['Margaret Mitchell'],
    publisher: 'ASDF',
    publishedDate: '10/24/1950',
    description: 'n/a',
    isAdded: false
  }
];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookGridComponent],
      schemas: [NO_ERRORS_SCHEMA]
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

  it('shall render correct number of books', () => {
    const elem = fixture.debugElement.nativeElement;
    const bookCount = elem.querySelectorAll('tmo-book-grid-item').length;
    expect(bookCount).toEqual(component.books.length);
  });
});
