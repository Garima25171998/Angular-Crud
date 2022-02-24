import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCollectioncenterComponent } from './edit-collectioncenter.component';

describe('EditCollectioncenterComponent', () => {
  let component: EditCollectioncenterComponent;
  let fixture: ComponentFixture<EditCollectioncenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCollectioncenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCollectioncenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
