import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { Workout } from 'src/app/models/workouts';
import { SessionModalComponent } from 'src/app/pages/workouts/session-modal/session-modal.component';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  public isWorkingOut$ = new Subject<boolean>();
  public currentWorkout!: Workout;

  constructor(private modalController: ModalController) { }

  async openSessionModal() {
    const modal = await this.modalController.create({
      component: SessionModalComponent,
      breakpoints: [0.1, 0.5, 0.9, 1],
      backdropBreakpoint: 1,
      initialBreakpoint: 1,
      cssClass: 'sessionModal',
    });
    await modal.present();
  }
}
