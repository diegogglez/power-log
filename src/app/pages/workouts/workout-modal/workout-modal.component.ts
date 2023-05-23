import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Exercise, Workout } from 'src/app/models/workouts';
import { StorageService } from 'src/app/services/storage.service';
import { v4 as uuidv4 } from 'uuid'

@Component({
  selector: 'app-workout-modal',
  templateUrl: './workout-modal.component.html',
  styleUrls: ['./workout-modal.component.scss'],
  standalone: true,
  imports: [ IonicModule, FormsModule, CommonModule ]
})
export class WorkoutModalComponent  implements OnInit {

  @Input() workout!: Workout;
  public exercise: Exercise = {
    id: '',
    name: '',
  };

  constructor(
    private storageService: StorageService,
    private modalController: ModalController
    ) { }

  ngOnInit() {
    if (!this.workout) {
      this.workout = {
        name: '',
        exercises: []
      }
    }
    console.log(this.workout);
  }

  resetExerciseSettings() {
    this.exercise.id = ''
    this.exercise.name = '';
    this.exercise.sets = null;
    this.exercise.reps = null;
    this.exercise.rir = null;
  }

  addExercise() {
    const newExercise: Exercise = {
      id: uuidv4(),
      name: this.exercise.name,
      sets: this.exercise.sets,
      reps: this.exercise.reps,
      rir: this.exercise.rir
    }
    this.workout.exercises?.push(newExercise);
    this.resetExerciseSettings();
  }

  removeExercise(exercise: Exercise) {
    if (this.workout.exercises?.length) {
      const index = this.workout.exercises.findIndex((item: Exercise) => item.id === exercise.id);
      console.log(index);
      this.workout.exercises.splice(index, 1);      
    }
  }

  async saveWorkout() {
    this.workout.id = uuidv4();
    const result = this.workout;
    console.log(result);
    this.storageService.addWorkout(this.workout);
  }

  onClose() {
    this.modalController.dismiss();
  }
}
