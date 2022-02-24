import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDisposalExecutionComponent } from './edit-disposal-execution.component';

describe('EditDisposalExecutionComponent', () => {
  let component: EditDisposalExecutionComponent;
  let fixture: ComponentFixture<EditDisposalExecutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDisposalExecutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDisposalExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
