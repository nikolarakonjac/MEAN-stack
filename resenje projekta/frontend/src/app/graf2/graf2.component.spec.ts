import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Graf2Component } from './graf2.component';

describe('Graf2Component', () => {
  let component: Graf2Component;
  let fixture: ComponentFixture<Graf2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Graf2Component]
    });
    fixture = TestBed.createComponent(Graf2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
