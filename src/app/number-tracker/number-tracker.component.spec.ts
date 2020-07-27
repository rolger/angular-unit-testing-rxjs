import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberTrackerComponent } from './number-tracker.component';

describe('NumberTrackerComponent', () => {
  let component: NumberTrackerComponent;
  let fixture: ComponentFixture<NumberTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
