import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DekoraterPocetnaComponent } from './dekorater-pocetna.component';

describe('DekoraterPocetnaComponent', () => {
  let component: DekoraterPocetnaComponent;
  let fixture: ComponentFixture<DekoraterPocetnaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DekoraterPocetnaComponent]
    });
    fixture = TestBed.createComponent(DekoraterPocetnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
