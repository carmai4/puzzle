import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { BookGridItemComponent } from './book-grid-item.component';

describe('BookGridItemComponent', () => {
  let component: BookGridItemComponent;
  let fixture: ComponentFixture<BookGridItemComponent>;
  const book = {
      id: 'asdfjkl',
      title: 'A Thousand Splendid Suns',
      authors: ['Khaled Hosseini'],
      publisher: 'Some Publisher',
      publishedDate: '10/01/1988',
      description: 'A breathtaking story set against the volatile events of Afghanistan\'s last thirty years',
      isAdded: false
    };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({})],
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
    expect(elem.querySelector('.book--title').textContent.trim()).toEqual('A Thousand Splendid Suns');
    expect(elem.querySelector('[test-id=author]').textContent.trim()).toEqual('Author: Khaled Hosseini');
    expect(elem.querySelector('[test-id=publisher]').textContent.trim()).toEqual('Publisher: Some Publisher');
    expect(elem.querySelector('[test-id=published]').textContent.trim()).toEqual('Published: 10/01/88');
    expect(elem.querySelector('[test-id=description]').innerHTML.trim())
      .toEqual('A breathtaking story set against the volatile events of Afghanistan\'s last thirty years');
  });
});
