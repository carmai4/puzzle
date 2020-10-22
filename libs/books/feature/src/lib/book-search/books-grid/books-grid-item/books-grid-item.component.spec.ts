import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from '@tmo/shared/testing';
import { BooksFeatureModule } from '../../../books-feature.module';
import { BooksGridItemComponent } from './books-grid-item.component';

describe('BooksGridItemComponent', () => {
  let component: BooksGridItemComponent;
  let fixture: ComponentFixture<BooksGridItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, SharedTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksGridItemComponent);
    component = fixture.componentInstance;
    component.book = {
      id: `${Date.now()}b`,
      title: `Some Title ${Math.floor(Math.random() * 9999)}b`,
      authors: ['a', 'b', 'c'],
      description: 'n/a',
      isAdded: false
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
