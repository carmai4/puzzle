import { Component, Inject, OnChanges } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'tmo-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnChanges {

  clicked = false;

  constructor(
    public snackBarRef: MatSnackBarRef<SnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: { snackBarText: string, actionText: string, action: any }
  ) { }

  ngOnChanges() {
    this.clicked = false;
  }
}
