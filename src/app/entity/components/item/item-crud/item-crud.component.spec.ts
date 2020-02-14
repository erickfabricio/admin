import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCrudComponent } from './item-crud.component';

describe('ItemCrudComponent', () => {
  let component: ItemCrudComponent;
  let fixture: ComponentFixture<ItemCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
