import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefineGridComponent } from './refine-grid.component';

describe('RefineGridComponent', () => {
  let component: RefineGridComponent;
  let fixture: ComponentFixture<RefineGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefineGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefineGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
