import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeformComponent } from './exchangeform.component';

describe('ExchangeformComponent', () => {
  let component: ExchangeformComponent;
  let fixture: ComponentFixture<ExchangeformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExchangeformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExchangeformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
