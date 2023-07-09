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

  public editMode: boolean = false;
  public workoutForm: FormGroup;

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
    this.initForm();
  }

  onSubmit() {
    console.log('submit form', this.workoutForm.value);

  }

  initForm() {
    let workoutName = '';
    let workoutDescription = '';
    let workoutExercises = new FormArray([]);

    this.workoutForm = new FormGroup({
      id: new FormControl(uuidv4()),
      name: new FormControl(workoutName),
      description: new FormControl(workoutDescription),
      exercises: workoutExercises
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

  async saveWorkout() {
    const workout: Workout = this.workoutForm.value;
    await this.storageService.addWorkout(workout);
    console.log(workout);
    
  }

  onClose() {
    this.modalController.dismiss();
  }
}
