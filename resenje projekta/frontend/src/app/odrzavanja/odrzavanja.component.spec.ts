import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdrzavanjaComponent } from './odrzavanja.component';

describe('OdrzavanjaComponent', () => {
  let component: OdrzavanjaComponent;
  let fixture: ComponentFixture<OdrzavanjaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OdrzavanjaComponent]
    });
    fixture = TestBed.createComponent(OdrzavanjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
