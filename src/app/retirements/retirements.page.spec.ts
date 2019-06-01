import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirementsPage } from './retirements.page';

describe('RetirementsPage', () => {
  let component: RetirementsPage;
  let fixture: ComponentFixture<RetirementsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetirementsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetirementsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
