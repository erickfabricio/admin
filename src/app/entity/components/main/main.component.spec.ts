import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityMainComponent } from './main.component';

describe('EntityMainComponent', () => {
  let component: EntityMainComponent;
  let fixture: ComponentFixture<EntityMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
