import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { SnackBarComponent } from './snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  private snackBarSubject = new Subject<any>();
  public snackBarState = this.snackBarSubject.asObservable();
  configSuccess: MatSnackBarConfig = {
    panelClass: 'style-success',
    duration: 6000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom'
  };

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(data: { snackBarText: string, actionText: string, action: any }) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data,
      ...this.configSuccess
    })
  }
}
