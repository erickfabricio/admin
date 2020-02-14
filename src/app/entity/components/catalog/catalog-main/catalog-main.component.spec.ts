import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogMainComponent } from './catalog-main.component';

describe('CatalogMainComponent', () => {
  let component: CatalogMainComponent;
  let fixture: ComponentFixture<CatalogMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
