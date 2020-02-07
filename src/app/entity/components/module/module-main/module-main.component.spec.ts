import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleMainComponent } from './module-main.component';

describe('ModuleMainComponent', () => {
  let component: ModuleMainComponent;
  let fixture: ComponentFixture<ModuleMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
