import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendantsPage } from './attendants.page';

describe('AttendantsPage', () => {
  let component: AttendantsPage;
  let fixture: ComponentFixture<AttendantsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendantsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendantsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
