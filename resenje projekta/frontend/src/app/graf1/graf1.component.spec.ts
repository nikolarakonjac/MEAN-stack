import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Graf1Component } from './graf1.component';

describe('Graf1Component', () => {
  let component: Graf1Component;
  let fixture: ComponentFixture<Graf1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Graf1Component]
    });
    fixture = TestBed.createComponent(Graf1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
