import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisposalExecutionComponent } from './disposal-execution.component';

describe('DisposalExecutionComponent', () => {
  let component: DisposalExecutionComponent;
  let fixture: ComponentFixture<DisposalExecutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisposalExecutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisposalExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
