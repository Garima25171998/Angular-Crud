import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectioncenterComponent } from './collectioncenter.component';

describe('CollectioncenterComponent', () => {
  let component: CollectioncenterComponent;
  let fixture: ComponentFixture<CollectioncenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectioncenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectioncenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
