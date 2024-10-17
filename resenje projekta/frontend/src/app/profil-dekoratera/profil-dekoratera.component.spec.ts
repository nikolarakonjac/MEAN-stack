import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilDekorateraComponent } from './profil-dekoratera.component';

describe('ProfilDekorateraComponent', () => {
  let component: ProfilDekorateraComponent;
  let fixture: ComponentFixture<ProfilDekorateraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilDekorateraComponent]
    });
    fixture = TestBed.createComponent(ProfilDekorateraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
