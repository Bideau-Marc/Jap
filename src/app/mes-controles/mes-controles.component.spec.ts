import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesControlesComponent } from './mes-controles.component';

describe('MesControlesComponent', () => {
  let component: MesControlesComponent;
  let fixture: ComponentFixture<MesControlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesControlesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesControlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
