import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleCrudComponent } from './module-crud.component';

describe('ModuleCrudComponent', () => {
  let component: ModuleCrudComponent;
  let fixture: ComponentFixture<ModuleCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
