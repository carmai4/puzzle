import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  private snackBarSubject = new Subject<any>();
  public snackBarState = this.snackBarSubject.asObservable();
  constructor(private snackBar: MatSnackBar) { }

  /*
  show(message: string, type?: string) {
    this.snackBarSubject.next({
      show: true,
      message,
      type
    });
  }
  */
 openSnackBar(message: string, action: string) {
   this.snackBar.open(message, action, {
     duration: 5000
   });
 }
}
