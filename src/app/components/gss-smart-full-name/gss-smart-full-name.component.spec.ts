import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GssSmartFullNameComponent } from './gss-smart-full-name.component';

describe('GssSmartFullNameComponent', () => {
  let component: GssSmartFullNameComponent;
  let fixture: ComponentFixture<GssSmartFullNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GssSmartFullNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GssSmartFullNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
