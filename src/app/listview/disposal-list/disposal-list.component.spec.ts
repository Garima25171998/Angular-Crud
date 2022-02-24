import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisposalListComponent } from './disposal-list.component';

describe('DisposalListComponent', () => {
  let component: DisposalListComponent;
  let fixture: ComponentFixture<DisposalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisposalListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisposalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
