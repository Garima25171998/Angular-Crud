import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisposalExecutionListComponent } from './disposal-execution-list.component';

describe('DisposalExecutionListComponent', () => {
  let component: DisposalExecutionListComponent;
  let fixture: ComponentFixture<DisposalExecutionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisposalExecutionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisposalExecutionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
