import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenCrudComponent } from './token-crud.component';

describe('TokenCrudComponent', () => {
  let component: TokenCrudComponent;
  let fixture: ComponentFixture<TokenCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
