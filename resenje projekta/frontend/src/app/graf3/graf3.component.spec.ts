import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Graf3Component } from './graf3.component';

describe('Graf3Component', () => {
  let component: Graf3Component;
  let fixture: ComponentFixture<Graf3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Graf3Component]
    });
    fixture = TestBed.createComponent(Graf3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
