import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DataService } from './../../services/data.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'details-popup',
  templateUrl: './details-popup.component.html',
  styleUrls: ['./details-popup.component.css']
})
export class DetailsPopupComponent implements OnInit {
  rows: any;
  columns: any;
  showQuant: boolean = false;
  columnsTemp: any = [];
  initialData: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public snackBar: MatSnackBar, private dataService: DataService, public dialogRef: MatDialogRef<DetailsPopupComponent>) { }

  ngOnInit() {
    this.initialData = { ...this.data };
    if (this.data.field.values.length === 0 && this.data.field.elementType !== 5) {
      this.addValue();
    }
    this.rows = this.data.field.rows.length;
    this.columns = this.data.field.values.length;
    this.columnsTemp = [];
    for (var k = 0; k < this.columns; k++) {
      this.columnsTemp.push(k);
    }
  }

  ngAfterContentChecked() {
    this.getHeightWidth();
  }
  getHeightWidth() {
    this.data.width = $('.mat-dialog-container')[0].offsetWidth;
  }

  addValue() {
    this.data.field.values.push({
      id: '',
      label: ''
    });
  }
  showQuantTable() {
    this.data.field.rows = [];
    this.data.field.values = [];
    this.data.field.qualtative = [];
    for (var i = 0; i < this.rows; i++) {
      this.data.field.rows.push({ id: i, label: "" });
      var tempObj = [];
      for (var j = 0; j < this.columns; j++) {
        tempObj.push(true);
      }
      this.data.field.qualtative.push(tempObj);
    }
    this.columnsTemp = [];
    for (var x = 0; x < this.columns; x++) {
      this.data.field.values.push({ id: x, label: "" });
      this.columnsTemp.push(x);
    }
    this.showQuant = true;
  }
  private closePopup(flag, field) {
    this.data.update = flag;
    if (flag) {
      if (field.style.fontSize && field.style.fontSize.indexOf('px') === -1)
        field.style.fontSize = field.style.fontSize + 'px';
      this.dialogRef.close(this.data);
    }
    else
      this.dialogRef.close(this.initialData);
  }
}

