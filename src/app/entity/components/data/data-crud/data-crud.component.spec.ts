import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCrudComponent } from './data-crud.component';

describe('DataCrudComponent', () => {
  let component: DataCrudComponent;
  let fixture: ComponentFixture<DataCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
