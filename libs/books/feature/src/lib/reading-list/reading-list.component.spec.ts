import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from '@tmo/shared/testing';

import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';
import { provideMockStore } from '@ngrx/store/testing';
import { getReadingList } from '@tmo/books/data-access';

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;
  const list = [
    {
      bookId: '123456',
      title: 'Hello World',
      authors: ['a'],
      finished: true,
      finishedDate: '2020-01-01T12:00:00.000Z'
    },
    {
      bookId: '7894561523',
      title: 'Harry Potter',
      authors: ['J.K. Rowling'],
      finished: true,
      finishedDate: '2020-04-15T12:00:00.000Z'
    },
    {
      bookId: '456123789',
      title: 'Jane Eyre',
      authors: ['J.K. Rowling'],
      finished: true,
      finishedDate: '2019-10-15T12:00:00.000Z'
    },
    {
      bookId: 'asdf852369',
      title: 'Jane Eyre II',
      authors: ['anonymous']
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, SharedTestingModule],
      providers: [provideMockStore({
        selectors: [
          {
            selector: getReadingList,
            value: list
          }
        ]
      })]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shall render reading list', () => {
    const elem = fixture.debugElement.nativeElement;
    const items = elem.querySelectorAll('.reading-list-item');
    expect(items.length).toEqual(list.length);
    
    const finished = elem.querySelectorAll('.reading-list-item .finished button');
    expect(finished.length).toEqual(3);
    const finishedItemDetails = elem.querySelectorAll('.reading-list-item .finished-details');
    expect(finishedItemDetails.length).toEqual(3);
    const finishedDates = elem.querySelectorAll('.reading-list-item span.finished-date');
    expect(finishedDates.length).toEqual(3);
    
    expect(finishedDates[0].textContent.trim()).toEqual('01/01/20');
    expect(finishedDates[1].textContent.trim()).toEqual('04/15/20');
    expect(finishedDates[2].textContent.trim()).toEqual('10/15/19');

    const notFinished = elem.querySelectorAll('.reading-list-item .not-finished button');
    expect(notFinished.length).toEqual(1);
  });
});
