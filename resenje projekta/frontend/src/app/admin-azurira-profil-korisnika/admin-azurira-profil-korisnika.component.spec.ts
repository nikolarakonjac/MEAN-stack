import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAzuriraProfilKorisnikaComponent } from './admin-azurira-profil-korisnika.component';

describe('AdminAzuriraProfilKorisnikaComponent', () => {
  let component: AdminAzuriraProfilKorisnikaComponent;
  let fixture: ComponentFixture<AdminAzuriraProfilKorisnikaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAzuriraProfilKorisnikaComponent]
    });
    fixture = TestBed.createComponent(AdminAzuriraProfilKorisnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
