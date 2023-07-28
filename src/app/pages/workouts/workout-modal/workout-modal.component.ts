import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormArray } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { Workout } from 'src/app/models/workouts';
import { StorageService } from 'src/app/services/storage/storage.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-workout-modal',
  templateUrl: './workout-modal.component.html',
  styleUrls: ['./workout-modal.component.scss'],
  standalone: true,
  imports: [ 
    IonicModule, 
    ReactiveFormsModule, 
    CommonModule 
  ]
})
export class WorkoutModalComponent  implements OnInit {

  @Input() workout!: Workout;
  public editMode: boolean = false;
  public workoutForm!: FormGroup;

  get exercises() {
    return (<FormArray>this.workoutForm.get('exercises')).controls;
  }

  constructor(
    private storageService: StorageService,
    private modalController: ModalController,
    private toastController: ToastController
    ) { }

  ngOnInit() {
    this.workout ? this.editMode = true : this.editMode = false;
    this.initForm();
  }

  onSubmit() {
    console.log('submit form', this.workoutForm.value);
    this.saveWorkout()
  }

  initForm() {
    console.log('init form');
    let workoutId = uuidv4();
    let workoutName = '';
    let workoutDescription = '';
    let workoutExercises: any = new FormArray([]);

    if (this.editMode) {
      const workout = this.workout
      workoutId = this.workout.id;
      workoutName = this.workout.name;
      workoutDescription = this.workout.description;

      if (workout.exercises) {
        for (let item of workout.exercises) {
          workoutExercises.push(
            new FormGroup({
              'id': new FormControl(item.id),
              'name': new FormControl(item.name),
              'reps': new FormControl(item.reps),
              'sets': new FormControl(item.sets),
              'rir': new FormControl(item.rir),
            })
          );
        }
      }
    }

    this.workoutForm = new FormGroup({
      'id': new FormControl(workoutId),
      'name': new FormControl(workoutName),
      'description': new FormControl(workoutDescription),
      'exercises': workoutExercises
    })
  }

  onAddExercise() {
    (<FormArray>this.workoutForm.get('exercises')).push(
      new FormGroup({
        name: new FormControl(null),
        sets: new FormControl(null),
        reps: new FormControl(null),
        rir: new FormControl(null)
      })
    );
  }

  onDeleteExercise(exerciseIndex: number) {
    (<FormArray>this.workoutForm.get('exercises')).removeAt(exerciseIndex);
  }

  async saveWorkout() {
    const workout: Workout = this.workoutForm.value;

    if (this.editMode) {
      await this.storageService.updateWorkout(workout);
    } else {
      await this.storageService.addWorkout(workout);
    }

    this.modalController.dismiss();
    this.presentToast();
  }

  onClose() {
    this.modalController.dismiss();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: `workout ${this.editMode ? 'updated' : 'created'} successfully!`,
      duration: 1000,
      position: 'bottom'
    });
    await toast.present();
  }
}
