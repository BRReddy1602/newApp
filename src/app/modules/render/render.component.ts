import { DataService } from './../../services/data.service';
declare var jquery: any;
declare var $: any;
import { MatSnackBar } from '@angular/material';
import { Component, Output, Renderer, Input, OnInit, EventEmitter, ViewChild, ElementRef, AfterContentInit, AfterViewChecked } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'render',
  templateUrl: './render.component.html',
  styleUrls: ['./render.component.css']
})
export class RenderComponent implements OnInit {
  renderObject: any;
  saveObject: any = {};
  data: any = {};
  reload:boolean = true;
  constructor(private dataService: DataService, public snackBar: MatSnackBar, public renderer: Renderer, public dialog: MatDialog, private elementRef: ElementRef) { }

  ngOnInit() {
    this.clearAllRadios();
    this.renderObject = this.dataService.render;
    for (var i = 0; i < this.renderObject.sections.length; i++) {
      var section = this.renderObject.sections[i];
      this.saveObject[section.sectionId] = {};
      for (var j = 0; j < section.fields.length; j++) {
        this.saveObject[section.sectionId][section.fields[j].propertyName] = '';
        if (section.fields[j].elementType === 5) {
          this.saveObject[section.sectionId][section.fields[j].propertyName] = {};
        }
      }
    }
    console.log(this.saveObject);
  }

  ngAfterContentChecked() {
    this.getHeightWidth();
  }

  getHeightWidth() {
    let height = ($('.nav-list')[0].offsetTop - $('.students-view .card')[0].offsetTop),
      width = $('.sidenav-body')[0].offsetWidth;
    this.data.width = width - 45;
    this.data.height = height - 82;;
  }

  checkboxChange(field, value) {
  }

  radioChange(row, x, section, field) {
    this.saveObject[section.sectionId][field.propertyName][row.id] = x.id;
  }

  save() {
    console.log(this.saveObject);
  }

  clearAllRadios() {
    var radList: any = $('input[type=radio]');
    for (var i = 0; i < radList.length; i++) {
      if (radList[i].checked) radList[i].checked = false;
    }
  }

}
