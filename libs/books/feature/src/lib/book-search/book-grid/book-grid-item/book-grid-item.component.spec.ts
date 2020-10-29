import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { getReadingList } from '@tmo/books/data-access';
import { BookGridItemComponent } from './book-grid-item.component';

describe('BookGridItemComponent', () => {
  let component: BookGridItemComponent;
  let fixture: ComponentFixture<BookGridItemComponent>;
  const book = {
      id: 'asdfjkl',
      title: 'A Thousand Splendid Suns',
      authors: ['Khaled Hosseini'],
      publisher: 'Some Publisher',
      publishedDate: '10/01/88',
      description: 'A breathtaking story set against the volatile events of Afghanistan\'s last thirty years',
      isAdded: false
    };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({
        selectors: [
          {
            selector: getReadingList,
            value: [
              {
                bookId: 'asdfjkl',
                title: 'A Thousand Splendid Suns',
                authors: ['Khaled Hosseini'],
                publisher: 'Some Publisher',
                publishedDate: '10/01/88',
                description: 'A breathtaking story set against the volatile events of Afghanistan\'s last thirty years',
                isAdded: false
              },
              {
                bookId: 'poiuytre',
                title: 'A Thousand Splendid Suns II',
                authors: ['Khaled Hosseini'],
                publisher: 'Some Publisher',
                publishedDate: '10/01/98',
                description: 'A breathtaking story set against the volatile events of Afghanistan\'s last thirty years',
                isAdded: false
              }
            ]
          }
        ]
      })],
      declarations: [BookGridItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookGridItemComponent);
    component = fixture.componentInstance;
    component.book = book;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shall render book as expected', () => {
    const elem = fixture.debugElement.nativeElement;

    expect(elem.querySelector('.book--title').textContent.trim()).toEqual(book.title);
    expect(elem.querySelector('[test-id=author]').textContent.trim()).toEqual(`Author: ${book.authors.join(',')}`);
    expect(elem.querySelector('[test-id=publisher]').textContent.trim()).toEqual(`Publisher: ${book.publisher}`);
    expect(elem.querySelector('[test-id=published]').textContent.trim()).toEqual(`Published: ${book.publishedDate}`);
    expect(elem.querySelector('[test-id=description]').innerHTML.trim()).toEqual(book.description);
  });
});
