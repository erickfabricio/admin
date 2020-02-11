import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogCrudComponent } from './log-crud.component';

describe('LogCrudComponent', () => {
  let component: LogCrudComponent;
  let fixture: ComponentFixture<LogCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
