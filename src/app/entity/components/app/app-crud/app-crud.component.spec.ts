import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCrudComponent } from './app-crud.component';

describe('AppCrudComponent', () => {
  let component: AppCrudComponent;
  let fixture: ComponentFixture<AppCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
