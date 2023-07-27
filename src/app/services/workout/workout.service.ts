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

  constructor(private modalController: ModalController) { }

  async openSessionModal(workout: Workout) {
    const modal = await this.modalController.create({
      component: SessionModalComponent,
      componentProps: {
        workout,
      },
      breakpoints: [0.1, 0.5, 0.9, 1],
      backdropBreakpoint: 1,
      initialBreakpoint: 1,
      cssClass: 'sessionModal',
    });
    await modal.present();
  }
}
