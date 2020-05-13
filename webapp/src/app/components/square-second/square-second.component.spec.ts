import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SquareSecondComponent } from './square-second.component';

describe('SquareSecondComponent', () => {
  let component: SquareSecondComponent;
  let fixture: ComponentFixture<SquareSecondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SquareSecondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SquareSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
