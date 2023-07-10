import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Exercise, Workout } from 'src/app/models/workouts';
import { StorageService } from 'src/app/services/storage.service';
import { v4 as uuidv4 } from 'uuid'

@Component({
  selector: 'app-workout-modal',
  templateUrl: './workout-modal.component.html',
  styleUrls: ['./workout-modal.component.scss'],
  standalone: true,
  imports: [ 
    IonicModule, 
    ReactiveFormsModule, 
    CommonModule ]
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
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef
    ) { }

  ngOnInit() {
    this.workout ? this.editMode = true : this.editMode = false;
    this.initForm();
    console.log('open edit', this.workout);
    console.log(this.editMode); 
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
            }));
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
    )
  }

  onDeleteExercise(exerciseIndex: number) {
    console.log('delete exercise:', exerciseIndex);
    (<FormArray>this.workoutForm.get('exercises')).removeAt(exerciseIndex);
  }

  async saveWorkout() {
    const workout: Workout = this.workoutForm.value;
    await this.storageService.addWorkout(workout);
    console.log(workout);
    
  }

  onClose() {
    this.modalController.dismiss();
  }
}
