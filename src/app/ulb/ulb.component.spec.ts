import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ULBComponent } from './ulb.component';

describe('ULBComponent', () => {
  let component: ULBComponent;
  let fixture: ComponentFixture<ULBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ULBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ULBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
