/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GradingComponent } from './grading.component';

describe('GradingComponent', () => {
  let component: GradingComponent;
  let fixture: ComponentFixture<GradingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
