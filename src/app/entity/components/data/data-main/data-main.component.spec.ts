import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataMainComponent } from './data-main.component';

describe('DataMainComponent', () => {
  let component: DataMainComponent;
  let fixture: ComponentFixture<DataMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
