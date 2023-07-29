import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleOldComponent } from './controle-old.component';

describe('ControleOldComponent', () => {
  let component: ControleOldComponent;
  let fixture: ComponentFixture<ControleOldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControleOldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControleOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
