import { WorkoutService } from 'src/app/services/workout/workout.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { Workout } from 'src/app/models/workouts';
import { Subscription } from 'rxjs';
import { TimerComponent } from './timer/timer.component';

@Component({
  selector: 'app-session-modal',
  templateUrl: './session-modal.component.html',
  styleUrls: ['./session-modal.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    TimerComponent
  ],
})
export class SessionModalComponent  implements OnInit {
  
  public workout!: Workout;

  constructor(
    private modalController: ModalController,
    private workoutService: WorkoutService
    ) { }

  ngOnInit() {
    // console.log('init workout', this.workoutService.currentWorkout);
    this.workout = this.workoutService.currentWorkout;
  }

  onClose() {
    this.modalController.dismiss();
    this.workoutService.isWorkingOut$.next(false);
  }
}
