import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  isWorkingOut$ = new Subject<boolean>();

  constructor() { }

  get isWorkingout() {
    return this.isWorkingOut$;
  }
}
