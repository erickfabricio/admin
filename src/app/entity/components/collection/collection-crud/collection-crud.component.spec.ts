import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionCrudComponent } from './collection-crud.component';

describe('CollectionCrudComponent', () => {
  let component: CollectionCrudComponent;
  let fixture: ComponentFixture<CollectionCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
