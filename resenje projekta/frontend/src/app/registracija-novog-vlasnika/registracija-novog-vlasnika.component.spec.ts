import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistracijaNovogVlasnikaComponent } from './registracija-novog-vlasnika.component';

describe('RegistracijaNovogVlasnikaComponent', () => {
  let component: RegistracijaNovogVlasnikaComponent;
  let fixture: ComponentFixture<RegistracijaNovogVlasnikaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistracijaNovogVlasnikaComponent]
    });
    fixture = TestBed.createComponent(RegistracijaNovogVlasnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
