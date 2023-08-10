import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private _score: number = 0;
  private _attempts: number = 0;

  private _scoreSubject: BehaviorSubject<number> = new BehaviorSubject<number>(this._score);
  private _attemptsSubject: BehaviorSubject<number> = new BehaviorSubject<number>(this._attempts);

  readonly score$ = this._scoreSubject.asObservable();
  readonly attempts$ = this._attemptsSubject.asObservable();

  constructor() { }

  incrementScore() {
    this._score++;
    this._scoreSubject.next(this._score);
  }

  incrementAttempts() {
    this._attempts++;
    this._attemptsSubject.next(this._attempts);
  }

  resetAttempts() {
    this._attempts = 0;
    this._attemptsSubject.next(this._attempts);
  }
}
