import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDisposalComponent } from './edit-disposal.component';

describe('EditDisposalComponent', () => {
  let component: EditDisposalComponent;
  let fixture: ComponentFixture<EditDisposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDisposalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDisposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
