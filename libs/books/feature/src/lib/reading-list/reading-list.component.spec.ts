import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from '@tmo/shared/testing';

import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';
import { SnackBarService } from '../snack-bar/snack-bar.service';

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;
  let snackBarServiceStub: Partial<SnackBarService>;

  beforeEach(async(() => {
    snackBarServiceStub = {};
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, SharedTestingModule],
      providers: [{ provide: SnackBarService, useValue: snackBarServiceStub }]
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
});
