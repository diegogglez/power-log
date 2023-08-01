import { WorkoutService } from 'src/app/services/workout/workout.service';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { Workout } from 'src/app/models/workouts';
import { TimerComponent } from './timer/timer.component';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-session-modal',
  templateUrl: './session-modal.component.html',
  styleUrls: ['./session-modal.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    TimerComponent,
    ReactiveFormsModule
  ],
})
export class SessionModalComponent  implements OnInit {
  
  @Input() workout!: Workout;
  public sessionForm!: FormGroup;

  constructor(
    private modalController: ModalController,
    private workoutService: WorkoutService
    ) {}

  ngOnInit() {
    console.log(this.workout);
    this.initForm();     
  }

  onSubmit() {
    console.log(this.sessionForm);    
    this.onClose();
  }

  initForm() {
    let sessionExercises: any = new FormArray([]);

    for (let item of this.workout.exercises!) {
      const exercise = new FormGroup({
        sets: new FormArray([])
      });
      
      for (let i = 0; i <= this.createSetsRange(item.sets).length; i++) {
         (<FormArray>exercise.get('sets')).push(new FormGroup({
          weight: new FormControl(null, Validators.required),
          reps: new FormControl(item.reps),
          rir: new FormControl(item.rir),
          done: new FormControl(false, Validators.requiredTrue)
        }));
      };
      
      sessionExercises.push(exercise);
    };

    this.sessionForm = new FormGroup({
      id: new FormControl(uuidv4()),
      name: new FormControl(this.workout.name),
      exercises: sessionExercises
    });
  }

  createSetsRange(sets: number | undefined) {
    return new Array(sets).fill(0).map((n, index) => index + 1);
  }

  onClose() {
    this.modalController.dismiss();
    this.workoutService.isWorkingOut$.next(false);
  }
}
