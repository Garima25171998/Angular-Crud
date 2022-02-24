import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTransporterComponent } from './edit-transporter.component';

describe('EditTransporterComponent', () => {
  let component: EditTransporterComponent;
  let fixture: ComponentFixture<EditTransporterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTransporterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTransporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
