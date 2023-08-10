import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationExerciceComponent } from './translation-exercice.component';

describe('TranslationExerciceComponent', () => {
  let component: TranslationExerciceComponent;
  let fixture: ComponentFixture<TranslationExerciceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranslationExerciceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranslationExerciceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
