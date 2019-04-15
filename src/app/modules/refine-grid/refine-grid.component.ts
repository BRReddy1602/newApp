import { DataService } from './../../services/data.service';
declare var jquery: any;
declare var $: any;
import { MatSnackBar } from '@angular/material';
import { Component, Output, Renderer, Input, OnInit, EventEmitter, ViewChild, ElementRef, AfterContentInit, AfterViewChecked } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DetailsPopupComponent } from './../../components/details-popup/details-popup.component';

@Component({
  selector: 'refine-grid',
  templateUrl: './refine-grid.component.html',
  styleUrls: ['./refine-grid.component.css']
})
export class RefineGridComponent implements OnInit {
  @Input() refineData?: any = {};
  frontVisible: boolean = true;
  user: any;
  data: any = {};
  callGrid: boolean;
  fields: any = [];
  newRecord: any = {};
  years: any = [];
  showSections: any = false;
  sectionTypes: any = [
    {
      id: 'qual',
      name: 'Qualtative Section'
    },
    {
      id: 'quant',
      name: 'Quantative Section'
    }];

  elementTypes: any = [
    {
      id: 1,
      name: 'input'
    },
    {
      id: 2,
      name: 'radio'
    },
    {
      id: 3,
      name: 'checkbox'
    },
    {
      id: 4,
      name: 'dropdown'
    },
    // {
    //   id: 5,
    //   name: 'Qualtative Section'
    // }
  ];
  constructor(private dataService: DataService, public snackBar: MatSnackBar, public renderer: Renderer, public dialog: MatDialog, private elementRef: ElementRef) { }

  ngOnInit() {
    this.newRecord = this.refineData;
    this.user = this.dataService.user;
    let today = new Date();
    for (let i = 1990; i <= today.getFullYear(); i++) {
      this.years.push({ id: i });
    };
  }

  ngAfterContentChecked() {
    this.getHeightWidth();
  }

  getHeightWidth() {
    let height = ($('.nav-list')[0].offsetTop - $('.students-view .card')[0].offsetTop),
      width = $('.sidenav-body')[0].offsetWidth;
    this.data.width = width - 45;
    this.data.height = height - 82;;
    this.data.showFilter = true;
    this.data.showFooter = false;
    this.data.updatable = true;
    this.data.deletable = true;
  }

  checkSections() {
    if (this.newRecord.gridName && this.newRecord.gridCode && !this.newRecord.sections.length) {
      this.addSection();
      this.showSections = true;
    }
    else if (!this.newRecord.gridCode) {
      this.snackBar.open('Enter Grid Code', 'Ok', {
        duration: 5000,
      });
    }
    else if (!this.newRecord.gridName) {
      this.snackBar.open('Enter Grid Name', 'Ok', {
        duration: 5000,
      });
    }
  }

  addSection() {
    this.newRecord.sections.push({
      sectionId: this.newRecord.sections.length + 1,
      sectionType: '',
      sectionName: '',
      label: '',
      fields: []
    });

    this.addMetrics(this.newRecord.sections[this.newRecord.sections.length - 1]);
  }

  deleteSection(section) {
    let index = this.newRecord.sections.indexOf(section);
    this.newRecord.sections.splice(index, 1);
  }

  addMetrics(section) {
    section.fields.push({
      propertyName: '',
      label: '',
      elementType: '',
      values: [],
      qualtative: [],
      rows: [],
      validation: {},
      style: {}
    });
  }

  deleteMetric(section, field) {
    let index = section.fields.indexOf(field);
    section.fields.splice(index, 1);
  }

  save() {
    console.log(this.newRecord);
    this.dataService.render = this.newRecord;
  }

  flip() {
    $('.card').toggleClass('flipped');
    this.frontVisible = !this.frontVisible;
  }

  moreDetails(section, field) {
    if (section.sectionType === "qual") {
      field.elementType = 5;
    }
    var data = {
      field: field
    };
    let dialogRef = this.dialog.open(DetailsPopupComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        field = result.field;
      }
    });
  }
}


