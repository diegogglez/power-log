import { WorkoutService } from 'src/app/services/workout/workout.service';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { Session, Workout } from 'src/app/models/workouts';
import { TimerComponent } from './timer/timer.component';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/services/storage/storage.service';

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
  public timerSubscription!: Subscription;
  public session: Session = {
    id: '',
    workoutName:'',
    date: '',
    sessionTime: '',
    exercises: []
  }

  constructor(
    private modalController: ModalController,
    private workoutService: WorkoutService,
    private storageService: StorageService) {}

  ngOnInit() {
    console.log(this.workout);
    this.initForm();     
    this.timerSubscription = this.workoutService.sessionTime.subscribe((value) => {
      this.session.sessionTime = value;
    })
  }

  onSubmit() {  
    this.onClose();
    this.saveSession();
  }

  initForm() {
    let sessionExercises: any = new FormArray([]);

    for (let item of this.workout.exercises!) {
      const exercise = new FormGroup({
        name: new FormControl(item.name),
        sets: new FormArray([])
      });
      
      for (let i = 0; i <= this.createSetsArr(item.sets).length; i++) {
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

  createSetsArr(sets: number | undefined) {
    return new Array(sets).fill(0).map((n, index) => index + 1);
  }

  generateDate() {
    const date = new Date();
    const numericDate = date.toLocaleDateString();
    return numericDate;
  }

  saveSession() {
    this.session.id = uuidv4();
    this.session.workoutName = this.sessionForm.value.name;
    this.session.date = this.generateDate();
    this.session.exercises = this.sessionForm.value.exercises;
    console.log(this.session);  
    console.log(this.sessionForm.value);
    
    this.storageService.addSession(this.session)
  }

  onClose() {
    this.modalController.dismiss(true);
    this.workoutService.isWorkingOut$.next(false);
  }
}
