import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogCrudComponent } from './catalog-crud.component';

describe('CatalogCrudComponent', () => {
  let component: CatalogCrudComponent;
  let fixture: ComponentFixture<CatalogCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
