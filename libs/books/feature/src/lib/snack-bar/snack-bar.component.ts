import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, MAT_SNACK_BAR_DATA, SimpleSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tmo-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {
  private show = true;
  private message = 'hello world';
  private type = 'success'; // success or danger

  constructor(
    public snackBar: MatSnackBar,
    public snackBarRef: MatSnackBarRef<SimpleSnackBar>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) { }

  ngOnInit() {

  }

  openSnackBar() {
    this.snackBarRef = this.snackBar.open('some message');
    this.snackBarRef.instance.snackBarRef = this.snackBarRef;
  }

  closeSnackBar() {
    this.snackBarRef.dismiss();
  }
}
