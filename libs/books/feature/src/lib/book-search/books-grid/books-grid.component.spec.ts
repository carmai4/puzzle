import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from '@tmo/shared/testing';
import { BooksGridComponent } from './books-grid.component';
import { BooksFeatureModule } from '../../books-feature.module';

describe('BooksGridComponent', () => {
  let component: BooksGridComponent;
  let fixture: ComponentFixture<BooksGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, SharedTestingModule]
    }).compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(BooksGridComponent);
    component = fixture.componentInstance;
    component.books = [{
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
