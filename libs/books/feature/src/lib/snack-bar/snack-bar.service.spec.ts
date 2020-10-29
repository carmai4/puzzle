import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { SnackBarService } from './snack-bar.service';

describe('SnackBarService', () => {
  let service: SnackBarService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [MatSnackBar]
    });
    snackBar = TestBed.inject(MatSnackBar);
    service = TestBed.inject(SnackBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
