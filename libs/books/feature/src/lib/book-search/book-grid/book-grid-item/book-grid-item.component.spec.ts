import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from '@tmo/shared/testing';
import { BooksFeatureModule } from '../../../books-feature.module';
import { BookGridItemComponent } from './book-grid-item.component';

describe('BookGridItemComponent', () => {
  let component: BookGridItemComponent;
  let fixture: ComponentFixture<BookGridItemComponent>;
  const book = {
      id: `${Date.now()}b`,
      title: `Some Title ${Math.floor(Math.random() * 9999)}b`,
      authors: ['a', 'b', 'c'],
      publisher: 'Some Publisher',
      publishedDate: new Date().toDateString(),
      description: 'n/a',
      isAdded: false
    };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, SharedTestingModule]
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
    const componentBook = fixture.debugElement.componentInstance.book;
    const elem = fixture.debugElement.nativeElement;
    expect(componentBook === book).toBe(true);
    expect(elem.querySelector('.book--title').textContent.trim()).toEqual(book.title);
    expect(elem.querySelector('[test-id=author]').textContent.trim()).toEqual(`Author: ${book.authors.join(',')}`);
    expect(elem.querySelector('[test-id=publisher]').textContent.trim()).toEqual(`Publisher: ${book.publisher}`);
    const publishedDateString = new Date(book.publishedDate).toLocaleDateString().substr(0, 8);
    expect(elem.querySelector('[test-id=published]').textContent.trim()).toEqual(`Published: ${publishedDateString}`);
  });
});
