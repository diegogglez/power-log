import { workoutSeed } from './../../utils/workoutSeed';
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Subject } from 'rxjs'
import { RMItem } from '../models/rms';
import { Workout } from '../models/workouts';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private refresh$ = new Subject<void>();

  constructor() { }

  get refresh() {
    return this.refresh$;
  }

  async getRMs() {
    const rmHistory = await Preferences.get({key: 'RMs'})
    
    if(!rmHistory.value) {
      const defaultRMCollection: RMItem[] = [];
      await Preferences.set({key: 'RMs', value: JSON.stringify(defaultRMCollection)})
    }
    
    return JSON.parse(rmHistory.value || '[]');
  }

  async addRM(rm: RMItem) {
    const rmHistory = await this.getRMs();
    rmHistory.unshift(rm); 
    console.log(rmHistory);
    await Preferences.set({key: 'RMs', value: JSON.stringify(rmHistory)})
    .then(() => this.refresh$.next());
  }

  async deleteRM(rm: RMItem) {
    const rmHistory = await this.getRMs(); 
    const index = rmHistory.findIndex((item: RMItem) => item.id === rm.id)
    console.log(index);
    rmHistory.splice(index, 1);
    await Preferences.set({key: 'RMs', value: JSON.stringify(rmHistory)})
    .then(() => this.refresh$.next());
  }

  async workoutSeed() {
    const emptyWorkouts: Workout[] = [];
    await Preferences.set({key: 'workouts', value: JSON.stringify(emptyWorkouts)});
    await Preferences.set({key: 'workouts', value: JSON.stringify(workoutSeed)});
  }

  async getWorkouts() {
    const workoutsSaved = await Preferences.get({key: 'workouts'})
    
    if(!workoutsSaved.value) {
      const defaultWorkoutsCollection: Workout[] = [];
      await Preferences.set({key: 'workouts', value: JSON.stringify(defaultWorkoutsCollection)})
    }
    
    return JSON.parse(workoutsSaved.value || '[]');
  }

  async addWorkout(workout: Workout) {
    const workoutsSaved = await this.getWorkouts();
    workoutsSaved.unshift(workout); 
    console.log(workoutsSaved);
    await Preferences.set({key: 'workouts', value: JSON.stringify(workoutsSaved)})
      .then(() => this.refresh$.next());
  }

  async deleteWorkout(workout: Workout) {
    const workoutsSaved = await this.getWorkouts();
    console.log(workoutsSaved);    
    const index = workoutsSaved.findIndex((item: Workout) => item.id === workout.id)
    console.log(index);
    workoutsSaved.splice(index, 1);
    await Preferences.set({key: 'workouts', value: JSON.stringify(workoutsSaved)})
    .then(() => this.refresh$.next());
  }
}
