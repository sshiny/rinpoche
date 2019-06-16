import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirementPage } from './retirement.page';

describe('RetirementPage', () => {
  let component: RetirementPage;
  let fixture: ComponentFixture<RetirementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetirementPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetirementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
