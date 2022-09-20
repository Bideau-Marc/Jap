import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixExerciceComponent } from './choix-exercice.component';

describe('ChoixExerciceComponent', () => {
  let component: ChoixExerciceComponent;
  let fixture: ComponentFixture<ChoixExerciceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoixExerciceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoixExerciceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
