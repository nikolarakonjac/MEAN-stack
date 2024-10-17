import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VlasnikPocetnaComponent } from './vlasnik-pocetna.component';

describe('VlasnikPocetnaComponent', () => {
  let component: VlasnikPocetnaComponent;
  let fixture: ComponentFixture<VlasnikPocetnaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VlasnikPocetnaComponent]
    });
    fixture = TestBed.createComponent(VlasnikPocetnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
