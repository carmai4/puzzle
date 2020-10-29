import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SnackBarComponent } from './snack-bar.component';

describe('SnackBarComponent', () => {
  let component: SnackBarComponent;
  let fixture: ComponentFixture<SnackBarComponent>;
  const data = {snackBarText: 'main text', actionText: 'action text', action: () => {}};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule, MatSnackBarModule, BrowserAnimationsModule],
      declarations: [SnackBarComponent],
      providers: [
        { provide: MatSnackBarRef, useValue: {}},
        { provide: MAT_SNACK_BAR_DATA, useValue: data }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shall render correctly', () => {
    const elem = fixture.debugElement.nativeElement;
    expect(elem.querySelectorAll('.snack-bar-header').length).toEqual(1);
    expect(elem.querySelectorAll('.snack-bar-body').length).toEqual(1);
    expect(elem.querySelectorAll('button.dismiss').length).toEqual(1);
    expect(elem.querySelectorAll('span.snack-bar-text').length).toEqual(1);
    expect(elem.querySelectorAll('button.action').length).toEqual(1);
  });
});
