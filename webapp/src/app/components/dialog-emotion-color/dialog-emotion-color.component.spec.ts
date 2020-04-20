import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEmotionColorComponent } from './dialog-emotion-color.component';

describe('DialogEmotionColorComponent', () => {
  let component: DialogEmotionColorComponent;
  let fixture: ComponentFixture<DialogEmotionColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEmotionColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEmotionColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
