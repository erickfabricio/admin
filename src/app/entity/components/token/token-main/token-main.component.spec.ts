import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenMainComponent } from './token-main.component';

describe('TokenMainComponent', () => {
  let component: TokenMainComponent;
  let fixture: ComponentFixture<TokenMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
