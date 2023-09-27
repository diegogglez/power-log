import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormArray } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { Exercise, Workout } from 'src/app/models/workouts';
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
  public workoutForm!: FormGroup<any>;

  public rpeArr: any = [];

  get exercises() {
    return (<FormArray>this.workoutForm.get('exercises')).controls;
  }

  constructor(
    private storageService: StorageService,
    private modalController: ModalController,
    private toastController: ToastController
    ) { }

  ngOnInit() {
    if (this.workout) {
      this.editMode = true;
      this.initRpeArr(this.workout.exercises);
    } else {
      this.editMode = false;
    }
    this.initForm();
  }

  onSubmit() {
    console.log('submit form', this.workoutForm.value);
    this.saveWorkout()
  }

  initForm() {
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
              'sets': new FormControl(item.sets),
              'reps': new FormControl(item.reps),
              'weight': new FormControl(item.weight),
              'rir': new FormControl({value: item.rir, disabled: item.enterRpe ? true : false}),
              'enterRpe': new FormControl(item.enterRpe),
              'rpe': new FormControl(item.rpe),
              'rest': new FormControl(item.rest)
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
        weight: new FormControl(null),
        rir: new FormControl(null),
        enterRpe: new FormControl(null),
        rpe: new FormControl(null),
        rest: new FormControl(null)
      })
    );
  }

  onDeleteExercise(exerciseIndex: number) {
    (<FormArray>this.workoutForm.get('exercises')).removeAt(exerciseIndex);
  }

  async saveWorkout() {
    const workout: Workout = this.workoutForm.value;
    console.log(workout);
    

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

  toggleRPE(e: any, index: number) {
    this.rpeArr[index] = e.detail.checked;   
  }

  initRpeArr(exercises: any) {
    exercises.forEach((exercise: Exercise, index: number) => {
      exercise.enterRpe ? this.rpeArr[index] = exercise.enterRpe : this.rpeArr[index] = false;
    });
  }
}
