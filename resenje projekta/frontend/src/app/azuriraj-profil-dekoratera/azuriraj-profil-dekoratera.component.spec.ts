import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzurirajProfilDekorateraComponent } from './azuriraj-profil-dekoratera.component';

describe('AzurirajProfilDekorateraComponent', () => {
  let component: AzurirajProfilDekorateraComponent;
  let fixture: ComponentFixture<AzurirajProfilDekorateraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AzurirajProfilDekorateraComponent]
    });
    fixture = TestBed.createComponent(AzurirajProfilDekorateraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
