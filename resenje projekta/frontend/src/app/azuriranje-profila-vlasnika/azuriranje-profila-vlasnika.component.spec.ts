import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzuriranjeProfilaVlasnikaComponent } from './azuriranje-profila-vlasnika.component';

describe('AzuriranjeProfilaVlasnikaComponent', () => {
  let component: AzuriranjeProfilaVlasnikaComponent;
  let fixture: ComponentFixture<AzuriranjeProfilaVlasnikaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AzuriranjeProfilaVlasnikaComponent]
    });
    fixture = TestBed.createComponent(AzuriranjeProfilaVlasnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
